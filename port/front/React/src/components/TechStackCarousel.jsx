import { useState, useEffect } from 'react'

export default function TechStackCarousel({ techStack = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)


  const defaultTechStack = [
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
    }
  ]

  const technologies = techStack.length > 0 ? techStack : defaultTechStack
  const itemsPerView = 3
  const maxIndex = Math.max(0, technologies.length - itemsPerView)


  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, maxIndex])

  const goToNext = () => {
    setCurrentIndex(prevIndex => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    )
  }

  const goToPrev = () => {
    setCurrentIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    )
  }

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex))
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* header */}
      <div className="text-center mb-8">
        <h2 className="text-5xl text-white font-bold mb-4">
          My TechStack 🚀
        </h2>
        <p className="text-white/70 text-lg">
          Technologies I work with
        </p>
      </div>

      {/* carousel cont */}
      <div 
        className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* tech cards cont */}
        <div className="overflow-hidden rounded-xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
            }}
          >
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="w-1/3 flex-shrink-0 px-3"
              >
                <div className={`
                  bg-gradient-to-br ${tech.color} 
                  rounded-xl p-6 text-center h-48 
                  flex flex-col justify-center items-center
                  transform transition-all duration-300
                  hover:scale-105 hover:shadow-2xl
                  cursor-pointer
                `}>
                  {/* techh icon */}
                  <div className="text-4xl mb-3">
                    <img 
                      src={tech.image} 
                      alt={tech.name}
                      className="w-16 h-16 object-contain mx-auto filter drop-shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'block'
                      }}
                    />
                    {/* fallback */}
                    <div className="text-4xl font-bold text-white hidden">
                      {tech.name.charAt(0)}
                    </div>
                  </div>
                  
                  {/* tech name */}
                  <h3 className="text-white font-bold text-xl mb-2">
                    {tech.name}
                  </h3>
                  
                  {/* description */}
                  <p className="text-white/90 text-sm">
                    {tech.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* nav arrows */}
        <button
          onClick={goToPrev}
          disabled={technologies.length <= itemsPerView}
          className={`
            absolute left-2 top-1/2 transform -translate-y-1/2
            bg-white/20 hover:bg-white/30 backdrop-blur-sm
            rounded-full p-3 text-white text-xl
            transition-all duration-200
            ${technologies.length <= itemsPerView ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
          `}
        >
          ←
        </button>
        
        <button
          onClick={goToNext}
          disabled={technologies.length <= itemsPerView}
          className={`
            absolute right-2 top-1/2 transform -translate-y-1/2
            bg-white/20 hover:bg-white/30 backdrop-blur-sm
            rounded-full p-3 text-white text-xl
            transition-all duration-200
            ${technologies.length <= itemsPerView ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
          `}
        >
          →
        </button>
      </div>

      {/* dots */}
      {technologies.length > itemsPerView && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-200
                ${currentIndex === index 
                  ? 'bg-white scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
                }
              `}
            />
          ))}
        </div>
      )}

      {/* tech count */}
      <div className="text-center mt-4 text-white/60 text-sm">
        Showing {Math.min(itemsPerView, technologies.length)} of {technologies.length} technologies
      </div>
    </div>
  )
}