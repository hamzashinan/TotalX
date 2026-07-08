# React + TypeScript + Vite Demo

## Project Description
A minimal starter template that combines **React**, **TypeScript**, and **Vite** with a polished UI. It includes ESLint configuration, optional React‑Compiler support, and ready‑to‑use Firebase phone‑OTP authentication for development.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS (optional), ESLint with `eslint-plugin-react-x` and `eslint-plugin-react-dom`
- **Authentication**: Firebase Authentication (Phone OTP) – easy to plug in for future mobile‑first features
- **Build / Dev**: Vite dev server with hot‑module replacement, fast production bundling

## Features
- Type‑aware linting (recommended rules for React & React‑DOM)
- Ready‑made **Login**, **OTP verification**, **Register**, and **Dashboard** UI mockups (see screenshots)
- Firebase phone‑OTP flow (development only, uses test numbers)
- Simple project structure – `src/` contains pages and components

## Setup Instructions
### 1. Clone & install dependencies
```powershell
git clone <repo_url>
cd react-machine-test
npm install
```
### 2. Run the development server
```powershell
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. (Optional) Enable type‑aware lint rules
Edit `eslint.config.js` and replace the default config with the **recommended‑type‑checked** preset as shown in the README snippet above.

## Firebase Configuration (Development Only)
Create a Firebase project and enable **Phone Authentication**. Add the following variables to a `.env` file at the project root (do **not** commit this file):
```
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```
These values are accessed in the frontend via `import.meta.env.VITE_…`.

## Test Phone Numbers & OTPs (Development)
Firebase provides test credentials that bypass real SMS delivery. Add the following entries in the Firebase console under **Authentication → Sign‑in method → Phone → Phone numbers for testing**:
- **Phone**: `+1 555‑0100` → **OTP**: `123456`
- **Phone**: `+1 555‑0111` → **OTP**: `654321`
Use these numbers to verify the OTP flow locally.

## Screenshots
### Login Page
![Login Page](file:///C:/Users/hamza_rieg76m/.gemini/antigravity-ide/brain/93b7295a-c23c-41bb-a1e7-01bb47bc5489/login_page_1783507845278.png)

### OTP Verification Page
![OTP Page](file:///C:/Users/hamza_rieg76m/.gemini/antigravity-ide/brain/93b7295a-c23c-41bb-a1e7-01bb47bc5489/otp_page_1783507906197.png)

### Registration Page
![Register Page](file:///C:/Users/hamza_rieg76m/.gemini/antigravity-ide/brain/93b7295a-c23c-41bb-a1e7-01bb47bc5489/register_page_1783507921483.png)

### Home / Dashboard Page
![Home Page](file:///C:/Users/hamza_rieg76m/.gemini/antigravity-ide/brain/93b7295a-c23c-41bb-a1e7-01bb47bc5489/home_page_1783507938866.png)
