'use client'

import { useState } from 'react';

interface AdminAuthProps {
    onAuthSuccess: () => void;
}

const AdminAuth = ({ onAuthSuccess }: AdminAuthProps) => {
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simple password check (temporary hardcoded password)
        if (password === 'admin123') {
            // Store auth state in session storage
            sessionStorage.setItem('adminAuth', 'true');
            onAuthSuccess();
        } else {
            setError('Invalid password');
            setPassword('');
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Admin Access
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Enter password to access admin dashboard
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primaryBlue focus:border-primaryBlue focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
    
              {error && (
                <div className="text-red-600 text-sm text-center">{error}</div>
              )}
    
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primaryBlue hover:bg-lightBlue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryBlue disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {isLoading ? 'Authenticating...' : 'Access Admin'}
                </button>
              </div>
            </form>
          </div>
        </div>
      );
};
    
export default AdminAuth;