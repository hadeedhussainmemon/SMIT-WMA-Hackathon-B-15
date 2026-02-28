// Make sure to install axios in the backend: npm install axios
import axios from 'axios';

// @desc    Analyze symptoms using Grok API
// @route   POST /api/ai/symptom-checker
// @access  Private (Doctor)
const analyzeSymptoms = async (req, res, next) => {
    try {
        if (req.user.role !== 'doctor') {
            res.status(403);
            throw new Error('Only doctors can access the AI symptom checker');
        }

        const { symptoms, patientAge, patientGender } = req.body;

        const prompt = `Act as an expert medical assistant. I have a patient who is ${patientAge} years old, ${patientGender}. They are experiencing the following symptoms: ${symptoms}. Please provide a concise list of 3-5 possible differential diagnoses. Do not provide medical advice. Return the response formatted clearly.`;

        // Using Grok API (xAI) standard chat completions endpoint
        const response = await axios.post(
            'https://api.x.ai/v1/chat/completions',
            {
                messages: [
                    { role: "system", content: "You are a helpful and expert medical AI assistant for doctors." },
                    { role: "user", content: prompt }
                ],
                model: "grok-beta",
                stream: false,
                temperature: 0.3
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.XAI_API_KEY}`
                }
            }
        );

        const aiSuggestion = response.data.choices[0].message.content;
        res.json({ success: true, analysis: aiSuggestion });

    } catch (error) {
        console.error("AI Error:", error.response?.data || error.message);
        res.status(500).json({ success: false, message: 'Failed to communicate with Grok AI' });
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

export { analyzeSymptoms, suggestPrescription };
