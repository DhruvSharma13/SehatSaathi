SehatSathi AI – Intelligent OPD Flow Management System
Project Description

SehatSathi AI is an intelligent operational platform designed to improve hospital OPD (Outpatient Department) management. It helps reduce patient waiting times, guide patients to the correct department, prioritize urgent cases, and provide doctors with useful patient context before consultation begins.

In many hospitals, patients arrive without knowing which department they should visit or how long they will have to wait. This leads to overcrowded waiting areas, long queues, and patients being redirected between departments after waiting for extended periods.

Doctors also face operational challenges, as they often spend the first few minutes of each consultation collecting basic patient information rather than focusing on treatment.

SehatSathi AI addresses these challenges by digitizing the patient intake process and introducing an intelligent queue management system.

Patients can describe their symptoms in simple language before visiting the doctor. The system analyzes this information to suggest the most appropriate department and determine the urgency level. Once registered, patients are placed into a dynamic priority queue that ensures emergency cases are handled first while maintaining fairness for other patients.

On the doctor’s side, SehatSathi AI provides a dashboard displaying the current patient queue along with an AI-generated summary of patient symptoms and history. This allows doctors to quickly understand the patient’s situation before consultation begins.

The platform focuses on operational workflow improvement and does not provide medical diagnoses or treatment recommendations.

System Overview

SehatSathi AI improves OPD workflow through three core components:

AI-assisted symptom analysis for department guidance

Priority-based patient queue management

Real-time operational dashboards

Together, these components help hospitals organize patient flow and provide doctors with better consultation context.

Core Features
1. AI-Assisted Symptom Intake

Patients enter their symptoms in natural language before joining the OPD queue.

The system processes this input to:

Extract key symptoms

Suggest the most appropriate department

Assign a priority level

This helps patients reach the correct department without unnecessary redirection.

2. Department Recommendation

Based on the patient’s symptom description, the system suggests a relevant department.

Example:

Input
“High fever and severe headache for two days”

Suggested Department
General Medicine

This reduces confusion and minimizes incorrect department visits.

3. Priority-Based Queue Management

Patients are categorized into three urgency levels.

Priority Level	Description
1 – Emergency	Critical symptoms requiring immediate attention
2 – Semi-Urgent	Symptoms requiring prompt consultation
3 – Normal Walk-In	Regular OPD visits

The system automatically sorts patients based on priority level and arrival time.

Emergency patients are placed at the top of the queue while maintaining fairness for other patients.

4. AI-Generated Patient Context

The platform converts symptom descriptions and patient history into a concise summary for doctors.

Example summary:

Patient reports fever and headache for two days with fatigue. No prior chronic illness mentioned.

This provides doctors with useful context before the consultation begins.

5. Doctor Dashboard

Doctors have access to a dashboard displaying:

Current patient queue

Priority levels

AI-generated symptom summaries

This allows doctors to understand each patient’s situation quickly and manage consultations more efficiently.

6. Administrative Operations Dashboard

Hospital administrators can monitor:

Current OPD load

Department activity

Queue status

Emergency case flow

This improves visibility into hospital operations and supports better resource management.

7. Real-Time Queue Updates

The system updates dashboards instantly whenever:

A patient registers

A patient moves in the queue

A consultation begins

Real-time updates ensure that hospital staff always see the latest queue status without refreshing the application.

Technology Stack
Frontend

React

Vite

React Router

Tailwind CSS

Lucide React Icons

Backend

Node.js

Express.js

Socket.io (for real-time updates)

Database

MongoDB

Mongoose ODM

AI Layer

LangChain

OpenAI API (optional)

Mock AI mode for development and testing

System Architecture

The application follows a client–server architecture.

Frontend (React + Vite)
        │
        │ REST API + WebSockets
        │
Backend (Node.js + Express)
        │
        │
AI Processing Layer (LangChain)
        │
        │
Database (MongoDB)

Socket.io enables real-time synchronization between the backend and dashboards.

Database Structure
Patient Collection
Field	Type	Description
name	String	Patient name
age	Number	Patient age
symptoms	String	Symptom description
department	String	Recommended department
priority	Number	Priority level
aiSummary	String	AI-generated summary
createdAt	Date	Registration timestamp
API Endpoints
Patient Endpoints
Method	Endpoint	Description
POST	/api/patient/register	Register a new patient
GET	/api/patient/all	Retrieve all patients
GET	/api/patient/queue	Retrieve sorted OPD queue
Doctor Endpoints
Method	Endpoint	Description
GET	/api/doctor/queue	Retrieve consultation queue
POST	/api/doctor/next	Move next patient to consultation
Admin Endpoints
Method	Endpoint	Description
GET	/api/admin/dashboard	Retrieve operational statistics
Installation and Setup
Prerequisites

Node.js (v18 or higher)

MongoDB running locally or accessible via connection string

Backend Setup
cd server
npm install
npm start

Optional .env configuration:

OPENAI_API_KEY=your_api_key
MONGO_URI= connection_key

If no API key is provided, the system runs in mock AI mode.

Frontend Setup
cd client
npm install
npm run dev
Running the Application

Open the application in your browser:

http://localhost:5173
Future Enhancements

Possible improvements include:

Integration with hospital information systems

SMS or messaging notifications for queue updates

Predictive OPD load analytics

Self-service check-in kiosks for hospitals

Multi-hospital deployment support
