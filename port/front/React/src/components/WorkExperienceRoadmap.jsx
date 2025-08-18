import { useState } from 'react';

const WorkExperienceRoadmap = ({ isMobile = false }) => {
  const [experiences, setExperiences] = useState([
    {
      id: 1,
      title: "Junior Web Developer (Contractual)",
      company: "Energin",
      period: "2025 - Present",
      description: "Contractual junior web development role , automation and data processing solutions",
      technologies: ["Python", "Web Scraping", "Zoho CRM as a whole", "Automation Tools", "Azure Dev Ops", "Deluge"],
      type: "contract",
      achievements: [
        "Delivered automated web scraping solutions",
        "Enhanced CRM workflow efficiency",
        "Successfully completed contractual objectives",
        "Fixed tons of Bugs",
        "Developed features for the User Journey"
      ]
    },
    {
      id: 2,
      title: "AI Engineer/Data Analyst (Internship + Contractual)",
      company: "Energin",
      period: "2025 - 2025",
      description: "Working as AI Engineer and Data Analyst with automation focus, handling web scraping, Zoho CRM workflows, and process automation",
      technologies: ["Python", "Selenium", "MongoDB", "Zoho Analytics", "Zoho CRM", "Deluge", "Make.com", "Power Automate"],
      type: "current",
      achievements: [
        "Created web scrapers using Python+Selenium+MongoDB",
        "Developed Zoho CRM workflows and Deluge scripts",
        "Implemented automation solutions with Make.com and Microsoft Power Automate",
        "Improved data collection and analysis processes",
        "Created 20 + Analytics Graph for various scraped websites",
        "Housed 15+ scrapers on windows task scheduler, scrapers are automatically running every morning",
        "Scraped more than 15 data pages"
      ]
    },
    {
      id: 3,
      title: "Back End Developer (Contractual)",
      company: "Tjbroz Laundry Hub",
      period: "2024",
      description: "Developed a Progressive Web App (PWA) for the loyalty customer program of the laundry shop",
      technologies: ["PHP", "Node", "JavaScript", "CSS", "HTML", "React", "MongoDB", "Express", "Hostinger"],
      type: "freelance",
      achievements: [
        "Built complete PWA for customer loyalty program",
        "Successfully deployed website through Hostinger",
        "Implemented full-stack solution for laundry business",
        "Created responsive and user-friendly interface",
      ]
    },
    {
      id: 4,
      title: "Fullstack Developer, Database Manager (Freelance)",
      company: "Vapebar Baguio",
      period: "2023",
      description: "Developed a comprehensive inventory system for a vape shop with local hosting deployment",
      technologies: ["PHP", "JavaScript", "CSS", "HTML", "SQL"],
      type: "freelance",
      achievements: [
        "Built complete inventory management system",
        "Managed database design and implementation",
        "Deployed locally through Apache WAMP",
        "Handled both frontend and backend development"
      ]
    }
  ]);

  const [expandedCard, setExpandedCard] = useState(null);

  const getTypeColor = (type) => {
    switch (type) {
      case 'internship':
        return 'from-blue-500 to-cyan-500';
      case 'freelance':
        return 'from-green-500 to-emerald-500';
      case 'project':
        return 'from-purple-500 to-pink-500';
      case 'current':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'internship':
        return '🎓';
      case 'freelance':
        return '💼';
      case 'project':
        return '🚀';
      case 'current':
        return '🎯';
      default:
        return '💻';
    }
  };

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className={`w-full ${isMobile ? 'px-2 py-2' : 'px-4 py-3'}`}>
      <div className="max-w-3xl mx-auto">
      
        <div className="text-center mb-4">
          <h2 className={`font-bold text-white mb-1 ${isMobile ? 'text-xl' : 'text-2xl'}`}>
            Work Experience Roadmap
          </h2>
          <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
            My journey through various roles and projects
          </p>
        </div>

        <div className="relative">
 
          <div className={`absolute ${isMobile ? 'left-4 top-0 bottom-0 w-0.5' : 'left-5 top-0 bottom-0 w-0.5'} bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 rounded-full`}></div>

          
          <div className="space-y-2">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative ${isMobile ? 'ml-8' : 'ml-10'}`}
              >
        
                <div className={`absolute ${isMobile ? '-left-10 top-2' : '-left-12 top-2'} w-4 h-4 rounded-full bg-gradient-to-r ${getTypeColor(exp.type)} flex items-center justify-center shadow-md border border-gray-800`}>
                  <span className="text-xs">{getTypeIcon(exp.type)}</span>
                </div>

                <div 
                  className={`bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer`}
                  onClick={() => toggleExpand(exp.id)}
                >
          
                  <div className={`bg-gradient-to-r ${getTypeColor(exp.type)} p-0.5`}>
                    <div className={`bg-gray-900/95 ${isMobile ? 'p-2' : 'p-2'}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1 min-w-0">
                          <h3 className={`font-bold text-white ${isMobile ? 'text-sm' : 'text-base'} leading-tight`}>
                            {exp.title}
                          </h3>
                          <p className={`text-gray-300 ${isMobile ? 'text-xs' : 'text-xs'} truncate`}>
                            {exp.company}
                          </p>
                          <p className={`text-gray-500 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                            {exp.period}
                          </p>
                        </div>
                        <div className="ml-2 flex-shrink-0">
                          <svg 
                            className={`w-3 h-3 text-white transition-transform duration-200 ${
                              expandedCard === exp.id ? 'rotate-180' : ''
                            }`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

      
                  <div className={`${isMobile ? 'p-2' : 'p-2'} pt-0`}>
                    <p className={`text-gray-300 mb-2 ${isMobile ? 'text-xs' : 'text-xs'} leading-relaxed`}>
                      {exp.description}
                    </p>

             
                    <div className="flex flex-wrap gap-1 mb-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-1.5 py-0.5 text-xs bg-gradient-to-r ${getTypeColor(exp.type)} text-white rounded font-medium`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

               
                    <div className={`transition-all duration-200 overflow-hidden ${
                      expandedCard === exp.id ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="border-t border-gray-700 pt-2 mt-2">
                        <h4 className={`font-semibold text-white mb-1 text-xs`}>
                          Key Achievements:
                        </h4>
                        <ul className="space-y-0.5">
                          {exp.achievements.map((achievement, achIndex) => (
                            <li key={achIndex} className={`text-gray-300 flex items-start text-xs leading-relaxed`}>
                              <span className="text-purple-400 mr-1 mt-0.5 text-xs flex-shrink-0">▸</span>
                              <span className="flex-1">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

      
          <div className={`relative ${isMobile ? 'ml-8 mt-2' : 'ml-10 mt-3'}`}>
            <div className={`absolute ${isMobile ? '-left-10 top-1' : '-left-12 top-1'} w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-md border border-gray-800 animate-pulse`}>
              <span className="text-xs">✨</span>
            </div>
            <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-md p-2 text-center">
              <p className={`text-gray-400 font-medium text-xs`}>
                The journey continues...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceRoadmap;