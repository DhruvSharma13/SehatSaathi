import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Lock } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData.email, formData.password);
      if (user.role === 'doctor') {
        navigate(`/doctor/${user.department || 'Cardiology'}`);
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full glass p-8 rounded-3xl space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold text-dark">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input name="email" type="email" required value={formData.email} onChange={handleChange}
              className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input name="password" type="password" required value={formData.password} onChange={handleChange}
              className="mt-1 w-full rounded-xl border-gray-300 shadow-sm focus:border-primary focus:ring-primary p-3 border" />
          </div>

          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-primary hover:bg-blue-700">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="font-medium text-primary hover:text-blue-500">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
