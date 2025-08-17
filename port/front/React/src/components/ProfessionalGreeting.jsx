import { useState, useEffect, useRef } from 'react'

import profilePic from "../assets/test.png";  
import profilePic2 from "../assets/Image2.png";
import Resume from "../assets/resume.pdf"
import { profile } from '@tensorflow/tfjs';
import LikeButton from './LikeButton';

const ProfessionalGreeting = ({ name = "Kevin" }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const fullText = `Hello there! I'm ${name}`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

   const scrollToSection = (sectionIndex) => {
    const windowHeight = window.innerHeight;
    const targetScrollY = windowHeight * sectionIndex;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, fullText]);

  return (
    <div className={`${isMobile ? 'mb-4 mt-4 px-2' : 'mb-3'}`}>
      <div className={`font-light ${isMobile ? 'text-sm mb-2' : 'text-lg mb-1'}`}>
        <span className="shiny-text">WELCOME TO MY WORLD ✨</span>
      </div>
      <h1 className={`font-bold leading-tight ${isMobile ? 'text-xl sm:text-2xl mb-3 break-words' : 'text-4xl md:text-6xl mb-2'}`}>
        <span className="shiny-text">{displayText}</span>
        {!isComplete && (
          <span className="animate-pulse text-purple-300 ml-1">|</span>
        )}
      </h1>
    </div>
  );
};

const StylizedProfilePicture = ({ 
  frontImage, 
  backImage, 
  frontAlt = "Profile Picture", 
  backAlt = "Hidden Image" 
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseDown = (e) => {
    if (isMobile) return;
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || isMobile) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleDoubleClick = () => {
    setIsFlipped(!isFlipped);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (isDragging && !isMobile) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, isMobile]);

  return (
    <div className="relative">
      <div
        className={`relative transition-transform duration-300 ${
          isMobile ? 'cursor-pointer' : 'cursor-grab active:cursor-grabbing'
        } ${isDragging ? 'scale-105' : 'scale-100'}`}
        style={{
          transform: isMobile ? 'none' : `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        onClick={isMobile ? handleDoubleClick : undefined}
      >
        <div className="relative">
          <div className={`bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-3xl p-1 shadow-2xl shadow-purple-900/50 transform hover:rotate-6 transition-transform duration-500 ${
            isMobile ? 'w-56 h-72 rotate-6' : 'w-80 h-96 rotate-12'
          }`}>
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl overflow-hidden relative">
              <div className="absolute inset-4 rounded-2xl overflow-hidden">
                <div 
                  className={`w-full h-full transition-transform duration-700 transform-gpu ${
                    isFlipped ? 'rotate-y-180' : 'rotate-y-0'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={frontImage}
                    alt={frontAlt}
                    className="absolute inset-0 w-full h-full object-cover backface-hidden rounded-2xl"
                    draggable={false}
                  />
                  
                  <img
                    src={backImage}
                    alt={backAlt}
                    className="absolute inset-0 w-full h-full object-cover backface-hidden rotate-y-180 rounded-2xl"
                    draggable={false}
                  />
                </div>
              </div>
              
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/30 rounded-full"></div>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
          </div>
          
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-lg transform rotate-45 animate-pulse"></div>
          <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-pink-400 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 -left-8 w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
        </div>
      </div>
      
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        <div className={`text-white/60 ${isMobile ? 'text-xs' : 'text-xs'}`}>
          {isMobile ? 'Tap to flip' : 'Drag • Double-click to flip'}
        </div>
      </div>
    </div>
  );
};

const SocialIcons = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const socialLinks = [
    {
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
      label: "LinkedIn",
      color: "from-blue-600 to-blue-700",
      url: "https://www.linkedin.com/in/kevin-yabut-85407a253/",
    },
    {
      icon: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg",
      label: "Facebook",
      color: "from-sky-400 to-blue-500",
      url: "https://www.facebook.com/kevin.king.yabut/",
    },
  ];

  return (
    <div className={`flex ${isMobile ? 'space-x-3 justify-center' : 'space-x-4'}`}>
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`rounded-full bg-gradient-to-r ${social.color} shadow-lg hover:scale-110 transition-transform flex items-center justify-center ${
            isMobile ? 'p-2.5' : 'p-3'
          }`}
          title={social.label}
        >
          <img 
            src={social.icon} 
            alt={social.label} 
            className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'}`} 
          />
        </a>
      ))}
    </div>
  );
};

const ActionButtons = ({ resumeUrl, onProjectsClick }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);

    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Kevin-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setIsDownloading(false), 2000);
  };

  const scrollToProjects = () => {
    const windowHeight = window.innerHeight;
    const targetScrollY = windowHeight * (isMobile ? 2 : 1.91); 
    
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`flex gap-3 ${isMobile ? 'flex-col mb-6 w-full max-w-xs mx-auto' : 'flex-col sm:flex-row gap-4 mb-8'}`}>
      <button 
        onClick={scrollToProjects} 
        className={`bg-white text-purple-700 font-semibold hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
          isMobile ? 'px-6 py-3 rounded-lg text-sm w-full' : 'px-8 py-4 rounded-full'
        }`}
      >
        My Projects
      </button>

      <button 
        onClick={handleDownload}
        disabled={isDownloading}
        className={`bg-white text-purple-700 font-semibold hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 ${
          isMobile ? 'px-6 py-3 rounded-lg text-sm w-full' : 'px-8 py-4 rounded-full'
        }`}
      >
        {isDownloading ? 'Downloading...' : 'Download CV'}
      </button>

      <div className={isMobile ? 'w-full flex justify-center' : ''}>
        <LikeButton />
      </div>
    </div>
  );
};

const ProfessionalLandingSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const resumeUrl = Resume;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className={`w-full flex items-center justify-center relative overflow-hidden ${
      isMobile ? 'min-h-screen py-8 px-4' : 'h-screen'
    }`}>
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className={`relative z-10 w-full max-w-7xl mx-auto grid items-center ${
        isMobile ? 'grid-cols-1 gap-6 px-2' : 'px-6 grid-cols-1 lg:grid-cols-2 gap-12'
      }`}>
        
        <div className={`${isMobile ? 'text-center max-w-sm mx-auto' : 'space-y-6'}`}>
          <ProfessionalGreeting name="Kevin" />
          
          <div className={`${isMobile ? 'mb-4' : 'mb-6'}`}>
            <h2 className={`font-bold text-white ${isMobile ? 'text-lg sm:text-xl mb-3' : 'text-3xl md:text-5xl mb-4'}`}>
              <span className="text-purple-300">Junior</span>{' '}
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Developer
              </span>
            </h2>
            <p className={`text-white/80 leading-relaxed ${
              isMobile ? 'text-sm max-w-xs mx-auto' : 'text-lg max-w-lg'
            }`}>
              Passionate Junior Developer & AI enthusiast. I create innovative and visually 
              appealing digital experiences. I transform ideas into seamless designs that meet users' 
              expectations.
            </p>
          </div>

          <ActionButtons resumeUrl={resumeUrl} onProjectsClick={() => scrollToSection(1.9)} />

          <SocialIcons />
        </div>

        <div className={`flex ${isMobile ? 'justify-center mt-2' : 'justify-center lg:justify-end'}`}>
          <StylizedProfilePicture
            frontImage={profilePic}
            backImage={profilePic2}
            frontAlt="Kevin's Professional Photo"
            backAlt="Kevin's Creative Side"
          />
        </div>
      </div>

      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default ProfessionalLandingSection;