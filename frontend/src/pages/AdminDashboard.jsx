import React, { useEffect, useState } from 'react';
import { getDashboardStats } from '../services/api';
import { socket } from '../services/socket';
import PriorityBadge from '../components/PriorityBadge';
import { Activity, AlertTriangle, Users } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalWaiting: 0,
    byDepartment: [],
    emergencies: [],
    recentPatients: []
  });

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
    
    // Listen for any queue update to refresh stats
    socket.on('dashboardUpdate', () => {
      fetchStats();
    });

    return () => {
      socket.off('dashboardUpdate');
    };
  }, []);

  return (
    <div className="py-6 space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-dark rounded-xl text-white">
          <Activity className="w-6 h-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-dark tracking-tight">Hospital Command Center</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-gray-500 font-medium mb-1">Total OPD Load</p>
            <h3 className="text-4xl font-black text-dark">{stats.totalWaiting}</h3>
          </div>
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-primary">
            <Users className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-red-500 rounded-2xl p-6 shadow-lg shadow-red-500/20 text-white flex items-center justify-between">
          <div>
            <p className="text-red-100 font-medium mb-1">Active Emergencies</p>
            <h3 className="text-4xl font-black">{stats.emergencies.length}</h3>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-dark mb-6">Queue by Department</h3>
          <div className="space-y-4">
            {stats.byDepartment.map((dept) => (
              <div key={dept._id} className="flex items-center justify-between">
                <span className="font-medium text-gray-700">{dept._id}</span>
                <div className="flex items-center gap-4">
                  <div className="w-48 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${Math.min((dept.count / 20) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="font-bold w-8 text-right text-dark">{dept.count}</span>
                </div>
              </div>
            ))}
            {stats.byDepartment.length === 0 && (
              <p className="text-gray-500 text-center py-4">No active queues.</p>
            )}
          </div>
        </div>

        {/* Emergency Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-dark mb-6 text-red-600 flex items-center gap-2">
            Priority Alerts
          </h3>
          <div className="space-y-4">
            {stats.emergencies.map(e => (
              <div key={e._id} className="p-4 border border-red-100 bg-red-50 rounded-xl">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-red-900">{e.patient_id?.name || 'Unknown Patient'}</div>
                  <PriorityBadge priority={e.priority} />
                </div>
                <div className="text-sm text-red-700">Routed to: <span className="font-semibold">{e.department}</span></div>
                <p className="text-sm text-red-600/80 mt-2 truncate">{e.patient_id?.symptoms}</p>
              </div>
            ))}
            {stats.emergencies.length === 0 && (
              <p className="text-gray-500 text-center py-4">No emergency alerts currently.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
