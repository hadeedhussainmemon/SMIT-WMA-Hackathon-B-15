# Cura AI: Smart Diagnosis & Clinic Management SaaS 🏥 🤖

![Cura AI Banner](./frontend/public/hero-banner.png)

Cura AI is a next-generation **MERN-stack SaaS platform** designed to modernize healthcare workflows. It combines professional clinic management with advanced AI-driven diagnostics, predictive analytics, and real-time medical history tracking.

---

## 🔥 Professional Features

### 1. 🧠 Neural Lab (Pro Tier)
- **Neural Chat Node**: A conversational clinical assistant for real-time medical inquiries and diagnostic reasoning.
- **Report Decoder**: Automated interpretation of complex medical reports (Lab results, imaging) into structured clinical insights.
- **High-Fidelity UI**: Glassmorphic dark-mode interface with emerald accents and real-time AI response streaming.

### 2. 🩺 AI Diagnostic Assistant (Doctor Dashboard)
- **Grok-Powered Symptoms Checker**: Doctors can enter symptoms and vitals to receive a sophisticated differential diagnosis.
- **Clinical Risk Flagging**: Automatic pattern recognition for life-threatening conditions (e.g., cardiovascular stress).
- **History-Aware Context**: The AI analysis is integrated with the patient's **Medical Record Timeline**, ensuring longitudinal care.

### 3. 📊 Predictive Analytics (Admin Dashboard)
- **Clinic Load Forecasting**: Uses pattern recognition to predict patient volume spikes (e.g., seasonal surges).
- **Disease Trend Monitoring**: Real-time tracking of emerging health patterns in the community.
- **Metric Insights**: ROI tracking and efficiency indices for clinic performance.

### 4. 👤 Patient Empowerment & Discovery
- **Doctor Discovery**: Filtered search for specialists with categorized clinical expertise.
- **High-Precision Booking**: Guided 3-step appointment flow with real-time slot selection and instant sync.
- **AI Prescription Explainer**: Transforms complex medical prescriptions into simple English with lifestyle advice.

---

## ⚙️ How It Works (System Architecture)

Cura AI operates as a closed-loop clinical environment where data flows seamlessly between roles:

### 🔄 The Clinical Workflow
1.  **Discovery & Booking**: Patients find providers and book precise slots via a guided UI. Redux RTK Query handles the state synchronization.
2.  **Receptionist Orchestration**: The Front Desk manages a real-time feed of registrations and appointment statuses.
3.  **The AI Examination (Doctor)**:
    - **Contextual Awareness**: Doctors access the **Medical Record Timeline** for deep longitudinal insights.
    - **Intelligence Layer**: The **Grok-Beta AI Engine** provides differential diagnoses with nested clinical risk flagging.
4.  **Neural Lab (Advanced Analysis)**: Patients and Doctors use the **Neural Lab** to decode complex lab data and chat with the clinical engine.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React (Vite) + Tailwind CSS + Redux Toolkit (RTK Query)
- **Design**: Premium Glassmorphic UI with `framer-motion` & `lucide-react`
- **Backend**: Node.js + Express.js + JWT (RBAC) + MongoDB (Mongoose)
- **AI Engine**: xAI Grok API (Grok-Beta)
- **PDF**: Digital Signature & Prescription Generation via `jsPDF`

---

## 🚀 Setup & Installation

### Environment Variables (.env)

#### Backend
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_strong_secret
XAI_API_KEY=your_grok_api_key
```

#### Frontend
```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

### Quick Start
1. **Clone & Install**:
   ```bash
   # Backend
   cd backend && npm install
   # Frontend
   cd frontend && npm install
   ```
2. **Seed Data (Recommended)**:
   Populate the platform with dummy doctors, patients, and clinical records:
   - *Manual Note: Use the data provided in the walkthrough for testing.*
3. **Run Development**:
   ```bash
   # Terminal 1 (Backend)
   npm run dev
   # Terminal 2 (Frontend)
   npm run dev
   ```

---

## 🏆 Hackathon Context
Developed for the **SMIT WMA Final Hackathon**. Cura AI demonstrates a scalable SaaS model capable of digitizing local clinics with a "Premium-First" UX and integrated Intelligence.

Developed with ❤️ by Hadeed Hussain Memon.
[GitHub Repository](https://github.com/hadeedhussainmemon/SMIT-WMA-Hackathon-B-15)
