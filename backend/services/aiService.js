const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
const dotenv = require("dotenv");
dotenv.config();

// Initialize the LLM (using OpenAI or fallback mock)
const useMock = process.env.USE_MOCK_AI === 'true' || !process.env.OPENAI_API_KEY;

let model;
if (!useMock) {
  model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    modelName: "gpt-3.5-turbo",
  });
}

// Prompt for symptom classification
const classificationPrompt = PromptTemplate.fromTemplate(`
You are a medical triage assistant. Analyze the patient's symptoms and classify them.
Symptoms: {symptoms}

Determine the recommended hospital department and the priority level.
Departments: Cardiology, Orthopedics, General Physician, Neurology, Pediatrics, Gynecology, ENT, Dermatology, Emergency.
Priority Levels: 1 (Emergency - life threatening/severe), 2 (Semi-Urgent - needs attention soon/broken bones), 3 (Normal - routine checkup/mild symptoms).

CRITICAL RULES:
- If the symptoms involve a broken bone, fracture, severe joint pain, or fall trauma, YOU MUST CLASSIFY the department as "Orthopedics".
- If the patient is critical, prioritize them as 1 (Emergency).

Respond ONLY in valid JSON format with keys "department" and "priority" (number). Do not add any extra text or markdown block fences.
`);

// Prompt for patient summary
const summaryPrompt = PromptTemplate.fromTemplate(`
Summarize the following patient details into a concise, doctor-ready summary. Include important risk factors or durations.

Patient Name: {name}
Age: {age}
Symptoms: {symptoms}
Duration: {duration}
Medical History: {history}
Lifestyle: {lifestyle}

Output a short, objective summary paragraph.
`);

exports.analyzeSymptoms = async (symptoms) => {
  try {
    if (useMock) {
      // Mock logic for hackathon without API key
      const lower = symptoms.toLowerCase();
      let department = 'General Physician';
      let priority = 3;

      if (lower.includes('chest') || lower.includes('heart') || lower.includes('breath')) {
        department = 'Cardiology';
        priority = 1;
      } else if (lower.includes('bone') || lower.includes('fracture') || lower.includes('fall')) {
        department = 'Orthopedics';
        priority = 2;
      } else if (lower.includes('headache') || lower.includes('dizzy')) {
        department = 'Neurology';
        priority = 2;
      }

      return { department, priority };
    }

    const promptFormatted = await classificationPrompt.format({ symptoms });
    const response = await model.invoke(promptFormatted);
    const result = JSON.parse(response.content.trim());
    return result;
  } catch (error) {
    console.error("AI Classification Error:", error);
    return { department: 'General Physician', priority: 3 }; // fallback
  }
};

exports.generateSummary = async (patientData) => {
  try {
    if (useMock) {
      return `Patient ${patientData.name}, ${patientData.age}. Symptoms: ${patientData.symptoms} (Duration: ${patientData.duration}). History: ${patientData.history}. Lifestyle: ${patientData.lifestyle}. Suggested Department: ${patientData.department}.`;
    }

    const promptFormatted = await summaryPrompt.format({
      name: patientData.name,
      age: patientData.age,
      symptoms: patientData.symptoms,
      duration: patientData.duration,
      history: patientData.history || 'None reported',
      lifestyle: patientData.lifestyle || 'None reported'
    });
    const response = await model.invoke(promptFormatted);
    return response.content.trim();
  } catch (error) {
    console.error("AI Summarization Error:", error);
    return `Patient reports ${patientData.symptoms} for ${patientData.duration}.`;
  }
};
