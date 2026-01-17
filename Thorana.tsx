import React, { useState, useEffect } from 'react';
import { Music, Radio, Volume2, Sparkles, Zap, Heart, Star } from 'lucide-react';

interface ThoranaProps {
  isPlaying: boolean;
  stationName: string;
  stationLogo?: string;
  isDarkMode: boolean;
}

export default function Thorana({ isPlaying, stationName, stationLogo, isDarkMode }: ThoranaProps) {
  const [visualizerBars, setVisualizerBars] = useState<number[]>(Array(20).fill(0));
  const [pulseScale, setPulseScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      setVisualizerBars(Array(20).fill(0));
      setPulseScale(1);
      return;
    }

    const interval = setInterval(() => {
      setVisualizerBars(prev => 
        prev.map(() => Math.random() * 100)
      );
      setPulseScale(1 + Math.sin(Date.now() / 200) * 0.1);
      setRotation(prev => prev + 2);
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!isPlaying) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-20 pointer-events-none">
      {/* Main Visualizer Container */}
      <div className="relative h-32 overflow-hidden">
        {/* Gradient Background */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: isDarkMode
              ? 'linear-gradient(90deg, transparent, #8b5cf6, #ec4899, #3b82f6, transparent)'
              : 'linear-gradient(90deg, transparent, #6366f1, #a855f7, #06b6d4, transparent)',
            animation: 'gradient-shift 3s ease-in-out infinite'
          }}
        />

        {/* Large Central Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div 
            className="w-24 h-24 rounded-full relative"
            style={{
              background: isDarkMode
                ? 'radial-gradient(circle at center, #8b5cf6, #ec4899, #3b82f6)'
                : 'radial-gradient(circle at center, #6366f1, #a855f7, #06b6d4)',
              transform: `scale(${pulseScale}) rotate(${rotation}deg)`,
              transition: 'transform 0.1s ease-out',
              boxShadow: `0 0 ${60 + pulseScale * 20}px ${isDarkMode ? '#8b5cf6' : '#6366f1'}80`,
              filter: 'blur(2px)'
            }}
          >
            {/* Inner Core */}
            <div className="absolute inset-2 rounded-full bg-white/20 animate-pulse" />
            <div className="absolute inset-4 rounded-full bg-white/40 animate-ping" />
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Radio className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          {/* Orbiting Elements */}
          {[0, 120, 240].map((angle, index) => (
            <div
              key={index}
              className="absolute w-6 h-6 rounded-full"
              style={{
                background: ['#8b5cf6', '#ec4899', '#3b82f6'][index],
                transform: `rotate(${angle + rotation}deg) translateX(60px)`,
                transformOrigin: 'center',
                boxShadow: `0 0 20px ${['#8b5cf6', '#ec4899', '#3b82f6'][index]}80`
              }}
            >
              {index === 0 && <Music className="w-4 h-4 text-white m-1" />}
              {index === 1 && <Heart className="w-4 h-4 text-white m-1" />}
              {index === 2 && <Star className="w-4 h-4 text-white m-1" />}
            </div>
          ))}
        </div>

        {/* Audio Visualizer Bars */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 h-20">
          {visualizerBars.map((height, index) => (
            <div
              key={index}
              className="w-2 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-full transition-all duration-100"
              style={{
                height: `${height}%`,
                opacity: 0.8,
                boxShadow: `0 0 10px ${height > 50 ? '#ec4899' : '#8b5cf6'}80`,
                transform: `scaleY(${height / 100})`
              }}
            />
          ))}
        </div>

        {/* Floating Particles */}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-pulse"
            style={{
              background: ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'][i % 5],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-up ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: `0 0 10px ${['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b'][i % 5]}80`
            }}
          />
        ))}

        {/* Station Name Display */}
        {stationName && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className={`px-4 py-2 rounded-full ${isDarkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-md border ${isDarkMode ? 'border-white/20' : 'border-black/20'}`}>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'} flex items-center gap-2`}>
                <Radio className="w-4 h-4 animate-pulse" />
                {stationName}
                <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '2s' }} />
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }

        @keyframes float-up {
          0% {
            transform: translateY(100px) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}