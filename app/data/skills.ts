export interface SkillCategory {
  title: string
  skills: string[]
}

/** Curated — fewer, stronger tags read cleaner than exhaustive lists */
export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["Python", "Java", "C/C++", "SQL", "TypeScript", "JavaScript"],
  },
  {
    title: "Frameworks",
    skills: ["PyTorch", "Next.js", "React Native", "NumPy", "Pandas"],
  },
  {
    title: "Cloud & Systems",
    skills: ["AWS", "SageMaker", "Bedrock", "DynamoDB", "Firebase"],
  },
]
