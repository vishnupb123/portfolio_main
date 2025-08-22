import React, { useState, useEffect, useRef } from 'react';
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
  Briefcase
} from 'lucide-react';

const VishnuDeveloperOS = () => {
  const [currentView, setCurrentView] = useState('boot');
  const [darkMode, setDarkMode] = useState(true);
  const [openWindows, setOpenWindows] = useState([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [bootText, setBootText] = useState('');

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

  // Particle background component
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
      
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2
        });
      }
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = darkMode 
            ? `rgba(59, 130, 246, ${particle.opacity})` 
            : `rgba(99, 102, 241, ${particle.opacity})`;
          ctx.fill();
        });
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }, [darkMode]);
    
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
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <ParticleBackground />
      <div className="relative z-10 text-center">
        <div className="mb-8">
          <h1 className={`text-6xl font-bold mb-4 transition-all duration-1000 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            VISHNU.DEV
          </h1>
          <div className={`h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto transition-all duration-2000 ${bootText ? 'w-full' : 'w-0'}`} />
        </div>
        
        <div className={`text-lg mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {bootText}
        </div>
        
        {bootComplete && (
          <button
            onClick={() => setCurrentView('desktop')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Enter System
          </button>
        )}
      </div>
    </div>
  );

  // Window component for OS-style interfaces
  const Window = ({ title, children, onClose, className = "" }) => (
    <div className={`fixed inset-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-2xl z-50 ${className} transition-all duration-300 backdrop-blur-sm`}>
      <div className={`flex items-center justify-between p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
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
    const apps = [
      { id: 'dashboard', name: 'Dashboard', icon: Monitor, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
      { id: 'projects', name: 'Projects', icon: Code, color: 'bg-gradient-to-br from-green-500 to-green-600' },
      { id: 'ailab', name: 'AI Lab', icon: Brain, color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
      { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'bg-gradient-to-br from-gray-700 to-gray-800' },
      { id: 'contact', name: 'Contact', icon: Mail, color: 'bg-gradient-to-br from-red-500 to-red-600' },
    ];

    const openWindow = (appId) => {
      if (!openWindows.includes(appId)) {
        setOpenWindows([...openWindows, appId]);
      }
    };

    const closeWindow = (appId) => {
      setOpenWindows(openWindows.filter(id => id !== appId));
    };

    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} relative transition-colors duration-300`}>
        <ParticleBackground />
        
        {/* Desktop Grid */}
        <div className="relative z-10 p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-md">
            {apps.map((app, index) => (
              <div
                key={app.id}
                className="flex flex-col items-center gap-2 cursor-pointer transition-all hover:scale-110 group"
                onClick={() => openWindow(app.id)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-16 h-16 ${app.color} rounded-xl flex items-center justify-center shadow-lg transition-all hover:shadow-xl group-hover:rotate-3`}>
                  <app.icon className="text-white" size={32} />
                </div>
                <span className={`text-sm ${darkMode ? 'text-white' : 'text-gray-900'} transition-all group-hover:text-blue-500`}>
                  {app.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Taskbar */}
        <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800/80' : 'bg-white/80'} backdrop-blur-sm border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-2`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 ${darkMode ? 'text-white' : 'text-gray-900'} font-mono text-sm font-bold`}>
                VISHNU.DEV OS
              </div>
              {openWindows.map(windowId => (
                <button
                  key={windowId}
                  className={`px-3 py-1 rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'} text-sm transition-all hover:bg-opacity-80 hover:scale-105`}
                >
                  {apps.find(app => app.id === windowId)?.name}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded transition-all ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'} hover:scale-110`}
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <div className={`px-3 py-1 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

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
                  className={darkMode ? 'bg-gray-900' : 'bg-gray-800'}
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
              {demos.find(d => d.id === selectedDemo)?.title} Demo
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Input
                </label>
                <textarea
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  placeholder={demos.find(d => d.id === selectedDemo)?.inputPlaceholder}
                  className={`w-full h-32 p-4 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button
                  onClick={runDemo}
                  disabled={isProcessing || !demoInput.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap size={16} />
                      Run Demo
                    </>
                  )}
                </button>
              </div>
              
              <div className="space-y-4">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Output
                </label>
                <pre className={`w-full h-40 p-4 rounded-lg border text-sm overflow-auto transition-all font-mono ${
                  darkMode ? 'bg-gray-800 border-gray-600 text-green-400' : 'bg-gray-50 border-gray-300 text-gray-900'
                }`}>
                  {demoOutput || 'AI output will appear here after processing...'}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Terminal content
  const TerminalContent = () => {
    const [currentInput, setCurrentInput] = useState('');
    const [history, setHistory] = useState([
      { type: 'system', content: '██╗   ██╗██╗███████╗██╗  ██╗███╗   ██╗██╗   ██╗    ██████╗ ███████╗██╗   ██╗' },
      { type: 'system', content: '██║   ██║██║██╔════╝██║  ██║████╗  ██║██║   ██║    ██╔══██╗██╔════╝██║   ██║' },
      { type: 'system', content: '██║   ██║██║███████╗███████║██╔██╗ ██║██║   ██║    ██║  ██║█████╗  ██║   ██║' },
      { type: 'system', content: '╚██╗ ██╔╝██║╚════██║██╔══██║██║╚██╗██║██║   ██║    ██║  ██║██╔══╝  ╚██╗ ██╔╝' },
      { type: 'system', content: ' ╚████╔╝ ██║███████║██║  ██║██║ ╚████║╚██████╔╝    ██████╔╝███████╗ ╚████╔╝ ' },
      { type: 'system', content: '  ╚═══╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝     ╚═════╝ ╚══════╝  ╚═══╝  ' },
      { type: 'system', content: '' },
      { type: 'system', content: 'Welcome to Vishnu Developer Terminal v2.0' },
      { type: 'system', content: 'Enhanced with AI capabilities | Type "help" for commands' },
      { type: 'system', content: '' }
    ]);

    const commands = {
      help: `Available commands:
├── System Commands
│   ├── help          Show this help menu
│   ├── clear         Clear terminal screen
│   ├── whoami        Display user information
│   └── date          Show current date and time
├── Portfolio Commands
│   ├── projects      List all projects
│   ├── skills        Display technical skills
│   ├── experience    Show work experience
│   └── contact       Contact information
├── AI Commands
│   ├── ai-status     Check AI system status
│   ├── models        List available AI models
│   └── ask [query]   Ask AI a question
└── Fun Commands
    ├── matrix        Enter the matrix
    ├── hack          Simulate hacking sequence
    └── coffee        Essential developer fuel status`,
      
      ls: `total 42
drwxr-xr-x  8 vishnu staff   256 Aug 22 2025 ./
drwxr-xr-x  3 root   staff    96 Aug 22 2025 ../
-rw-r--r--  1 vishnu staff  2048 Aug 22 2025 about.txt
drwxr-xr-x  4 vishnu staff   128 Aug 22 2025 projects/
drwxr-xr-x  3 vishnu staff    96 Aug 22 2025 skills/
drwxr-xr-x  2 vishnu staff    64 Aug 22 2025 ai-models/
-rw-r--r--  1 vishnu staff  1024 Aug 22 2025 resume.pdf
-rw-r--r--  1 vishnu staff   512 Aug 22 2025 contact.vcard`,

      projects: `📁 Active Projects:
┌─────────────────────────────────────────────────────────────────┐
│ 🧠 SpineSight AI        │ Status: Live      │ Users: 2.5K+      │
│ 🌍 EcoTracker Pro       │ Status: Live      │ Users: 15K+       │
│ 💬 Neural Chat Engine   │ Status: Demo      │ Users: 850+       │
│ ☁️  CloudDeploy Suite    │ Status: Beta      │ Users: 1.2K+      │
│ 📊 DataViz Studio       │ Status: Live      │ Users: 5.6K+      │
│ 📚 SmartLearn AI        │ Status: Live      │ Users: 8.9K+      │
└─────────────────────────────────────────────────────────────────┘
Total Impact: 34K+ users | $2.5M+ revenue generated`,

      skills: `🛠️ Technical Skills Matrix:
╭─────────────────────────────────────────────────────────────────╮
│ Frontend Development                                            │
│ ██████████████████████ React/Next.js        95%               │
│ ████████████████████   TypeScript           88%               │
│ ██████████████████     Vue.js               82%               │
│                                                                 │
│ Backend Development                                             │
│ ██████████████████████ Node.js/Express      92%               │
│ ██████████████████████ Python/Django        90%               │
│ ████████████████       Go                   75%               │
│                                                                 │
│ AI/Machine Learning                                             │
│ ██████████████████████ TensorFlow/PyTorch   85%               │
│ ████████████████████   Computer Vision      83%               │
│ ██████████████████     NLP                  80%               │
│                                                                 │
│ Cloud & DevOps                                                  │
│ ██████████████████     AWS/Azure            82%               │
│ ████████████████       Docker/K8s           78%               │
│ █████████████          Terraform            70%               │
╰─────────────────────────────────────────────────────────────────╯`,

      experience: `💼 Professional Journey:
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🏢 TechCorp Solutions                                           ┃
┃ 👨‍💻 Senior Full Stack Developer              2022 - Present      ┃
┃ • Lead AI-powered web application development                   ┃
┃ • Implemented microservices architecture                       ┃
┃ • Mentored 5+ junior developers                                ┃
┃ • Improved system performance by 40%                           ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🧪 AI Innovations Lab                                           ┃
┃ 🤖 Machine Learning Engineer                2020 - 2022        ┃
┃ • Developed computer vision models for medical imaging         ┃
┃ • Created NLP solutions for customer automation               ┃
┃ • Published 3 research papers on deep learning                ┃
┃ • Deployed 15+ ML models to production                        ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`,

      contact: `📬 Contact Information:
╔══════════════════════════════════════════════════════════════════╗
║ 📧 Email    │ vishnu@developer.com                               ║
║ 💼 LinkedIn │ linkedin.com/in/vishnu-dev                         ║
║ 🐙 GitHub   │ github.com/vishnu-dev                              ║
║ 🐦 Twitter  │ @vishnu_dev                                        ║
║ 🌍 Location │ Available for remote work worldwide                ║
║ 🕐 Timezone │ UTC+5:30 (India Standard Time)                    ║
║ 💡 Status   │ Open to new opportunities                          ║
╚══════════════════════════════════════════════════════════════════╝`,

      whoami: `vishnu-developer
├── Full Stack Developer & AI Engineer
├── 5+ years of professional experience
├── Specialist in React, Node.js, Python, AI/ML
├── Published researcher in computer vision
├── Open source contributor
└── Coffee enthusiast ☕`,

      date: new Date().toLocaleString(),

      'ai-status': `🤖 AI System Status:
┌─────────────────────────────────────────┐
│ System Status: ✅ Online                │
│ Models Loaded: 3/3                      │
│ GPU Usage: 45%                          │
│ Memory Usage: 2.1GB / 8GB               │
│ Response Time: ~0.8s avg                │
│ Accuracy Rate: 94.2%                    │
└─────────────────────────────────────────┘`,

      models: `🧠 Available AI Models:
┌─────────────────────────────────────────────────────────────┐
│ Model Name         │ Type           │ Status   │ Accuracy   │
├─────────────────────────────────────────────────────────────┤
│ SpineSight-v2.1    │ Computer Vision│ Active   │ 94.5%      │
│ SentimentPro-v1.5  │ NLP           │ Active   │ 89.2%      │
│ TextGen-GPT-v3     │ Language Model│ Active   │ 92.1%      │
│ CodeAssist-v1.2    │ Code Analysis │ Standby  │ 87.8%      │
└─────────────────────────────────────────────────────────────┘`,

      matrix: `Wake up, Neo...
The Matrix has you...
Follow the white rabbit.

Knock, knock, Neo.

The Matrix is everywhere. It is all around us. Even now, in this very room.
You can see it when you look out your window or when you turn on your television.
You can feel it when you go to work... when you go to church... when you pay your taxes.`,

      hack: `[INITIATING HACK SEQUENCE...]
> Scanning network topology...
> Exploiting buffer overflow in target system...
> Bypassing firewall protocols...
> Accessing mainframe database...
> Downloading classified files...
> Covering digital footprints...

[ACCESS GRANTED] 
Just kidding! This is a portfolio demo 😄
Remember: Use your powers for good, not evil!`,

      coffee: `☕ Coffee Status Report:
┌─────────────────────────────────────────┐
│ Current Level: ████████░░ 80%           │
│ Type: Double Shot Espresso              │
│ Temperature: Perfect ☕                  │
│ Productivity Boost: +150%               │
│ Lines of Code Written: 2,847            │
│ Bugs Fixed: 23                          │
│ Next Refill: In 45 minutes              │
└─────────────────────────────────────────┘
Status: Optimal coding conditions maintained`,

      clear: 'clear'
    };

    const executeCommand = (cmd) => {
      const trimmedCmd = cmd.trim();
      const [command, ...args] = trimmedCmd.toLowerCase().split(' ');
      
      setHistory(prev => [...prev, { type: 'input', content: `┌──(vishnu@devos)-[~]` }, { type: 'input', content: `└─$ ${cmd}` }]);
      
      if (commands[command]) {
        if (command === 'clear') {
          setHistory([]);
        } else {
          setHistory(prev => [...prev, { type: 'output', content: commands[command] }]);
        }
      } else if (command === 'ask') {
        const question = args.join(' ');
        if (question) {
          const responses = [
            `🤖 AI Response: "${question}" - Great question! As an AI-powered developer, I believe the key is combining technical expertise with creative problem-solving.`,
            `🤖 AI Response: Regarding "${question}" - This touches on cutting-edge technology. My experience shows that innovation happens at the intersection of AI and human creativity.`,
            `🤖 AI Response: You asked about "${question}" - From my work in AI/ML, I can say that the future lies in building intelligent systems that augment human capabilities.`,
            `🤖 AI Response: Interesting query: "${question}" - Based on my portfolio projects, I've found that user-centric design combined with powerful AI creates the most impact.`
          ];
          const randomResponse = responses[Math.floor(Math.random() * responses.length)];
          setHistory(prev => [...prev, { type: 'ai', content: randomResponse }]);
        } else {
          setHistory(prev => [...prev, { type: 'error', content: 'Usage: ask [your question]' }]);
        }
      } else if (trimmedCmd) {
        setHistory(prev => [...prev, { 
          type: 'error', 
          content: `Command not found: ${command}
Did you mean one of these?
  • help     - Show available commands
  • projects - View project portfolio  
  • skills   - Display technical skills
  • contact  - Get contact information` 
        }]);
      }
      setCurrentInput('');
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        executeCommand(currentInput);
      } else if (e.key === 'Tab') {
        e.preventDefault();
        // Simple autocomplete
        const availableCommands = Object.keys(commands);
        const matches = availableCommands.filter(cmd => cmd.startsWith(currentInput.toLowerCase()));
        if (matches.length === 1) {
          setCurrentInput(matches[0]);
        }
      }
    };

    return (
      <div className="h-full bg-gray-900 text-green-400 font-mono p-6 overflow-auto">
        <div className="space-y-1">
          {history.map((entry, index) => (
            <div
              key={index}
              className={`${
                entry.type === 'input' ? 'text-cyan-400' : 
                entry.type === 'system' ? 'text-yellow-400' : 
                entry.type === 'error' ? 'text-red-400' :
                entry.type === 'ai' ? 'text-purple-400' :
                'text-green-400'
              } whitespace-pre-wrap`}
            >
              {entry.content.split('\n').map((line, lineIndex) => (
                <div key={lineIndex}>{line}</div>
              ))}
            </div>
          ))}
        </div>
        
        <div className="flex items-center mt-4">
          <span className="text-cyan-400">┌──(vishnu@devos)-[~]</span>
        </div>
        <div className="flex items-center">
          <span className="text-cyan-400">└─$ </span>
          <input
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-transparent outline-none text-green-400 ml-1 font-mono"
            placeholder="Type 'help' for commands..."
            autoFocus
          />
          <span className="animate-pulse text-green-400">█</span>
        </div>
      </div>
    );
  };

  // Contact content
  const ContactContent = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async () => {
      setSending(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const socials = [
      { 
        name: 'GitHub', 
        icon: Github, 
        url: 'https://github.com/vishnu-dev', 
        color: 'bg-gradient-to-br from-gray-800 to-gray-900',
        username: '@vishnu-dev',
        followers: '2.1K',
        description: 'Open source projects & contributions'
      },
      { 
        name: 'LinkedIn', 
        icon: Linkedin, 
        url: 'https://linkedin.com/in/vishnu-dev', 
        color: 'bg-gradient-to-br from-blue-600 to-blue-700',
        username: 'vishnu-dev',
        followers: '5.8K',
        description: 'Professional network & career updates'
      },
      { 
        name: 'Twitter', 
        icon: Twitter, 
        url: 'https://twitter.com/vishnu_dev', 
        color: 'bg-gradient-to-br from-blue-400 to-blue-500',
        username: '@vishnu_dev',
        followers: '3.2K',
        description: 'Tech insights & industry thoughts'
      },
    ];

    const quickContacts = [
      {
        icon: Mail,
        label: 'Email',
        value: 'vishnu@developer.com',
        action: 'mailto:vishnu@developer.com'
      },
      {
        icon: MapPin,
        label: 'Location',
        value: 'Available Worldwide',
        action: null
      },
      {
        icon: Calendar,
        label: 'Timezone',
        value: 'UTC+5:30 (IST)',
        action: null
      }
    ];

    return (
      <div className="space-y-8 max-h-full overflow-y-auto">
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
            Let's Connect
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Ready to collaborate on your next project? I'd love to hear from you and discuss how we can work together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className={`${darkMode ? 'bg-gray-700/30' : 'bg-gray-50'} rounded-xl p-6`}>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
              <Mail className="w-5 h-5 text-blue-500" />
              Send Message
            </h3>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full p-3 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full p-3 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={`w-full p-3 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Project discussion, collaboration, etc."
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows="5"
                  className={`w-full p-3 rounded-lg border transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                  placeholder="Tell me about your project, requirements, timeline, or any questions you have..."
                />
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={sending || !formData.name || !formData.email || !formData.subject || !formData.message}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                  sending 
                    ? 'bg-gray-500 cursor-not-allowed text-white' 
                    : sent
                    ? 'bg-green-500 text-white transform scale-105'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transform hover:scale-105 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none'
                }`}
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending Message...
                  </>
                ) : sent ? (
                  <>
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-1 bg-green-500 rounded"></div>
                    </div>
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    <Mail size={16} />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact Info & Social */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div>
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Quick Contact
              </h3>
              <div className="space-y-3">
                {quickContacts.map((contact) => (
                  <div 
                    key={contact.label}
                    className={`flex items-center gap-4 p-4 ${darkMode ? 'bg-gray-700/30' : 'bg-gray-100'} rounded-lg transition-all hover:scale-105 ${contact.action ? 'cursor-pointer hover:shadow-lg' : ''}`}
                    onClick={() => contact.action && window.open(contact.action, '_blank')}
                  >
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <contact.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {contact.label}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {contact.value}
                      </div>
                    </div>
                    {contact.action && <ExternalLink className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'} ml-auto`} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                Social Presence
              </h3>
              <div className="space-y-4">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 ${social.color} text-white rounded-xl transition-all hover:scale-105 hover:shadow-xl group`}
                  >
                    <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                      <social.icon size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg">{social.name}</div>
                      <div className="text-white/80 text-sm">{social.username}</div>
                      <div className="text-white/60 text-xs mt-1">{social.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{social.followers}</div>
                      <div className="text-white/60 text-xs">followers</div>
                    </div>
                    <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <div className={`${darkMode ? 'bg-green-900/20 border-green-500/30' : 'bg-green-50 border-green-200'} border rounded-xl p-6`}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <h4 className={`font-semibold ${darkMode ? 'text-green-400' : 'text-green-800'}`}>
                  Currently Available
                </h4>
              </div>
              <p className={`text-sm ${darkMode ? 'text-green-300' : 'text-green-700'} mb-4`}>
                Open to new opportunities and exciting projects. Let's build something amazing together!
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-800'}`}>Response Time</div>
                  <div className={`${darkMode ? 'text-green-300' : 'text-green-700'}`}>Within 24 hours</div>
                </div>
                <div>
                  <div className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-800'}`}>Project Type</div>
                  <div className={`${darkMode ? 'text-green-300' : 'text-green-700'}`}>Full-stack & AI/ML</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-sans">
      {currentView === 'boot' ? <BootScreen /> : <Desktop />}
    </div>
  );
};

export default VishnuDeveloperOS;