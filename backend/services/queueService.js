const Queue = require('../models/Queue');

exports.addToQueue = async (patientId, department, priority, io) => {
  try {
    const queueEntry = new Queue({
      patient_id: patientId,
      department,
      priority
    });
    await queueEntry.save();
    
    // Broadcast queue update to clients
    exports.broadcastQueueUpdate(department, io);
    
    return queueEntry;
  } catch (err) {
    console.error("Queue Error:", err);
    throw err;
  }
};

exports.getQueueByDepartment = async (department) => {
  // Sort by priority (1 is highest), then by arrival time
  return await Queue.find({ department, status: 'Waiting' })
    .populate('patient_id')
    .sort({ priority: 1, arrival_time: 1 });
};

exports.broadcastQueueUpdate = async (department, io) => {
  if (!io) return;
  try {
    const queue = await exports.getQueueByDepartment(department);
    // Emit to a room named after the department, or broadcast generally
    io.emit(`queueUpdate-${department}`, queue);
    io.emit('dashboardUpdate', { department, count: queue.length });
  } catch (err) {
    console.error('Broadcast Error:', err);
  }
};

exports.completeConsultation = async (queueId, io) => {
  try {
    const entry = await Queue.findByIdAndUpdate(
      queueId, 
      { status: 'Completed' },
      { new: true }
    );
    
    if (entry) {
      await exports.broadcastQueueUpdate(entry.department, io);
    }
    return entry;
  } catch (err) {
    console.error('Complete Consultation Error:', err);
    throw err;
  }
};
