import { useState, useEffect } from 'react';

const ProjectShowcase = ({ 
  title = "Sample Project", 
  description = "This is a sample project description to demonstrate the modal functionality.", 
  technologies = ["React", "JavaScript", "CSS"], 
  screenshots = [
    { url: "https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Screenshot+1", title: "Main Dashboard" },
    { url: "https://via.placeholder.com/800x600/50C878/FFFFFF?text=Screenshot+2", title: "User Profile" },
    { url: "https://via.placeholder.com/800x600/FF6B6B/FFFFFF?text=Screenshot+3", title: "Settings Page" }
  ], 
  liveUrl = "https://example.com", 
  githubUrl = "https://github.com/example/repo",
  features = ["Responsive design", "User authentication", "Real-time updates"],
  challenges = ["Performance optimization", "Cross-browser compatibility"],
  learnings = ["Advanced React patterns", "State management best practices"]
}) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);


  useEffect(() => {
    if (!isAutoPlaying || screenshots.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentScreenshot(prev => (prev + 1) % screenshots.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, screenshots.length]);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
    };
  }, [isModalOpen]);

  const nextScreenshot = () => {
    setCurrentScreenshot(prev => (prev + 1) % screenshots.length);
    setIsAutoPlaying(false);
  };

  const prevScreenshot = () => {
    setCurrentScreenshot(prev => prev === 0 ? screenshots.length - 1 : prev - 1);
    setIsAutoPlaying(false);
  };

  const goToScreenshot = (index) => {
    setCurrentScreenshot(index);
    setIsAutoPlaying(false);
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextModalImage = () => {
    setModalImageIndex(prev => (prev + 1) % screenshots.length);
  };

  const prevModalImage = () => {
    setModalImageIndex(prev => prev === 0 ? screenshots.length - 1 : prev - 1);
  };

  const getImageUrl = (screenshot) => {
    if (typeof screenshot.url === 'string') {
      return screenshot.url;
    }
    
    if (screenshot.url && typeof screenshot.url === 'object' && screenshot.url.default) {
      return screenshot.url.default;
    }
 
    return screenshot.url;
  };

  return (
    <>
      <style jsx global>{`
        .modal-open {
          height: 100vh;
        }
      `}</style>

      <div className={`w-full h-[85vh] bg-gray-900 overflow-hidden flex flex-col rounded-xl backdrop-blur-md transition-all duration-300 ${isModalOpen ? 'blur-sm' : ''}`}>
        {/* compact head */}
        <div className="flex-shrink-0 px-3 py-2 border-b border-gray-800 bg-gray-900/95">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent truncate">
                {title}
              </h1>
              <p className="text-xs text-gray-400 line-clamp-2 leading-tight mt-0.5">{description}</p>
            </div>
            
            <div className="flex gap-1.5 ml-3 flex-shrink-0">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <svg className="mr-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live
                </a>
              )}
              
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-gray-700 to-gray-800 text-white text-xs font-medium rounded-lg hover:shadow-lg transition-all duration-300 border border-gray-600"
                >
                  <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  Code
                </a>
              )}
            </div>
          </div>
        </div>

        {/* maint content */}
        <div className="flex flex-1 min-h-0 gap-2 p-2">
          {/* screenshot section */}
          {screenshots.length > 0 && (
            <div className="w-[45%] flex flex-col">
              <div className="bg-gray-800/90 rounded-lg border border-gray-700/50 backdrop-blur-sm h-full flex flex-col overflow-hidden">
                <div className="flex items-center justify-between p-2 border-b border-gray-700/50 bg-gray-800/50">
                  <h2 className="text-xs font-medium text-white flex items-center">
                    <svg className="w-3 h-3 mr-1.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {currentScreenshot + 1}/{screenshots.length}
                  </h2>
                  
                  {screenshots.length > 1 && (
                    <div className="flex space-x-1">
                      {screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToScreenshot(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentScreenshot ? 'bg-purple-500' : 'bg-gray-600 hover:bg-gray-500'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-1.5 min-h-0">
                  <div className="relative h-full group">
                    <div className="relative bg-gray-900/50 rounded-lg overflow-hidden h-full">
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        {screenshots[currentScreenshot] ? (
                          <img
                            src={getImageUrl(screenshots[currentScreenshot])}
                            alt={screenshots[currentScreenshot].title || `Screenshot ${currentScreenshot + 1}`}
                            className="w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity duration-200"
                            loading="lazy"
                            onClick={() => openModal(currentScreenshot)}
                          />
                        ) : (
                          <div className="text-gray-400 text-center">
                            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="text-xs">Preview</p>
                          </div>
                        )}
                      </div>

                      {screenshots.length > 1 && (
                        <>
                          <button 
                            onClick={prevScreenshot} 
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all duration-300"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button 
                            onClick={nextScreenshot} 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all duration-300"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}

                      {screenshots[currentScreenshot]?.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 transition-opacity duration-200">
                          <h3 className="text-white font-medium text-xs truncate">{screenshots[currentScreenshot].title}</h3>
                        </div>
                      )}

                      <div className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white p-1 rounded transition-all duration-200">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right Panel - More Compact */}
          <div className={`${screenshots.length > 0 ? 'w-[55%]' : 'w-full'} flex flex-col gap-1.5 overflow-hidden`}>
            {/* Technologies - Compact */}
            {technologies.length > 0 && (
              <div className="bg-gray-800/90 rounded-lg p-2 border border-gray-700/50 backdrop-blur-sm flex-shrink-0">
                <div className="flex items-center justify-between mb-1.5">
                  <h2 className="text-xs font-medium text-white flex items-center">
                    <svg className="w-3 h-3 mr-1.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Tech Stack
                  </h2>
                  <span className="text-xs text-gray-400">({technologies.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded text-blue-300 font-medium text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

          
            <div className="grid grid-cols-3 gap-1.5 flex-1 min-h-0">
           
              {features.length > 0 && (
                <div className="bg-gray-800/90 rounded-lg border border-gray-700/50 backdrop-blur-sm flex flex-col overflow-hidden">
                  <div className="p-1.5 border-b border-gray-700/50 bg-gray-800/50 flex-shrink-0">
                    <h3 className="text-xs font-medium text-white flex items-center">
                      <svg className="w-3 h-3 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Features
                      <span className="ml-1 text-gray-400">({features.length})</span>
                    </h3>
                  </div>
                  <div className="p-1.5 flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                      {features.map((feature, index) => (
                        <li key={index} className="text-gray-300 text-xs flex items-start">
                          <span className="text-green-400 mr-1.5 mt-0.5 text-xs flex-shrink-0">•</span>
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

         
              {challenges.length > 0 && (
                <div className="bg-gray-800/90 rounded-lg border border-gray-700/50 backdrop-blur-sm flex flex-col overflow-hidden">
                  <div className="p-1.5 border-b border-gray-700/50 bg-gray-800/50 flex-shrink-0">
                    <h3 className="text-xs font-medium text-white flex items-center">
                      <svg className="w-3 h-3 mr-1 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Challenges
                      <span className="ml-1 text-gray-400">({challenges.length})</span>
                    </h3>
                  </div>
                  <div className="p-1.5 flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                      {challenges.map((challenge, index) => (
                        <li key={index} className="text-gray-300 text-xs flex items-start">
                          <span className="text-orange-400 mr-1.5 mt-0.5 text-xs flex-shrink-0">•</span>
                          <span className="leading-tight">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

     
              {learnings.length > 0 && (
                <div className="bg-gray-800/90 rounded-lg border border-gray-700/50 backdrop-blur-sm flex flex-col overflow-hidden">
                  <div className="p-1.5 border-b border-gray-700/50 bg-gray-800/50 flex-shrink-0">
                    <h3 className="text-xs font-medium text-white flex items-center">
                      <svg className="w-3 h-3 mr-1 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Learnings
                      <span className="ml-1 text-gray-400">({learnings.length})</span>
                    </h3>
                  </div>
                  <div className="p-1.5 flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                      {learnings.map((learning, index) => (
                        <li key={index} className="text-gray-300 text-xs flex items-start">
                          <span className="text-purple-400 mr-1.5 mt-0.5 text-xs flex-shrink-0">•</span>
                          <span className="leading-tight">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

 
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50"
          onClick={closeModal}
        >
          <div 
            className="relative flex items-center justify-center max-w-[90vw] max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(screenshots[modalImageIndex])}
                alt={screenshots[modalImageIndex]?.title || `Screenshot ${modalImageIndex + 1}`}
                className="max-w-[80vw] max-h-[80vh] object-contain rounded-lg shadow-lg"
              />

              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {screenshots[modalImageIndex]?.title && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg">
                <h3 className="font-semibold text-sm">{screenshots[modalImageIndex].title}</h3>
                {screenshots[modalImageIndex]?.description && (
                  <p className="text-gray-300 text-xs mt-1">{screenshots[modalImageIndex].description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectShowcase;