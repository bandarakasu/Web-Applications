import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, ArrowLeft, CreditCard, FileText, Clipboard, Package, Calculator, Radio, Volume2, Settings, Code, Moon, Sun, Sparkles, Zap, Shield, Globe, Wifi, WifiOff, Loader2, Music, Star, Heart, Palette } from 'lucide-react';
import Thorana from './components/Thorana';
import AnimatedBackground from './components/AnimatedBackground';
import DarkModeToggle from './components/DarkModeToggle';

interface Station {
  name: string;
  streamUrl: string;
  logoUrl: string;
}

interface App {
  title: string;
  subtitle: string;
  url?: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  isRadio?: boolean;
  badge?: string;
}

const stations: Station[] = [
  {
    name: "සියත FM",
    streamUrl: "https://srv01.onlineradio.voaplus.com/siyathafm",
    logoUrl: "https://i.ibb.co/pW8BqB8/hiru-fm-logo-placeholder.png"
  },
  {
    name: "ලක්හඬ",
    streamUrl: "https://cp12.serverse.com/proxy/itnfm?mp=/stream",
    logoUrl: "https://i.ibb.co/S0P79vY/lakhanda-logo-placeholder.png"
  },
  {
    name: "සිරස FM",
    streamUrl: "https://mbc.thestreamtech.com:8087/index.html",
    logoUrl: "https://i.ibb.co/YBNYjPq/sirasa-fm-logo-placeholder.png"
  },
  {
    name: "සිත FM",
    streamUrl: "https://shaincast.caster.fm:48148/listen.mp3",
    logoUrl: "https://i.ibb.co/mRKnZ89/shaa-fm-logo-placeholder.png"
  },
  {
    name: "නෙත් FM",
    streamUrl: "https://cp11.serverse.com/proxy/nethfm/stream",
    logoUrl: "https://i.ibb.co/5xN1X2N/neth-fm-logo-placeholder.png"
  },
  {
    name: "FM දෙරණ",
    streamUrl: "https://cp12.serverse.com/proxy/fmderana/stream",
    logoUrl: "https://i.ibb.co/QMMQGCh/derana-fm-logo-placeholder.png"
  },
  {
    name: "Tamil FM",
    streamUrl: "http://shaincast.caster.fm:47814/listen.mp3",
    logoUrl: "https://i.ibb.co/WvB7pS4/rhythm-fm-logo-placeholder.png"
  },
  {
    name: "Shree FM",
    streamUrl: "http://207.148.74.192:7860/stream2.mp3",
    logoUrl: "https://i.ibb.co/hRjCq2K/slbc-logo-placeholder.png"
  },
  {
    name: "Ran FM",
    streamUrl: "http://207.148.74.192:7860/ran.mp3",
    logoUrl: "https://i.ibb.co/hRjCq2K/slbc-logo-placeholder.png"
  },
  {
    name: "SLBC",
    streamUrl: "http://220.247.227.6:8000/Snsstream",
    logoUrl: "https://i.ibb.co/hRjCq2K/slbc-logo-placeholder.png"
  },
  {
    name: "City FM",
    streamUrl: "http://220.247.227.20:8000/citystream",
    logoUrl: "https://i.ibb.co/hRjCq2K/slbc-logo-placeholder.png"
  },
  {
    name: "Y FM",
    streamUrl: "https://mbc.thestreamtech.com:7032/index.html",
    logoUrl: "https://i.ibb.co/WvB7pS4/rhythm-fm-logo-placeholder.png"
  },
  {
    name: "Vasantham FM",
    streamUrl: "https://cp12.serverse.com/proxy/vasanthamfm?mp=/stream",
    logoUrl: "https://i.ibb.co/WvB7pS4/rhythm-fm-logo-placeholder.png"
  },
  {
    name: "Shakthi FM",
    streamUrl: "https://mbc.thestreamtech.com:8086/index.html",
    logoUrl: "https://i.ibb.co/WvB7pS4/rhythm-fm-logo-placeholder.png"
  },
  {
    name: "TNL Now",
    streamUrl: "http://live.tnlrn.com:8010/live.mp3",
    logoUrl: "https://i.ibb.co/WvB7pS4/rhythm-fm-logo-placeholder.png"
  },
  {
    name: "Red FM",
    streamUrl: "http://shaincast.caster.fm:47830/listen.mp3",
    logoUrl: "https://i.ibb.co/WvB7pS4/rhythm-fm-logo-placeholder.png"
  },
  {
    name: "Yes FM",
    streamUrl: "https://mbc.thestreamtech.com:7056/index.html",
    logoUrl: "https://i.ibb.co/WvB7pS4/rhythm-fm-logo-placeholder.png"
  },
  {
    name: "E FM",
    streamUrl: "http://207.148.74.192:7860/stream.mp3",
    logoUrl: "https://i.ibb.co/WvB7pS4/rhythm-fm-logo-placeholder.png"
  }
];

const apps: App[] = [
  {
    title: "Cheque Deposit",
    subtitle: "බැංකු චෙක්පත් තැන්පතු පද්ධතිය",
    url: "https://cheque-deposit.netlify.app",
    icon: <CreditCard className="w-6 h-6" />,
    bgColor: "bg-blue-500/20",
    iconColor: "text-blue-400",
    badge: "BANKING"
  },
  {
    title: "Insurance Letter",
    subtitle: "රක්ෂණ ලිපි කළමනාකරණය",
    url: "https://duplicat-insurance-letter.netlify.app",
    icon: <FileText className="w-6 h-6" />,
    bgColor: "bg-purple-500/20",
    iconColor: "text-purple-400",
    badge: "INSURANCE"
  },
  {
    title: "PD Cheque 02",
    subtitle: "දෙවන චෙක්පත් පද්ධතිය",
    url: "https://magenta-paprenjak-c068ee.netlify.app",
    icon: <Clipboard className="w-6 h-6" />,
    bgColor: "bg-indigo-500/20",
    iconColor: "text-indigo-400",
    badge: "FINANCE"
  },
  {
    title: "Stock Management",
    subtitle: "Office Stock Control",
    url: "https://office-stationary-updet.netlifyapp/",
    icon: <Package className="w-6 h-6" />,
    bgColor: "bg-orange-500/20",
    iconColor: "text-orange-400",
    badge: "INVENTORY"
  },
  {
    title: "healthtrack",
    subtitle: "මගේ වෛද්‍ය වාර්තා",
    url: "https://healthtrack-medical.netlify.app/",
    icon: <FileText className="w-6 h-6" />,
    bgColor: "bg-green-500/20",
    iconColor: "text-green-400",
    badge: "HEALTH"
  },
  {
    title: "lanka-shop",
    subtitle: "Shop Web",
    url: "https://lanka-shop.netlify.app/",
    icon: <Globe className="w-6 h-6" />,
    bgColor: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    badge: "ECOMMERCE"
  },
  {
    title: "Salary Calculator",
    subtitle: "වැටුප් ගණනය කිරීම්",
    url: "https://udaya-salry-cal.netlify.app",
    icon: <Calculator className="w-6 h-6" />,
    bgColor: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    badge: "TOOLS"
  },
  {
    title: "Online Radio",
    subtitle: "ශ්‍රී ලංකා නාලිකා",
    icon: <Radio className="w-6 h-6" />,
    bgColor: "bg-red-500/20",
    iconColor: "text-red-400",
    isRadio: true,
    badge: "LIVE"
  }
];

export default function App() {
  const [showRadio, setShowRadio] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [selectedStation, setSelectedStation] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(100);
  const [isDragging, setIsDragging] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'error'>('idle');
  const [currentTime, setCurrentTime] = useState(new Date());
  const audioRef = useRef<HTMLAudioElement>(null);
  const knobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (clickCount >= 5) {
        setShowSecret(true);
        setClickCount(0);
        generateParticles();
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [clickCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const generateParticles = () => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  const handleAppClick = (app: App) => {
    if (app.isRadio) {
      setShowRadio(true);
    } else if (app.url) {
      window.open(app.url, '_blank');
    }
  };

  const handleStationChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const stationIndex = parseInt(e.target.value);
    if (!isNaN(stationIndex)) {
      setSelectedStation(stationIndex);
      const station = stations[stationIndex];
      
      setIsLoading(true);
      setConnectionStatus('connecting');
      
      try {
        if (audioRef.current) {
          audioRef.current.src = station.streamUrl;
          audioRef.current.crossOrigin = "anonymous";
          
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.then(() => {
              setIsPlaying(true);
              setConnectionStatus('connected');
              setIsLoading(false);
            }).catch((error) => {
              console.error('Playback failed:', error);
              setConnectionStatus('error');
              setIsLoading(false);
              setIsPlaying(false);
            });
          }
        }
      } catch (error) {
        console.error('Error loading station:', error);
        setConnectionStatus('error');
        setIsLoading(false);
        setIsPlaying(false);
      }
    }
  };

  const togglePlayPause = async () => {
    if (!audioRef.current || selectedStation === null) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setConnectionStatus('connecting');
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            setIsPlaying(true);
            setConnectionStatus('connected');
            setIsLoading(false);
          }).catch((error) => {
            console.error('Playback failed:', error);
            setConnectionStatus('error');
            setIsLoading(false);
          });
        }
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
      setConnectionStatus('error');
      setIsLoading(false);
    }
  };

  const handleVolumeControl = (e: React.MouseEvent | React.TouchEvent) => {
    if (!knobRef.current) return;
    
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const angle = Math.atan2(clientY - centerY, clientX - centerX);
    const degrees = (angle * 180) / Math.PI + 90;
    const normalizedDegrees = degrees < 0 ? degrees + 360 : degrees;
    
    const newVolume = Math.min(100, Math.max(0, (normalizedDegrees / 360) * 100));
    setVolume(Math.round(newVolume));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleVolumeControl(e);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleVolumeControl(e);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'} ${isDarkMode ? 'text-slate-200' : 'text-slate-800'} p-4 md:p-8 relative overflow-hidden transition-all duration-700`}>
      {/* Enhanced Animated Background */}
      <AnimatedBackground isDarkMode={isDarkMode} />

      {/* Thorana - Enhanced when radio is playing */}
      <Thorana 
        isPlaying={isPlaying && connectionStatus === 'connected'} 
        stationName={selectedStation !== null ? stations[selectedStation].name : ''} 
        stationLogo={selectedStation !== null ? stations[selectedStation].logoUrl : undefined}
        isDarkMode={isDarkMode}
      />

      {/* Secret Developer Panel */}
      {showSecret && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
          <div className={`glass-card rounded-3xl p-8 max-w-md w-full mx-4 border-2 ${isDarkMode ? 'border-purple-500/30 shadow-purple-500/20' : 'border-blue-500/30 shadow-blue-500/20'} shadow-2xl`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'} flex items-center gap-2`}>
                <Code className="w-6 h-6 text-purple-400" />
                Developer Panel
              </h2>
              <button
                onClick={() => setShowSecret(false)}
                className={`${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className={`flex items-center justify-between p-3 ${isDarkMode ? 'bg-white/5' : 'bg-slate-800/5'} rounded-xl border ${isDarkMode ? 'border-white/10' : 'border-slate-300/20'}`}>
                <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>Dark Mode</span>
                <DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
              </div>
              
              <div className={`p-3 ${isDarkMode ? 'bg-white/5' : 'bg-slate-800/5'} rounded-xl border ${isDarkMode ? 'border-white/10' : 'border-slate-300/20'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className={`${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>System Status</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>API Status:</span>
                    <span className="text-green-400 flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      Online
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Version:</span>
                    <span className="text-purple-400">v2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Uptime:</span>
                    <span className="text-blue-400">99.9%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl hover:from-blue-500/30 hover:to-blue-600/30 transition-all border border-blue-500/20">
                  <Zap className="w-5 h-5 text-blue-400 mx-auto" />
                </button>
                <button className="p-3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl hover:from-green-500/30 hover:to-green-600/30 transition-all border border-green-500/20">
                  <Shield className="w-5 h-5 text-green-400 mx-auto" />
                </button>
                <button className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl hover:from-purple-500/30 hover:to-purple-600/30 transition-all border border-purple-500/20">
                  <Settings className="w-5 h-5 text-purple-400 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Section */}
      {!showRadio && (
        <main className="relative z-10 w-full max-w-6xl mx-auto py-8 animate-fade-in">
          <header className="text-center mb-12">
            {/* Dark Mode Toggle Button */}
            <div className="absolute top-8 right-8 z-20">
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {isDarkMode ? 'අඳුරු' : 'දීප්ත'}
                </span>
                <DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className={`w-24 h-24 ${isDarkMode ? 'bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500' : 'bg-gradient-to-br from-blue-400 via-cyan-400 to-indigo-500'} rounded-3xl flex items-center justify-center shadow-2xl animate-pulse border-2 ${isDarkMode ? 'border-white/20' : 'border-white/40'}`}>
                  <Sparkles className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '4s' }} />
                </div>
                <div className={`absolute -top-2 -right-2 w-8 h-8 ${isDarkMode ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-green-500 to-emerald-600'} rounded-full border-2 ${isDarkMode ? 'border-slate-900' : 'border-white'} animate-pulse shadow-lg shadow-green-400/50`} />
                <div className={`absolute -bottom-2 -left-2 w-6 h-6 ${isDarkMode ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gradient-to-br from-yellow-500 to-orange-600'} rounded-full border-2 ${isDarkMode ? 'border-slate-900' : 'border-white'} animate-bounce shadow-lg shadow-yellow-400/50`} />
              </div>
            </div>
            <h1 className={`text-5xl md:text-8xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode 
                ? 'from-white via-purple-300 to-pink-300' 
                : 'from-slate-900 via-blue-700 to-purple-700'
            } animate-glow`}>
              Web Applications
            </h1>
            <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-700'} mb-2`}>ඔබට අවශ්‍ය සේවාව තෝරාගන්න</p>
            <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-600'} flex items-center justify-center gap-2`}>
              <Palette className="w-4 h-4" />
              {isDarkMode ? 'අඳුරු පසුබිම සක්‍රීයයි' : 'දීප්ත පසුබිම සක්‍රීයයි'}
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {apps.map((app, index) => (
              <button
                key={index}
                onClick={() => handleAppClick(app)}
                className={`glass-card p-6 md:p-8 rounded-3xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:bg-white/10 active:scale-95 relative overflow-hidden group ${
                  app.isRadio ? 'border-red-500/30 animate-pulse' : ''
                } ${isDarkMode ? '' : 'bg-white/80 border-slate-200/50'}`}
              >
                {app.badge && (
                  <div className={`absolute top-3 right-3 px-2 py-1 ${isDarkMode ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-600'} text-xs font-bold rounded-full`}>
                    {app.badge}
                  </div>
                )}
                <div className={`w-12 h-12 ${app.bgColor} rounded-2xl flex items-center justify-center mb-5 mx-auto group-hover:scale-110 transition-transform ${isDarkMode ? '' : 'bg-opacity-60'}`}>
                  <div className={app.iconColor}>{app.icon}</div>
                </div>
                <h3 className={`text-lg font-bold text-center ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{app.title}</h3>
                <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>{app.subtitle}</p>
              </button>
            ))}
          </div>

          <footer className="mt-20 text-center">
            <button
              onClick={() => setClickCount(clickCount + 1)}
              className={`text-sm transition-colors ${isDarkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-600 hover:text-slate-800'}`}
            >
              © 2026 Sampath Udaya Bandara. All rights reserved.
            </button>
            <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-600' : 'text-slate-500'}`}>
              Click copyright 5 times for secret panel
            </p>
          </footer>
        </main>
      )}

      {/* Radio Section - Enhanced with Dark Mode Support */}
      {showRadio && (
        <section className="relative z-30 w-full max-w-xl mx-auto py-8 animate-fade-in">
          <div className={`glass-card rounded-[2.5rem] p-8 ${isDarkMode ? '' : 'bg-white/90 border-slate-200/50'}`}>
            {/* Dark Mode Toggle for Radio */}
            <div className="absolute top-6 right-6">
              <DarkModeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode(!isDarkMode)} />
            </div>

            <button
              onClick={() => {
                setShowRadio(false);
                if (audioRef.current) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                  setConnectionStatus('idle');
                }
              }}
              className={`mb-8 flex items-center ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'} transition-colors`}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              ආපසු
            </button>

            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${
                  connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
                  connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' : 
                  connectionStatus === 'error' ? 'bg-red-500' : 'bg-gray-500'
                }`} />
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {selectedStation !== null ? stations[selectedStation].name : "නාලිකාවක් තෝරන්න"}
                </h2>
              </div>
              
              {/* Station Logo Display */}
              {selectedStation !== null && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={stations[selectedStation].logoUrl} 
                    alt={stations[selectedStation].name}
                    className="w-16 h-16 object-contain rounded-lg bg-white/10 p-2"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <p className="text-purple-400 text-xs font-bold tracking-widest uppercase mb-2">
                {connectionStatus === 'connecting' ? 'CONNECTING...' :
                 connectionStatus === 'connected' ? 'NOW PLAYING' :
                 connectionStatus === 'error' ? 'CONNECTION ERROR' :
                 'READY TO PLAY'}
              </p>
              <p className={`${isDarkMode ? 'text-slate-500' : 'text-slate-600'} text-sm`}>
                {currentTime.toLocaleTimeString('si-LK', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
            </div>

            <div className="space-y-6">
              <select
                onChange={handleStationChange}
                className={`w-full ${isDarkMode ? 'bg-slate-800/80 border-white/10 text-white' : 'bg-white/80 border-slate-300/50 text-slate-900'} border rounded-2xl p-4 outline-none focus:border-purple-400 transition-colors`}
                disabled={isLoading}
              >
                <option value="">නාලිකාව තෝරන්න...</option>
                {stations.map((station, index) => (
                  <option key={index} value={index}>
                    {station.name}
                  </option>
                ))}
              </select>

              <audio 
                ref={audioRef}
                onError={() => {
                  setConnectionStatus('error');
                  setIsLoading(false);
                  setIsPlaying(false);
                }}
                onCanPlay={() => {
                  setConnectionStatus('connected');
                  setIsLoading(false);
                }}
              />

              <div className="flex flex-col items-center py-4">
                <div
                  ref={knobRef}
                  className="knob-container w-20 h-20 rounded-full relative shadow-xl cursor-pointer touch-none"
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleMouseDown}
                  style={{
                    background: isDarkMode 
                      ? 'radial-gradient(circle at center, #1e293b, #0f172a)'
                      : 'radial-gradient(circle at center, #e2e8f0, #94a3b8)',
                    border: isDarkMode ? '4px solid #334155' : '4px solid #cbd5e1'
                  }}
                >
                  <div 
                    className="w-1.5 h-1.5 bg-purple-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2"
                    style={{
                      transform: `rotate(${(volume / 100) * 360 - 90}deg) translateY(-30px)`,
                      transformOrigin: 'center 30px'
                    }}
                  />
                  <Volume2 className={`w-6 h-6 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50`} />
                </div>
                <div className={`mt-4 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'} font-bold`}>{volume}%</div>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={togglePlayPause}
                  disabled={selectedStation === null || isLoading}
                  className={`w-16 h-16 ${isDarkMode ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'} rounded-full flex items-center justify-center active:scale-90 transition-transform shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin" />
                  ) : isPlaying ? (
                    <Pause className="w-8 h-8" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" />
                  )}
                </button>
                
                {connectionStatus === 'error' && (
                  <button
                    onClick={() => {
                      if (selectedStation !== null) {
                        handleStationChange({ target: { value: selectedStation.toString() } } as any);
                      }
                    }}
                    className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <WifiOff className="w-6 h-6" />
                  </button>
                )}
              </div>

              {connectionStatus === 'error' && (
                <div className="text-center text-red-400 text-sm">
                  <p>Connection failed. Please try again.</p>
                  <p className="text-xs mt-1">Some stations may be temporarily unavailable.</p>
                </div>
              )}

              {/* Station Count Display */}
              <div className={`text-center ${isDarkMode ? 'text-slate-500' : 'text-slate-600'} text-xs`}>
                <p>📻 {stations.length} Sri Lankan Radio Stations Available</p>
              </div>
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}