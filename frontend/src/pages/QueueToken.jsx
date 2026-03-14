import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import PriorityBadge from '../components/PriorityBadge';
import { Ticket, ArrowRight } from 'lucide-react';

export default function QueueToken() {
  const location = useLocation();
  const { patient } = location.state || {};

  if (!patient) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No token data found. Please check in first.</p>
        <Link to="/" className="text-primary mt-4 inline-block hover:underline">Go to Home</Link>
      </div>
    );
  }

  // Generate a random token number for visual purposes, in reality this would be query count
  const tokenNum = patient._id.slice(-4).toUpperCase();

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border-t-8 border-primary">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-50 rounded-full text-primary">
            <Ticket className="w-12 h-12" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-dark mb-2">Check-In Successful</h2>
        <p className="text-gray-500 mb-8">Please proceed to the hospital and present this token.</p>

        <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-gray-100">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Token Number</p>
          <div className="text-5xl font-black text-dark mb-4 tracking-tight">T-{tokenNum}</div>
          
          <div className="flex justify-center mb-4">
            <PriorityBadge priority={patient.priority} />
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-2">
            <p className="text-sm font-medium text-gray-500">Department</p>
            <p className="font-semibold text-lg text-primary">{patient.department}</p>
          </div>
        </div>

        <Link to={`/doctor/${patient.department}`} className="group inline-flex items-center gap-2 text-primary hover:text-blue-700 font-medium transition-colors">
          View Live Queue <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
