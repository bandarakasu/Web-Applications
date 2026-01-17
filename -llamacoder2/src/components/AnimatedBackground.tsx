import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Star, Zap, Heart, Music, Radio, Circle, Globe, Waves } from 'lucide-react';

interface AnimatedBackgroundProps {
  isDarkMode: boolean;
}

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  type: 'star' | 'sparkle' | 'heart';
}

interface Wave {
  id: number;
  amplitude: number;
  frequency: number;
  speed: number;
  color: string;
}

export default function AnimatedBackground({ isDarkMode }: AnimatedBackgroundProps) {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [waves, setWaves] = useState<Wave[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize orbs
  useEffect(() => {
    const colors = isDarkMode 
      ? ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      : ['#6366f1', '#a855f7', '#06b6d4', '#22c55e', '#f97316', '#dc2626'];

    const newOrbs: Orb[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100, // Large orbs: 100-300px
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.3 + 0.1,
      pulseSpeed: Math.random() * 3 + 1
    }));

    setOrbs(newOrbs);

    // Initialize particles
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      type: ['star', 'sparkle', 'heart'][Math.floor(Math.random() * 3)] as 'star' | 'sparkle' | 'heart'
    }));

    setParticles(newParticles);

    // Initialize waves
    const newWaves: Wave[] = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      amplitude: Math.random() * 50 + 20,
      frequency: Math.random() * 0.02 + 0.01,
      speed: Math.random() * 2 + 1,
      color: colors[i % colors.length]
    }));

    setWaves(newWaves);
  }, [isDarkMode]);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate orbs
  useEffect(() => {
    const animate = () => {
      setOrbs(prevOrbs => 
        prevOrbs.map(orb => {
          let newX = orb.x + orb.speedX;
          let newY = orb.y + orb.speedY;
          let newSpeedX = orb.speedX;
          let newSpeedY = orb.speedY;

          // Bounce off walls
          if (newX <= 0 || newX >= 100) {
            newSpeedX = -newSpeedX;
            newX = newX <= 0 ? 0 : 100;
          }
          if (newY <= 0 || newY >= 100) {
            newSpeedY = -newSpeedY;
            newY = newY <= 0 ? 0 : 100;
          }

          // Mouse interaction
          const dx = mousePosition.x - newX;
          const dy = mousePosition.y - newY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 20) {
            const force = (20 - distance) / 20;
            newSpeedX += (dx / distance) * force * 0.1;
            newSpeedY += (dy / distance) * force * 0.1;
          }

          // Speed limit
          newSpeedX = Math.max(-1, Math.min(1, newSpeedX));
          newSpeedY = Math.max(-1, Math.min(1, newSpeedY));

          return {
            ...orb,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY
          };
        })
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 overflow-hidden"
      style={{
        background: isDarkMode 
          ? 'radial-gradient(ellipse at center, #1e293b 0%, #0f172a 50%, #020617 100%)'
          : 'radial-gradient(ellipse at center, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%)'
      }}
    >
      {/* Animated Waves */}
      {waves.map(wave => (
        <div
          key={wave.id}
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(45deg, ${wave.color}20, transparent)`,
            animation: `wave ${wave.speed * 10}s ease-in-out infinite`,
            transform: `translateY(${Math.sin(Date.now() * wave.frequency) * wave.amplitude}px)`
          }}
        />
      ))}

      {/* Large Moving Orbs */}
      {orbs.map(orb => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            background: `radial-gradient(circle at center, ${orb.color}40, ${orb.color}20, transparent)`,
            opacity: orb.opacity,
            transform: `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() / 1000 * orb.pulseSpeed) * 0.2})`,
            animation: `float ${orb.speed * 20}s ease-in-out infinite`,
            boxShadow: `0 0 ${orb.size}px ${orb.color}30`
          }}
        />
      ))}

      {/* Medium Orbs */}
      {orbs.slice(0, 4).map((orb, index) => (
        <div
          key={`medium-${orb.id}`}
          className="absolute rounded-full blur-2xl transition-all duration-700 ease-out"
          style={{
            left: `${(orb.x + index * 25) % 100}%`,
            top: `${(orb.y + index * 20) % 100}%`,
            width: `${orb.size * 0.6}px`,
            height: `${orb.size * 0.6}px`,
            background: `radial-gradient(circle at center, ${orb.color}60, ${orb.color}30, transparent)`,
            opacity: orb.opacity * 1.5,
            transform: `translate(-50%, -50%) scale(${1 + Math.sin(Date.now() / 800 + index) * 0.3})`,
            animation: `float-reverse ${orb.speed * 15}s ease-in-out infinite`,
            animationDelay: `${index * 0.5}s`
          }}
        />
      ))}

      {/* Small Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `twinkle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {particle.type === 'star' && (
            <Star 
              className="text-yellow-400" 
              style={{ 
                width: `${particle.size * 4}px`, 
                height: `${particle.size * 4}px`,
                filter: 'drop-shadow(0 0 10px rgba(250, 204, 21, 0.8))'
              }} 
            />
          )}
          {particle.type === 'sparkle' && (
            <Sparkles 
              className="text-blue-400" 
              style={{ 
                width: `${particle.size * 3}px`, 
                height: `${particle.size * 3}px`,
                filter: 'drop-shadow(0 0 8px rgba(96, 165, 250, 0.8))'
              }} 
            />
          )}
          {particle.type === 'heart' && (
            <Heart 
              className="text-pink-400" 
              style={{ 
                width: `${particle.size * 3}px`, 
                height: `${particle.size * 3}px`,
                filter: 'drop-shadow(0 0 8px rgba(244, 114, 182, 0.8))'
              }} 
            />
          )}
        </div>
      ))}

      {/* Interactive Mouse Follower */}
      <div
        className="absolute rounded-full pointer-events-none mix-blend-screen"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          width: '300px',
          height: '300px',
          background: isDarkMode 
            ? 'radial-gradient(circle at center, rgba(139, 92, 246, 0.3), transparent)'
            : 'radial-gradient(circle at center, rgba(99, 102, 241, 0.2), transparent)',
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease-out',
          filter: 'blur(40px)'
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none" />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -50%) translateY(-30px) rotate(90deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(0px) rotate(180deg);
          }
          75% {
            transform: translate(-50%, -50%) translateY(30px) rotate(270deg);
          }
        }

        @keyframes float-reverse {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px) rotate(360deg);
          }
          25% {
            transform: translate(-50%, -50%) translateY(30px) rotate(270deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(0px) rotate(180deg);
          }
          75% {
            transform: translate(-50%, -50%) translateY(-30px) rotate(90deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2) rotate(180deg);
          }
        }

        @keyframes wave {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
          }
          50% {
            transform: translateY(0px) translateX(-10px) scale(1);
          }
          75% {
            transform: translateY(20px) translateX(5px) scale(0.9);
          }
        }
      `}</style>
    </div>
  );
}