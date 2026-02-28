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

export { analyzeSymptoms, suggestPrescription, explainPrescription };
