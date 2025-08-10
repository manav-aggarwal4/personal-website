'use client'

import { useState, useEffect, useRef } from 'react'

interface PhotoCarouselProps {
  photos: string[]
  interval?: number
  className?: string
}

export default function PhotoCarousel({ photos, interval = 4000, className = "" }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextPhoto = () => {
    if (isTransitioning || photos.length <= 1) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  const prevPhoto = () => {
    if (isTransitioning || photos.length <= 1) return
    setIsTransitioning(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
    setTimeout(() => setIsTransitioning(false), 1000)
  }

  const handleClick = () => {
    if (isTransitioning) return
    nextPhoto()
  }

  const handleSwipe = (e: React.TouchEvent) => {
    if (isTransitioning) return
    
    const touch = e.touches[0]
    const startX = touch.clientX
    const startY = touch.clientY
    
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0]
      const endX = touch.clientX
      const endY = touch.clientY
      const deltaX = endX - startX
      const deltaY = endY - startY
      
      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          prevPhoto()
        } else {
          nextPhoto()
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd)
    }
    
    document.addEventListener('touchend', handleTouchEnd)
  }

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index))
  }

  const handleImageError = (index: number) => {
    console.warn(`Failed to load image at index ${index}: ${photos[index]}`)
  }

  useEffect(() => {
    if (photos.length <= 1) return

    intervalRef.current = setInterval(() => {
      if (!isTransitioning) {
        nextPhoto()
      }
    }, interval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [photos.length, interval, isTransitioning])

  if (photos.length === 0) {
    return (
      <div className={`w-[500px] h-[600px] rounded-2xl bg-gradient-to-br from-accent/20 to-accent-light/20 flex items-center justify-center ${className}`}>
        <span className="text-accent/50 text-lg">Add Photos</span>
      </div>
    )
  }

  return (
    <div 
      className={`relative w-[500px] h-[600px] rounded-2xl overflow-hidden cursor-pointer group ${className}`}
      onClick={handleClick}
      onTouchStart={handleSwipe}
    >
      {photos.map((photo, index) => (
        <img
          key={index}
          src={photo}
          alt={`Profile photo ${index + 1}`}
          onLoad={() => handleImageLoad(index)}
          onError={() => handleImageError(index)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            index === currentIndex 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 -translate-x-full scale-95'
          }`}
        />
      ))}
      
      {/* Loading indicator for current image */}
      {!loadedImages.has(currentIndex) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent-light/10">
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 pointer-events-none" />
    </div>
  )
} 