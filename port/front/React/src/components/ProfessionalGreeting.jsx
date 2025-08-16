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
  
  const fullText = `Hello there! I'm ${name}`;
  
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
  <div className="mb-6">
    <div className="text-lg mb-2 font-light relative inline-block">
      <span className="shiny-text">WELCOME TO MY WORLD ✨</span>
    </div>
    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-2 relative inline-block">
  <span className="shiny-text">
    {displayText}
  </span>
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

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
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
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div className="relative">
      <div
        className={`relative cursor-grab active:cursor-grabbing transition-transform duration-300 ${
          isDragging ? 'scale-105' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
      >
 
        <div className="relative">
   
          <div className="w-80 h-96 bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-3xl p-1 shadow-2xl shadow-purple-900/50 transform rotate-12 hover:rotate-6 transition-transform duration-500">
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
        <div className="text-xs text-white/60">
          Drag • Double-click to flip
        </div>
      </div>
    </div>
  );
};


const SocialIcons = () => {
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
    <div className="flex space-x-4">
      {socialLinks.map((social, index) => (
        <a
          key={index}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-full bg-gradient-to-r ${social.color} shadow-lg hover:scale-110 transition-transform flex items-center justify-center`}
          title={social.label}
        >
          <img src={social.icon} alt={social.label} className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
};




const ActionButtons = ({ resumeUrl }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);


    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Kevin-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // reset after 2s
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <button className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        My Projects
      </button>
     <button 
  onClick={handleDownload}
  disabled={isDownloading}
  className="bg-white text-purple-700 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
>
  {isDownloading ? 'Downloading...' : 'Download CV'}
</button>

      <LikeButton></LikeButton>
    </div>
  );
};



const ProfessionalLandingSection = () => {

  const resumeUrl = Resume;

  return (
    <section className="w-full h-screen flex items-center justify-center relative overflow-hidden ">
 
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        <div className="space-y-6">
          <ProfessionalGreeting name="Kevin" />
          
        
          <div className="mb-6">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              <span className="text-purple-300">Junior</span>{' '}
              <span className="bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                Developer
              </span>
            </h2>
            <p className="text-white/80 text-lg leading-relaxed max-w-lg">
              Passionate Junior Developer & AI enthusiast. I create innovative and visually 
              appealing digital experiences. I transform ideas into seamless designs that meet users' 
              expectations.
            </p>
          </div>

       
          <ActionButtons resumeUrl={resumeUrl} />

      
          <SocialIcons />
        </div>

     
        <div className="flex justify-center lg:justify-end">
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