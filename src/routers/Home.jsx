import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center"
    >
      <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-3xl shadow-xl p-10 w-full max-w-md text-center text-white">
        <h1 className="text-4xl font-bold mb-6">🏠 Welcome</h1>
        <p className="mb-8 text-lg">Choose a module to manage</p>

        <div className="space-y-4">
          <Link
            to="/customer"
            className="block w-full bg-white/80 hover:bg-white text-blue-700 font-semibold py-3 rounded-xl shadow-md transition-all"
          >
            👥 Customer Section
          </Link>
          <Link
            to="/employee"
            className="block w-full bg-white/80 hover:bg-white text-purple-700 font-semibold py-3 rounded-xl shadow-md transition-all"
          >
            👨‍💼 Employee Section
          </Link>
        </div>
      </div>
    </div>
  );
}
