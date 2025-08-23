import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Code, 
  Terminal, 
  Brain, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter, 
  Monitor,
  Sun,
  Moon,
  Play,
  X,
  ChevronRight,
  Database,
  Globe,
  Cpu,
  Zap,
  BarChart3,
  FileText,
  Settings,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  Star,
  TrendingUp,
  Users,
  Target,
  BookOpen,
  Briefcase,
  Cloud,
  Snowflake,
  CloudRain,
  Sparkles,
  Palette,
  Music,
  Droplets,
  Wind,
  Sunset,
  Bug
} from 'lucide-react';

const VishnuDeveloperOS = () => {
  const [currentView, setCurrentView] = useState('boot');
  const [theme, setTheme] = useState('auto'); // auto, light, dark
  const [background, setBackground] = useState('auto'); // auto, particles, rain, snow, dust, sun, stars, fireflies, butterflies
  const [openWindows, setOpenWindows] = useState([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [bootText, setBootText] = useState('');
  const [transitioning, setTransitioning] = useState(false);

  // Determine if dark mode should be used
  const darkMode = useMemo(() => {
    if (theme === 'auto') {
      const hour = new Date().getHours();
      return hour < 6 || hour > 18; // Dark mode between 6 PM and 6 AM
    }
    return theme === 'dark';
  }, [theme]);

  // Determine background based on time or user preference
  const currentBackground = useMemo(() => {
    if (background === 'auto') {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 8) return 'butterflies'; // Dawn
      if (hour >= 8 && hour < 12) return 'sun'; // Morning
      if (hour >= 12 && hour < 17) return 'dust'; // Afternoon
      if (hour >= 17 && hour < 20) return 'particles'; // Evening
      if (hour >= 20 && hour < 22) return 'fireflies'; // Dusk
      return 'stars'; // Night
    }
    return background;
  }, [background]);

  // Boot sequence effect
  useEffect(() => {
    if (currentView === 'boot') {
      const text = "Initializing Developer OS...";
      let i = 0;
      const timer = setInterval(() => {
        setBootText(text.slice(0, i));
        i++;
        if (i > text.length) {
          clearInterval(timer);
          setTimeout(() => setBootComplete(true), 500);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [currentView]);

  // Enhanced Particle Background Components
  const ParticleBackground = () => {
    const canvasRef = useRef(null);
    
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      const particles = [];
      
      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Create particles based on background type
      const createParticles = () => {
        particles.length = 0;
        let particleCount;
        
        switch (currentBackground) {
          case 'dust':
            particleCount = 120;
            break;
          case 'rain':
            particleCount = 200;
            break;
          case 'snow':
            particleCount = 100;
            break;
          case 'butterflies':
            particleCount = 15;
            break;
          case 'fireflies':
            particleCount = 30;
            break;
          default:
            particleCount = 60;
        }
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: currentBackground === 'rain' ? (Math.random() - 0.5) * 0.5 :
                currentBackground === 'snow' ? (Math.random() - 0.5) * 0.3 :
                currentBackground === 'butterflies' ? (Math.random() - 0.5) * 1.5 :
                currentBackground === 'fireflies' ? (Math.random() - 0.5) * 0.8 :
                (Math.random() - 0.5) * 0.5,
            vy: currentBackground === 'rain' ? Math.random() * 8 + 4 :
                currentBackground === 'snow' ? Math.random() * 2 + 0.5 :
                currentBackground === 'butterflies' ? (Math.random() - 0.5) * 2 :
                currentBackground === 'fireflies' ? (Math.random() - 0.5) * 1 :
                (Math.random() - 0.5) * 0.5,
            size: currentBackground === 'dust' ? Math.random() * 1.5 + 0.5 :
                  currentBackground === 'rain' ? Math.random() * 4 + 2 :
                  currentBackground === 'snow' ? Math.random() * 6 + 3 :
                  currentBackground === 'butterflies' ? Math.random() * 8 + 6 :
                  currentBackground === 'fireflies' ? Math.random() * 3 + 2 :
                  Math.random() * 3 + 1,
            opacity: currentBackground === 'fireflies' ? Math.random() * 0.8 + 0.2 :
                    Math.random() * 0.6 + 0.2,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.04,
            wingPhase: Math.random() * Math.PI * 2, // For butterflies
            glowPhase: Math.random() * Math.PI * 2, // For fireflies
            color: currentBackground === 'butterflies' ? 
                   ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'][Math.floor(Math.random() * 6)] :
                   currentBackground === 'fireflies' ?
                   ['#FFD700', '#90EE90', '#87CEEB', '#FFB6C1'][Math.floor(Math.random() * 4)] :
                   null
          });
        }
      };

      createParticles();
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          // Update position based on background type
          if (currentBackground === 'rain') {
            particle.x += particle.vx;
            particle.y += particle.vy;
            if (particle.y > canvas.height) {
              particle.y = -10;
              particle.x = Math.random() * canvas.width;
            }
            if (particle.x < 0 || particle.x > canvas.width) {
              particle.x = Math.random() * canvas.width;
            }
          } else if (currentBackground === 'snow') {
            particle.x += Math.sin(particle.angle) * 0.5 + particle.vx;
            particle.y += particle.vy;
            particle.angle += 0.008;
            if (particle.y > canvas.height) {
              particle.y = -10;
              particle.x = Math.random() * canvas.width;
            }
          } else if (currentBackground === 'butterflies') {
            particle.x += particle.vx + Math.sin(particle.wingPhase) * 0.5;
            particle.y += particle.vy + Math.cos(particle.wingPhase * 0.8) * 0.3;
            particle.wingPhase += 0.1;
            particle.angle += particle.spin * 0.5;
            
            // Boundary bouncing
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          } else if (currentBackground === 'fireflies') {
            particle.x += particle.vx + Math.sin(particle.glowPhase) * 0.2;
            particle.y += particle.vy + Math.cos(particle.glowPhase * 1.2) * 0.2;
            particle.glowPhase += 0.05;
            
            // Glowing effect
            particle.opacity = 0.3 + Math.sin(particle.glowPhase * 2) * 0.5;
            
            // Boundary bouncing
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          } else {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          }
          
          // Draw particles with different styles
          ctx.save();
          ctx.translate(particle.x, particle.y);
          ctx.rotate(particle.angle);
          
          if (currentBackground === 'rain') {
            const gradient = ctx.createLinearGradient(0, -particle.size, 0, particle.size);
            gradient.addColorStop(0, darkMode ? `rgba(173, 216, 230, ${particle.opacity})` : `rgba(70, 130, 180, ${particle.opacity})`);
            gradient.addColorStop(1, darkMode ? `rgba(100, 149, 237, ${particle.opacity * 0.3})` : `rgba(70, 130, 180, ${particle.opacity * 0.5})`);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, -particle.size);
            ctx.lineTo(0, particle.size);
            ctx.stroke();
          } else if (currentBackground === 'snow') {
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Snowflake pattern
            ctx.strokeStyle = `rgba(255, 255, 255, ${particle.opacity * 0.7})`;
            ctx.lineWidth = 1;
            for (let i = 0; i < 6; i++) {
              ctx.beginPath();
              ctx.moveTo(0, 0);
              ctx.lineTo(0, -particle.size * 0.7);
              ctx.stroke();
              ctx.rotate(Math.PI / 3);
            }
          } else if (currentBackground === 'dust') {
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
            gradient.addColorStop(0, darkMode ? `rgba(255, 215, 0, ${particle.opacity * 0.4})` : `rgba(255, 165, 0, ${particle.opacity * 0.6})`);
            gradient.addColorStop(1, `rgba(255, 215, 0, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (currentBackground === 'sun') {
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
            gradient.addColorStop(0, `rgba(255, 215, 0, ${particle.opacity})`);
            gradient.addColorStop(0.7, `rgba(255, 165, 0, ${particle.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(255, 69, 0, 0)`);
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(255, 215, 0, 0.3)';
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
          } else if (currentBackground === 'butterflies') {
            // Butterfly body
            ctx.fillStyle = `rgba(139, 69, 19, ${particle.opacity})`;
            ctx.fillRect(-1, -particle.size * 0.4, 2, particle.size * 0.8);
            
            // Wings
            const wingColor = particle.color;
            ctx.fillStyle = wingColor.replace(')', `, ${particle.opacity})`).replace('rgb', 'rgba');
            
            // Left wing
            ctx.beginPath();
            ctx.ellipse(-particle.size * 0.3, -particle.size * 0.2, particle.size * 0.4, particle.size * 0.3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(-particle.size * 0.2, particle.size * 0.1, particle.size * 0.3, particle.size * 0.2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Right wing
            ctx.beginPath();
            ctx.ellipse(particle.size * 0.3, -particle.size * 0.2, particle.size * 0.4, particle.size * 0.3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(particle.size * 0.2, particle.size * 0.1, particle.size * 0.3, particle.size * 0.2, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Wing animation effect
            ctx.globalAlpha = Math.sin(particle.wingPhase) * 0.3 + 0.7;
          } else if (currentBackground === 'fireflies') {
            // Firefly body
            ctx.fillStyle = `rgba(50, 50, 50, ${particle.opacity * 0.8})`;
            ctx.beginPath();
            ctx.ellipse(0, 0, particle.size * 0.3, particle.size * 0.6, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // Glowing light
            const glowIntensity = Math.sin(particle.glowPhase * 3) * 0.5 + 0.5;
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 2);
            const glowColor = particle.color;
            gradient.addColorStop(0, glowColor.replace(')', `, ${particle.opacity * glowIntensity})`).replace('rgb', 'rgba'));
            gradient.addColorStop(0.5, glowColor.replace(')', `, ${particle.opacity * glowIntensity * 0.3})`).replace('rgb', 'rgba'));
            gradient.addColorStop(1, `rgba(255, 255, 0, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, particle.size * 0.2, particle.size * 1.5, 0, Math.PI * 2);
            ctx.fill();
          } else if (currentBackground === 'stars') {
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.shadowBlur = 20;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            
            // Star shape
            const spikes = 5;
            const outerRadius = particle.size;
            const innerRadius = particle.size * 0.4;
            
            ctx.beginPath();
            for (let i = 0; i < spikes * 2; i++) {
              const radius = i % 2 === 0 ? outerRadius : innerRadius;
              const angle = (i * Math.PI) / spikes;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            
            // Add twinkling effect
            if (Math.random() < 0.02) {
              particle.opacity = Math.random() * 0.5 + 0.2;
            }
          } else {
            // Default particles
            const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
            gradient.addColorStop(0, darkMode 
              ? `rgba(59, 130, 246, ${particle.opacity})` 
              : `rgba(99, 102, 241, ${particle.opacity})`);
            gradient.addColorStop(1, darkMode 
              ? `rgba(59, 130, 246, 0)` 
              : `rgba(99, 102, 241, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
          }
          
          ctx.restore();
          
          if (currentBackground !== 'rain' && currentBackground !== 'snow' && currentBackground !== 'butterflies' && currentBackground !== 'fireflies') {
            particle.angle += particle.spin;
          }
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }, [currentBackground, darkMode]);
    
    return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
  };

  // Intersection Observer Hook for scroll animations
  const useIntersectionObserver = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, []);

    return { ref, isVisible };
  };

  // Animated Counter Component
  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const { ref, isVisible } = useIntersectionObserver();

    useEffect(() => {
      if (isVisible) {
        let start = 0;
        const increment = end / (duration / 50);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, 50);
        return () => clearInterval(timer);
      }
    }, [isVisible, end, duration]);

    return <span ref={ref}>{count}</span>;
  };

  // Boot screen component
  const BootScreen = () => (
    <div className={`min-h-screen flex items-center justify-center transition-all duration-1000 ${
      darkMode ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
    }`}>
      <ParticleBackground />
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <h1 className={`text-6xl font-bold mb-4 transition-all duration-1000 ${
            darkMode ? 'text-white' : 'text-gray-900'
          } animate-pulse`}>
            VISHNU.DEV
          </h1>
          <div className={`h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto transition-all duration-2000 ${
            bootText ? 'w-full' : 'w-0'
          }`} />
        </div>
        
        <div className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'} font-mono`}>
          {bootText}
        </div>
        
        {bootComplete && (
          <button
            onClick={() => {
              setTransitioning(true);
              setTimeout(() => {
                setCurrentView('desktop');
                setTransitioning(false);
              }, 800);
            }}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce"
          >
            Enter System
          </button>
        )}
      </div>
    </div>
  );

  // Theme and Background Selector Component
  const ControlPanel = ({ isOpen, onClose }) => {
    const themes = [
      { id: 'auto', name: 'Auto', icon: Sun, description: 'Follows time of day' },
      { id: 'light', name: 'Light', icon: Sun, description: 'Always light mode' },
      { id: 'dark', name: 'Dark', icon: Moon, description: 'Always dark mode' }
    ];

    const backgrounds = [
      { id: 'auto', name: 'Auto', icon: Sparkles, description: 'Changes with time' },
      { id: 'particles', name: 'Particles', icon: Sparkles, description: 'Floating particles' },
      { id: 'rain', name: 'Rain', icon: CloudRain, description: 'Animated raindrops' },
      { id: 'snow', name: 'Snow', icon: Snowflake, description: 'Falling snowflakes' },
      { id: 'dust', name: 'Dust', icon: Cloud, description: 'Floating dust particles' },
      { id: 'sun', name: 'Sunshine', icon: Sun, description: 'Warm sun particles' },
      { id: 'stars', name: 'Stars', icon: Star, description: 'Twinkling stars' },
      { id: 'fireflies', name: 'Fireflies', icon: Bug, description: 'Glowing fireflies' },
      { id: 'butterflies', name: 'Butterflies', icon: Wind, description: 'Colorful butterflies' }
    ];

    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto`}>
          <div className={`flex items-center justify-between p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
              <Palette className="w-6 h-6 text-purple-500" />
              Customize Experience
            </h2>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${
                darkMode ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Theme Selection */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Theme Preference
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => setTheme(themeOption.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      theme === themeOption.id
                        ? 'border-purple-500 bg-purple-500/10'
                        : darkMode
                        ? 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <themeOption.icon className={`w-8 h-8 mx-auto mb-2 ${
                      theme === themeOption.id ? 'text-purple-500' : darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                    <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {themeOption.name}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      {themeOption.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Background Selection */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Background Animation
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {backgrounds.map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => setBackground(bg.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      background === bg.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : darkMode
                        ? 'border-gray-600 bg-gray-700/30 hover:border-gray-500'
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                    }`}
                  >
                    <bg.icon className={`w-6 h-6 mx-auto mb-2 ${
                      background === bg.id ? 'text-blue-500' : darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`} />
                    <div className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {bg.name}
                    </div>
                    <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                      {bg.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/30' : 'bg-gray-100'} text-center`}>
              <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                Current Settings Preview
              </div>
              <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Theme: {themes.find(t => t.id === theme)?.name} | 
                Background: {backgrounds.find(b => b.id === background)?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Window component for OS-style interfaces
  const Window = ({ title, children, onClose, className = "" }) => (
    <div 
      className={`fixed inset-4 ${darkMode ? 'bg-gray-800/95 opacity-0 bg-black' : 'bg-white/95 opacity-0 bg-white' } rounded-xl shadow-2xl z-40 ${className} transition-all duration-500 backdrop-blur-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
      style={{
        animation: 'slideIn 0.5s ease-out forwards'
      }}
    >
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
      <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer" onClick={onClose} />
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer" />
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer" />
          <span className={`ml-4 font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          className={`p-1 rounded hover:bg-gray-200 transition-colors ${darkMode ? 'hover:bg-gray-700 text-white' : 'text-gray-600'}`}
        >
          <X size={16} />
        </button>
      </div>
      <div className="p-6 h-full overflow-auto" style={{ height: 'calc(100% - 64px)' }}>
        {children}
      </div>
    </div>
  );

  // Desktop component
  const Desktop = () => {
    const [controlPanelOpen, setControlPanelOpen] = useState(false);

    const apps = [
      { id: 'dashboard', name: 'Dashboard', icon: Monitor, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
      { id: 'projects', name: 'Projects', icon: Code, color: 'bg-gradient-to-br from-green-500 to-green-600' },
      { id: 'ailab', name: 'AI Lab', icon: Brain, color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
      { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'bg-gradient-to-br from-gray-700 to-gray-800' },
      { id: 'contact', name: 'Contact', icon: Mail, color: 'bg-gradient-to-br from-red-500 to-red-600' },
    ];

    const openWindow = (appId) => {
      if (!openWindows.includes(appId)) {
        setTransitioning(true);
        setTimeout(() => {
          setOpenWindows([...openWindows, appId]);
          setTransitioning(false);
        }, 300);
      }
    };

    const closeWindow = (appId) => {
      setTransitioning(true);
      setTimeout(() => {
        setOpenWindows(openWindows.filter(id => id !== appId));
        setTransitioning(false);
      }, 200);
    };

    return (
      <div className={`min-h-screen transition-all duration-1000 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      } relative overflow-hidden`}>
        <ParticleBackground />
        
        {/* Desktop Grid */}
        <div className="relative z-10 p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-md">
            {apps.map((app, index) => (
              <div
                key={app.id}
                className="flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 hover:scale-110 group"
                onClick={() => openWindow(app.id)}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <style jsx>{`
                  @keyframes fadeInUp {
                    from {
                      opacity: 0;
                      transform: translateY(30px);
                    }
                    to {
                      opacity: 1;
                      transform: translateY(0);
                    }
                  }
                `}</style>
                <div className={`w-16 h-16 ${app.color} rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-2xl group-hover:rotate-3 group-hover:scale-110`}>
                  <app.icon className="text-white transition-all duration-300 group-hover:scale-110" size={32} />
                </div>
                <span className={`text-sm transition-all duration-300 group-hover:text-blue-500 font-medium ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {app.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Taskbar */}
        <div className={`fixed bottom-0 left-0 right-0 transition-all duration-500 ${
          darkMode ? 'bg-gray-800/90' : 'bg-white/90'
        } backdrop-blur-md border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-3 shadow-2xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 font-mono text-sm font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-lg ${
                darkMode ? '' : 'shadow-purple-200'
              }`}>
                VISHNU.DEV OS
              </div>
              {openWindows.map(windowId => (
                <button
                  key={windowId}
                  className={`px-3 py-1 rounded-lg text-sm transition-all duration-300 hover:scale-105 ${
                    darkMode 
                      ? 'bg-gray-700/80 text-white hover:bg-gray-600' 
                      : 'bg-gray-200/80 text-gray-900 hover:bg-gray-300'
                  } backdrop-blur-sm shadow-md`}
                >
                  {apps.find(app => app.id === windowId)?.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setControlPanelOpen(true)}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-700/80 text-white hover:bg-gray-600' 
                    : 'bg-gray-200/80 text-gray-900 hover:bg-gray-300'
                } backdrop-blur-sm shadow-md`}
                title="Customize"
              >
                <Palette size={16} />
              </button>
              <button
                onClick={() => setTheme(darkMode ? 'light' : 'dark')}
                className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                  darkMode 
                    ? 'bg-gray-700/80 text-white hover:bg-gray-600' 
                    : 'bg-gray-200/80 text-gray-900 hover:bg-gray-300'
                } backdrop-blur-sm shadow-md`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <div className={`px-3 py-1 text-sm font-mono ${
                darkMode ? 'text-white' : 'text-gray-900'
              } bg-black/10 rounded-lg backdrop-blur-sm`}>
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <ControlPanel 
          isOpen={controlPanelOpen} 
          onClose={() => setControlPanelOpen(false)} 
        />

        {/* Transition Overlay */}
        {transitioning && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 transition-all duration-300" />
        )}

        {/* Open Windows */}
        {openWindows.map(windowId => {
          switch (windowId) {
            case 'dashboard':
              return (
                <Window
                  key="dashboard"
                  title="Professional Dashboard"
                  onClose={() => closeWindow('dashboard')}
                >
                  <ProfessionalDashboard />
                </Window>
              );
            case 'projects':
              return (
                <Window
                  key="projects"
                  title="Project Portfolio"
                  onClose={() => closeWindow('projects')}
                >
                  <ProfessionalProjects />
                </Window>
              );
            case 'ailab':
              return (
                <Window
                  key="ailab"
                  title="AI Lab - Interactive Demos"
                  onClose={() => closeWindow('ailab')}
                >
                  <AILabContent />
                </Window>
              );
            case 'terminal':
              return (
                <Window
                  key="terminal"
                  title="Terminal"
                  onClose={() => closeWindow('terminal')}
                  className={darkMode ? 'bg-gray-900/95' : 'bg-gray-800/95'}
                >
                  <TerminalContent />
                </Window>
              );
            case 'contact':
              return (
                <Window
                  key="contact"
                  title="Contact & Social"
                  onClose={() => closeWindow('contact')}
                >
                  <ContactContent />
                </Window>
              );
            default:
              return null;
          }
        })}
      </div>
    );
  };

  // Professional Dashboard Component
  const ProfessionalDashboard = () => {
    const StatsCard = ({ title, value, icon: Icon, color, subtitle }) => {
      const { ref, isVisible } = useIntersectionObserver();
      
      return (
        <div 
          ref={ref}
          className={`${darkMode ? 'bg-gray-700/50' : 'bg-white/80'} backdrop-blur-sm rounded-xl p-6 shadow-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'} transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
          </div>
          <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
            <AnimatedCounter end={value} />
            {title.includes('Years') && '+'}
            {title.includes('Projects') && '+'}
            {title.includes('Technologies') && '+'}
            {title.includes('Rating') && '/5'}
          </div>
          <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{title}</div>
          {subtitle && (
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{subtitle}</div>
          )}
        </div>
      );
    };

    const SkillBar = ({ skill, level, color, delay = 0 }) => {
      const { ref, isVisible } = useIntersectionObserver();
      
      return (
        <div 
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <div className="flex justify-between items-center mb-2">
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {skill}
            </span>
            <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {level}%
            </span>
          </div>
          <div className={`w-full h-3 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full overflow-hidden`}>
            <div
              className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
              style={{ 
                width: isVisible ? `${level}%` : '0%',
                transitionDelay: `${delay + 200}ms`
              }}
            />
          </div>
        </div>
      );
    };

    const ExperienceCard = ({ company, role, period, description, delay = 0 }) => {
      const { ref, isVisible } = useIntersectionObserver();
      
      return (
        <div 
          ref={ref}
          className={`${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'} rounded-lg p-6 border-l-4 border-blue-500 transition-all duration-700 hover:shadow-lg ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {role}
              </h3>
              <p className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} font-medium`}>
                {company}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar size={16} />
              {period}
            </div>
          </div>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
            {description}
          </p>
        </div>
      );
    };

    return (
      <div className="space-y-8 max-h-full overflow-y-auto">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Full Stack Developer & AI Engineer
          </h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Passionate about creating intelligent, scalable solutions that bridge the gap between cutting-edge AI and exceptional user experiences.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            title="Years Experience" 
            value={5} 
            icon={Award} 
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            subtitle="Professional Development"
          />
          <StatsCard 
            title="Projects Completed" 
            value={50} 
            icon={Briefcase} 
            color="bg-gradient-to-br from-green-500 to-green-600"
            subtitle="Full Stack & AI"
          />
          <StatsCard 
            title="Technologies Mastered" 
            value={25} 
            icon={Cpu} 
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            subtitle="Frontend, Backend, AI/ML"
          />
          <StatsCard 
            title="Client Rating" 
            value={4.9} 
            icon={Star} 
            color="bg-gradient-to-br from-yellow-500 to-yellow-600"
            subtitle="Average Satisfaction"
          />
        </div>

        {/* Skills Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
              <Code className="w-6 h-6 text-blue-500" />
              Technical Skills
            </h2>
            <div className="space-y-6">
              <SkillBar skill="React/Next.js" level={95} color="bg-gradient-to-r from-blue-500 to-cyan-500" delay={0} />
              <SkillBar skill="Node.js/Express" level={92} color="bg-gradient-to-r from-green-500 to-emerald-500" delay={100} />
              <SkillBar skill="Python/Django" level={90} color="bg-gradient-to-r from-yellow-500 to-orange-500" delay={200} />
              <SkillBar skill="TypeScript" level={88} color="bg-gradient-to-r from-blue-600 to-indigo-600" delay={300} />
              <SkillBar skill="AI/ML (TensorFlow, PyTorch)" level={85} color="bg-gradient-to-r from-purple-500 to-pink-500" delay={400} />
              <SkillBar skill="Cloud (AWS, Docker)" level={83} color="bg-gradient-to-r from-gray-600 to-gray-700" delay={500} />
            </div>
          </div>

          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
              <Brain className="w-6 h-6 text-purple-500" />
              Core Competencies
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Full Stack Development',
                'Machine Learning',
                'System Architecture',
                'Database Design',
                'API Development',
                'DevOps & CI/CD',
                'UI/UX Design',
                'Project Leadership'
              ].map((competency, index) => (
                <div 
                  key={competency}
                  className={`${darkMode ? 'bg-gray-700/30' : 'bg-gray-100'} rounded-lg p-4 text-center transition-all duration-500 hover:scale-105 hover:shadow-lg`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {competency}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
            <Target className="w-6 h-6 text-green-500" />
            Professional Experience
          </h2>
          <div className="space-y-6">
            <ExperienceCard 
              company="TechCorp Solutions"
              role="Senior Full Stack Developer"
              period="2022 - Present"
              description="Leading development of AI-powered web applications, implementing scalable microservices architecture, and mentoring junior developers. Increased system performance by 40% and reduced deployment time by 60%."
              delay={0}
            />
            <ExperienceCard 
              company="AI Innovations Lab"
              role="Machine Learning Engineer"
              period="2020 - 2022"
              description="Developed computer vision models for medical imaging, created NLP solutions for customer service automation, and published research papers on deep learning applications. Successfully deployed 15+ ML models to production."
              delay={200}
            />
            <ExperienceCard 
              company="StartupX"
              role="Full Stack Developer"
              period="2019 - 2020"
              description="Built the complete tech stack from ground up, including React frontend, Node.js backend, and AWS infrastructure. Scaled the platform to support 10K+ active users and $1M+ ARR."
              delay={400}
            />
          </div>
        </div>
      </div>
    );
  };

  // Professional Projects Component
  const ProfessionalProjects = () => {
    const [filter, setFilter] = useState('all');
    const [hoveredProject, setHoveredProject] = useState(null);

    const ProjectCard = ({ project, delay = 0 }) => {
      const { ref, isVisible } = useIntersectionObserver();
      
      return (
        <div 
          ref={ref}
          className={`group ${darkMode ? 'bg-gray-700/30' : 'bg-white'} rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: `${delay}ms` }}
          onMouseEnter={() => setHoveredProject(project.id)}
          onMouseLeave={() => setHoveredProject(null)}
        >
          {/* Project Image/Header */}
          <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />
            <div className="absolute top-4 left-4">
              <project.icon className="w-8 h-8 text-white/90" />
            </div>
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.status === 'Live' ? 'bg-green-500 text-white' :
                project.status === 'Beta' ? 'bg-yellow-500 text-black' :
                'bg-blue-500 text-white'
              }`}>
                {project.status}
              </span>
            </div>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
              <p className="text-white/80 text-sm">{project.subtitle}</p>
            </div>
            {hoveredProject === project.id && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Project Details */}
          <div className="p-6">
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 leading-relaxed`}>
              {project.description}
            </p>
            
            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map(tech => (
                <span
                  key={tech}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-100 text-gray-700'} transition-colors group-hover:bg-blue-500 group-hover:text-white`}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <AnimatedCounter end={project.users || 0} />
                  {project.users && (project.users >= 1000 ? 'K+' : '+')}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Users</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.rating}/5
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Rating</div>
              </div>
              <div className="text-center">
                <div className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.performance}%
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Performance</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                <Play size={14} />
                View Live
              </button>
              <button className={`p-2 ${darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'} rounded-lg transition-colors`}>
                <Github size={16} />
              </button>
            </div>
          </div>
        </div>
      );
    };

    const projects = [
      {
        id: 1,
        title: 'SpineSight AI',
        subtitle: 'Medical AI Platform',
        description: 'Revolutionary AI-powered platform for spinal condition detection using advanced computer vision and deep learning algorithms. Provides real-time analysis with 94% accuracy rate.',
        tech: ['React', 'TensorFlow.js', 'Python', 'FastAPI', 'AWS', 'Docker'],
        status: 'Live',
        category: 'ai',
        gradient: 'from-blue-500 to-cyan-500',
        icon: Brain,
        users: 2500,
        rating: 4.8,
        performance: 94
      },
      {
        id: 2,
        title: 'EcoTracker Pro',
        subtitle: 'Sustainability Platform',
        description: 'Comprehensive carbon footprint tracking application with real-time analytics, team collaboration, and automated reporting for enterprise sustainability management.',
        tech: ['Next.js', 'Node.js', 'MongoDB', 'Chart.js', 'Stripe', 'AWS'],
        status: 'Live',
        category: 'web',
        gradient: 'from-green-500 to-emerald-500',
        icon: Globe,
        users: 15000,
        rating: 4.9,
        performance: 98
      },
      {
        id: 3,
        title: 'Neural Chat Engine',
        subtitle: 'AI Communication Suite',
        description: 'Advanced real-time chat application with AI-powered sentiment analysis, language translation, and smart conversation insights for modern businesses.',
        tech: ['React', 'Socket.io', 'NLP', 'Express', 'Redis', 'Python'],
        status: 'Demo',
        category: 'ai',
        gradient: 'from-purple-500 to-pink-500',
        icon: Brain,
        users: 850,
        rating: 4.7,
        performance: 96
      },
      {
        id: 4,
        title: 'CloudDeploy Suite',
        subtitle: 'DevOps Automation',
        description: 'Enterprise-grade automated deployment platform for containerized applications with CI/CD pipelines, monitoring, and scaling capabilities.',
        tech: ['Docker', 'Kubernetes', 'AWS', 'React', 'Go', 'Prometheus'],
        status: 'Beta',
        category: 'devops',
        gradient: 'from-orange-500 to-red-500',
        icon: Cpu,
        users: 1200,
        rating: 4.6,
        performance: 99
      },
      {
        id: 5,
        title: 'DataViz Studio',
        subtitle: 'Analytics Platform',
        description: 'Interactive data visualization platform with drag-and-drop interface, real-time updates, and collaborative dashboard creation for business intelligence.',
        tech: ['D3.js', 'React', 'Python', 'FastAPI', 'PostgreSQL', 'WebSockets'],
        status: 'Live',
        category: 'web',
        gradient: 'from-indigo-500 to-purple-500',
        icon: BarChart3,
        users: 5600,
        rating: 4.8,
        performance: 97
      },
      {
        id: 6,
        title: 'SmartLearn AI',
        subtitle: 'EdTech Platform',
        description: 'Personalized learning platform using AI to adapt content difficulty, track progress, and provide intelligent tutoring for enhanced educational outcomes.',
        tech: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Redis', 'WebRTC'],
        status: 'Live',
        category: 'ai',
        gradient: 'from-teal-500 to-blue-500',
        icon: BookOpen,
        users: 8900,
        rating: 4.9,
        performance: 95
      }
    ];

    const categories = [
      { id: 'all', name: 'All Projects', count: projects.length },
      { id: 'ai', name: 'AI/ML', count: projects.filter(p => p.category === 'ai').length },
      { id: 'web', name: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
      { id: 'devops', name: 'DevOps', count: projects.filter(p => p.category === 'devops').length }
    ];

    const filteredProjects = filter === 'all' 
      ? projects 
      : projects.filter(project => project.category === filter);

    return (
      <div className="space-y-8 max-h-full overflow-y-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Project Portfolio
          </h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            A showcase of innovative solutions spanning AI/ML, full-stack development, and DevOps automation
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category.name}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                filter === category.id
                  ? 'bg-white/20'
                  : darkMode ? 'bg-gray-600' : 'bg-gray-300'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              delay={index * 150} 
            />
          ))}
        </div>

        {/* Portfolio Stats */}
        <div className={`${darkMode ? 'bg-gray-700/20' : 'bg-gray-50'} rounded-xl p-6 mt-8`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 text-center`}>
            Portfolio Impact
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <AnimatedCounter end={34000} />+
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Users</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <AnimatedCounter end={97} />%
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Performance</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                4.<AnimatedCounter end={8} />
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Rating</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                $<AnimatedCounter end={2.5} />M+
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue Impact</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // AI Lab content
  const AILabContent = () => {
    const [selectedDemo, setSelectedDemo] = useState(null);
    const [demoInput, setDemoInput] = useState('');
    const [demoOutput, setDemoOutput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const demos = [
      {
        id: 'sentiment',
        title: 'Sentiment Analysis',
        description: 'Analyze text sentiment using advanced NLP',
        icon: Brain,
        inputPlaceholder: 'Enter text to analyze sentiment...',
        mockOutput: (input) => {
          const positive = input.toLowerCase().includes('good') || input.toLowerCase().includes('great') || input.toLowerCase().includes('love') || input.toLowerCase().includes('amazing');
          const negative = input.toLowerCase().includes('bad') || input.toLowerCase().includes('hate') || input.toLowerCase().includes('terrible') || input.toLowerCase().includes('awful');
          
          if (positive) return { 
            sentiment: 'Positive', 
            confidence: 0.89, 
            score: 0.72,
            emotions: ['joy', 'satisfaction', 'enthusiasm'],
            keywords: ['good', 'great', 'love', 'amazing']
          };
          if (negative) return { 
            sentiment: 'Negative', 
            confidence: 0.83, 
            score: -0.65,
            emotions: ['frustration', 'disappointment', 'anger'],
            keywords: ['bad', 'hate', 'terrible', 'awful']
          };
          return { 
            sentiment: 'Neutral', 
            confidence: 0.76, 
            score: 0.12,
            emotions: ['calm', 'neutral', 'balanced'],
            keywords: ['information', 'facts', 'neutral']
          };
        }
      },
      {
        id: 'spine',
        title: 'SpineSight AI',
        description: 'Medical imaging analysis for spinal conditions',
        icon: Settings,
        inputPlaceholder: 'Enter patient symptoms or upload scan data...',
        mockOutput: () => ({
          diagnosis: 'Normal Spinal Alignment',
          confidence: 0.94,
          risk_factors: ['No significant abnormalities detected'],
          recommendations: [
            'Continue regular exercise routine',
            'Maintain proper posture',
            'Schedule routine checkup in 6 months'
          ],
          severity: 'Low',
          follow_up: 'Routine monitoring recommended'
        })
      },
      {
        id: 'text-gen',
        title: 'AI Text Generator',
        description: 'Generate creative and contextual text',
        icon: FileText,
        inputPlaceholder: 'Enter a prompt for creative text generation...',
        mockOutput: (input) => ({
          generated_text: `Based on "${input}", here's an AI-generated response: The intersection of technology and human creativity opens unprecedented possibilities. As we advance into an era where artificial intelligence augments human capabilities, we witness the emergence of solutions that were once confined to science fiction...`,
          tokens_generated: 127,
          creativity_score: 0.85,
          coherence_score: 0.92,
          processing_time: '0.8s'
        })
      }
    ];

    const runDemo = async () => {
      if (!selectedDemo || !demoInput.trim()) return;
      
      setIsProcessing(true);
      setDemoOutput('Processing...');
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const demo = demos.find(d => d.id === selectedDemo);
      const result = demo.mockOutput(demoInput);
      setDemoOutput(JSON.stringify(result, null, 2));
      setIsProcessing(false);
    };

    return (
      <div className="space-y-6 max-h-full overflow-y-auto">
        <div className="text-center">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            AI Lab - Interactive Demos
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Experience cutting-edge AI technologies through live demonstrations
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {demos.map((demo) => (
            <div
              key={demo.id}
              onClick={() => setSelectedDemo(demo.id)}
              className={`p-6 rounded-xl cursor-pointer border-2 transition-all duration-300 hover:scale-105 ${
                selectedDemo === demo.id 
                  ? 'border-blue-500 bg-blue-500/10' 
                  : darkMode 
                    ? 'border-gray-600 bg-gray-700/30 hover:border-gray-500 hover:bg-gray-700/50' 
                    : 'border-gray-300 bg-gray-100 hover:border-gray-400 hover:bg-gray-200'
              }`}
            >
              <demo.icon className={`w-10 h-10 mb-4 ${selectedDemo === demo.id ? 'text-blue-500' : darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {demo.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {demo.description}
              </p>
            </div>
          ))}
        </div>

        {selectedDemo && (
          <div className={`${darkMode ? 'bg-gray-700/30' : 'bg-gray-100'} rounded-xl p-6 transition-all animate-fadeIn`}>
            <h3 className={`font-semibold text-xl mb-6 ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
              {demos.find(d => d.id === selectedDemo)?.icon && 
                React.createElement(demos.find(d => d.id === selectedDemo).icon, { size: 24, className: 'text-blue-500' })
              }
              {demos.find(d => d.id === selectedDemo)?.title}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Input
                </label>
                <textarea
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  placeholder={demos.find(d => d.id === selectedDemo)?.inputPlaceholder}
                  className={`w-full h-32 p-3 border rounded-lg resize-none ${
                    darkMode 
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button
                  onClick={runDemo}
                  disabled={!demoInput.trim() || isProcessing}
                  className="mt-3 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      Run Demo
                    </>
                  )}
                </button>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Output
                </label>
                <pre className={`w-full h-32 p-3 border rounded-lg text-xs overflow-auto ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-green-400' 
                    : 'bg-gray-50 border-gray-300 text-green-600'
                }`}>
                  {demoOutput || 'Results will appear here...'}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Terminal Content
  const TerminalContent = () => {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
      '~ Welcome to VISHNU.DEV Terminal',
      '~ Type "help" for available commands',
      ''
    ]);

    const commands = {
      help: () => [
        'Available commands:',
        '  help     - Show this help message',
        '  about    - Display information about Vishnu',
        '  skills   - List technical skills',
        '  projects - Show recent projects',
        '  contact  - Display contact information',
        '  clear    - Clear terminal screen',
        '  whoami   - Display current user info',
        ''
      ],
      about: () => [
        'Vishnu - Full Stack Developer & AI Engineer',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '• 5+ years of professional experience',
        '• Specialized in React, Node.js, Python, and AI/ML',
        '• Passionate about creating intelligent solutions',
        '• Based in India, working globally',
        ''
      ],
      skills: () => [
        'Technical Skills:',
        '━━━━━━━━━━━━━━',
        'Frontend: React, Next.js, Vue.js, TypeScript',
        'Backend: Node.js, Python, Django, Express',
        'AI/ML: TensorFlow, PyTorch, Scikit-learn',
        'Database: MongoDB, PostgreSQL, Redis',
        'Cloud: AWS, Docker, Kubernetes',
        'Tools: Git, VS Code, Postman',
        ''
      ],
      projects: () => [
        'Recent Projects:',
        '━━━━━━━━━━━━━━━',
        '1. SpineSight AI - Medical imaging platform',
        '2. EcoTracker Pro - Sustainability tracking',
        '3. Neural Chat Engine - AI-powered chat',
        '4. CloudDeploy Suite - DevOps automation',
        '5. DataViz Studio - Analytics platform',
        ''
      ],
      contact: () => [
        'Contact Information:',
        '━━━━━━━━━━━━━━━━━━━',
        'Email: vishnu@example.com',
        'GitHub: github.com/vishnu-dev',
        'LinkedIn: linkedin.com/in/vishnu-dev',
        'Portfolio: vishnu.dev',
        ''
      ],
      whoami: () => [
        'vishnu@dev-machine:~$ Full Stack Developer',
        'Permissions: sudo, create, innovate, debug',
        'Status: Online and ready to build amazing things!',
        ''
      ],
      clear: () => {
        setHistory([]);
        return [];
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!input.trim()) return;

      const cmd = input.trim().toLowerCase();
      const newHistory = [...history, `~ ${input}`];

      if (commands[cmd]) {
        const output = commands[cmd]();
        setHistory([...newHistory, ...output]);
      } else {
        setHistory([...newHistory, `Command not found: ${input}`, 'Type "help" for available commands', '']);
      }

      setInput('');
    };

    return (
      <div className="h-full flex flex-col font-mono text-sm">
        <div className="flex-1 overflow-y-auto p-4 bg-black text-green-400">
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {line}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex items-center p-4 bg-black border-t border-gray-800">
          <span className="text-green-400 mr-2">~$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-green-400 outline-none"
            placeholder="Enter command..."
            autoFocus
          />
        </form>
      </div>
    );
  };

  // Contact Content
  const ContactContent = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 3000);
    };

    const socialLinks = [
      { name: 'GitHub', icon: Github, url: '#', color: 'hover:text-gray-900' },
      { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-600' },
      { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-blue-400' },
      { name: 'Email', icon: Mail, url: 'mailto:vishnu@example.com', color: 'hover:text-red-500' }
    ];

    return (
      <div className="space-y-8 max-h-full overflow-y-auto">
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Let's Connect
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Ready to collaborate on your next project or just want to say hello?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className={`${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'} rounded-xl p-6`}>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
              Send Message
            </h3>
            
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  Message Sent!
                </h4>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Thanks for reaching out. I'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full p-3 border rounded-lg ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full p-3 border rounded-lg ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className={`w-full p-3 border rounded-lg resize-none ${
                      darkMode 
                        ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            <div className={`${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Get in Touch
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    vishnu@example.com
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    India (Working Globally)
                  </span>
                </div>
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Follow Me
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`flex items-center gap-3 p-3 rounded-lg border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:scale-105 ${
                      darkMode ? 'border-gray-600 hover:border-gray-500 text-gray-300' : 'text-gray-600'
                    } ${social.color}`}
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="font-medium">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className={`${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'} rounded-xl p-6`}>
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Quick Stats
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <AnimatedCounter end={24} />h
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Response Time</div>
                </div>
                
                <div className="text-center">
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    <AnimatedCounter end={100} />%
                  </div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Project Success</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render logic
  if (currentView === 'boot') {
    return <BootScreen />;
  }

  return <Desktop />;
};

export default VishnuDeveloperOS;