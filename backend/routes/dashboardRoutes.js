const express = require('express');
const router = express.Router();
const Queue = require('../models/Queue');
const Patient = require('../models/Patient');

// GET /api/dashboard/stats
router.get('/stats', async (req, res) => {
  try {
    // Total waiting patients
    const totalWaiting = await Queue.countDocuments({ status: 'Waiting' });
    
    // Patients by department
    const byDepartment = await Queue.aggregate([
      { $match: { status: 'Waiting' } },
      { $group: { _id: '$department', count: { $sum: 1 } } }
    ]);
    
    // Emergency alerts (priority 1)
    const emergencies = await Queue.find({ status: 'Waiting', priority: 1 })
      .populate('patient_id', 'name age symptoms department priority')
      .sort({ arrival_time: 1 });

    const recentPatients = await Patient.find().sort({ arrival_time: -1 }).limit(10);

    res.json({
      totalWaiting,
      byDepartment,
      emergencies,
      recentPatients
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
