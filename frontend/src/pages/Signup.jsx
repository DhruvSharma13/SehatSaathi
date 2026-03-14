import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'patient', department: 'Cardiology'
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signup(formData);
      if (user.role === 'doctor') {
        navigate(`/doctor/${user.department}`);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <div className="max-w-md w-full glass p-8 rounded-3xl space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <UserPlus className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-dark">Create Account</h2>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select name="role" value={formData.role} onChange={handleChange} className="mt-1 w-full rounded-xl border-gray-300 shadow-sm p-3 border">
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          {formData.role === 'doctor' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <select name="department" value={formData.department} onChange={handleChange} className="mt-1 w-full rounded-xl border-gray-300 shadow-sm p-3 border">
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Neurology">Neurology</option>
                <option value="General Physician">General Physician</option>
              </select>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input name="name" type="text" required value={formData.name} onChange={handleChange} className="mt-1 w-full rounded-xl border-gray-300 shadow-sm p-3 border" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input name="email" type="email" required value={formData.email} onChange={handleChange} className="mt-1 w-full rounded-xl border-gray-300 shadow-sm p-3 border" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input name="password" type="password" required value={formData.password} onChange={handleChange} minLength={6} className="mt-1 w-full rounded-xl border-gray-300 shadow-sm p-3 border" />
          </div>

          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-blue-700 mt-6">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="font-medium text-primary hover:text-blue-500">Log in</Link>
        </p>
      </div>
    </div>
  );
}
