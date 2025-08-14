import { useState, useEffect } from 'react';

// Add these styles to your CSS file or include them in a <style> tag
const customStyles = `
  button:focus,
  button:active,
  div:focus,
  div:active,
  *:focus,
  *:active {
    outline: none !important;
    box-shadow: none !important;
    border: none !important;
  }
  
  button::-moz-focus-inner {
    border: 0 !important;
  }
  
  /* Remove text selection highlight */
  .no-select {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }
`;

const Navbar = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 0, name: 'Home', icon: '' },
    { id: 1, name: 'Tech Stack', icon: '' },
    { id: 2, name: 'Projects', icon: '' },
    { id: 3, name: 'Contact', icon: '' }
  ];

  const scrollToSection = (sectionId) => {
    const windowHeight = window.innerHeight;
    let targetScroll = 0;

    switch (sectionId) {
      case 0:
        targetScroll = 0;
        break;
      case 1:
        targetScroll = windowHeight * 0.98;
        break;
      case 2:
        targetScroll = windowHeight * 2;
        break;
      case 3:
        targetScroll = windowHeight * 3.05;
        break;
      default:
        targetScroll = 0;
    }

    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    setIsMobileMenuOpen(false);
    if (onNavigate) onNavigate(sectionId);
  };

  return (
    <>

      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg shadow-blue-500/10'
            : 'bg-white/5 backdrop-blur-sm'
        }`}
      >
     <div className="max-w-7xl mx-auto px--10">

        <div className="flex items-center justify-center h-20">

    
          <div 
            className="flex items-center space-x-4 cursor-pointer group no-select"
            onClick={() => scrollToSection(0)}
          >
            <div className="relative ">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 group-hover:border-blue-300/50 transition-all duration-300 shadow-lg">
                <span className="text-white font-bold text-xl drop-shadow-lg">K</span>
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-400/30 to-cyan-300/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300"></div>
            </div>
            <div className="hidden sm:block ">
              <span className="text-white font-bold text-2xl group-hover:text-blue-200 transition-colors duration-300 drop-shadow-lg">
                Kevin
              </span>
              <div className="text-blue-200/90 text-sm font-medium drop-shadow">Developer</div>
            </div>
          </div>

           <div className="hidden md:flex flex-1 justify-center space-x-8 -ml-38">
  {navItems.map((item) => (
    <button
      key={item.id}
      onClick={() => scrollToSection(item.id)}
      className={`text-lg font-semibold transition-colors duration-300 flex items-center space-x-2 no-select ${
        activeSection === item.id
          ? 'text-white'
          : 'text-white/80 hover:text-white'
      }`}
    >
      <span>{item.icon}</span>
      <span>{item.name}</span>
    </button>
  ))}
</div>

        
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/90 hover:text-white p-3 rounded-xl hover:bg-white/20 hover:backdrop-blur-md transition-all duration-300 border border-white/20 backdrop-blur-md shadow-md shadow-blue-400/10 no-select"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 drop-shadow-sm ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isMobileMenuOpen
              ? 'max-h-80 opacity-100 pb-6'
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white/15 backdrop-blur-xl rounded-2xl mt-4 border border-white/30 shadow-xl shadow-blue-500/10 overflow-hidden">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative w-full px-6 py-4 text-left transition-all duration-300 flex items-center space-x-4 overflow-hidden group no-select ${
                  activeSection === item.id
                    ? 'bg-white/25 backdrop-blur-md text-white border-l-4 border-blue-300 shadow-lg shadow-blue-400/20'
                    : 'text-white/90 hover:text-white hover:bg-white/20 hover:backdrop-blur-md'
                } ${index !== navItems.length - 1 ? 'border-b border-white/10' : ''}`}
              >
               
                {activeSection === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/15 via-cyan-300/15 to-transparent"></div>
                )}
                
           
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-full group-hover:translate-x-[-100%] transition-transform duration-500"></div>
                
                <span className="text-xl relative z-10 drop-shadow-sm">{item.icon}</span>
                <span className="font-semibold relative z-10 drop-shadow-sm">{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;