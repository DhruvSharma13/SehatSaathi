import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeSymptoms } from '../services/api';
import { BrainCircuit, ArrowRight } from 'lucide-react';

export default function SymptomInput() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    try {
      const response = await analyzeSymptoms(symptoms);
      // Navigate to registration and pass the AI analysis along with symptoms
      navigate('/register', { 
        state: { 
          symptoms, 
          analysis: response.data 
        } 
      });
    } catch (error) {
      console.error(error);
      alert('Failed to analyze symptoms. Please try again or talk to the receptionist.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="glass rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BrainCircuit className="w-32 h-32 text-primary" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-dark mb-2">How are you feeling?</h2>
        <p className="text-gray-500 mb-8">Describe your symptoms below. Our AI will guide you to the correct department.</p>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div>
            <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
              Please enter your symptoms in detail:
            </label>
            <textarea
              id="symptoms"
              rows={5}
              className="w-full rounded-xl border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-base p-4 border"
              placeholder="e.g., I have been having severe chest pain and shortness of breath for the last 2 hours..."
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-dark hover:bg-slate-800 disabled:bg-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                AI is Analyzing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Analyze & Continue <ArrowRight className="w-5 h-5" />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
