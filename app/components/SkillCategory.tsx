'use client'

import { motion } from 'framer-motion'
import type { SkillCategory as SkillCategoryType } from '../data/skills'

interface SkillCategoryProps extends SkillCategoryType {
  index: number
}

export default function SkillCategory({ title, skills, index }: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="glass rounded-2xl border-2 border-accent/30 p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-accent/50"
    >
      <h3 className="text-2xl font-bold text-accent-dark dark:text-accent-light mb-6">
        {title}
      </h3>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span 
            key={skill} 
            className="px-4 py-2.5 rounded-lg text-base font-semibold bg-accent-light/25 dark:bg-accent/35 text-foreground dark:text-foreground/90 border border-accent/20 dark:border-accent/30"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
