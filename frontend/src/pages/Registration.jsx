import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { registerPatient, joinQueue } from '../services/api';
import PriorityBadge from '../components/PriorityBadge';
import { FileText, UserPlus } from 'lucide-react';

export default function Registration() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { symptoms = '', analysis = { department: 'General Physician', priority: 3 } } = location.state || {};
  
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    symptoms: symptoms,
    duration: '',
    medical_history: '',
    lifestyle: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const patientData = {
        ...formData,
        department: analysis.department,
        priority: analysis.priority
      };
      
      const res = await registerPatient(patientData);
      const patient = res.data.patient;
      
      // Automatically join the queue
      await joinQueue({
        patientId: patient._id,
        department: patient.department,
        priority: patient.priority
      });
      
      navigate(`/token/${patient._id}`, { state: { patient } });
    } catch (error) {
      console.error(error);
      alert('Failed to register. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Sidebar AI Analysis */}
        <div className="md:w-1/3 bg-slate-50 p-8 border-r border-gray-100 flex flex-col justify-center">
          <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-dark mb-4">AI Triage Result</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Suggested Department</p>
              <p className="text-lg font-semibold text-primary">{analysis.department}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Priority Level</p>
              <PriorityBadge priority={analysis.priority} />
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm font-medium text-gray-500">Recorded Symptoms</p>
              <p className="text-sm text-gray-700 italic mt-1 line-clamp-3">"{symptoms}"</p>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="md:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-primary" />
            Patient Details
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" placeholder="Rahul Sharma" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input required type="number" name="age" value={formData.age} onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" placeholder="45" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration of illness</label>
                <input required type="text" name="duration" value={formData.duration} onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" placeholder="e.g., 3 days, 2 hours" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lifestyle Risk Factors</label>
                <input type="text" name="lifestyle" value={formData.lifestyle} onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" placeholder="e.g., Smoking, Alcohol" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Past Medical History</label>
              <textarea name="medical_history" value={formData.medical_history} onChange={handleChange} rows={3}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary" placeholder="e.g., Diabetes, Hypertension" />
            </div>

            <div className="pt-4">
              <button disabled={loading} type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-primary hover:bg-blue-700 transition"
              >
                {loading ? 'Processing...' : 'Complete Check-In & Get Token'}
              </button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  );
}
