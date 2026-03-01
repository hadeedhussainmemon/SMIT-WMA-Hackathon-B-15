// Make sure to install axios in the backend: npm install axios
import axios from 'axios';
import Subscription from '../models/Subscription.js';
import User from '../models/User.js';

// @desc    Analyze symptoms using Grok API
// @route   POST /api/ai/symptom-checker
// @access  Private (Doctor)
const analyzeSymptoms = async (req, res, next) => {
    try {
        if (req.user.role !== 'doctor') {
            res.status(403);
            throw new Error('Only doctors can access the AI symptom checker');
        }

        // Subscription Gate (Backend)
        // Note: For a real SaaS, we'd lookup the clinicAdmin associated with this doctor.
        // For this hackathon, we assume the doctor is the subscriber or linked to one.
        // We'll check if a Pro subscription exists for this user (acting as clinic owner)
        const sub = await Subscription.findOne({ clinicAdmin: req.user._id });
        if (!sub || sub.planTier !== 'Pro') {
            res.status(403);
            throw new Error('Pro subscription required for AI diagnostics');
        }

        const { symptoms, patientAge, patientGender } = req.body;

        const prompt = `Act as an expert medical assistant for a board-certified physician. 
        A ${patientAge}-year-old ${patientGender} patient presents with: ${symptoms}.
        
        TASKS:
        1. Provide a concise list of 3-5 possible differential diagnoses.
        2. Assess the clinical risk level (Low, Medium, High).
        3. Provide immediate clinical advice for the physician (e.g., urgent labs, imaging, or redirection to ER).
        
        FORMAT: Return a JSON object with keys: "analysis" (string), "riskLevel" (string), "advice" (string). 
        Do not include any other text.`;

        const response = await axios.post(
            'https://api.x.ai/v1/chat/completions',
            {
                messages: [
                    { role: "system", content: "You are an expert clinical diagnostic co-pilot. You output valid JSON only." },
                    { role: "user", content: prompt }
                ],
                model: "grok-beta",
                stream: false,
                response_format: { type: "json_object" },
                temperature: 0.2
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.XAI_API_KEY}`
                }
            }
        );

        const aiResult = JSON.parse(response.data.choices[0].message.content);
        res.json({ success: true, ...aiResult });

    } catch (error) {
        console.error("AI Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Failed to communicate with Grok AI node' });
    }
};

// @desc    Suggest medicine prescription based on diagnosis using Grok API
// @route   POST /api/ai/prescription-suggestion
// @access  Private (Doctor)
const suggestPrescription = async (req, res, next) => {
    try {
        if (req.user.role !== 'doctor') {
            res.status(403);
            throw new Error('Only doctors can access AI prescription suggestions');
        }

        const sub = await Subscription.findOne({ clinicAdmin: req.user._id });
        if (!sub || sub.planTier !== 'Pro') {
            res.status(403);
            throw new Error('Pro subscription required for AI prescriptions');
        }

        const { diagnosis, patientAge, patientGender } = req.body;

        const prompt = `Act as an expert doctor. The patient is ${patientAge} years old, ${patientGender}. The confirmed diagnosis is: ${diagnosis}. Please suggest a standard medical prescription including 2-3 common medicines, their standard dosages, and duration. Format the output clearly so it can be copied into a digital prescription pad.`;

        const response = await axios.post(
            'https://api.x.ai/v1/chat/completions',
            {
                messages: [
                    { role: "system", content: "You are a helpful and expert medical AI assistant for doctors. You provide standard medical guidelines." },
                    { role: "user", content: prompt }
                ],
                model: "grok-beta",
                stream: false,
                temperature: 0.2
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.XAI_API_KEY}`
                }
            }
        );

        const aiSuggestion = response.data.choices[0].message.content;
        res.json({ success: true, prescription: aiSuggestion });

    } catch (error) {
        console.error("AI Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Failed to communicate with Grok AI' });
    }
};

const explainPrescription = async (req, res, next) => {
    try {
        const { medicines, diagnosis } = req.body;

        let prompt = `As a friendly medical assistant, explain this prescription to a patient in simple, non-expert terms.\n\nDiagnosis: ${diagnosis}\nMedicines:\n`;
        medicines.forEach(m => {
            prompt += `- ${m.name}: ${m.dosage}, ${m.duration}\n`;
        });
        prompt += `\nPlease provide:\n1. Purpose of each medicine.\n2. Important lifestyle advice (rest, diet).\n3. Common mild side effects (with clear disclaimer to contact the doctor for severe ones).\n4. A friendly recovery message.`;

        const response = await axios.post(
            'https://api.x.ai/v1/chat/completions',
            {
                messages: [
                    { role: "system", content: "You are a friendly medical assistant explaining prescriptions to patients in simple terms." },
                    { role: "user", content: prompt }
                ],
                model: "grok-beta",
                stream: false,
                temperature: 0.2
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.XAI_API_KEY}`
                }
            }
        );

        const explanation = response.data.choices[0].message.content;
        res.json({ explanation });
    } catch (error) {
        next(error);
    }
};

const analyzeReport = async (req, res, next) => {// @desc    Conversational Health Bot (Neural Chat)
    // @route   POST /api/ai/neural-chat
    // @access  Private
    export const neuralChat = async (req, res, next) => {
        try {
            const { messages } = req.body;

            if (!messages || !Array.isArray(messages)) {
                res.status(400);
                throw new Error('Please provide valid message history');
            }

            const systemPrompt = `You are the CuraAI Neural Assistant, an advanced clinical companion. 
        Your goal is to assist patients and doctors with medical inquiries, diagnostic reasoning, and health management.
        Guidelines:
        - Be professional, empathetic, and scientifically accurate.
        - provide structured advice but always include a disclaimer to consult their specific doctor at CuraAI.
        - If the user is a patient, explain complex terms simply.
        - If the user is a doctor, provide deep clinical insights.
        - Keep responses concise but comprehensive.`;

            const response = await axios.post(
                'https://api.x.ai/v1/chat/completions',
                {
                    model: 'grok-beta',
                    messages: [
                        { role: 'system', content: systemPrompt },
                        ...messages
                    ],
                    temperature: 0.7,
                },
                {
                    headers: {
                        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            res.json({
                reply: response.data.choices[0].message.content,
                provider: 'Grok-Neural-Engine'
            });
        } catch (error) {
            console.error('Neural Chat Error:', error.response?.data || error.message);
            next(error);
        }
    };
    try {
        const { reportText } = req.body;

        if (!reportText) {
            res.status(400);
            throw new Error('Report text is required for analysis');
        }

        const prompt = `Act as an expert medical consultant. I am providing you with the text extracted from a medical report (e.g., lab results, imaging report, or discharge summary). 
        
        REPORT TEXT:
        """
        ${reportText}
        """

        TASKS:
        1. Summarize the key findings in simple, easy-to-understand language.
        2. Identify any "Critical Flags" or abnormal values that require immediate attention.
        3. Suggest follow-up questions for the patient to ask their doctor.
        4. Provide a general wellness tip related to the findings.

        FORMAT: Return a JSON object with keys: "summary" (string), "criticalFlags" (array of strings), "nextSteps" (array of strings), "wellnessTip" (string). 
        Do not include any other text. Output valid JSON only.`;

        const response = await axios.post(
            'https://api.x.ai/v1/chat/completions',
            {
                messages: [
                    { role: "system", content: "You are a world-class medical diagnostic assistant. You interpret complex reports and simplify them for clinical understanding. You output valid JSON only." },
                    { role: "user", content: prompt }
                ],
                model: "grok-beta",
                stream: false,
                response_format: { type: "json_object" },
                temperature: 0.1
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.XAI_API_KEY}`
                }
            }
        );

        const aiResult = JSON.parse(response.data.choices[0].message.content);
        res.json({ success: true, ...aiResult });

    } catch (error) {
        console.error("AI Report Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Neural node failed to decode report' });
    }
};

export { analyzeSymptoms, suggestPrescription, explainPrescription, analyzeReport };
