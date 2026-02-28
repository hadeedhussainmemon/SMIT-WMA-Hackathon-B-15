# Cura AI: Smart Diagnosis & Clinic Management SaaS 🏥 🤖

![Cura AI Banner](./frontend/public/hero-banner.png)

Cura AI is a next-generation **MERN-stack SaaS platform** designed to modernize healthcare workflows. It combines professional clinic management with advanced AI-driven diagnostics, predictive analytics, and real-time medical history tracking.

---

## 🔥 Professional Features

### 1. 🩺 AI Diagnostic Assistant (Doctor Dashboard)
- **Grok-Powered Symptoms Checker**: Doctors can enter symptoms and vitals to receive a sophisticated differential diagnosis.
- **Clinical Risk Flagging**: Automatic pattern recognition for life-threatening conditions (e.g., cardiovascular stress).
- **History-Aware Context**: The AI analysis is integrated with the patient's **Medical Record Timeline**, ensuring longitudinal care.

### 2. 📊 Predictive Analytics (Admin Dashboard)
- **Clinic Load Forecasting**: Uses pattern recognition to predict patient volume spikes (e.g., seasonal surges).
- **Disease Trend Monitoring**: Real-time tracking of emerging health patterns in the community.
- **Metric Insights**: ROI tracking and efficiency indices for clinic performance.

### 3. 👤 Patient Empowerment & AI Portal
- **AI Prescription Explainer**: Transforms complex medical prescriptions into simple English with lifestyle advice.
- **Digital Health Passport**: Instant access to all past visits, digital prescriptions (PDF), and lab summaries.

### 4. 🛎️ Operation Control (Receptionist)
- **Real-time Patient Directory**: Advanced search and registration flow.
- **Dynamic Scheduling**: Glassmorphic front-desk interface for managing appointments.

---

## ⚙️ How It Works (System Architecture)

Cura AI operates as a closed-loop clinical environment where data flows seamlessly between four distinct roles:

### 🔄 The Clinical Workflow
1.  **Patient Interaction**: Patients register and book appointments via their specialized portal. Logic is handled by Redux RTK Query, ensuring immediate UI updates.
2.  **Receptionist Orchestration**: The Front Desk receives a real-time feed of appointments. Confirming an appointment triggers a status update in MongoDB, which reflects instantly on the Doctor's Queue.
3.  **The AI Examination (Doctor)**:
    - **Contextual Awareness**: Doctors select a patient from the queue, which pulls that specific patient's **Medical Record Timeline** (Appointments + Prescriptions) using sorted aggregate queries.
    - **Intelligence Layer**: The **Grok-Beta AI Engine** processes input via specialized prompting. For diagnosis, the backend adds a **Risk Recognition Layer** that scans symptoms for cardiac or neurological red flags *before* returning suggestions.
4.  **Closing the Loop (Prescription)**: The Doctor signs a digital prescription, which is saved as a PDF and a DB record. The Patient can instantly access this in their portal and use the **AI Prescription Explainer** to understand their recovery plan.

### 🧠 The Intelligence Engine
- **Pattern Matching**: The Admin Analytics module uses time-series simulation to predict clinic occupancy and disease prevalence.
- **Decryption Logic**: The Patient AI uses a "Simple English" prompt wrapper around Grok to translate medical jargon into actionable lifestyle advice.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: React (Vite) + Tailwind CSS + Redux Toolkit (RTK Query)
- **Design**: Premium Glassmorphic UI with `framer-motion` & `lucide-react`
- **Backend**: Node.js + Express.js + JWT (RBAC)
- **Database**: MongoDB (Mongoose)
- **AI Engine**: xAI Grok API Integration
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
   # Install Backend
   cd backend && npm install
   # Install Frontend
   cd frontend && npm install
   ```
2. **Run Development**:
   ```bash
   # Terminal 1 (Backend)
   cd backend && npm run dev
   # Terminal 2 (Frontend)
   cd frontend && npm run dev
   ```

---

## ☁️ Deployment (Vercel)

This project is pre-configured for seamless Vercel deployment using the **Production Build Pipeline**.

1. **Deploy Backend**: Point to `/backend` directory, set Framework to `Other`.
2. **Deploy Frontend**: Point to `/frontend` directory, set Framework to `Vite`.
3. **Connect**: Update `VITE_API_BASE_URL` on frontend and `FRONTEND_URL` on backend variables.

---

## 🏆 Hackathon Context
Developed for the **SMIT WMA Final Hackathon**. Cura AI demonstrates a scalable SaaS model capable of digitizing local clinics with a "Premium-First" UX and integrated Intelligence.

Developed with ❤️ by Hadeed Hussain Memon.
 [GitHub Repository](https://github.com/hadeedhussainmemon/SMIT-WMA-Hackathon-B-15)
