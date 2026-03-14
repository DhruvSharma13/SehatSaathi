import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Activity, Clock } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center space-y-8 animate-fade-in-up">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-dark tracking-tight sm:text-6xl">
            Smart OPD <span className="text-primary">Flow</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            Skip the long wait times. Enter your symptoms, get AI triage, and receive a priority token before you even reach the hospital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pb-8">
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-primary">
              <Stethoscope className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Triage</h3>
            <p className="text-sm text-gray-500">Intelligently classifies symptoms to find the right department.</p>
          </div>
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4 text-red-500">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Priority Queues</h3>
            <p className="text-sm text-gray-500">Emergencies are auto-detected and prioritized dynamically.</p>
          </div>
          <div className="glass p-6 rounded-2xl flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-xl">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-500">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Less Waiting</h3>
            <p className="text-sm text-gray-500">Know exactly when to arrive with real-time token tracking.</p>
          </div>
        </div>

        <div>
          <button
            onClick={() => navigate('/symptoms')}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-primary hover:bg-blue-700 rounded-full overflow-hidden transition-all shadow-lg hover:shadow-blue-500/50"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Check-In
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
