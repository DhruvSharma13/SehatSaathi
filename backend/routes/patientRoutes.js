const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const queueService = require('../services/queueService');
const aiService = require('../services/aiService');

// POST /api/patient/register
router.post('/register', async (req, res) => {
  try {
    const { name, age, symptoms, medical_history, duration, lifestyle, department, priority } = req.body;
    
    // Generate AI Summary
    const summary = await aiService.generateSummary({
      name, age, symptoms, history: medical_history, duration, lifestyle, department
    });

    const patient = new Patient({
      name,
      age,
      symptoms,
      medical_history,
      duration,
      lifestyle,
      department,
      priority,
      summary
    });

    await patient.save();

    res.status(201).json({ message: 'Patient registered successfully', patient });
  } catch (error) {
    console.error("Registration block error:", error);
    res.status(500).json({ error: 'Failed to register patient' });
  }
});

module.exports = router;
