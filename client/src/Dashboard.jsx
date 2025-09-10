// Dashboard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ userRole }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const isAlumni = userRole === 'alumni';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {isAlumni ? 'Alumni Dashboard' : 'Student Dashboard'}
          </h1>
          <button 
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-600">
            Welcome to your {isAlumni ? 'Alumni' : 'Student'} Dashboard! Here you can:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isAlumni ? (
            <>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Mentorship</h3>
                <p className="text-blue-600">Connect with students and offer mentorship opportunities</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Job Postings</h3>
                <p className="text-green-600">Post job opportunities for students and fellow alumni</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">Events</h3>
                <p className="text-purple-600">Find and register for alumni events and reunions</p>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">Networking</h3>
                <p className="text-yellow-600">Connect with other alumni in your industry</p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Find Mentors</h3>
                <p className="text-blue-600">Connect with alumni mentors in your field of interest</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-green-800 mb-2">Job Opportunities</h3>
                <p className="text-green-600">Browse internships and job postings from alumni</p>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold text-purple-800 mb-2">Events</h3>
                <p className="text-purple-600">Discover networking events and workshops</p>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">Resources</h3>
                <p className="text-yellow-600">Access career resources and educational materials</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;