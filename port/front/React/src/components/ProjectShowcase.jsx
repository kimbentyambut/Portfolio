import { useState, useEffect } from 'react';

const ProjectShowcase = ({ 
  title = "Sample Project", 
  description = "sample if no content.", 
  technologies = ["React", "JavaScript", "CSS"], 
  screenshots = [
    { url: "https://via.placeholder.com/800x600/e83fff/ffffff?text=Screenshot+1", title: "Main Dashboard" },
    { url: "https://via.placeholder.com/800x600/1a0e34/ffffff?text=Screenshot+2", title: "User Profile" },
    { url: "https://via.placeholder.com/800x600/e83fff/ffffff?text=Screenshot+3", title: "Settings Page" }
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
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
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

  const openModal = (index, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setIsModalOpen(false);
  };

  const nextModalImage = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setModalImageIndex(prev => (prev + 1) % screenshots.length);
  };

  const prevModalImage = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
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

  const handleModalBackdropClick = (event) => {
   
    if (event.target === event.currentTarget) {
      closeModal(event);
    }
  };

  const handleImageClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    openModal(currentScreenshot, event);
  };

  return (
    <>
      <div className={`w-full min-h-[75vh] md:h-[85vh] bg-gradient-to-br from-[#1a0e34] via-[#2a1b4a] to-[#1a0e34] overflow-hidden flex flex-col rounded-xl backdrop-blur-md transition-all duration-300 border-2 border-[#e83fff]/30 shadow-2xl shadow-[#e83fff]/20`}>
        {/* compact head */}
        <div className="flex-shrink-0 px-2 md:px-3 py-1.5 md:py-2 border-b-2 border-[#e83fff]/40 bg-gradient-to-r from-[#1a0e34]/95 via-[#2a1b4a]/95 to-[#1a0e34]/95">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 md:gap-0">
            <div className="flex-1 min-w-0">
              <h1 className="text-sm md:text-base font-bold text-white truncate">
                {title}
              </h1>
              <p className="text-xs text-white/90 line-clamp-1 md:line-clamp-2 leading-tight mt-0.5">{description}</p>
            </div>
            
            <div className="flex gap-1.5 md:ml-3 flex-shrink-0 self-start md:self-center">
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-[#e83fff] to-[#ff4dc7] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#e83fff]/40 transition-all duration-300 border border-[#e83fff]/50"
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
                  className="inline-flex items-center px-2 py-1 bg-gradient-to-r from-[#2a1b4a] to-[#1a0e34] text-white text-xs font-medium rounded-lg hover:shadow-lg hover:shadow-[#e83fff]/25 transition-all duration-300 border border-[#e83fff]/50"
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

        {/* main content */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0 gap-1.5 md:gap-2 p-1.5 md:p-2">
     
          {screenshots.length > 0 && (
            <div className="w-full md:w-[45%] flex flex-col order-1 md:order-1">
              <div className="bg-gradient-to-br from-[#2a1b4a]/90 to-[#1a0e34]/90 rounded-lg border-2 border-[#e83fff]/40 backdrop-blur-sm h-48 md:h-full flex flex-col overflow-hidden shadow-xl shadow-[#e83fff]/10">
                <div className="flex items-center justify-between p-1.5 md:p-2 border-b border-[#e83fff]/40 bg-[#e83fff]/10">
                  <h2 className="text-xs font-medium text-white flex items-center">
                    <svg className="w-3 h-3 mr-1.5 text-[#e83fff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {currentScreenshot + 1}/{screenshots.length}
                  </h2>
                  
                  {screenshots.length > 1 && (
                    <div className="hidden md:flex space-x-1">
                      {screenshots.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => goToScreenshot(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            index === currentScreenshot ? 'bg-[#e83fff] shadow-sm shadow-[#e83fff]/50' : 'bg-white/60 hover:bg-[#e83fff]/70'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 p-1 md:p-1.5 min-h-0">
                  <div className="relative h-full group">
                    <div className="relative bg-[#1a0e34]/80 rounded-lg overflow-hidden h-full border border-[#e83fff]/30">
                      <div className="w-full h-full bg-gradient-to-br from-[#2a1b4a]/40 to-[#1a0e34]/60 flex items-center justify-center">
                        {screenshots[currentScreenshot] ? (
                          <img
                            src={getImageUrl(screenshots[currentScreenshot])}
                            alt={screenshots[currentScreenshot].title || `Screenshot ${currentScreenshot + 1}`}
                            className="w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity duration-200"
                            loading="lazy"
                            onClick={handleImageClick}
                          />
                        ) : (
                          <div className="text-white text-center">
                            <svg className="w-8 h-8 mx-auto mb-2 text-[#e83fff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                            className="absolute left-1 md:left-2 top-1/2 transform -translate-y-1/2 bg-[#1a0e34]/90 hover:bg-[#e83fff]/20 text-white p-1 md:p-1.5 rounded-full transition-all duration-300 border border-[#e83fff]/50 shadow-lg backdrop-blur-sm"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button 
                            onClick={nextScreenshot} 
                            className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 bg-[#1a0e34]/90 hover:bg-[#e83fff]/20 text-white p-1 md:p-1.5 rounded-full transition-all duration-300 border border-[#e83fff]/50 shadow-lg backdrop-blur-sm"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}

                      {screenshots[currentScreenshot]?.title && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a0e34]/95 to-transparent p-2 transition-opacity duration-200">
                          <h3 className="text-white font-medium text-xs truncate">{screenshots[currentScreenshot].title}</h3>
                        </div>
                      )}

                      <button
                        onClick={handleImageClick}
                        className="absolute top-1 md:top-1.5 right-1 md:right-1.5 bg-[#1a0e34]/90 hover:bg-[#e83fff]/20 text-white p-1 rounded transition-all duration-200 border border-[#e83fff]/50 shadow-lg backdrop-blur-sm"
                      >
                        <svg className="w-3 h-3 text-[#e83fff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          
          <div className={`${screenshots.length > 0 ? 'w-full md:w-[55%]' : 'w-full'} flex flex-col gap-1.5 overflow-hidden order-2 md:order-2`}>
         
            {technologies.length > 0 && (
              <div className="bg-gradient-to-br from-[#2a1b4a]/90 to-[#1a0e34]/90 rounded-lg p-1.5 md:p-2 border-2 border-[#e83fff]/40 backdrop-blur-sm flex-shrink-0 shadow-xl shadow-[#e83fff]/10">
                <div className="flex items-center justify-between mb-1 md:mb-1.5">
                  <h2 className="text-xs font-medium text-white flex items-center">
                    <svg className="w-3 h-3 mr-1.5 text-[#e83fff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Tech Stack
                  </h2>
                  <span className="text-xs text-white/80">({technologies.length})</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-1.5 py-0.5 bg-gradient-to-r from-[#e83fff]/80 to-[#ff4dc7]/80 border border-[#e83fff]/60 rounded text-white font-medium text-xs shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

   
            <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 flex-1 min-h-0">
              {features.length > 0 && (
                <div className="bg-gradient-to-br from-[#2a1b4a]/90 to-[#1a0e34]/90 rounded-lg border-2 border-[#e83fff]/40 backdrop-blur-sm flex flex-col overflow-hidden shadow-xl shadow-[#e83fff]/10">
                  <div className="p-1.5 border-b border-[#e83fff]/40 bg-[#e83fff]/10 flex-shrink-0">
                    <h3 className="text-xs font-medium text-white flex items-center">
                      <svg className="w-3 h-3 mr-1 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Features
                      <span className="ml-1 text-white/80">({features.length})</span>
                    </h3>
                  </div>
                  <div className="p-1.5 flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                      {features.map((feature, index) => (
                        <li key={index} className="text-white/90 text-xs flex items-start">
                          <span className="text-green-400 mr-1.5 mt-0.5 text-xs flex-shrink-0">•</span>
                          <span className="leading-tight">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {challenges.length > 0 && (
                <div className="bg-gradient-to-br from-[#2a1b4a]/90 to-[#1a0e34]/90 rounded-lg border-2 border-[#e83fff]/40 backdrop-blur-sm flex flex-col overflow-hidden shadow-xl shadow-[#e83fff]/10">
                  <div className="p-1.5 border-b border-[#e83fff]/40 bg-[#e83fff]/10 flex-shrink-0">
                    <h3 className="text-xs font-medium text-white flex items-center">
                      <svg className="w-3 h-3 mr-1 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L4.18 16.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                      Challenges
                      <span className="ml-1 text-white/80">({challenges.length})</span>
                    </h3>
                  </div>
                  <div className="p-1.5 flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                      {challenges.map((challenge, index) => (
                        <li key={index} className="text-white/90 text-xs flex items-start">
                          <span className="text-orange-400 mr-1.5 mt-0.5 text-xs flex-shrink-0">•</span>
                          <span className="leading-tight">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {learnings.length > 0 && (
                <div className="bg-gradient-to-br from-[#2a1b4a]/90 to-[#1a0e34]/90 rounded-lg border-2 border-[#e83fff]/40 backdrop-blur-sm flex flex-col overflow-hidden shadow-xl shadow-[#e83fff]/10">
                  <div className="p-1.5 border-b border-[#e83fff]/40 bg-[#e83fff]/10 flex-shrink-0">
                    <h3 className="text-xs font-medium text-white flex items-center">
                      <svg className="w-3 h-3 mr-1 text-[#e83fff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Learnings
                      <span className="ml-1 text-white/80">({learnings.length})</span>
                    </h3>
                  </div>
                  <div className="p-1.5 flex-1 overflow-y-auto">
                    <ul className="space-y-1">
                      {learnings.map((learning, index) => (
                        <li key={index} className="text-white/90 text-xs flex items-start">
                          <span className="text-white/60 mr-1.5 mt-0.5 text-xs flex-shrink-0">•</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-[#1a0e34]/80"
          onClick={handleModalBackdropClick}
        >
          <div 
            className="relative flex items-center justify-center max-w-[95vw] md:max-w-[90vw] max-h-[95vh] md:max-h-[90vh] overflow-auto p-4"
          >
            <div 
              className="relative flex items-center justify-center"
            >
              <img
                src={getImageUrl(screenshots[modalImageIndex])}
                alt={screenshots[modalImageIndex]?.title || `Screenshot ${modalImageIndex + 1}`}
                className="max-w-[90vw] md:max-w-[80vw] max-h-[85vh] md:max-h-[80vh] object-contain rounded-lg shadow-2xl shadow-[#e83fff]/30 border-2 border-[#e83fff]/50"
              />

              <button
                onClick={closeModal}
                className="absolute top-1 md:top-2 right-1 md:right-2 bg-[#1a0e34]/90 hover:bg-[#e83fff]/20 text-white p-1.5 md:p-2 rounded-full transition-all duration-300 border-2 border-[#e83fff]/50 shadow-lg backdrop-blur-sm z-10"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {screenshots.length > 1 && (
                <>
                  <button
                    onClick={prevModalImage}
                    className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#1a0e34] p-2 md:p-3 rounded-full transition-all duration-300 border-2 border-[#e83fff]/50 shadow-lg z-10"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextModalImage}
                    className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-[#1a0e34] p-2 md:p-3 rounded-full transition-all duration-300 border-2 border-[#e83fff]/50 shadow-lg z-10"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {screenshots[modalImageIndex]?.title && (
              <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 text-[#1a0e34] px-3 md:px-4 py-1.5 md:py-2 rounded-lg border-2 border-[#e83fff]/50 shadow-lg mx-4">
                <h3 className="font-semibold text-sm">{screenshots[modalImageIndex].title}</h3>
                {screenshots[modalImageIndex]?.description && (
                  <p className="text-[#1a0e34]/80 text-xs mt-1">{screenshots[modalImageIndex].description}</p>
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