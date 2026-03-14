import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl text-dark">SehatSathi AI</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              Admin
            </Link>

            {user ? (
              <>
                {user.role === 'doctor' && (
                  <Link to={`/doctor/${user.department || 'Cardiology'}`} className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                    Doctor View
                  </Link>
                )}
                <span className="text-sm font-medium text-gray-700 ml-4 py-2 border-l pl-4 border-gray-200">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-500 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/signup" className="bg-primary text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium shadow-sm transition">
                  Sign Up
                </Link>
              </>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
}
