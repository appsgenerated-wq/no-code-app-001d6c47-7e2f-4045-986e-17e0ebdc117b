import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import config from './constants';
import './index.css';
import { testBackendConnection } from './services/apiService.js';

function App() {
  const [user, setUser] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [tomatoes, setTomatoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize Manifest SDK with App ID
  const manifest = new Manifest(config.APP_ID);

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const currentUser = await manifest.from('users').me();
        setUser(currentUser);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserSession();
  }, [])

  useEffect(() => {
    // Test backend connection on app start
    const testConnection = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);
      
      if (result.success) {
        console.log('✅ [APP] Backend connection successful - proceeding with app initialization');
      } else {
        console.error('❌ [APP] Backend connection failed - app may not work properly');
        console.error('❌ [APP] Connection error:', result.error);
      }
    };
    
    testConnection();
  }, []);;

  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      await manifest.login('users', email, password);
      const currentUser = await manifest.from('users').me();
      setUser(currentUser);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setTomatoes([]);
  };

  const loadTomatoes = async () => {
    if (!user) return;
    try {
      const response = await manifest.from('tomatos').find({
        sort: { createdAt: 'desc' },
        filter: { owner: user.id } // Only fetch tomatoes for the current user
      });
      setTomatoes(response.data);
    } catch (err) {
      console.error('Failed to load tomatoes:', err);
      setError('Could not load your tomatoes. Please try again.');
    }
  };

  const createTomato = async (tomatoData) => {
    try {
      const newTomato = await manifest.from('tomatos').create(tomatoData);
      setTomatoes([newTomato, ...tomatoes]);
    } catch (err) {
      console.error('Failed to create tomato:', err);
      setError('Failed to create tomato.');
    }
  };

  const updateTomato = async (id, tomatoData) => {
    try {
      const updatedTomato = await manifest.from('tomatos').update(id, tomatoData);
      setTomatoes(tomatoes.map(t => t.id === id ? updatedTomato : t));
    } catch (err) {
      console.error('Failed to update tomato:', err);
       setError('Failed to update tomato.');
    }
  };

  const deleteTomato = async (id) => {
    try {
      await manifest.from('tomatos').delete(id);
      setTomatoes(tomatoes.filter(t => t.id !== id));
    } catch (err) {
      console.error('Failed to delete tomato:', err);
      setError('Failed to delete tomato.');
    }
  };

  if (isLoading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Backend Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${backendConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {backendConnected ? '✅ Backend Connected' : '❌ Backend Disconnected'}
        </div>
      </div>
      
        <p className="text-gray-600">Loading application...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
        {error && 
          <div className="bg-red-500 text-white text-center p-2 fixed top-0 w-full z-50">
            {error}
            <button onClick={() => setError(null)} className="ml-4 font-bold">X</button>
          </div>
        }
        {user ? (
          <DashboardPage
            user={user}
            tomatoes={tomatoes}
            onLogout={handleLogout}
            loadTomatoes={loadTomatoes}
            createTomato={createTomato}
            updateTomato={updateTomato}
            deleteTomato={deleteTomato}
          />
        ) : (
          <LandingPage onLogin={handleLogin} isLoading={isLoading} />
        )}
    </div>
  );
}

export default App;
