import React, { useState } from 'react';
import axios from 'axios';


const RegisterScreen = () => {

  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'client', 
  });


  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      
      const response = await axios.post('http://localhost:8000/api/users/register/', formData);
      
      if (response.status === 201 || response.status === 200) {
        alert('Registration successful! You can now log in.');
      
      }
    } catch (err) {
     
      setError(
        err.response?.data?.message || 
        'An error occurred during registration. Please ensure the backend is running.'
      );
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Data Diet</h2>
          <p className="mt-2 text-sm text-gray-600">Create a new account</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Error Message Display */}
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            {/* Role Selection Toggle - Critical for User Routing */}
            <div className="flex gap-4 p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'client'})}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  formData.role === 'client' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                }`}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, role: 'doctor'})}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  formData.role === 'doctor' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500'
                }`}
              >
                Doctor
              </button>
            </div>

            {/* Credential Inputs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                name="username"
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter your username"
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter your email"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Enter your password"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Form Action Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${
              loading ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-600 hover:bg-indigo-700'
            } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {loading ? 'Processing...' : 'Register Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
