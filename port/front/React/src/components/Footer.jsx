import { useState } from 'react';

const Footer = ({ isMobile }) => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    {
      name: 'GitHub Personal',
      url: 'https://github.com/kimbentyambut', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:text-gray-300'
    },
     {
      name: 'GitHub Academic',
      url: 'https://github.com/Kibent1234', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      color: 'hover:text-gray-300'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kevin-yabut-85407a253/', 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      url: 'mailto:kvnyabut@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'hover:text-purple-400'
    }
  ];

  const quickLinks = [
    { name: 'Tech Stack', section: 1 },
    { name: 'Projects', section: 2 },
    { name: 'Playground', section: 3 },
    { name: 'Contact', section: 4 }
  ];

  const scrollToSection = (sectionIndex) => {
    const windowHeight = window.innerHeight;
    const targetScrollY = windowHeight * sectionIndex;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative w-full bg-gradient-to-t from-black/80 via-purple-900/20 to-transparent backdrop-blur-sm border-t border-purple-500/30">
   
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-pink-900/10 to-purple-900/10 animate-pulse"></div>
      
      <div className={`relative z-10 ${isMobile ? 'px-4 py-3' : 'px-8 py-4'} max-w-6xl mx-auto`}>
      
        <div className={`grid gap-4 ${isMobile ? 'grid-cols-1 text-center' : 'grid-cols-1 md:grid-cols-3'}`}>
    
          <div className={`space-y-2 ${isMobile ? '' : 'md:text-left'}`}>
            <div className="flex items-center justify-center md:justify-start space-x-2">
              <div className="w-7 h-7 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">K</span>
              </div>
              <h3 className="text-lg font-bold text-white">Kevin Yabut</h3>
            </div>
            <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-xs'} max-w-md`}>
              Junior developer creating innovative solutions.
            </p>
            
 
            <div className="flex flex-wrap justify-center md:justify-start gap-1">
              {['Back-End', 'Front-End', 'AI/ML' , 'Automations' , 'Webscraping', 'Analytics', 'Java Developer'].map((tech) => (
                <span 
                  key={tech}
                  className="px-2 py-0.5 bg-purple-600/30 text-purple-300 rounded-full text-xs border border-purple-500/30 hover:bg-purple-600/50 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

  
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white text-center md:text-left ml-5">Quick Navigation</h4>
            <nav className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-1">
              {quickLinks.map((link, index) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.section)}
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-xs text-center"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

 
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white text-center md:text-left">Connect</h4>
            
        
            <div className="flex justify-center md:justify-start space-x-2">
              {socialLinks.map((social, index) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  className={`p-1.5 bg-white/10 rounded border border-purple-500/30 text-gray-400 
                    ${social.color} transform transition-all duration-300 flex items-center justify-center
                    ${hoveredSocial === index ? 'scale-110 shadow-lg shadow-purple-500/25' : 'hover:scale-105'}
                  `}
                  aria-label={social.name}
                >
                  <div className="w-3.5 h-3.5 flex items-center justify-center">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>

        
            <div className="flex items-center justify-center md:justify-start space-x-1.5">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-400 text-xs">Available</span>
            </div>
          </div>
        </div>

        
        <div className={`mt-4 pt-3 border-t border-purple-500/30 ${isMobile ? 'text-center' : 'flex justify-between items-center'}`}>
          <div className={`text-gray-500 ${isMobile ? 'text-xs mb-2' : 'text-xs'}`}>
            <span>© {new Date().getFullYear()} Kevin Yabut • Built with React & Node.js • This Portfolio Utilizes Github and Render's free services for hosting.</span>
          </div>
     
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`group flex items-center space-x-1 text-gray-400 hover:text-purple-400 transition-all duration-300
              ${isMobile ? 'justify-center' : ''}`}
          >
            <span className="text-xs">Top</span>
            <div className="p-1 bg-purple-600/30 rounded border border-purple-500/30 group-hover:bg-purple-600/50 transition-colors duration-300">
              <svg className="w-2.5 h-2.5 transform group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </button>
        </div>


        <div className="absolute top-0 left-1/4 w-px h-6 bg-gradient-to-b from-purple-500/50 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-6 bg-gradient-to-b from-pink-500/50 to-transparent"></div>
      </div>
    </footer>
  );
};

export default Footer;