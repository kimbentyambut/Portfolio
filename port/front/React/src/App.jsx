import { useState, useEffect, useRef } from 'react'
import './App.css'

import profilePic from './assets/test.png'
import pathee from './assets/logo.png'
import tjlogo from './assets/tjlogo.png'
import energinlogo from './assets/energinlogo.png'
import TypingName from "./components/TypingName";
import profilePic2 from './assets/Image2.png'
import Profile from './components/ProfessionalGreeting'
import TechStackCarousel from './components/TechStackCarousel'
import AIImageClassifier from './components/AIImageClassifier'
import AnimatedDownloadButton from './components/AnimatedDownloadButton';
import Resume from './assets/resume.pdf'
import Navbar from './components/Navbar'
import TypeRacerGame from './components/TypeRacerGame';
import Tjbroz from './components/projects/Tjbroz'
import Scraper from './components/projects/Webscraping'
import FakeNews from './components/projects/FakeNews'
import Ocr from './components/projects/Ocr'
import ProjectsCarousel from "./components/ProjectsCarousel";








const ScrollArrow = ({ direction = "down", text, visible = true, onClick }) => {
  return (
    <div
      className={`fixed bottom-8 right-8 z-20 transition-all duration-1000 cursor-pointer ${visible
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      onClick={onClick}
    >
      <div className="flex flex-col items-center group">
        {/* Text on top */}
        {text && (
          <span className="mb-3 text-white/80 text-sm font-medium text-center group-hover:text-white transition-colors duration-300">
            {text}
          </span>
        )}

        {/* Circle with bounce effect */}
        <div className="w-12 h-12 bg-purple-600/30 rounded-full flex items-center justify-center animate-bounce hover:bg-purple-600/50 transition-colors duration-300">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {direction === "down" ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            )}
          </svg>
        </div>
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
      description: "Dynamic web programming",
      category: "Frontend"
    },
    {
      name: "Python",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      color: "from-blue-400 to-green-500",
      description: "Backend & AI development",
      category: "Backend"
    },
    {
      name: "Java",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      color: "from-red-500 to-orange-600",
      description: "Enterprise applications",
      category: "Backend"
    },
    {
      name: "React",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "from-cyan-400 to-blue-500",
      description: "Frontend framework",
      category: "Frontend"
    },
    {
      name: "Node.js",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "from-green-400 to-emerald-600",
      description: "Server-side JavaScript",
      category: "Backend"
    },
    {
      name: "MongoDB",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "from-green-600 to-emerald-700",
      description: "NoSQL database",
      category: "Database"
    },
    {
      name: "Git",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      color: "from-orange-500 to-red-600",
      description: "Version control",
      category: "Tools"
    },
    {
      name: "Power BI",
      image: "https://windowsreport.com/wp-content/uploads/2019/08/Can-I-use-Power-Bi-for-Free.jpg",
      color: "from-yellow-400 to-amber-600",
      description: "Data Visualization",
      category: "Data"
    },
    {
      name: "Zoho Analytics/CRM",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/ZOHO_logo_2023.svg/2560px-ZOHO_logo_2023.svg.png",
      color: "from-green-400 to-emerald-600",
      description: "Data Visualization",
      category: "Data"
    },
    {
      name: "Vite",
      image: "https://picperf.io/https://laravelnews.s3.amazonaws.com/images/vite.jpg",
      color: "from-blue-500 to-indigo-700",
      description: "Frontend build tool",
      category: "Tools"
    },
    {
      name: "Artificial Intelligence",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvkUFmp5jSF-DhrD5102bzHU7RbidetfqYfA&s",
      color: "from-purple-500 to-pink-600",
      description: "AI Enthusiast",
      category: "AI/ML"
    },
    {
      name: "TensorFlow.js",
      image: "https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg",
      color: "from-orange-500 to-red-600",
      description: "Machine Learning in JS",
      category: "AI/ML"
    },
    {
      name: "YOLOv8",
      image: "https://raw.githubusercontent.com/ultralytics/assets/main/logo/Ultralytics_Logotype_Reverse.svg",
      color: "from-purple-600 to-pink-600",
      description: "Real-time object detection/classification",
      category: "AI/ML"
    },
    {
      name: "DistilBERT",
      image: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
      color: "from-blue-500 to-indigo-600",
      description: "NLP transformer model",
      category: "AI/ML"
    },
    {
      name: "Google AppScript",
      image: "https://cdn-icons-png.flaticon.com/512/2965/2965300.png",
      color: "from-purple-500 to-pink-600",
      description: "Google scripting language",
      category: "Tools"
    },
    {
      name: "Make.com",
      image: "https://images.ctfassets.net/un655fb9wln6/1k5wBPhbu5kXiaYlFWgEJE/b590772959bd510e64cf230ef37bba3e/Make-Logo-RGB.svg",
      color: "from-blue-400 to-indigo-600",
      description: "Workflow automation",
      category: "Tools"
    },
    {
      name: "Deluge",
      image: "https://www.zohowebstatic.com/sites/zweb/images/productlogos/deluge.svg",
      color: "from-red-400 to-pink-600",
      description: "Zoho scripting language",
      category: "Tools"
    },
    {
      name: "Postman API",
      image: "https://cdn.iconscout.com/icon/free/png-256/postman-3521646-2944950.png",
      color: "from-orange-400 to-yellow-500",
      description: "API testing & development",
      category: "Tools"
    },
    {
      name: "Microsoft Power Automate",
      image: "https://play-lh.googleusercontent.com/aeXs0qriXwmHVWtq9u4zVUO6SifULKtJOQdtBg6wDQqaNEaaJKl6b2oiABMmHn6yLH8",
      color: "from-blue-400 to-cyan-500",
      description: "Automation workflows",
      category: "Tools"
    },
    {
      name: "Web Scraping",
      image: "https://cdn-icons-png.flaticon.com/512/11892/11892629.png",
      color: "from-green-500 to-emerald-600",
      description: "Data extraction from websites",
      category: "Tools"
    },
    {
      name: "HTML5",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "from-orange-500 to-red-500",
      description: "Markup language",
      category: "Frontend"
    },
    {
      name: "CSS5",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      color: "from-blue-500 to-indigo-500",
      description: "Styling web pages",
      category: "Frontend"
    },
    {
      name: "PHP",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      color: "from-indigo-500 to-purple-500",
      description: "Server-side scripting",
      category: "Backend"
    },
    {
      name: "SQL",
      image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      color: "from-orange-400 to-blue-600",
      description: "Structured Query Language",
      category: "Database"
    },
    {
      name: "Hostinger",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW2tekZ3saj0otmzVSl0UuDlCKzvsP42FW9Q&s",
      color: "from-purple-400 to-pink-500",
      description: "Web hosting",
      category: "Tools"
    }
  ]


  const projectScrollTargets = {
    'ai-classifier': 1.93,
    'laundry': 2.04,
    'scraper': 2.04,
    'Ocr': 2.04,
    'FakeNews': 2.04

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
    },
     {
      id: 'FakeNews',
      title: 'Fake News Detector (School Project) ',
      description: 'A Fake News Detector for Data Mining Subject',
      icon: '🤖',
      bgImage: energinlogo,
      component: 'FakeNews'
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
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      if (!window.VANTA) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      // ✅ FIX: use window.VANTA.NET not window.VANTA.net
      if (!vantaEffect.current && vantaRef.current && window.VANTA && window.VANTA.NET) {
        vantaEffect.current = window.VANTA.NET({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          backgroundColor: 0x1a0e34,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0xe83fff,
          points: 9.0,
          maxDistance: 10.0,
          spacing: 20.0,
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
  }, []);




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
      } else if (scrollY < windowHeight * 3.8) {
        setVisibleSection(3); 
      } else {
        setVisibleSection(4); 
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
      case 'FakeNews':
        return<FakeNews></FakeNews>
      default:
        return null;
    }
  };


  const getArrowProps = () => {
    switch (visibleSection) {
      case 0:
        return { visible: true, text: "Scroll to see my Tech Stack", onClick: () => scrollToSection(0.93) };
      case 1:
        return { visible: true, text: "Explore my Projects", onClick: () => scrollToSection(1.9) };
      case 2:
        return { visible: true, text: "Visit My Playground", onClick: () => scrollToSection(3) };
      case 3:
        return { visible: true, text: "Get in Touch", onClick: () => scrollToSection(4.5) };
      case 4:
        return { visible: false }; 
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
        {/* Section 1 - Home */}
        <section className="w-full h-screen flex items-center justify-center bg-black/30">
          <Profile></Profile>
        </section>

        {/* Section 2 - TechStack */}
        <section className="w-full h-screen flex items-center justify-center bg-black/30 ">
          <div
            className={`w-full transition-all duration-1000 ${visibleSection === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <TechStackCarousel techStack={myTechStack} />
          </div>
        </section>

        {/* Section 3 - Projects */}
        <section className="w-full min-h-screen flex flex-col items-center justify-start bg-black/30 py-16 ">
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


        <section className="w-full min-h-screen flex flex-col items-center justify-center bg-black/30 py-16 ">
          <div
            className={`w-full transition-all duration-1000 ${visibleSection === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
          >
            <div className="playground-grid">
              <div className="playground-item">
                <TypeRacerGame />
              </div>
            </div>
          </div>
        </section>



        <section className="w-full h-screen flex items-center justify-center bg-black/30 ">
          <div
            className={`flex flex-col items-center text-center p-10 text-white transition-opacity duration-1000 ${visibleSection === 4 ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <h2 className="text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-300 max-w-lg">
              Interested in working together? Let's connect!
            </p>
            <button className="mt-10 bg-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all duration-300">
              Contact Me
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App