import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import SymptomInput from './pages/SymptomInput';
import Registration from './pages/Registration';
import QueueToken from './pages/QueueToken';
import DoctorView from './pages/DoctorView';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/symptoms" element={<SymptomInput />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/token/:patientId" element={<QueueToken />} />
              <Route path="/doctor/:department" element={<DoctorView />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
