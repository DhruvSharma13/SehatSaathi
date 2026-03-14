import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQueue, completeConsultation } from '../services/api';
import { socket } from '../services/socket';
import PriorityBadge from '../components/PriorityBadge';
import { Users, Clock, Brain } from 'lucide-react';

export default function DoctorView() {
  const { department } = useParams();
  const [queue, setQueue] = useState([]);
  const [completing, setCompleting] = useState(false);

  const fetchQueue = async () => {
    try {
      const res = await getQueue(department);
      setQueue(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQueue();
    
    socket.on(`queueUpdate-${department}`, (updatedQueue) => {
      setQueue(updatedQueue);
    });

    return () => {
      socket.off(`queueUpdate-${department}`);
    };
  }, [department]);

  const handleComplete = async (queueId) => {
    if (completing) return;
    setCompleting(true);
    try {
      await completeConsultation(queueId);
      // Let websocket handle the update
    } catch (error) {
       console.error("Failed to complete consultation", error);
       alert("Failed to complete consultation");
    } finally {
      setCompleting(false);
    }
  }

  return (
    <div className="py-6">
      <div className="flex justify-between items-end mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-dark">Doctor Workspace</h1>
          <p className="text-gray-500 text-lg mt-1">{department} Department</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg text-primary font-medium">
          <Users className="w-5 h-5" />
          {queue.length} Patients Waiting
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Waiting List Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-[calc(100vh-200px)] overflow-y-auto">
          <h3 className="font-semibold text-gray-700 mb-4 px-2 uppercase text-xs tracking-wider">Live Queue Queue order</h3>
          
          <div className="space-y-3">
            {queue.map((entry, idx) => (
              <div key={entry._id} className={`p-4 rounded-lg border ${idx === 0 ? 'bg-blue-50 border-primary shadow-sm' : 'bg-white border-gray-100'}`}>
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-lg text-dark">#{idx + 1}</span>
                  <PriorityBadge priority={entry.priority} />
                </div>
                <p className="font-medium text-gray-900">{entry.patient_id.name}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
                  <Clock className="w-3 h-3" />
                  {new Date(entry.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
            {queue.length === 0 && (
              <div className="text-center p-6 text-gray-400">Queue is empty</div>
            )}
          </div>
        </div>

        {/* Current Patient Detail */}
        <div className="lg:col-span-3">
          {queue.length > 0 ? (
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-8 space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-[0.03] rounded-bl-full -z-10" />
              
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-3xl font-bold text-dark">{queue[0].patient_id.name}</h2>
                  <p className="text-gray-500 text-lg">{queue[0].patient_id.age} years old</p>
                </div>
                <button 
                  onClick={() => handleComplete(queue[0]._id)}
                  disabled={completing}
                  className="bg-primary hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm transition-colors disabled:opacity-50"
                >
                  {completing ? 'Completing...' : 'Complete Consultation'}
                </button>
              </div>

              {/* AI Summary Card */}
              <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100 relative">
                <div className="flex items-center gap-2 mb-4 text-primary font-semibold">
                  <Brain className="w-5 h-5" />
                  AI Generated Patient Context
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {queue[0].patient_id.summary || 'Summary generating...'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Reported Symptoms</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-800 border border-gray-100">
                    {queue[0].patient_id.symptoms}
                  </div>
                </div>
                <div className="space-y-6">
                   <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Duration</h4>
                    <p className="text-gray-800 font-medium">{queue[0].patient_id.duration || 'Not specified'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Medical History</h4>
                    <p className="text-gray-800 font-medium">{queue[0].patient_id.medical_history || 'None'}</p>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center h-[60vh]">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                <Users className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-medium text-gray-900">No Patients Waiting</h3>
              <p className="text-gray-500 mt-2">The OPD queue is currently empty for this department.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
