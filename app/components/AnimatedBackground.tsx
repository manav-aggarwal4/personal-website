'use client'

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient opacity-30" />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-xl float" 
           style={{ animationDelay: '0s' }} />
      
      <div className="absolute top-40 right-20 w-24 h-24 bg-accent-light/10 rounded-full blur-xl float" 
           style={{ animationDelay: '2s' }} />
      
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-accent-dark/10 rounded-full blur-xl float" 
           style={{ animationDelay: '4s' }} />
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  )
} 