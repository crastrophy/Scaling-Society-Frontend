import React, { useState } from 'react';
import { useAuth } from '../../auth/useAuth';
import { Navigate } from 'react-router-dom';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isApproved, loading } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  if (isApproved) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#21222D]">
      <div className="p-8 bg-[#2A2A32] rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-3xl font-bold text-center text-white mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full p-3 bg-[#1E1E24] rounded-lg text-white border border-[#3A3A45] focus:border-[#2F80ED] focus:outline-none"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-300 block mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-3 bg-[#1E1E24] rounded-lg text-white border border-[#3A3A45] focus:border-[#2F80ED] focus:outline-none"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-6 bg-[#2F80ED] rounded-lg text-white font-bold hover:bg-[#2F80ED]/90 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 