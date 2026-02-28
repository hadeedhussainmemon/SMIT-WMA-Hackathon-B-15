# Welcome to CuraAI! 👋 🏥

![CuraAI Banner](./frontend/public/hero-banner.png)

***

Welcome to your brand new Medical Clinic Management System! 

If you are a beginner, don't worry! This project is designed to be easy to understand. CuraAI is a next-generation SaaS Operating System designed exclusively for modern medical clinics. Built as the final project for the SMIT WMA Hackathon (B-15), it bridges the gap between doctors and patients by replacing outdated paper records with intelligent symptom analysis, automated digital prescriptions, and seamless appointment scheduling.

🔗 **[View Source Code on GitHub](https://github.com/hadeedhussainmemon/SMIT-WMA-Hackathon-B-15)**

## 🤔 What does this app actually do?

Imagine a real medical clinic. You have **Patients**, **Receptionists**, and **Doctors**. This app gives each of them their own special screen (a "Dashboard") to do their jobs easily on a computer or phone.

Here is the exact step-by-step flow of how the app is used:

1.  **The Patient logs in:** A patient wants to see a doctor. They create an account, log in, and book an appointment for a specific day.
2.  **The Receptionist checks the computer:** The receptionist logs into their dashboard. They see the patient's request and click **"Confirm"**.
3.  **The Doctor sees the patient:** The doctor logs into their dashboard and sees the confirmed patient waiting in their queue. 
4.  **The Doctor uses AI (Magic! 🪄):** Instead of thinking hard about a complex disease, the doctor types the patient's symptoms into the **Grok AI Symptom Checker**. The AI instantly suggests what illness the patient might have!
5.  **The Doctor gives medicine:** The doctor then uses the **AI Prescription Automator**. The AI suggests the correct medicines to give the patient. The doctor clicks one button, and the app instantly creates a beautiful **PDF Prescription**!
6.  **The Patient goes home:** The patient opens their dashboard on their phone and downloads the PDF prescription to buy their medicine.

***

## 🧩 What technologies were used?

This is a **MERN Stack** application. That means it is built with:

*   **M**ongoDB (The Database where we save users and appointments)
*   **E**xpress.js (The Backend framework that handles requests)
*   **R**eact.js (The Frontend framework that makes the beautiful UI)
*   **N**ode.js (The server engine running the backend)

**Cool Extra Tools We Used:**
*   **Tailwind CSS & Shadcn:** For the beautiful, modern styling.
*   **Redux Toolkit:** To manage the data smoothly on the frontend screen.
*   **xAI Grok API:** The "Brain" of the app that gives medical suggestions.

***

## 🚀 How to Put This on the Internet (Deployment)

To share this with the world, we need to put it on a free hosting site called **Vercel**. Your code contains two main folders: `/frontend` and `/backend`. We have to deploy them separately.

### Step 1: Deploying the Backend (The Brain 🧠)
1.  Go to [Vercel.com](https://vercel.com) and create an account.
2.  Click **Add New Project** and import this repository from your GitHub.
3.  In the settings, change the **Framework Preset** to **Other**.
4.  ⚠️ **Super Important:** Look for the input box called **Root Directory** at the bottom. Type exactly: `backend`. This tells Vercel where the server is.
5.  Add your Environment Variables (The secret keys):
    *   `MONGO_URI`: Your database password link.
    *   `JWT_SECRET`: Any random strong password.
    *   `XAI_API_KEY`: Your secret API key to talk to Grok AI.
    *   `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: For saving files.
6.  Click **Deploy**! Wait a minute, and Vercel will give you a link (like `https://my-backend.vercel.app`). Copy this link!

### Step 2: Deploying the Frontend (The Beautiful UI 🎨)
1.  Go back to the Vercel homepage and click **Add New Project** again.
2.  Import the *exact same* GitHub repository.
3.  This time, change the **Framework Preset** to **Vite**.
4.  ⚠️ **Super Important:** Look for the **Root Directory** box. Type exactly: `frontend`.
5.  Add your Environment Variable:
    *   `VITE_API_BASE_URL`: Paste the link you copied from Step 1, but add `/api` at the end (e.g., `https://my-backend.vercel.app/api`).
6.  Click **Deploy**!

### Step 3: The Final Fix (CORS)
Now your beautiful site is live, but the Frontend needs permission to talk to the Backend safely!
1.  Copy the final live link of your newly deployed Frontend (e.g., `https://my-clinic.vercel.app`).
2.  Go back to your Backend project on Vercel -> Settings -> Environment Variables.
3.  Add a new variable called `FRONTEND_URL` and paste that link.
4.  Go to the Deployments tab and click **Redeploy**.

***

## 💡 How to Improve This App Further?
If you want to take this project to the next level after the Hackathon, consider adding these premium features:

1.  **Email Notifications (Nodemailer/SendGrid):** Automatically send an email to the Patient when the Receptionist confirms their appointment.
2.  **Payment Gateway (Stripe):** Allow patients to actually pay for their appointment slot when they book it in the portal.
3.  **Telehealth Video Calls (WebRTC/Agora):** Add a button in the Patient and Doctor dashboards to start a secure video call for remote consultations.
4.  **Cloudinary PDF Storage:** Currently, the PDFs download locally. You can use the backend `/api/prescriptions` endpoint to automatically upload the generated PDF directly to a permanent Cloudinary bucket.

🎉 **Congratulations! Your AI Medical Clinic is fully alive and on the internet!**
