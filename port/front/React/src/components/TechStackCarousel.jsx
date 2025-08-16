import { useState, useEffect } from 'react'

export default function TechStackGrid({ techStack = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(0)

  
  const technologies = techStack.length > 0 ? techStack : defaultTechStack
  
console.log("First technology object:", technologies[0]);

  const categories = ['All', ...new Set(technologies.map(tech => tech.category).filter(Boolean))]
  console.log("Technologies:", technologies);
console.log("Categories:", categories);
  const filteredTechnologies = selectedCategory === 'All' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory)

  const itemsPerPage = 6 // 2 rows × 3 columns
  const totalPages = Math.ceil(filteredTechnologies.length / itemsPerPage)
  const currentTechnologies = filteredTechnologies.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  )

  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(0)
  }, [selectedCategory])

  const goToNext = () => {
    setCurrentPage(prev => (prev + 1) % totalPages)
  }

  const goToPrev = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages)
  }

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-8 py-6 h-screen flex flex-col justify-center">
      <div className="bg-black/20 backdrop-blur-md rounded-2xl p-8 border border-white/10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl text-white font-bold mb-3 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Tech Stack 🚀
          </h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white hover:scale-105'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative px-16">
          {/* Fixed Grid Container */}
          <div className="h-64 relative overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{
                transform: `translateX(-${currentPage * 100}%)`
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => {
                const pageItems = filteredTechnologies.slice(
                  pageIndex * itemsPerPage,
                  (pageIndex + 1) * itemsPerPage
                )
                
                return (
                  <div key={pageIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-3 grid-rows-2 gap-6 h-full">
                      {pageItems.map((tech, techIndex) => (
                        <div
                          key={`${tech.name}-${pageIndex}`}
                          className="group"
                        >
                          <div className={`
                            bg-gradient-to-br ${tech.color} 
                            rounded-xl p-4 text-center h-full
                            flex flex-col justify-center items-center
                            transform transition-all duration-300
                            hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25
                            cursor-pointer relative overflow-hidden
                            border border-white/10
                          `}>
                            {/* Background decoration */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                            <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
                            
                            {/* Content */}
                            <div className="relative z-10">
                              {/* Tech Icon */}
                              <div className="mb-2 transform transition-transform duration-300 group-hover:scale-110">
                                <img 
                                  src={tech.image} 
                                  alt={tech.name}
                                  className="w-12 h-12 object-contain mx-auto filter drop-shadow-lg"
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'flex'
                                  }}
                                />
                                {/* Fallback */}
                                <div className="w-12 h-12 bg-white/20 rounded-lg hidden items-center justify-center text-lg font-bold text-white">
                                  {tech.name.charAt(0)}
                                </div>
                              </div>
                              
                              {/* Tech Name */}
                              <h3 className="text-white font-bold text-sm mb-1 tracking-wide">
                                {tech.name}
                              </h3>
                              
                              {/* Description */}
                              <p className="text-white/90 text-xs leading-tight">
                                {tech.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Fill empty slots if needed */}
                      {Array.from({ length: itemsPerPage - pageItems.length }).map((_, emptyIndex) => (
                        <div key={`empty-${emptyIndex}`} className="opacity-0"></div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10
                         bg-white/10 hover:bg-white/20 backdrop-blur-sm
                         rounded-full p-3 text-white text-xl
                         transition-all duration-300 hover:scale-110
                         border border-white/20"
              >
                ←
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10
                         bg-white/10 hover:bg-white/20 backdrop-blur-sm
                         rounded-full p-3 text-white text-xl
                         transition-all duration-300 hover:scale-110
                         border border-white/20"
              >
                →
              </button>
            </>
          )}
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${currentPage === index 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                  }
                `}
              />
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-6 bg-white/5 backdrop-blur-md rounded-lg p-3 border border-white/10">
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-white">
                {filteredTechnologies.length}
              </div>
              <div className="text-white/70 text-xs">Total</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {totalPages}
              </div>
              <div className="text-white/70 text-xs">Pages</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {currentPage + 1}
              </div>
              <div className="text-white/70 text-xs">Current</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">
                {currentTechnologies.length}
              </div>
              <div className="text-white/70 text-xs">Showing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}