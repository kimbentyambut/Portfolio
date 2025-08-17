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


  const itemsPerPage = window.innerWidth < 768 ? 2 : 6
  const totalPages = Math.ceil(filteredTechnologies.length / itemsPerPage)
  const currentTechnologies = filteredTechnologies.slice(
    currentPage * itemsPerPage, 
    (currentPage + 1) * itemsPerPage
  )


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
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-4 md:py-6 min-h-screen md:h-screen flex flex-col justify-center">
      <div className="bg-black/20 backdrop-blur-md rounded-2xl p-4 md:p-8 border border-white/10">

        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl text-white font-bold mb-2 md:mb-3 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Tech Stack 🚀
          </h2>
          
     
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-3 md:mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300
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


        <div className="relative px-8 md:px-16">

          <div className="h-80 md:h-64 relative overflow-hidden rounded-xl">
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
         
                    <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-2 gap-4 md:gap-6 h-full">
                      {pageItems.map((tech, techIndex) => (
                        <div
                          key={`${tech.name}-${pageIndex}`}
                          className="group"
                        >
                          <div className={`
                            bg-gradient-to-br ${tech.color} 
                            rounded-xl p-3 md:p-4 text-center h-full
                            flex flex-col justify-center items-center
                            transform transition-all duration-300
                            hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25
                            cursor-pointer relative overflow-hidden
                            border border-white/10
                          `}>
                      
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                            <div className="absolute -top-6 -right-6 w-12 h-12 bg-white/10 rounded-full blur-lg"></div>
                            
                         
                            <div className="relative z-10">
                           
                              <div className="mb-2 transform transition-transform duration-300 group-hover:scale-110">
                                <img 
                                  src={tech.image} 
                                  alt={tech.name}
                                  className="w-10 h-10 md:w-12 md:h-12 object-contain mx-auto filter drop-shadow-lg"
                                  onError={(e) => {
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'flex'
                                  }}
                                />
                            
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-lg hidden items-center justify-center text-base md:text-lg font-bold text-white">
                                  {tech.name.charAt(0)}
                                </div>
                              </div>
                              
                            
                              <h3 className="text-white font-bold text-sm md:text-sm mb-1 tracking-wide">
                                {tech.name}
                              </h3>
                              
                         
                              <p className="text-white/90 text-xs leading-tight">
                                {tech.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                  
                      {Array.from({ length: itemsPerPage - pageItems.length }).map((_, emptyIndex) => (
                        <div key={`empty-${emptyIndex}`} className="opacity-0"></div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

     
          {totalPages > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-0 md:left-0 top-1/2 transform -translate-y-1/2 z-10
                         bg-white/10 hover:bg-white/20 backdrop-blur-sm
                         rounded-full p-2 md:p-3 text-white text-lg md:text-xl
                         transition-all duration-300 hover:scale-110
                         border border-white/20"
              >
                ←
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-0 md:right-0 top-1/2 transform -translate-y-1/2 z-10
                         bg-white/10 hover:bg-white/20 backdrop-blur-sm
                         rounded-full p-2 md:p-3 text-white text-lg md:text-xl
                         transition-all duration-300 hover:scale-110
                         border border-white/20"
              >
                →
              </button>
            </>
          )}
        </div>

      
        {totalPages > 1 && (
          <div className="hidden md:flex justify-center mt-6 space-x-2">
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

     
        <div className="mt-4 md:mt-6 bg-white/5 backdrop-blur-md rounded-lg p-2 md:p-3 border border-white/10">
          <div className="grid grid-cols-4 gap-2 md:gap-3 text-center">
            <div>
              <div className="text-base md:text-lg font-bold text-white">
                {filteredTechnologies.length}
              </div>
              <div className="text-white/70 text-xs">Total</div>
            </div>
            <div>
              <div className="text-base md:text-lg font-bold text-white">
                {totalPages}
              </div>
              <div className="text-white/70 text-xs">Pages</div>
            </div>
            <div>
              <div className="text-base md:text-lg font-bold text-white">
                {currentPage + 1}
              </div>
              <div className="text-white/70 text-xs">Current</div>
            </div>
            <div>
              <div className="text-base md:text-lg font-bold text-white">
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