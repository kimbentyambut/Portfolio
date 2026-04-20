import { useState, useEffect } from "react";

const ProjectsCarousel = ({ projects, onProjectClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cardsPerView = isMobile ? 1 : isTablet ? 2 : 3;
  const maxSlide = Math.max(0, projects.length - cardsPerView);

  // Auto play
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= maxSlide ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? maxSlide : prev - 1));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(Math.min(index, maxSlide));
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (currentSlide > maxSlide) {
      setCurrentSlide(0);
    }
  }, [currentSlide, maxSlide]);

  const handleProjectClick = (event, projectId) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Additional mobile-specific prevention
    if (event.type === 'touchend') {
      event.preventDefault();
    }
    
    onProjectClick(projectId);
  };

  const handleCardClick = (event, projectId) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Additional mobile-specific prevention
    if (event.type === 'touchend') {
      event.preventDefault();
    }
    
    onProjectClick(projectId);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-4">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#FEEEEC]/100 font-bold mb-4">
          Corporate Projects 🌌
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-[#FEEEEC]/90 mb-3 sm:mb-4">
          {isMobile ? "Swipe or use arrows to browse my projects" : "Hover over the cards to explore my latest work"}
        </p>
        <div className="text-xs sm:text-sm text-[#FEEEEC]/60">
          Use arrows to navigate • Click on a card to view details
        </div>
      </div>

      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <div className="relative h-[430px] sm:h-[460px] flex items-center justify-center">
            {projects
              .slice(currentSlide, currentSlide + cardsPerView)
              .map((project, index) => {
                const actualIndex = currentSlide + index;
                const isHovered = hoveredCard === actualIndex;
                const centerIndex = cardsPerView === 1 ? 0 : cardsPerView === 2 ? 0.5 : 1;
                const position = index - centerIndex;

                let baseTranslateX = position * (isMobile ? 0 : isTablet ? 260 : 320);
                let baseRotation = position * 3;
                let baseScale = cardsPerView === 1 ? 1 : Math.abs(position) < 0.6 ? 1 : 0.9;
                let baseZIndex = Math.abs(position) < 0.6 ? 20 : 10;

                const hoverRotation = isMobile ? 0 : isHovered ? 0 : baseRotation;
                const hoverTranslateX = baseTranslateX;
                const hoverTranslateY = isMobile ? 0 : isHovered ? -20 : 0;
                const hoverScale = isMobile ? baseScale : isHovered ? 1.05 : baseScale;
                const hoverZIndex = isHovered ? 50 : baseZIndex;

                return (
                  <div
                    key={project.id}
                    className="absolute w-[88vw] max-w-80 h-[360px] sm:h-96 cursor-pointer group touch-manipulation"
                    style={{
                      transform: `translateX(${hoverTranslateX}px) translateY(${hoverTranslateY}px) rotate(${hoverRotation}deg) scale(${hoverScale})`,
                      zIndex: hoverZIndex,
                      transition: "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                    onMouseEnter={() => setHoveredCard(actualIndex)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={(e) => handleCardClick(e, project.id)}
                    onTouchEnd={(e) => handleCardClick(e, project.id)}
                  >
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#e83fff]/90 to-[#e83fff]/30 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-10"
                        style={{
                          backgroundImage: `url(${project.bgImage})`,
                        }}
                      />

                      <div className="relative z-10 p-6 h-full flex flex-col">
                        <div className="text-center mb-4">
                          {typeof project.icon === "string" &&
                          project.icon.length <= 2 ? (
                            <span className="text-5xl block">
                              {project.icon}
                            </span>
                          ) : (
                            <img
                              src={project.icon}
                              alt={project.title}
                              className="w-14 h-14 mx-auto object-contain"
                            />
                          )}
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-white text-center mb-3 leading-tight">
                          {project.title}
                        </h3>

                        <p className="text-gray-200 text-xs sm:text-sm leading-relaxed text-center mb-4 flex-grow">
                          {project.description}
                        </p>

                        <div
                          className={`transition-all duration-300 ${
                            isHovered
                              ? "opacity-100 translate-y-0"
                              : isMobile
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-4"
                          }`}
                        >
                          <button
                            type="button"
                            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#1a0e34] to-[#e83fff] text-white font-semibold text-sm shadow-lg shadow-[#e83fff]/20 hover:shadow-[#e83fff]/40 transition-all duration-300 group-hover:scale-105 touch-manipulation"
                            onClick={(e) => handleProjectClick(e, project.id)}
                            onTouchEnd={(e) => handleProjectClick(e, project.id)}
                            style={{ WebkitTouchCallout: 'none', WebkitUserSelect: 'none' }}
                          >
                            <span className="flex items-center justify-center">
                              Explore Project
                              <svg
                                className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </span>
                          </button>
                        </div>
                      </div>

                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 transition-opacity duration-300 ${
                          isHovered ? "opacity-100" : "opacity-0"
                        }`}
                      />
                    </div>

                    <div className="absolute inset-0 rounded-2xl shadow-2xl shadow-purple-900/20 -z-10" />
                  </div>
                );
              })}
          </div>
        </div>

        <button
          type="button"
          onClick={prevSlide}
          className="absolute left-1 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-2 sm:p-3 transition-all duration-300 group opacity-80 hover:opacity-100 z-30"
          onMouseEnter={() => setIsAutoPlaying(false)}
        >
          <svg
            className="w-5 h-5 text-white transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          type="button"
          onClick={nextSlide}
          className="absolute right-1 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-2 sm:p-3 transition-all duration-300 group opacity-80 hover:opacity-100 z-30"
          onMouseEnter={() => setIsAutoPlaying(false)}
        >
          <svg
            className="w-5 h-5 text-white transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: maxSlide + 1 }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-white/60 hover:text-white/80 text-sm transition-colors duration-300"
        >
          {isAutoPlaying ? "⏸️ Pause Auto-play" : "▶️ Resume Auto-play"}
        </button>
      </div>
    </div>
  );
};

export default ProjectsCarousel;