const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema({
  patient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  department: { type: String, required: true },
  priority: { type: Number, required: true },
  arrival_time: { type: Date, default: Date.now },
  status: { type: String, enum: ['Waiting', 'Consulting', 'Completed'], default: 'Waiting' }
});

module.exports = mongoose.model('Queue', queueSchema);
