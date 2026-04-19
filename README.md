# ExamNotesAI

ExamNotesAI is a full-stack AI-powered study assistant that generates exam-focused notes, revision points, diagrams, and charts from a single topic input. It includes secure Google login, credit-based usage, Stripe payments, note history, and PDF export.

This project is designed as a production-style portfolio build that demonstrates end-to-end product engineering across frontend, backend, AI orchestration, payments, and database design.

## Why This Project Stands Out (Resume Highlights)

- Built a complete AI SaaS workflow: auth -> generation -> storage -> export -> monetization
- Implemented structured AI output with strict JSON contracts for reliable UI rendering
- Integrated Mermaid + Recharts for dynamic visual learning content
- Added Stripe Checkout + webhook-driven credit top-up system
- Designed token/cookie-based authentication with protected API routes
- Built responsive, animated React UI with reusable components and global Redux state

## Core Features

- Google Sign-In authentication (Firebase + backend session cookie)
- Credit-based AI note generation (10 credits per generation)
- AI-generated output includes:
	- Priority-wise subtopics (star ranking)
	- Exam-focused notes in Markdown
	- Quick revision points
	- Short/long/diagram-based question sets
	- Optional Mermaid diagram
	- Optional Recharts data (bar/line/pie)
- Notes history and single-note retrieval
- One-click PDF download of generated content
- Stripe credit packs with webhook-based balance updates
- Protected routes in both client and server

## Tech Stack

### Frontend

- React 19 + Vite
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS
- Motion (Framer Motion API)
- Mermaid
- Recharts
- Firebase Auth (Google Provider)

### Backend

- Node.js + Express 5
- MongoDB + Mongoose
- JWT (cookie-based auth)
- Stripe (Checkout + Webhook)
- PDFKit
- Gemini API (2.5 Flash)

## Project Structure

```text
ExamNotesAI/
	client/   # React frontend
	server/   # Express API, AI orchestration, payments, PDF
```

## High-Level Architecture

1. User signs in with Google on the frontend.
2. Frontend sends user profile to backend `/api/auth/google`.
3. Backend creates/fetches user, issues JWT cookie (`token`).
4. User submits topic and options from Notes page.
5. Backend validates credits, builds strict prompt, calls Gemini API.
6. AI JSON response is stored in MongoDB and returned to client.
7. Frontend renders markdown notes, charts, diagrams, and questions.
8. User can download generated result as PDF.
9. If credits are low, user buys a pack via Stripe Checkout.
10. Stripe webhook updates credits in DB after payment success.

## Key API Endpoints

### Auth

- `POST /api/auth/google` - Login/register user and set cookie
- `GET /api/auth/logout` - Clear auth cookie

### User

- `GET /api/user/currentUser` - Get logged-in user profile

### Notes

- `POST /api/notes/generate-notes` - Generate and store AI notes
- `GET /api/notes/getnotes` - Fetch user's note list
- `GET /api/notes/:id` - Fetch single note content

### PDF

- `POST /api/pdf/generate-pdf` - Generate and stream PDF file

### Credits/Payments

- `POST /api/credit/order` - Create Stripe Checkout session
- `POST /api/credits/webhook` - Stripe webhook for credit update

## Environment Variables

Create a `.env` file in `server/`:

```env
PORT=8000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key

CLIENT_URL=http://localhost:5173

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

Client environment in `client/`:

```env
VITE_FIREBASE_APIKEY=your_firebase_web_api_key
```

## Local Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd ExamNotesAI

cd server
npm install

cd ../client
npm install
```

### 2. Configure environment variables

- Add server `.env` with all keys listed above
- Add client `.env` with Firebase key

### 3. Run the app (two terminals)

Terminal 1:

```bash
cd server
npm run dev
```

Terminal 2:

```bash
cd client
npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:8000`

## Product Flow

1. Login with Google
2. Start with free credits
3. Enter topic + class level + exam type
4. Toggle revision mode / diagram / chart options
5. Generate AI notes
6. View output in structured sections
7. Save as PDF
8. Buy more credits when needed
9. Access all previous notes from History

## Data Model Summary

### User

- name
- email (unique)
- credits (default: 50)
- isCreditAvailable
- notes (array of note IDs)

### Notes

- user (reference)
- topic, classLevel, examType
- revisionMode, includeDiagram, includeChart
- content (mixed JSON from AI)
- timestamps

## Security and Reliability Notes

- JWT stored in HTTP-only cookie
- Protected middleware for private endpoints
- Credit validation before generation
- Strict prompt format to enforce JSON output
- Webhook-based payment confirmation for trusted credit updates

## What You Can Showcase in Interviews

- End-to-end feature ownership in a real product flow
- Third-party integrations (Firebase, Gemini, Stripe)
- Prompt engineering for parseable structured AI output
- Full-stack state/data consistency (credits, notes, history)
- Practical system design decisions for a monetized AI app

## Future Improvements

- Add refresh token strategy and production cookie domain config
- Introduce request validation (Zod/Joi)
- Add unit/integration tests (frontend + backend)
- Add rate limiting and API abuse protection
- Add Docker + CI/CD pipeline
- Support multi-language note generation

## Author

Subhashis Dhara

If you want, I can also generate:

- a short one-page recruiter version of this README
- a polished project description for LinkedIn
- bullet points tailored for your resume's "Projects" section
