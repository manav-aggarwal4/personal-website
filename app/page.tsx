'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import PhotoCarousel from './components/PhotoCarousel'
import { cn } from './utils/cn'
import React from 'react'

const SectionDivider = ({ title }: { title: string }) => (
  <div className="flex items-center my-32 w-full max-w-4xl">
    <span className="text-3xl mr-4 text-accent glow-text">✦</span>
    <h2 className="text-3xl font-bold uppercase tracking-widest gradient-text">{title}</h2>
    <span className="flex-1 border-b border-accent-light/30 ml-6"></span>
  </div>
)

const SkillCard = ({ skill, level }: { skill: string; level: number }) => (
  <div className="glass rounded-xl p-6 hover:scale-105 transition-transform duration-300 group">
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-lg font-semibold text-accent-dark">{skill}</h3>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-4 h-4 ${i < level ? 'text-accent fill-current' : 'text-accent-light/30'}`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>
    </div>
    <div className="w-full bg-accent-light/20 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-accent to-accent-light h-2 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${(level / 5) * 100}%` }}
      />
    </div>
  </div>
)

const ProjectCard = ({ title, description, tech, github }: { 
  title: string; 
  description: string; 
  tech: string[]; 
  github?: string; 
}) => (
  <div className="glass rounded-xl p-6 hover:scale-105 transition-all duration-300 group">
    <div className="flex items-center gap-3 mb-3">
      <h3 className="text-xl font-semibold text-accent-dark">{title}</h3>
      <div className="flex flex-wrap gap-1">
        {tech.map((t) => (
          <span key={t} className="px-2 py-0.5 rounded-full text-xs font-medium bg-accent-light/20 dark:bg-accent/20 text-accent-dark dark:text-accent-light">
            {t}
          </span>
        ))}
      </div>
    </div>
    <p className="text-foreground/80 mb-4 leading-relaxed">{description}</p>
    <div className="flex gap-3">
      {github && (
        <a 
          href={github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-accent hover:text-accent-dark transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Code
        </a>
      )}
    </div>
  </div>
)

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [regentsOpen, setRegentsOpen] = useState(false)
  const [presidentialOpen, setPresidentialOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isLogoExploding, setIsLogoExploding] = useState(false)
  const navigatingTo = useRef<string | null>(null);
  const navigationTimeout = useRef<NodeJS.Timeout | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const isScrolling = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const regentsRef = useRef<HTMLButtonElement>(null);
  const presidentialRef = useRef<HTMLButtonElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const [isWaving, setIsWaving] = useState(false);

  const handleLogoClick = () => {
    if (isLogoExploding) return;
    setIsLogoExploding(true);
    setTimeout(() => {
        setIsLogoExploding(false);
    }, 1500);
  };

  // Add your photo URLs here
  const profilePhotos = [
    '/Websitepic13.jpg',
    '/WebsitePic3.jpeg',
    '/Websitepic12.jpg',
    '/Websitepic1.jpg',
    '/Websitepic2.jpg',
    '/Websitepic4.jpg',
    '/Websitepic5.jpg',
    '/Websitepic6.jpeg',
    '/Websitepic7.jpg',
    '/Websitepic8.jpg',
    '/Websitepic10.jpg',
    '/Websitepic11.jpg',
    '/Websitepic9.jpg'
  ]

  useEffect(() => {
    const handleScroll = () => {
      if (navigatingTo.current) return; // Ignore scroll events during programmatic scroll

      setScrollY(window.scrollY);
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'skills', 'projects'];
      let currentSection = 'home';

      // Check if user is at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
      if (isAtBottom) {
        currentSection = 'projects';
      } else {
        // Find the last section that has scrolled past the top of the viewport
        for (const sectionId of sections) {
          const section = document.getElementById(sectionId);
          if (section && section.getBoundingClientRect().top <= 150) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
    
    // Trigger animations on mount
    setTimeout(() => setIsVisible(true), 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
      }
    }
  }, []);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.scholarship-dropdown')) {
        setRegentsOpen(false)
        setPresidentialOpen(false)
        regentsRef.current?.blur();
        presidentialRef.current?.blur();
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleRegentsClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setRegentsOpen(!regentsOpen)
    setPresidentialOpen(false) // Close other dropdown
  }

  const handlePresidentialClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPresidentialOpen(!presidentialOpen)
    setRegentsOpen(false) // Close other dropdown
  }

  const scrollToSection = (sectionId: string) => {
    // Map section IDs to their title element IDs
    const titleElementId = sectionId === 'about' ? 'about-title' : 
                          sectionId === 'skills' ? 'skills-title' : 
                          sectionId === 'projects' ? 'projects-title' : 
                          sectionId;
    
    const element = document.getElementById(titleElementId) || document.getElementById(sectionId)
    if (element) {
      navigatingTo.current = sectionId;
      setActiveSection(sectionId);

      if (navigationTimeout.current) {
        clearTimeout(navigationTimeout.current);
      }

      navigationTimeout.current = setTimeout(() => {
        navigatingTo.current = null;
      }, 1000); // Stop ignoring scroll events after 1s

      // Get the element's position and scroll to position it right under the nav bar
      const rect = element.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const targetPosition = scrollTop + rect.top - 120 // Offset for fixed nav bar

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  const navItems = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About Me', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'projects', label: 'Projects', href: '#projects' }
  ]

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Enhanced Navigation */}
              <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-950/95 to-blue-900/95 backdrop-blur-xl shadow-2xl border-b-2 border-blue-700/30">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo/Brand - Premium Design */}
            <motion.div
              initial={{ opacity: 0, x: -14, y: 0 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -14, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center z-10"
            >
              <div className="group cursor-pointer" onClick={handleLogoClick}>
                <div className="relative">
                  {isLogoExploding && Array.from({ length: 50 }).map((_, i) => {
                      const angle = (i / 50) * 360;
                      const radius = Math.random() * 150 + 50;
                      const x = Math.cos(angle * (Math.PI / 180)) * radius;
                      const y = Math.sin(angle * (Math.PI / 180)) * radius;
                      const colors = ['#2563eb', '#60a5fa', '#1e40af', '#ffffff'];
                      const color = colors[i % colors.length];

                      return (
                          <motion.div
                              key={i}
                              className="absolute top-1/2 left-1/2"
                              style={{
                                  width: Math.random() * 8 + 4,
                                  height: Math.random() * 8 + 4,
                                  backgroundColor: color,
                                  borderRadius: '50%',
                                  x: '-50%',
                                  y: '-50%'
                              }}
                              initial={{ opacity: 1, scale: 1 }}
                              animate={{
                                  x: `${x}px`,
                                  y: `${y}px`,
                                  scale: 0,
                                  opacity: 0,
                              }}
                              transition={{
                                  duration: 0.8 + Math.random() * 0.7,
                                  ease: "circOut",
                              }}
                          />
                      );
                  })}
                  {/* Enhanced logo container */}
                  <motion.div 
                    className="relative w-14 h-14 rounded-3xl bg-gradient-to-br from-accent via-purple-500 to-accent-light flex items-center justify-center shadow-2xl hover:shadow-accent/25 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 overflow-hidden"
                    animate={{ scale: isLogoExploding ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    {/* Main letter */}
                    <span className="relative text-white font-black text-2xl tracking-tight z-10 group-hover:scale-110 transition-transform duration-300">M</span>
                    
                    {/* Enhanced decorative elements */}
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:animate-pulse" />
                    <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 group-hover:animate-bounce" />
                  </motion.div>
                  
                  {/* Enhanced glow effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/60 via-purple-500/60 to-accent-light/60 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                </div>
                
              </div>
            </motion.div>

            {/* Desktop Navigation - Centered Horizontally and Vertically Aligned */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -30 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hidden md:flex items-center justify-center gap-x-16 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  onClick={() => scrollToSection(item.id)}
                  className="relative group rounded-2xl px-8 py-4 text-lg font-extrabold tracking-wide text-white/90 transition-all duration-500 hover:text-white focus:outline-none overflow-hidden"
                >
                  {/* Background gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  
                  {/* Active section indicator - underline only */}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white to-blue-200 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  {/* Text with enhanced styling */}
                  <span className="relative z-20 group-hover:scale-105 transition-transform duration-300">
                    {item.label}
                  </span>
                  
                  {/* Thicker underline effect */}
                  <div className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-white to-blue-200 group-hover:w-full group-hover:left-0 transition-all duration-500 rounded-full" />
                </motion.button>
              ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="md:hidden z-10"
            >
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="relative glass rounded-2xl p-4 hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-xl group overflow-hidden"
              >
                {/* Background effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <svg className="relative w-7 h-7 text-accent group-hover:rotate-90 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Dark Mode Toggle - Far Right Edge */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="hidden md:block fixed top-4 right-6 z-50"
        >
          <button 
            onClick={toggleDarkMode}
            className="relative glass rounded-2xl p-4 hover:scale-110 transition-all duration-500 shadow-lg hover:shadow-xl group overflow-hidden border border-white/30"
          >
            {/* Background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {isDarkMode ? (
              <svg className="relative w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            ) : (
              <svg className="relative w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </motion.div>

        {/* Enhanced Bottom Bar */}
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
      </nav>

      {/* Enhanced Mobile Menu Dropdown */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: mobileMenuOpen ? 1 : 0, 
          height: mobileMenuOpen ? 'auto' : 0 
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-white/95 dark:bg-black/90 backdrop-blur-2xl border-b border-accent/20 dark:border-accent/30 shadow-2xl"
      >
        <div className="px-8 py-8 space-y-3">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: mobileMenuOpen ? 1 : 0, 
                x: mobileMenuOpen ? 0 : -20 
              }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => {
                scrollToSection(item.id)
                setMobileMenuOpen(false)
              }}
              className={`w-full text-left px-6 py-5 rounded-2xl font-extrabold tracking-wide text-lg transition-all duration-500 group relative overflow-hidden ${
                activeSection === item.id
                  ? 'text-accent bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 shadow-lg'
                  : 'text-foreground/80 hover:text-accent hover:bg-gradient-to-r hover:from-accent/5 hover:via-accent/10 hover:to-accent/5'
              }`}
            >
              {/* Text with enhanced styling */}
              <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                {item.label}
              </span>
              
              {/* Thicker underline effect */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent to-accent-light group-hover:w-full transition-all duration-500 rounded-full" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center justify-center min-h-screen relative px-6 pt-24">
        <div className="text-center max-w-6xl mx-auto">
          <div 
            className="flex flex-col lg:flex-row items-center justify-center gap-12"
          >
            {/* Text Content */}
            <div className="flex-1 max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-7xl font-extrabold mb-12 glow-text">
                  <span className="gradient-text">Manav Aggarwal</span> {'\u{1F9F8}'}
                </h1>
                {/* Spacer for better title spacing */}
                <div className="h-3"></div>
                <h2 className="text-2xl font-semibold mb-10 text-accent-light">
                  EECS Student at UC Berkeley
                </h2>
                {/* Spacer between EECS and scholars */}
                <div className="h-4"></div>
                <div className="flex items-center justify-center gap-6 mb-16">
                  <div className="relative scholarship-dropdown">
                    <button 
                      ref={regentsRef}
                      onClick={handleRegentsClick}
                      className={`text-lg text-foreground/80 transition-all duration-300 hover:text-accent flex items-center gap-2 group focus:outline-none rounded-lg px-2 py-1 ${regentsOpen ? 'ring-2 ring-accent/20' : ''}`}
                    >
                      Regents' and Chancellor's Scholar
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${regentsOpen ? 'rotate-180' : ''}`} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </button>
                    {/* Dropdown */}
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 transition-all duration-300 z-50 ${regentsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl min-w-80 max-w-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-foreground/90 dark:text-foreground/80 leading-relaxed font-medium">
                            Merit-based scholarship awarded to the top 1% of undergraduates at UC Berkeley.
                          </p>
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white dark:border-b-gray-900"></div>
                      </div>
                    </div>
                  </div>
                  
                  <span className="text-lg text-foreground/60">|</span>
                  
                  <div className="relative scholarship-dropdown">
                    <button 
                      ref={presidentialRef}
                      onClick={handlePresidentialClick}
                      className={`text-lg text-foreground/80 transition-all duration-300 hover:text-accent flex items-center gap-2 group focus:outline-none rounded-lg px-2 py-1 ${presidentialOpen ? 'ring-2 ring-accent/20' : ''}`}
                    >
                      US Presidential Scholar
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${presidentialOpen ? 'rotate-180' : ''}`} 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                      >
                        <polyline points="6,9 12,15 18,9"/>
                      </svg>
                    </button>
                    {/* Dropdown */}
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 transition-all duration-300 z-50 ${presidentialOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl min-w-80 max-w-sm border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                          <p className="text-sm text-foreground/90 dark:text-foreground/80 leading-relaxed font-medium">
                            Top 161 students in the nation, awarded by President Joe Biden. 
                          </p>
                        </div>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white dark:border-b-gray-900"></div>
                      </div>
                      </div>
                  </div>
                </div>
                {/* Spacer between scholarships and logos */}
                <div className="h-6"></div>
                <div className="flex items-center gap-8 justify-center mb-12">
                  <a
                    href="https://drive.google.com/file/d/1OATnmUKG_MwQClDjpwES-zN31BiqaBXw/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 rounded-full font-bold glass hover:scale-105 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7,10 12,15 17,10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    View Resume
                  </a>
                  {/* Social Media Links */}
                  <div className="flex items-center gap-4">
                    <a href="mailto:manav_aggarwal@berkeley.edu" className="glass rounded-full p-4 hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </a>
                    <a href="https://github.com/manav-aggarwal4" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-4 hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.237 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/manavaggarwal4/" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-4 hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                        <rect x="2" y="9" width="4" height="12"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    </a>
                    <a href="https://x.com/manav_a4" target="_blank" rel="noopener noreferrer" className="glass rounded-full p-4 hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Photo Carousel */}
            <div className="flex-1 flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.8 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <PhotoCarousel 
                  photos={profilePhotos} 
                  interval={5000}
                  className="shadow-2xl border-4 border-white/20"
                />
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isVisible && scrollY < 50 ? 1 : 0,
            y: isVisible && scrollY < 50 ? 0 : 20
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection('about-title')}
            className="flex flex-col items-center gap-2 text-center group focus:outline-none"
            aria-label="Scroll to next section"
          >
            <p className="text-sm text-foreground/60 mb-2 transition-colors group-hover:text-accent">
              Scroll to explore
            </p>
            <svg
              className="w-8 h-8 text-accent animate-bounce transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </button>
        </motion.div>
      </section>

      <div className="h-40" />

      {/* About Me Header with True Edge-to-Edge Broken Line using Grid */}
      <div id="about-title" className="w-screen grid grid-cols-[1fr_auto_1fr] items-center gap-0 mb-32 select-none left-1/2 -translate-x-1/2 relative" style={{ minHeight: '80px', position: 'relative' }}>
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-blue-800 to-blue-900 dark:from-transparent dark:via-blue-300 dark:to-blue-400" />
        <h2 className="px-8 text-6xl font-extrabold tracking-tight text-center text-blue-800 dark:text-blue-300 whitespace-nowrap">
          About Me
        </h2>
        <div className="h-1.5 w-full bg-gradient-to-l from-transparent via-blue-800 to-blue-900 dark:from-transparent dark:via-blue-300 dark:to-blue-400" />
      </div>

      <section id="about" className="py-32 px-6 min-h-screen flex flex-col items-center justify-start pt-40 w-full">
        {/* Side by side layout for Hi there and Experience */}
        <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-12 mb-16 mt-10">
          
          {/* Hi there section - Left side */}
          <div className="flex-1 flex flex-col items-center">
            <div className="glass rounded-3xl border-4 border-accent shadow-2xl px-8 py-6 flex items-center justify-center mb-6 relative inline-block min-w-[400px]">
              <h2 className="text-5xl md:text-6xl font-extrabold gradient-text tracking-tight text-center flex items-center justify-center gap-4">
                Hi there!
                <span
                  className={`text-5xl`}
                  style={{ cursor: 'pointer', display: 'inline-block', lineHeight: 1 }}
                  onClick={() => {
                    setIsWaving(false);
                    setTimeout(() => {
                      setIsWaving(true);
                      setTimeout(() => setIsWaving(false), 700);
                    }, 0);
                  }}
                >
                  <img
                    src="/apple-hand.png"
                    alt="Waving hand emoji"
                    className={isWaving ? 'shake-rotate' : ''}
                    style={{ width: '1em', height: '1em', verticalAlign: 'middle', display: 'inline-block' }}
                  />
                </span>
              </h2>
            </div>
            {/* Spacer div to create space between header and paragraph */}
            <div className="h-8"></div>
            <div className="p-10 max-w-2xl w-full bg-blue-100/60 dark:bg-blue-900/20 rounded-2xl shadow-lg border-l-4 border-blue-400/80 dark:border-blue-400/40 border-accent/10 mx-auto transform translate-x-8 flex items-start gap-4" style={{boxShadow: '0 4px 24px 0 rgba(37,99,235,0.10)', backdropFilter: 'blur(4px)'}}>
              <span className="inline-block w-2 h-full bg-gradient-to-b from-blue-400 to-blue-300 dark:from-blue-300 dark:to-blue-400 rounded-full"></span>
              <div className="flex-1">
                <p className="text-xl leading-relaxed text-foreground/90">
                  I'm Manav, and I'm a Regents' Scholar studying Electrical Engineering and Computer Science at Berkeley. I'm currently seeking 2026 internships, and most of my experience has been in infrastructure/systems, machine learning, and full-stack development.
                </p>
                <div className="h-8"></div>
                <p className="text-xl leading-relaxed text-foreground/90">
                 Outside of school, you'll find me cooking, playing soccer, or building creative ML projects with friends in LaunchPad!
                </p>
                <div className="h-8"></div>
                <p className="text-xl leading-relaxed text-foreground/90">
                I love learning anything and everything. Feel free to reach out anytime!
                </p>
              </div>
            </div>
          </div>

          {/* Experience section - Right side */}
          <div className="flex-1 flex flex-col items-center">
            <div className="glass rounded-3xl border-4 border-accent shadow-2xl px-4 py-6 flex items-center justify-center mb-8 relative inline-block min-w-[400px]">
              <h2 className="text-5xl md:text-6xl font-extrabold gradient-text tracking-tight text-center">
                Experience
              </h2>
            </div>
            {/* Spacer div to create space between header and timeline */}
            <div className="h-8"></div>
            {/* Timeline Container - centered under Experience header */}
            <div className="flex flex-col items-center mx-auto mt-6 max-w-[520px] w-full">
              <div className="relative pb-8 w-full">
                <div className="flex flex-col gap-y-6 relative z-10">
                  {[
                    { company: "Amazon", role: "SDE Intern", duration: "May 2025 - Aug 2025", color: "from-orange-500 to-red-500", icon: (
                      <div className="w-28 h-28 aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-white dark:bg-white/10">
                        <img src="/realamznScience.png" alt="Amazon Logo" className="object-contain w-full h-full" />
                      </div>
                    ) },
                    { company: "JovyAI (Berkeley SkyDeck Batch 19)", role: "ML Engineer Intern", duration: "Jan 2025 - May 2025", color: "from-purple-500 to-pink-500", icon: (
                      <div className="w-28 h-28 aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-white dark:bg-white/10">
                        <img src="/skydeckImage.jpeg" alt="Berkeley SkyDeck Logo" className="object-contain w-full h-full" />
                      </div>
                    ) },
                    { company: "AMD", role: "Contract Software Engineer", duration: "Aug 2024 - May 2025", color: "from-red-500 to-orange-500", icon: (
                      <div className="w-28 h-28 aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-white dark:bg-white/10">
                        <img src="/amdLogo.webp" alt="AMD Logo" className="object-contain w-full h-full" />
                      </div>
                    ) },
                    { company: "Leidos", role: "Software Engineer Intern", duration: "Jun 2023 - Jul 2023", color: "from-blue-500 to-cyan-500", icon: (
                      <div className="w-28 h-28 aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-white dark:bg-white/10">
                        <img src="/leidos logo.jpeg" alt="Leidos Logo" className="object-contain w-full h-full" />
                      </div>
                    ) },
                    { company: "HudsonAlpha Institute for Biotechnology", role: "Researcher", duration: "Mar 2023 - Jun 2023", color: "from-green-500 to-emerald-500", icon: (
                      <div className="w-28 h-28 aspect-square rounded-2xl overflow-hidden flex items-center justify-center bg-white dark:bg-white/10">
                        <img src="/hudsonAlphalogo.png" alt="HudsonAlpha Logo" className="object-contain w-full h-full" />
                      </div>
                    ) },
                  ].map((exp, index, arr) => (
                    <div key={index} className="relative group">
                      {/* Card */}
                      <div className="flex-1">
                        <div className="glass rounded-3xl p-4 shadow-2xl border border-accent/20 hover:border-accent/40 transition-all duration-300 group-hover:scale-105 max-w-[700px] min-h-[80px] mx-auto w-full flex flex-col justify-center text-lg space-y-4">
                          {/* Header clickable for folding */}
                          <button
                            className="flex justify-between items-center w-full text-left focus:outline-none"
                            onClick={() => setOpen(open === index ? null : index)}
                          >
                            <div className="flex items-center gap-x-6 min-w-0">
                              <div className="p-2 flex items-center justify-center shrink-0">{exp.icon}</div>
                              <div className="flex flex-col justify-center py-1 min-w-0">
                                <h4 className="text-lg font-semibold text-foreground text-left">{exp.role}</h4>
                                <p className="text-accent font-medium mt-1 text-base text-left">{exp.company}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="inline-block align-middle text-sm font-medium text-accent-dark bg-accent-light/20 px-3 py-1 rounded-full shadow-sm border border-accent/10 whitespace-nowrap transition-all duration-300">{exp.duration}</span>
                              <svg
                                className={`w-6 h-6 shrink-0 transition-transform duration-300 ${open === index ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </div>
                          </button>
                        </div>
                      </div>
                      {/* Foldable content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          open === index ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="glass rounded-2xl p-4 shadow border border-accent/20 mt-3">
                          <div className="pt-1 text-foreground/80 text-sm leading-relaxed space-y-4">
                            {/* ...card content... */}
                            {index === 0 && (
                              <>
                                <div className="space-y-2">
                                  <p className="text-base font-semibold text-accent-dark">
                                    Automated Scaling Team
                                  </p>
                                  <p className="text-base text-foreground/80 leading-relaxed">
                                    I built an end-to-end predictive host count tool which improved our customers' performance efficiency by 36% on average.
                                  </p>
                                </div>
                              </>
                            )}
                            {index === 1 && (
                              <div className="space-y-2">
                                <p className="text-base font-semibold text-accent-dark">
                                  Alignment Team
                                </p>
                                <p className="text-base text-foreground/80 leading-relaxed">
                                  I developed a reinforcement learning with human feedback (RLHF) pipeline to ensure our LLM did not give medical advice nor false information.
                                </p>
                              </div>
                            )}
                                                      {index === 2 && (
                              <div className="space-y-2">
                                <p className="text-base font-semibold text-accent-dark">
                                  University Team
                                </p>
                                <p className="text-base text-foreground/80 leading-relaxed">
                                  I built a full-stack data analytics dashboard to track institutional donation and outreach trends.
                                </p>
                              </div>
                            )}
                            {index === 3 && (
                              <div className="space-y-2">
                                <p className="text-base font-semibold text-accent-dark">
                                  NASA
                                </p>
                                <p className="text-base text-foreground/80 leading-relaxed">
                                  I conducted software-side tests on the personnel door gaskets for NASA's Artemis II Rocket. I also worked with the R&D team to model lattice structures to simulate crystal behavior during nuclear fission.
                                </p>
                                <p className="text-base text-accent font-medium">
                                  <a href="https://www.nasa.gov/mission/artemis-ii/" target="_blank" rel="noopener noreferrer" className="underline hover:underline transition-all duration-300">
                                    UPDATE: Artemis II is going to the Moon!
                                  </a>
                                </p>
                              </div>
                            )}
                            {index === 4 && (
                              <p className="text-base text-foreground/80 leading-relaxed">
                                I sequenced and processed 20M+ genetic sequences to improve taxonomic accuracy for Liriope muscari. Our results were published in BOLDSystems.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {index !== arr.length - 1 && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-1 h-8 bg-accent/60 z-0" style={{ boxShadow: '0 0 4px 1px rgba(96,165,250,0.18)' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer between Experience and Clubs & Activities */}
        <div className="h-24"></div>

        {/* Clubs & Activities Section - moved below both Hi there and Experience */}
        <div className="w-full flex flex-col items-center">
          <div className="glass rounded-3xl border-4 border-accent shadow-2xl px-8 py-6 flex items-center justify-center mb-6 relative inline-block w-auto">
            <h2 className="text-5xl md:text-6xl font-extrabold gradient-text tracking-tight text-center">
              Clubs & Activities
            </h2>
          </div>
          {/* Spacer for vertical rhythm */}
          <div className="h-8"></div>
          <div className="flex flex-col items-center gap-8 max-w-5xl w-full">
            {/* Top row - Launchpad and Valley Consulting Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Launchpad */}
              <div className="glass rounded-3xl border border-accent/20 p-10 flex flex-col items-center text-center gap-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-accent/40">
                <h3 className="text-3xl font-bold text-accent-dark">Launchpad</h3>
                <span className="text-accent font-semibold text-xl">Vice President</span>
                <p className="text-foreground/80 text-lg font-medium leading-relaxed">We build creative Machine Learning projects! We also host ML paper reading groups and workshops. As Vice-President, I organize our external client engagements and ensure we're fiscally responsible.</p>
              </div>
              {/* Valley Consulting Group */}
              <div className="glass rounded-3xl border border-accent/20 p-10 flex flex-col items-center text-center gap-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-accent/40">
                <h3 className="text-3xl font-bold text-accent-dark">Valley Consulting Group</h3>
                <span className="text-accent font-semibold text-xl">Senior Consultant</span>
                <p className="text-foreground/80 text-lg font-medium leading-relaxed">We solve real-world business and technology problems for Fortune 500 Tech companies. I currently serve as a development mentor where I help new members build their technical and presentation skills.</p>
              </div>
            </div>
            
            {/* Bottom row - Computer Science Mentors (centered) */}
            <div className="w-full flex justify-center">
              <div className="glass rounded-3xl border border-accent/20 p-10 flex flex-col items-center text-center gap-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-accent/40 max-w-2xl">
                <h3 className="text-3xl font-bold text-accent-dark">Computer Science Mentors</h3>
                <span className="text-accent font-semibold text-xl">Senior Mentor</span>
                <p className="text-foreground/80 text-lg font-medium leading-relaxed">I lead biweekly tutoring sessions for 5+ students in CS 61A, teaching core concepts and guiding them through practice problems. As a Senior Mentor, I also coach fellow mentors on effective teaching strategies/pedagogy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer between About Me and Skills */}
      <div className="h-24"></div>

      {/* Skills Header with True Edge-to-Edge Broken Line using Grid */}
      <div id="skills-title" className="w-screen grid grid-cols-[1fr_auto_1fr] items-center gap-0 mb-32 select-none left-1/2 -translate-x-1/2 relative" style={{ minHeight: '80px', position: 'relative' }}>
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-blue-800 to-blue-900 dark:from-transparent dark:via-blue-300 dark:to-blue-400" />
        <h2 className="px-8 text-6xl font-extrabold tracking-tight text-center text-blue-800 dark:text-blue-300 whitespace-nowrap">
          Skills
        </h2>
        <div className="h-1.5 w-full bg-gradient-to-l from-transparent via-blue-800 to-blue-900 dark:from-transparent dark:via-blue-300 dark:to-blue-400" />
      </div>

      {/* Spacer between Skills Title and Content */}
      <div className="h-16"></div>

      {/* Skills Section - Clean Clustered Layout */}
      <section id="skills" className="w-full flex justify-center mt-20 mb-24 px-6">
        <div className="max-w-5xl w-full">
          
          {/* Clean clustered skills with white bubbles */}
          <div className="flex flex-col items-center">
            
            {/* Top row - Longest */}
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl py-6">
              <div className="bg-white/90 dark:bg-white/10 px-6 py-4 rounded-lg shadow-sm hover:bg-white dark:hover:bg-white/20 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="font-bold text-accent-dark text-lg mb-2">Programming Languages:</div>
                <div className="text-foreground/80 text-sm flex flex-wrap gap-2">
                  <span>Python</span>
                  <span>•</span>
                  <span>Java</span>
                  <span>•</span>
                  <span>C/C++</span>
                  <span>•</span>
                  <span>SQL</span>
                  <span>•</span>
                  <span>Scheme</span>
                  <span>•</span>
                  <span>HTML/CSS/JavaScript</span>
                  <span>•</span>
                  <span>MATLAB</span>
                </div>
              </div>
              <div className="bg-white/90 dark:bg-white/10 px-6 py-4 rounded-lg shadow-sm hover:bg-white dark:hover:bg-white/20 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="font-bold text-accent-dark text-lg mb-2">Frameworks & Libraries:</div>
                <div className="text-foreground/80 text-sm flex flex-wrap gap-2">
                  <span>React Native</span>
                  <span>•</span>
                  <span>Next.js</span>
                  <span>•</span>
                  <span>PyTorch</span>
                  <span>•</span>
                  <span>Numpy</span>
                  <span>•</span>
                  <span>Pandas</span>
                  <span>•</span>
                  <span>Django</span>
                  <span>•</span>
                  <span>Scikit-Learn</span>
                </div>
              </div>
            </div>

            {/* Spacer between rows */}
            <div className="h-8"></div>

            {/* Second row - Medium */}
            <div className="flex flex-wrap justify-center gap-6 max-w-3xl py-6">
              <div className="bg-white/90 dark:bg-white/10 px-6 py-4 rounded-lg shadow-sm hover:bg-white dark:hover:bg-white/20 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="font-bold text-accent-dark text-lg mb-2">Design:</div>
                <div className="text-foreground/80 text-sm flex flex-wrap gap-2">
                  <span>Figma</span>
                  <span>•</span>
                  <span>Balsamiq</span>
                  <span>•</span>
                  <span>PowerBI</span>
                </div>
              </div>
              <div className="bg-white/90 dark:bg-white/10 px-6 py-4 rounded-lg shadow-sm hover:bg-white dark:hover:bg-white/20 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="font-bold text-accent-dark text-lg mb-2">Cloud Services:</div>
                <div className="text-foreground/80 text-sm flex flex-wrap gap-2">
                  <span>AWS (S3, DDB, EC2, Sagemaker/Bedrock)</span>
                  <span>•</span>
                  <span>Firebase</span>
                </div>
              </div>
            </div>

            {/* Spacer between rows */}
            <div className="h-8"></div>

            {/* Bottom row - Longest */}
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl py-6">
              <div className="bg-white/90 dark:bg-white/10 px-6 py-4 rounded-lg shadow-sm hover:bg-white dark:hover:bg-white/20 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="font-bold text-accent-dark text-lg mb-2">Soft Skills:</div>
                <div className="text-foreground/80 text-sm flex flex-wrap gap-2">
                  <span>Problem Solving</span>
                  <span>•</span>
                  <span>Teaching Pedagogy</span>
                  <span>•</span>
                  <span>Agile/Kanban</span>
                  <span>•</span>
                  <span>Leadership</span>
                  <span>•</span>
                  <span>Teamwork</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Spacer between Skills and Projects */}
      <div className="h-24"></div>

      {/* Projects Header with True Edge-to-Edge Broken Line using Grid */}
      <div id="projects-title" className="w-screen grid grid-cols-[1fr_auto_1fr] items-center gap-0 mb-32 select-none left-1/2 -translate-x-1/2 relative" style={{ minHeight: '80px', position: 'relative' }}>
        <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-blue-800 to-blue-900 dark:from-transparent dark:via-blue-300 dark:to-blue-400" />
        <h2 className="px-8 text-6xl font-extrabold tracking-tight text-center text-blue-800 dark:text-blue-300 whitespace-nowrap">
          Projects
        </h2>
        <div className="h-1.5 w-full bg-gradient-to-l from-transparent via-blue-800 to-blue-900 dark:from-transparent dark:via-blue-300 dark:to-blue-400" />
      </div>

      {/* Spacer between Projects Title and Content */}
      <div className="h-16"></div>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-6 flex items-start justify-center pt-40 w-full">
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
            <ProjectCard
              title="I Know a Spot"
              description="Designed a social app for discovering and sharing local finds with friends through a QR code-based friend system, featuring personalized recommendations and interactive maps with real-time geolocation tagging."
              tech={["React Native", "Firestore"]}
              github="https://github.com/manav-aggarwal4/iknowaspot"
            />
            <ProjectCard
              title="H(ai)l Mary"
              description="Built an NFL/NBA player proposition predictor with 75% inference accuracy using a modified DeepGBM architecture."
              tech={["PyTorch", "Python"]}
              github="https://github.com/RonnieyL/HailMary"
            />
            <ProjectCard
              title="Wall Street Simulator"
              description="Created a secure paper-trading platform using Flask with real-time stock market data integration, enabling users to practice trading without financial risk through a scalable NoSQL database system."
              tech={["Flask", "Python", "HTML/CSS", "JavaScript", "Firebase"]}
              github="https://github.com/manav-aggarwal4/CS50-Finance"
            />
            <ProjectCard
              title="OpenBook"
              description="Developed a Web3-powered platform for college students to securely buy, sell, and trade textbooks via NFT-based campus verification, IPFS storage, and trustless stablecoin escrow smart contracts on Polygon."
              tech={["Next.js", "IPFS", "Polygon", "Solidity"]}
              github="https://github.com/manav-aggarwal4/OpenBook"
            />
            <ProjectCard
              title="Plants vs Zombies Videogame"
              description="Developed a complete recreation of the classic tower defense game with custom graphics, game mechanics, and interactive gameplay elements."
              tech={["Python","Game Development"]}
              github="https://github.com/manav-aggarwal4/Plants-vs-Zombies-Videogame"
            />
            <ProjectCard
              title="Yoda-Bigram"
              description="Built a bigram language model using PyTorch that impersonates Yoda's speech patterns."
              tech={["Python", "PyTorch", "NLP", "Machine Learning"]}
              github="https://github.com/manav-aggarwal4/Yoda-Bigram"
            />
            <ProjectCard
              title="DNA Analysis"
              description="Developed an algorithm that identifies people based on analysis of their Short-Tandem-Repeats (STRs), implementing DNA profiling principles used in forensic analysis with CSV database matching."
              tech={["Python", "Data Analysis", "Algorithms"]}
              github="https://github.com/manav-aggarwal4/DNA-Analysis"
            />
            <ProjectCard
              title="Readability"
              description="Developed a text readability analyzer implementing the Coleman-Liau index to automatically determine U.S. grade-level comprehension from written content."
              tech={["C", "Algorithms"]}
              github="https://github.com/manav-aggarwal4/Readability"
            />
          </div>
        </div>
      </section>

      {/* Spacer between Projects and Footer */}
      <div className="h-12"></div>

      {/* Footer */}
      <footer className="w-full py-12 bg-gradient-to-r from-blue-950/95 to-blue-900/95 backdrop-blur-xl border-t-2 border-blue-700/30">
        <div className="w-full px-6 flex items-center justify-center">
          <p className="text-white font-medium text-base">
            Made by Manav Aggarwal
          </p>
        </div>
      </footer>
    </div>
  )
}