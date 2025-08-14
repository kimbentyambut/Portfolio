import { useState, useEffect, useRef } from 'react'
import './App.css'

import profilePic from './assets/test.png'
import pathee from './assets/logo.png'
import tjlogo from './assets/tjlogo.png'
import energinlogo from './assets/energinlogo.png'
import TypingName from "./components/TypingName";
import DraggableProfile from './components/DraggableProfile'
import profilePic2 from './assets/Image2.png'
import TechStackCarousel from './components/TechStackCarousel'
import AIImageClassifier from './components/AIImageClassifier'
import AnimatedDownloadButton from './components/AnimatedDownloadButton';
import Resume from './assets/resume.pdf'
import Navbar from './components/Navbar'
import Tjbroz from './components/projects/Tjbroz'
import Scraper from './components/projects/Webscraping'
import Ocr from './components/projects/Ocr'


const ScrollArrow = ({ direction = "down", text, visible = true, onClick }) => {
  return (
    <div
      className={`fixed bottom-8 right-8 z-20 transition-all duration-1000 cursor-pointer ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center group">
        {/* text */}
        <span className="text-white/80 text-sm font-medium mb-3 group-hover:text-white transition-colors duration-300 text-center">
          {text}
        </span>

        {/* arrow cont */}
        <div className="relative">
          {/* animated arrow */}
          <div className="animate-bounce">
            <svg
              className="w-8 h-8 text-white/80 group-hover:text-white transition-colors duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {direction === "down" ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              )}
            </svg>
          </div>

          {/* glowy */}
          <div className="absolute inset-0 w-8 h-8 bg-blue-400/20 rounded-full blur-lg group-hover:bg-blue-400/40 transition-all duration-300"></div>
        </div>
      </div>
    </div>
  );
};


const ProjectsCarousel = ({ projects, onProjectClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  //auto play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 4000); 

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      {/* header of carousel */}
      <div className="text-center mb-12">
        <h2 className="text-5xl text-[#FEEEEC]/100 font-bold mb-4">
          Corporate Projects 🌌
        </h2>
        <p className="text-xl text-[#FEEEEC]/90">
          Explore my latest work and innovations
        </p>
      </div>

      {/* container of caorusel */}
      <div className="relative">
        {/* carousel main */}
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#e799e7]/70 to-[#e799e7]/10 backdrop-blur-sm  ">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {projects.map((project) => (
              <div key={project.id} className="w-full flex-shrink-0">
                <div className="p-8 md:p-12 lg:p-16">
                  <div className="flex flex-col lg:flex-row items-center gap-8">
                    {/* icon and info of project */}
                    <div className="flex-1 text-center lg:text-left">
                      <div className="mb-6 lg:text-left flex justify-center lg:justify-start">
                        {typeof project.icon === "string" && project.icon.length <= 2 ? (
                          // emoji
                          <span className="text-8xl">{project.icon}</span>
                        ) : (
                          // image
                          <img src={project.icon} alt={project.title} className="w-20 h-20 object-contain" />
                        )}
                      </div>
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-lg">
                        {project.description}
                      </p>

                      {/* explore button  */}
                      <button
                        onClick={() => onProjectClick(project.id)}
                        className={`inline-flex items-center px-8 py-4 rounded-xl bg-gradient-to-r ${project.color} text-white font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 transition-all duration-300 group`}
                      >
                        <span>Explore Project</span>
                        <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>

                    {/* visuals lang */}
                    <div className="flex-1 flex justify-center lg:justify-end">
                      <div
                        className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-cover bg-center opacity-20 animate-pulse"
                        style={{ backgroundImage: `url(${project.bgImage})` }}
                      ></div>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* navigation arrows inside div */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-2 transition-all duration-300 group opacity-70 hover:opacity-100"
          onMouseEnter={() => setIsAutoPlaying(false)}
        >
          <svg className="w-4 h-4 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-2 transition-all duration-300 group opacity-70 hover:opacity-100"
          onMouseEnter={() => setIsAutoPlaying(false)}
        >
          <svg className="w-4 h-4 text-white transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* dots */}
      <div className="flex justify-center mt-8 space-x-3">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
              ? 'bg-white scale-125'
              : 'bg-white/40 hover:bg-white/60'
              }`}
          />
        ))}
      </div>

      {/* auto play */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-white/60 hover:text-white/80 text-sm transition-colors duration-300"
        >
          {isAutoPlaying ? '⏸️ Pause Auto-play' : '▶️ Resume Auto-play'}
        </button>
      </div>
    </div>
  );
};

function App() {
  const [visibleSection, setVisibleSection] = useState(0)
  const [currentView, setCurrentView] = useState('projects') 
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)

  const myTechStack = [
    {
      name: "JavaScript",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "from-yellow-400 to-yellow-600",
      description: "Dynamic web programming"
    },
    {
      name: "Python",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "from-blue-400 to-green-500",
      description: "Backend & AI development"
    },
    {
      name: "Java",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "from-red-500 to-orange-600",
      description: "Enterprise applications"
    },
    {
      name: "React",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "from-cyan-400 to-blue-500",
      description: "Frontend framework"
    },
    {
      name: "Node.js",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "from-green-400 to-emerald-600",
      description: "Server-side JavaScript"
    },
    {
      name: "MySQL",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      color: "from-orange-400 to-blue-600",
      description: "Database management"
    },
    {
      name: "MongoDB",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "from-green-600 to-emerald-700",
      description: "NoSQL database"
    },
    {
      name: "Git",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "from-orange-500 to-red-600", 
      description: "Version control"
    },
    {
      name: "Power BI",
      image: "https://windowsreport.com/wp-content/uploads/2019/08/Can-I-use-Power-Bi-for-Free.jpg",
      color: "from-yellow-400 to-amber-600", 
      description: "Data Visualization"
    },
    {
      name: "Zoho Analytics/CRM",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/ZOHO_logo_2023.svg/2560px-ZOHO_logo_2023.svg.png",
      color: "from-green-400 to-emerald-600",
      description: "Data Visualization"
    },
    {
      name: "Vite",
      image: "https://picperf.io/https://laravelnews.s3.amazonaws.com/images/vite.jpg",
      color: "from-blue-500 to-indigo-700",
      description: "Frontend build tool"
    },
    {
      name: "Artificial Intelligence",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s",
      color: "from-purple-500 to-pink-600", 
      description: "AI Enthusiast"
    },
    {
      name: "Google AppScript",
      image: "https://cdn-icons-png.flaticon.com/512/2965/2965300.png",
      color: "from-purple-500 to-pink-600", 
      description: "Google scripting language"
    }

  ]

  const projectScrollTargets = {
    'ai-classifier': 2,
    'laundry': 2.12,
    'scraper': 2.12,
    'Ocr': 2.12

  }

  const projects = [
    {
      id: 'ai-classifier',
      title: 'Pathee AI Skin Cancer Classifier',
      description: 'Machine learning model for BCC, SQCC and Melanoma cancer detection on HPO using image classification',
      icon: '🔬',
      bgImage: pathee,
      component: 'AIImageClassifier'
    },
    {
      id: 'laundry',
      title: 'Tj Broz Laundry Project (Contractual) ',
      description: 'A contractual project on a laundry shop in Baguio City',
      icon: '🫧',
      bgImage: tjlogo,
      component: 'Tjbroz'
    },
    {
      id: 'scraper',
      title: 'Webscraping (Internship + Contractual) ',
      description: 'A web scraping project for Zoho Analytics of Energin.co',
      icon: '💻',
      bgImage: energinlogo,
      component: 'Scraper'
    },
    {
      id: 'Ocr',
      title: 'Optical Character Recognition (Contractual) ',
      description: 'An OCR project for Energin',
      icon: '🤖',
      bgImage: energinlogo,
      component: 'Ocr'
    }

  ]

  {
    projects.map(project => (
      <div
        className="p-4 rounded-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${project.bgImage})` }}
      >

        {typeof project.icon === 'string' && project.icon.length <= 2 ? (
          <span className="text-2xl">{project.icon}</span>
        ) : (
          <img src={project.icon} alt={project.title} className="w-8 h-8" />
        )}
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
    ))
  }



  const scrollToSection = (sectionIndex) => {
    const windowHeight = window.innerHeight;
    const targetScrollY = windowHeight * sectionIndex;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

 
  useEffect(() => {
    const loadScripts = async () => {
      
      if (!window.THREE) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      
      if (!window.VANTA) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      if (!vantaEffect.current && vantaRef.current && window.VANTA && window.VANTA.CLOUDS) {
        vantaEffect.current = window.VANTA.CLOUDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          backgroundColor: 0x1a1a2e,    
          skyColor: 0xCD78F7,           
          cloudColor: 0xadc1de,         
          cloudShadowColor: 0x111828,   
          sunColor: 0xff9919,          
          sunGlareColor: 0xff6633,     
          sunlightColor: 0xff9933,     
          speed: 1.2                   
        });
      }
    };

    loadScripts().catch(console.error);

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, [])


  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollY < windowHeight * 0.8) {
       
        setVisibleSection(0);
      } else if (scrollY < windowHeight * 1.8) {
   
        setVisibleSection(1);
      } else if (scrollY < windowHeight * 2.8) {
    
        setVisibleSection(2);
      } else {
   
        setVisibleSection(3);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    if (visibleSection !== 2) {
      setCurrentView('projects');
    }
  }, [visibleSection]);

  
  const navigateToProject = (projectId) => {
    setCurrentView(projectId);

    const targetSection = projectScrollTargets[projectId];

    if (targetSection !== undefined) {
      setTimeout(() => {
        scrollToSection(targetSection);
      }, 100);
    }
  };

  const navigateBackToProjects = () => {
    setCurrentView('projects');
  };


  const renderProjectComponent = (projectId) => {
    switch (projectId) {
      case 'ai-classifier':
        return <AIImageClassifier />;
      case 'laundry':
        return <Tjbroz />;
      case 'scraper':
        return <Scraper />;
      case 'Ocr':
        return <Ocr />;
      default:
        return null;
    }
  };

  
  const getArrowProps = () => {
    switch (visibleSection) {
      case 0:
        return {
          visible: true,
          text: "Scroll to see my Tech Stack",
          onClick: () => scrollToSection(1)
        };
      case 1:
        return {
          visible: true,
          text: "Explore my Projects",
          onClick: () => scrollToSection(2)
        };
      case 2:
        return {
          visible: currentView === 'projects', 
          text: "Get in Touch",
          onClick: () => scrollToSection(3.5)
        };
      case 3:
        return {
          visible: false
        };
      default:
        return { visible: false };
    }
  };

  return (
    <div className="w-full relative">
      {/* ===== nav bar ===== */}
      <Navbar activeSection={visibleSection} />

      {/* ===== vanta js fixed ===== */}
      <div
        ref={vantaRef}
        className="fixed top-0 left-0 w-full h-full z-0"
      />

      {/* ==== scroll arrow animation ===== */}
      <ScrollArrow {...getArrowProps()} />

      {/* ===== all secs ===== */}
      <div className="relative z-10">
        {/* sec 1 */}
        <section className="w-full h-screen flex items-center justify-center bg-black/30">
          <div
            className={`flex flex-col items-center text-center p-10 text-white transition-opacity duration-1000 ${visibleSection === 0 ? 'opacity-100' : 'opacity-0'
              }`}
          >
            {/* draggable prof pic */}
            <DraggableProfile
              frontImage={profilePic}
              backImage={profilePic2}
              frontAlt="Kevin's Profile Picture"
              backAlt="Hidden surprise image"
            />

            {/* name */}
            <TypingName />

            {/* description */}
            <p className="mt-4 text-lg leading-relaxed max-w-lg">
              Junior Developer & AI enthusiast passionate about learning, collaboration, and continuous improvement. I tackle every project with curiosity, openness to new ideas, and a drive to grow with each experimental build marking another step in my evolving expertise.
            </p>

            {/* button */}
            <AnimatedDownloadButton resumeUrl={Resume} />
          </div>
        </section>

        {/* section 2 - TechStack */}
        <section className="w-full h-screen flex items-center justify-center bg-black/30 mt-10">
          <div
            className={`w-full transition-all duration-1000 ${visibleSection === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <TechStackCarousel techStack={myTechStack} />
          </div>
        </section>

        {/* section 3 - Projects */}
        <section className="w-full min-h-screen flex flex-col items-center justify-start bg-black/30 py-16 mt-10">
          <div
            className={`w-full transition-all duration-1000 ${visibleSection === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            {currentView === 'projects' ? (
          
              <ProjectsCarousel
                projects={projects}
                onProjectClick={navigateToProject}
              />
            ) : (
           
              <>
                {/* back button */}
                <div className="w-full max-w-6xl mx-auto px-8 mb-10 ml-10">
                  <button
                    onClick={navigateBackToProjects}
                   className="inline-flex items-center px-4 py-2 rounded-lg 
           bg-[#e799e7]/80 text-white 
           hover:bg-[#e799e7]/100 
           transition-all duration-300 
           border border-[#e799e7]/50 hover:border-[#e799e7]/70 focus:outline-none focus:ring-0"

                  >
                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Projects
                  </button>
                </div>

                {/* project component */}
                <div className="w-full max-w-[1100px] mx-auto">
                  {renderProjectComponent(currentView)}
                </div>
              </>
            )}
          </div>
        </section>

        {/* section 4 - Contact */}
        <section className="w-full h-screen flex items-center justify-center bg-black/30 mt-10">
          <div
            className={`flex flex-col items-center text-center p-10 text-white transition-opacity duration-1000 ${visibleSection === 3 ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <h2 className="text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-lg">
              Interested in working together? Let's connect!
            </p>
            <button className="mt-10 bg-green-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300">
              Contact Me
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App