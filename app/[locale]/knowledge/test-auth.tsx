'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken, setAccessToken } from '../../lib/auth/auth';

export default function TestAuth() {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Try to get token from the auth utility if available
  useEffect(() => {
    const storedToken = getAccessToken();
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const setAuthCookie = () => {
    if (!token) {
      setMessage('Please enter a token');
      return;
    }

    // Use the centralized auth utility to set the token
    setAccessToken(token);
    
    setMessage('Authentication token set successfully! 🎉');
    
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
        Set Authentication Token
      </button>
      
      {message && (
        <div className={`mt-4 p-3 rounded-md ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}
      
      <div className="mt-8 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Obtain a valid authentication token (from cookies/localStorage after logging in or from network tab)</li>
          <li>Paste the token in the field above</li>
          <li>Click "Set Authentication Token" to store the auth token for testing</li>
          <li>Navigate to the knowledge page you want to test</li>
        </ol>
      </div>
    </div>
  );
}
