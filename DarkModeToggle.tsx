import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export default function DarkModeToggle({ isDarkMode, onToggle }: DarkModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-16 h-8 rounded-full transition-all duration-500 shadow-lg hover:shadow-xl transform hover:scale-105 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 border-2 border-purple-400/30' 
          : 'bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 border-2 border-blue-300/50'
      }`}
    >
      {/* Toggle Circle */}
      <div
        className={`absolute top-1 w-6 h-6 rounded-full transition-all duration-500 flex items-center justify-center shadow-md ${
          isDarkMode 
            ? 'left-8 bg-gradient-to-br from-yellow-200 to-orange-300 border-2 border-yellow-400' 
            : 'left-1 bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-slate-600'
        }`}
      >
        {isDarkMode ? (
          <Sun className="w-4 h-4 text-orange-600 animate-spin" style={{ animationDuration: '8s' }} />
        ) : (
          <Moon className="w-4 h-4 text-slate-200" />
        )}
      </div>

      {/* Glow Effects */}
      {isDarkMode && (
        <>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 blur-md animate-pulse" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        </>
      )}

      {!isDarkMode && (
        <>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-300 to-cyan-300 opacity-30 blur-md animate-pulse" />
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 opacity-20 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        </>
      )}

      {/* Light Rays */}
      {isDarkMode && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent transform -translate-x-1/2 -translate-y-1/2 animate-spin" style={{ animationDuration: '10s' }} />
          <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-orange-300/30 to-transparent transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-spin" style={{ animationDuration: '15s' }} />
          <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-pink-300/30 to-transparent transform -translate-x-1/2 -translate-y-1/2 -rotate-45 animate-spin" style={{ animationDuration: '12s' }} />
        </div>
      )}

      {/* Sparkles for Light Mode */}
      {!isDarkMode && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '2.5s' }} />
          <div className="absolute bottom-1 left-2 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        </div>
      )}
    </button>
  );
}