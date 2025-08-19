import { useState } from 'react';

const WorkExperienceRoadmap = ({ isMobile = false }) => {
  const [experiences, setExperiences] = useState([
    {
      id: 4,
      title: "Fullstack Developer",
      company: "Vapebar Baguio",
      period: "2023",
      description: "As a student, this was my first free lancing job I developed a comprehensive inventory system.",
      technologies: ["PHP", "JavaScript", "SQL","HTML","CSS"],
      type: "freelance",
      achievements: [
        "Built complete inventory system",
        "Managed database design",
        "Deployed locally via Apache"
      ]
    },
    {
      id: 3,
      title: "Back End Developer",
      company: "Tjbroz Laundry Hub",
      period: "2024",
      description: "As a student, our team Developed Progressive Web App for loyalty program. I made a lot of back-end functions, one of which is an OTP verification through email using PHP mailer.",
      technologies: ["PHP", "Node", "React", "MongoDB", "Express", "Javascript","Docker","Figma"],
      type: "freelance",
      achievements: [
        "Built complete PWA system",
        "Deployed via Hostinger",
        "Created responsive interface"
      ]
    },
    {
      id: 2,
      title: "AI Engineer/Data Analyst",
      company: "Energin",
      period: "2025",
      description: "As an intern for 5 months and 2 months contractual I was an AI Engineer and Data Analyst with automation focus.",
      technologies: ["Python", "Selenium", "MongoDB", "Zoho Analytics","Microsoft Power Automate","Make.com", "Webscraping"],
      type: "current",
      achievements: [
        "Created 20+ analytics graphs",
        "Housed 15+ scrapers on scheduler",
        "Developed CRM workflows & scripts"
      ]
    },
    {
      id: 1,
      title: "Junior Web Developer",
      company: "Energin",
      period: "2025 - Present",
      description: "After internship I was hired as a contractual junior web development role, automation and data processing solutions.",
      technologies: ["Python", "Web Scraping", "Zoho CRM (As a whole)", "Azure DevOps", "Deluge"],
      type: "contract",
      achievements: [
        "Delivered automated web scraping solutions",
        "Enhanced CRM workflow efficiency",
        "Fixed tons of bugs & developed features"
      ]
    }
  ]);

  const [selectedExperience, setSelectedExperience] = useState(experiences[3]);
  const [hoveredId, setHoveredId] = useState(null);

  const getTypeConfig = (type) => {
    switch (type) {
      case 'current':
        return { 
          gradient: 'from-emerald-400 via-cyan-500 to-blue-500',
          icon: '🚀',
          pulse: 'animate-pulse',
          bg: 'bg-emerald-500/10'
        };
      case 'contract':
        return { 
          gradient: 'from-violet-500 via-purple-500 to-pink-500',
          icon: '💼',
          pulse: '',
          bg: 'bg-violet-500/10'
        };
      case 'freelance':
        return { 
          gradient: 'from-orange-400 via-red-500 to-pink-600',
          icon: '⚡',
          pulse: '',
          bg: 'bg-orange-500/10'
        };
      default:
        return { 
          gradient: 'from-gray-500 to-gray-600',
          icon: '💻',
          pulse: '',
          bg: 'bg-gray-500/10'
        };
    }
  };

  const selectExperience = (exp) => {
    setSelectedExperience(exp);
  };

  const selectedConfig = getTypeConfig(selectedExperience.type);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      
     
      <div className="bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl shadow-purple-500/20 text-center">
        <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
          Work Experience Journey
        </h1>
      </div>

    
      <div className="bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl shadow-blue-500/10">
        
        
        <div className="relative mb-8">
          
      
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-violet-500 to-pink-500 rounded-full transform -translate-y-1/2 shadow-lg"></div>
          
          
          <div className="relative flex justify-between items-center h-12">
            {experiences.map((exp, index) => {
              const config = getTypeConfig(exp.type);
              const isSelected = selectedExperience.id === exp.id;
              const isHovered = hoveredId === exp.id;
              
              return (
                <div
                  key={exp.id}
                  className="relative cursor-pointer group"
                  onMouseEnter={() => setHoveredId(exp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => selectExperience(exp)}
                >
                  
          
                  <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-r ${config.gradient} 
                    flex items-center justify-center shadow-2xl border-2 border-white/20
                    transform transition-all duration-300 ${config.pulse}
                    ${isSelected || isHovered ? 'scale-125' : 'scale-100'}
                    ${isSelected ? 'ring-4 ring-white/30' : ''}`}>
                    <span className="text-sm md:text-base filter drop-shadow-sm">{config.icon}</span>
                  </div>

             
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className="text-xs text-gray-300 font-medium px-2 py-1 bg-black/50 rounded-full backdrop-blur-sm border border-white/10">
                      {exp.period}
                    </span>
                  </div>

                
                  <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 transition-all duration-200 z-10
                    ${isHovered && !isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                    <div className="bg-black/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap border border-white/30 shadow-xl">
                      {exp.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

     
        <div className="flex justify-center space-x-2">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer
                ${selectedExperience.id === exp.id 
                  ? `bg-gradient-to-r ${getTypeConfig(exp.type).gradient}` 
                  : 'bg-white/20'}`}
              onClick={() => selectExperience(exp)}
            ></div>
          ))}
        </div>
      </div>

    
      <div className="bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-violet-500/10 overflow-hidden">
        
        
        <div className={`p-4 ${selectedConfig.bg} border-b border-white/10`}>
          <div className="flex items-center">
            <span className="text-2xl mr-3">{selectedConfig.icon}</span>
            <div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {selectedExperience.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${selectedConfig.gradient} text-white`}>
                  {selectedExperience.company}
                </span>
                <span className="text-xs text-gray-400">{selectedExperience.period}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          
          
          <div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {selectedExperience.description}
            </p>
          </div>

      
          <div>
            <h4 className="text-white font-semibold mb-2 text-sm flex items-center">
              <span className="mr-2">🛠️</span>
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedExperience.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-white/10 text-white rounded-lg border border-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

       
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm flex items-center">
              <span className="mr-2">🎯</span>
              Key Achievements
            </h4>
            <div className="space-y-2">
              {selectedExperience.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-gray-300 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className={`mr-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${selectedConfig.gradient} flex-shrink-0`}></span>
                  <span>{achievement}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     
      <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-xl text-center">
        <p className="text-gray-400 text-xs">
          Click timeline nodes to explore different experiences
        </p>
      </div>
    </div>
  );
};

export default WorkExperienceRoadmap;