'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuthToken } from '@/lib/authToken';

export default function TestAuth() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Try to get token from localStorage if available
  useEffect(() => {
    const storedToken = getAuthToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const setAuthCookie = () => {
    if (!token) {
      setMessage('Please enter a token');
      return;
    }

    // Store in localStorage
    localStorage.setItem('token', token);
    
    // Set cookie without domain for localhost testing
    document.cookie = [
      `token=${token}`,
      `Path=/`,
      `Max-Age=${60 * 60 * 24}`, // 24 hours
      `SameSite=Lax`
    ].join('; ');
    
    setMessage('Authentication cookie set successfully! 🎉');
    
    // Refresh the page after a short delay to apply changes
    setTimeout(() => {
      router.refresh();
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Authentication Test Utility</h1>
      
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Authentication Token:</label>
        <input 
          type="text" 
          value={token} 
          onChange={(e) => setToken(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="Paste your auth token here"
        />
      </div>
      
      <button 
        onClick={setAuthCookie}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Set Authentication Cookie
      </button>
      
      {message && (
        <div className={`mt-4 p-3 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Obtain a valid authentication token (from localStorage after logging in or from network tab)</li>
          <li>Paste the token in the field above</li>
          <li>Click "Set Authentication Cookie" to create the auth cookie for testing</li>
          <li>Navigate to the knowledge page you want to test</li>
        </ol>
      </div>
    </div>
  );
}
