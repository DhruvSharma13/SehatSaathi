const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  symptoms: { type: String, required: true },
  medical_history: { type: String, default: 'None' },
  duration: { type: String, default: '' },
  lifestyle: { type: String, default: '' },
  department: { type: String }, // Suggested by AI
  priority: { type: Number }, // Suggested by AI (1=Emergency, 2=Semi-Urgent, 3=Normal)
  summary: { type: String }, // AI generated doctor-ready summary
  arrival_time: { type: Date, default: Date.now },
  status: { type: String, enum: ['Waiting', 'Consulting', 'Completed'], default: 'Waiting' }
});

module.exports = mongoose.model('Patient', patientSchema);
