const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// POST /api/symptoms/analyze
router.post('/analyze', async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (!symptoms) return res.status(400).json({ error: "Symptoms required" });
    
    const analysis = await aiService.analyzeSymptoms(symptoms);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: "Failed to analyze symptoms" });
  }
});

module.exports = router;
