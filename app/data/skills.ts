export interface SkillCategory {
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    skills: ["Python", "Java", "C/C++", "SQL", "Scheme", "HTML/CSS/JavaScript", "MATLAB"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React Native", "Next.js", "PyTorch", "NumPy", "Pandas", "Django", "Scikit-Learn"],
  },
  {
    title: "Cloud & Infrastructure",
    skills: ["AWS S3", "DynamoDB", "EC2", "SageMaker", "Bedrock", "Firebase"],
  },
  {
    title: "Design Tools",
    skills: ["Figma", "Balsamiq", "PowerBI"],
  },
  {
    title: "Leadership & Collaboration",
    skills: ["Problem Solving", "Teaching Pedagogy", "Agile/Kanban", "Leadership", "Team Building"],
  },
]
