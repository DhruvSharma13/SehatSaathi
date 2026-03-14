import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const analyzeSymptoms = (symptoms) => api.post('/symptoms/analyze', { symptoms });
export const registerPatient = (patientData) => api.post('/patient/register', patientData);
export const joinQueue = (queueData) => api.post('/queue/join', queueData);
export const getQueue = (department) => api.get(`/queue/${department}`);
export const completeConsultation = (queueId) => api.post(`/queue/${queueId}/complete`);
export const getDashboardStats = () => api.get('/dashboard/stats');
