import { useState, useEffect } from "react";

const ProjectsCarousel = ({ projects, onProjectClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const cardsPerView = 3;
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4">

      <div className="text-center mb-12">
        <h2 className="text-5xl text-[#FEEEEC]/100 font-bold mb-4">
          Corporate Projects 🌌
        </h2>
        <p className="text-xl text-[#FEEEEC]/90 mb-4">
          Hover over the cards to explore my latest work
        </p>
        <div className="text-sm text-[#FEEEEC]/60">
          Use arrows to navigate • Click on a card to view details
        </div>
      </div>

 
      <div className="relative">
    
    
        <div className="overflow-hidden rounded-2xl">
          <div className="relative h-[460px] flex items-center justify-center">

            {projects
              .slice(currentSlide, currentSlide + cardsPerView)
              .map((project, index) => {
                const actualIndex = currentSlide + index;
                const isHovered = hoveredCard === actualIndex;
                const position = index - 1;

                let baseTranslateX = position * 320;
                let baseRotation = position * 3;
                let baseScale = index === 1 ? 1 : 0.9;
                let baseZIndex = index === 1 ? 20 : 10;

                const hoverRotation = isHovered ? 0 : baseRotation;
                const hoverTranslateX = baseTranslateX;
                const hoverTranslateY = isHovered ? -20 : 0;
                const hoverScale = isHovered ? 1.05 : baseScale;
                const hoverZIndex = isHovered ? 50 : baseZIndex;

                return (
                  <div
                    key={project.id}
                    className="absolute w-80 h-96 cursor-pointer group"
                    style={{
                      transform: `translateX(${hoverTranslateX}px) translateY(${hoverTranslateY}px) rotate(${hoverRotation}deg) scale(${hoverScale})`,
                      zIndex: hoverZIndex,
                      transition:
                        "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                    onMouseEnter={() => setHoveredCard(actualIndex)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => onProjectClick(project.id)}
                  >
             
                    <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#e83fff]/90 to-[#e83fff]/30 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-10"
                        style={{ backgroundImage: `url(${project.bgImage})` }}
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
                        <h3 className="text-xl font-bold text-white text-center mb-3 leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-gray-200 text-xs leading-relaxed text-center mb-4 flex-grow">
                          {project.description}
                        </p>
                        <div
                          className={`transition-all duration-300 ${isHovered
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-4"
                            }`}
                        >
                          <button
                            className="w-full py-2 px-3 rounded-xl 
             bg-gradient-to-r from-[#1a0e34] to-[#e83fff] 
             text-white font-semibold text-sm 
             shadow-lg shadow-[#e83fff]/20
             hover:shadow-[#e83fff]/40 
             transition-all duration-300 
             group-hover:scale-105"
                            onClick={(e) => {
                              e.stopPropagation();
                              onProjectClick(project.id);
                            }}
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
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"
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
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-3 transition-all duration-300 group opacity-70 hover:opacity-100 z-30"
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
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/10 rounded-full p-3 transition-all duration-300 group opacity-70 hover:opacity-100 z-30"
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
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/40 hover:bg-white/60"
              }`}
          />
        ))}
      </div>

 
      <div className="flex justify-center mt-4">
        <button
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
