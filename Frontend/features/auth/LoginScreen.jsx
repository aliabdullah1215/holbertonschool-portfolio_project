import React, { useState } from 'react';
import axios from 'axios';


const LoginScreen = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {

      const response = await axios.post(
        'http://127.0.0.1:8000/api/users/login/',
        credentials
      );

      if (response.status === 200) {

        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);

        alert('Login successful!');
      }

    } catch (err) {

      console.log('Login error:', err.response?.data || err.message);


      setError(
        err.response?.data?.detail ||
        'Invalid username or password. Please check your credentials.'
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
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          
          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Password"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
