'use client'

import { useState, useEffect, useRef } from 'react'
import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  DownloadIcon,
  ChevronDownIcon,
} from './components'
import {
  profilePhotos,
  socialLinks,
  experiences,
  projects,
  skillCategories,
  clubs,
} from './data'

export default function Home() {
  const [regentsOpen, setRegentsOpen] = useState(false)
  const [presidentialOpen, setPresidentialOpen] = useState(false)
  const [openExperience, setOpenExperience] = useState<number | null>(null)
  const regentsRef = useRef<HTMLButtonElement>(null)
  const presidentialRef = useRef<HTMLButtonElement>(null)

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.scholarship-dropdown')) {
        setRegentsOpen(false)
        setPresidentialOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const targetPosition = scrollTop + rect.top - 80
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-950/95 to-blue-900/95 backdrop-blur-xl shadow-2xl border-b-2 border-blue-700/30">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -14 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center z-10"
            >
              <div className="group cursor-pointer" onClick={handleLogoClick}>
                <div className="relative">
                  {isLogoExploding && Array.from({ length: 50 }).map((_, i) => {
                    const angle = (i / 50) * 360
                    const radius = Math.random() * 150 + 50
                    const x = Math.cos(angle * (Math.PI / 180)) * radius
                    const y = Math.sin(angle * (Math.PI / 180)) * radius
                    const colors = ['#2563eb', '#60a5fa', '#1e40af', '#ffffff']
                    const color = colors[i % colors.length]

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
                        animate={{ x: `${x}px`, y: `${y}px`, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.8 + Math.random() * 0.7, ease: "circOut" }}
                      />
                    )
                  })}
                  <motion.div
                    className="relative w-14 h-14 rounded-3xl bg-gradient-to-br from-accent via-purple-500 to-accent-light flex items-center justify-center shadow-2xl hover:shadow-accent/25 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3 overflow-hidden"
                    animate={{ scale: isLogoExploding ? [1, 1.3, 1] : 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <span className="relative text-white font-black text-2xl tracking-tight z-10 group-hover:scale-110 transition-transform duration-300">M</span>
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 group-hover:animate-pulse" />
                    <div className="absolute bottom-2 left-2 w-1 h-1 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200 group-hover:animate-bounce" />
                  </motion.div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/60 via-purple-500/60 to-accent-light/60 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                </div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
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
                  <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white to-blue-200 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-20 group-hover:scale-105 transition-transform duration-300">{item.label}</span>
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
                <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-accent-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <MenuIcon className="relative w-7 h-7 text-accent group-hover:rotate-90 transition-transform duration-500" />
              </button>
            </motion.div>
          </div>
        </div>

        {/* Dark Mode Toggle */}
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
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {isDarkMode ? (
              <SunIcon className="relative w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-500" />
            ) : (
              <MoonIcon className="relative w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-500" />
            )}
          </button>
        </motion.div>

        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </nav>

      {/* Mobile Menu Dropdown */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: mobileMenuOpen ? 1 : 0, height: mobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="md:hidden overflow-hidden bg-white/95 dark:bg-black/90 backdrop-blur-2xl border-b border-accent/20 dark:border-accent/30 shadow-2xl"
      >
        <div className="px-8 py-8 space-y-3">
          {navItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: mobileMenuOpen ? 1 : 0, x: mobileMenuOpen ? 0 : -20 }}
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
              <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">{item.label}</span>
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-accent to-accent-light group-hover:w-full transition-all duration-500 rounded-full" />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Hero Section */}
      <section id="home" className="flex flex-col items-center justify-center min-h-screen relative px-6 pt-24">
        <div className="text-center max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
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
                <div className="h-3" />
                <h2 className="text-2xl font-semibold mb-10 text-accent-light">
                  EECS Student at UC Berkeley
                </h2>
                <div className="h-4" />

                {/* Scholarships */}
                <div className="flex items-center justify-center gap-6 mb-16">
                  <div className="relative scholarship-dropdown">
                    <button
                      ref={regentsRef}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setRegentsOpen(!regentsOpen)
                        setPresidentialOpen(false)
                      }}
                      className={`text-lg text-foreground/80 transition-all duration-300 hover:text-accent flex items-center gap-2 group focus:outline-none rounded-lg px-2 py-1 ${regentsOpen ? 'ring-2 ring-accent/20' : ''}`}
                    >
                      Regents' and Chancellor's Scholar
                      <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${regentsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 transition-all duration-300 z-50 ${regentsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl min-w-80 max-w-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-foreground/90 dark:text-foreground/80 leading-relaxed font-medium">
                          Merit-based scholarship awarded to the top 1% of undergraduates at UC Berkeley.
                        </p>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white dark:border-b-gray-900" />
                      </div>
                    </div>
                  </div>

                  <span className="text-lg text-foreground/60">|</span>

                  <div className="relative scholarship-dropdown">
                    <button
                      ref={presidentialRef}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setPresidentialOpen(!presidentialOpen)
                        setRegentsOpen(false)
                      }}
                      className={`text-lg text-foreground/80 transition-all duration-300 hover:text-accent flex items-center gap-2 group focus:outline-none rounded-lg px-2 py-1 ${presidentialOpen ? 'ring-2 ring-accent/20' : ''}`}
                    >
                      US Presidential Scholar
                      <ChevronDownIcon className={`w-4 h-4 transition-transform duration-300 ${presidentialOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-4 transition-all duration-300 z-50 ${presidentialOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-2xl min-w-80 max-w-sm border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-foreground/90 dark:text-foreground/80 leading-relaxed font-medium">
                          Top 161 students in the nation, awarded by President Joe Biden.
                        </p>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white dark:border-b-gray-900" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-6" />

                {/* CTA and Social Links */}
                <div className="flex items-center gap-8 justify-center mb-12">
                  <a
                    href={socialLinks.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-4 rounded-full font-bold glass hover:scale-105 transition-all duration-300"
                  >
                    <DownloadIcon />
                    View Resume
                  </a>
                  <div className="flex items-center gap-4">
                    <a href={socialLinks.email} className="glass rounded-full p-4 hover:scale-110 transition-transform">
                      <EmailIcon className="w-6 h-6 text-accent" />
                    </a>
                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="glass rounded-full p-4 hover:scale-110 transition-transform">
                      <GitHubIcon className="w-6 h-6 text-accent" />
                    </a>
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="glass rounded-full p-4 hover:scale-110 transition-transform">
                      <LinkedInIcon className="w-6 h-6 text-accent" />
                    </a>
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="glass rounded-full p-4 hover:scale-110 transition-transform">
                      <TwitterIcon className="w-6 h-6 text-accent" />
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

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible && scrollY < 50 ? 1 : 0, y: isVisible && scrollY < 50 ? 0 : 20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={() => scrollToSection('about-title')}
            className="flex flex-col items-center gap-2 text-center group focus:outline-none"
            aria-label="Scroll to next section"
          >
            <p className="text-sm text-foreground/60 mb-2 transition-colors group-hover:text-accent">Scroll to explore</p>
            <ChevronDownIcon className="w-8 h-8 text-accent animate-bounce transition-transform group-hover:scale-110" />
          </button>
        </motion.div>
      </section>

      <div className="h-40" />

      {/* About Section */}
      <div id="about-title">
        <SectionHeader title="About Me" />
      </div>

      <section id="about" className="py-32 px-6 min-h-screen flex flex-col items-center justify-start pt-40 w-full">
        <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-12 mb-16 mt-10">
          {/* Left Column: Intro, Clubs, Skills */}
          <div className="flex-1 flex flex-col items-center">
            <GlassCard className="mb-6 min-w-[400px]">
              <h2 className="text-5xl md:text-6xl font-extrabold gradient-text tracking-tight text-center flex items-center justify-center gap-4">
                Hi there!
                <span
                  className="text-5xl cursor-pointer inline-block"
                  style={{ lineHeight: 1 }}
                  onClick={handleWaveClick}
                >
                  <img
                    src="/apple-hand.png"
                    alt="Waving hand emoji"
                    className={isWaving ? 'shake-rotate' : ''}
                    style={{ width: '1em', height: '1em', verticalAlign: 'middle', display: 'inline-block' }}
                  />
                </span>
              </h2>
            </GlassCard>

            <div className="h-8" />

            <div className="p-10 max-w-2xl w-full bg-blue-100/20 dark:bg-blue-900/10 rounded-2xl shadow-lg border-l-4 border-blue-400/80 dark:border-blue-400/40 border-accent/10 mx-auto transform translate-x-8 flex items-start gap-4" style={{ boxShadow: '0 4px 24px 0 rgba(37,99,235,0.10)', backdropFilter: 'blur(4px)' }}>
              <span className="inline-block w-2 h-full bg-gradient-to-b from-blue-400 to-blue-300 dark:from-blue-300 dark:to-blue-400 rounded-full" />
              <div className="flex-1">
                <p className="text-xl leading-relaxed text-foreground/90">
                  I'm Manav, and I'm an undergraduate studying Electrical Engineering and Computer Science at Berkeley. Most of my experience has been in infrastructure/systems, machine learning, and full-stack development.
                </p>
                <div className="h-8" />
                <p className="text-xl leading-relaxed text-foreground/90">
                  Outside of school, you'll find me cooking, playing soccer, or building creative ML projects with friends in LaunchPad!
                </p>
                <div className="h-8" />
                <p className="text-xl leading-relaxed text-foreground/90">
                  I love learning anything and everything. Feel free to reach out anytime!
                </p>
              </div>
            </div>

            <div className="h-12" />

            {/* Clubs Section */}
            <div className="w-full flex flex-col items-center max-w-2xl">
              <GlassCard className="mb-6 w-auto">
                <h2 className="text-4xl md:text-5xl font-extrabold gradient-text tracking-tight text-center">
                  Clubs & Activities
                </h2>
              </GlassCard>
              <div className="h-8" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                {clubs.map((club) => (
                  <ClubCard key={club.name} {...club} />
                ))}
              </div>
            </div>

            <div className="h-16" />

            {/* Skills Section */}
            <div id="skills" className="w-full flex flex-col items-center max-w-2xl">
              <GlassCard className="mb-6 w-auto">
                <h2 className="text-4xl md:text-5xl font-extrabold gradient-text tracking-tight text-center">
                  Skills
                </h2>
              </GlassCard>
              <div className="h-8" />
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {skillCategories.map((category, index) => (
                    <SkillCategory key={category.title} {...category} index={index} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Experience */}
          <div className="flex-1 flex flex-col items-center">
            <GlassCard className="mb-8 min-w-[400px] px-4">
              <h2 className="text-5xl md:text-6xl font-extrabold gradient-text tracking-tight text-center">
                Experience
              </h2>
            </GlassCard>
            <div className="h-8" />
            <div className="flex flex-col items-center mx-auto mt-6 max-w-[520px] w-full">
              <div className="relative pb-8 w-full">
                <div className="flex flex-col gap-y-6 relative z-10">
                  {experiences.map((exp, index) => (
                    <ExperienceCard
                      key={exp.company}
                      {...exp}
                      isOpen={openExperience === index}
                      onToggle={() => setOpenExperience(openExperience === index ? null : index)}
                      isLast={index === experiences.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-24" />

      {/* Projects Section */}
      <div id="projects-title">
        <SectionHeader title="Projects" />
      </div>

      <div className="h-16" />

      <section id="projects" className="py-16 px-6 flex items-start justify-center pt-40 w-full">
        <div className="w-full flex flex-col items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </section>

      <div className="h-12" />

      {/* Footer */}
      <footer className="w-full py-12 bg-gradient-to-r from-blue-950/95 to-blue-900/95 backdrop-blur-xl border-t-2 border-blue-700/30">
        <div className="w-full px-6 flex items-center justify-center">
          <p className="text-white font-medium text-base">Made by Manav Aggarwal</p>
        </div>
      </footer>
    </div>
  )
}
