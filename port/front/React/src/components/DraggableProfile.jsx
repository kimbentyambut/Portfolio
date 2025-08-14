import { useState, useEffect, useRef } from 'react'

export default function DraggableProfile({ 
  frontImage, 
  backImage, 
  frontAlt = "Profile Picture", 
  backAlt = "Hidden Image",
  size = "w-60 h-60",
  innerSize = "w-52 h-52"
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragStart])

 
  const resetPosition = () => {
    setPosition({ x: 0, y: 0 })
  }


  useEffect(() => {
    if (dragRef.current) {
      dragRef.current.resetPosition = resetPosition
    }
  }, [])

  return (
    <div className={`relative ${size} mb-6`}>
   
      <div className={`absolute inset-0 ${size} rounded-full flex items-center justify-center`}>
        {backImage ? (
          <img
            src={backImage}
            alt={backAlt}
            className={`${innerSize} object-cover rounded-full`}
          />
        ) : (
          <div className={`${innerSize} rounded-full bg-gradient-to-br from-yellow-400 via-red-500 to-pink-500 flex items-center justify-center`}>
            <span className="text-white font-bold text-lg">Hidden Image!</span>
          </div>
        )}
      </div>

    
      <div
        ref={dragRef}
        className={`absolute ${size} rounded-full flex items-center justify-center cursor-move transition-transform ${
          isDragging ? 'scale-105 rotate-2' : 'scale-100'
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) ${isDragging ? 'scale(1.05) rotate(2deg)' : ''}`,
          zIndex: isDragging ? 50 : 20
        }}
        onMouseDown={handleMouseDown}
      >
        <div className={`${innerSize} rounded-full flex items-center justify-center overflow-hidden`}>
          {frontImage ? (
            <img
              src={frontImage}
              alt={frontAlt}
              className={`${innerSize} object-cover rounded-full`}
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center`}>
              <span className="text-white font-bold">Profile Pic</span>
            </div>
          )}
        </div>
      </div>


      {!isDragging && position.x === 0 && position.y === 0 && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 text-sm animate-bounce">
          ← Drag me! →
        </div>
      )}
    </div>
  )
}