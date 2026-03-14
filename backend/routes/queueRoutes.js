const express = require('express');
const router = express.Router();
const queueService = require('../services/queueService');

// POST /api/queue/join
router.post('/join', async (req, res) => {
  try {
    const { patientId, department, priority } = req.body;
    const io = req.app.get('io');
    
    const entry = await queueService.addToQueue(patientId, department, priority, io);
    res.status(201).json({ message: 'Joined queue', entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join queue' });
  }
});

// GET /api/queue/:department
router.get('/:department', async (req, res) => {
  try {
    const { department } = req.params;
    const queue = await queueService.getQueueByDepartment(department);
    res.json(queue);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get queue' });
  }
});

// POST /api/queue/:id/complete
router.post('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    const io = req.app.get('io');
    
    const entry = await queueService.completeConsultation(id, io);
    res.json({ message: 'Consultation completed', entry });
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete consultation' });
  }
});

module.exports = router;
