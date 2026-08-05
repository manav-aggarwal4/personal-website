export interface Experience {
  company: string
  role: string
  duration: string
  link: string
  logo?: string
  bullets: string[]
}

export const experiences: Experience[] = [
  {
    company: "Annapurna Labs",
    role: "Software Engineer Intern",
    duration: "Present",
    link: "https://www.amazon.com/annapurna-labs/",
    logo: "/anpa.avif",
    bullets: [
      "Onboarding SFT and GRPO workloads onto AWS Neuron chips",
      "Identifying missing ops and writing performant kernels",
    ],
  },
  {
    company: "Sky Computing Lab",
    role: "Undergraduate Researcher",
    duration: "Present",
    link: "https://sky.cs.berkeley.edu/",
    logo: "/sky.png",
    bullets: [
      "Working on vLLM and reasoning traces in coding agents",
    ],
  },
  {
    company: "Amazon",
    role: "Software Development Engineer Intern",
    duration: "Previous",
    link: "https://www.amazon.com/",
    logo: "/realamznScience.png",
    bullets: [
      "Built an end-to-end predictive host count tool which improved customers' performance efficiency by 36% on average",
    ],
  },
  {
    company: "JovyAI",
    role: "Software Engineer · Berkeley SkyDeck Batch 19",
    duration: "Previous",
    link: "https://skydeck.berkeley.edu/",
    logo: "/skydeckImage.jpeg",
    bullets: [
      "Developed a reinforcement learning with human feedback (RLHF) pipeline to ensure our LLM did not give medical advice nor false information",
    ],
  },
  {
    company: "AMD",
    role: "Software Engineering Intern",
    duration: "Previous",
    link: "https://www.amd.com/",
    logo: "/amdLogo.webp",
    bullets: [
      "Built a full-stack data analytics dashboard to track institutional donation and outreach trends",
    ],
  },
  {
    company: "Leidos",
    role: "Engineering Intern",
    duration: "Previous",
    link: "https://www.leidos.com/",
    logo: "/leidos logo.jpeg",
    bullets: [
      "Conducted software-side tests on the personnel door gaskets for NASA's Artemis II rocket",
      "Worked with the R&D team to model crystal behavior during nuclear fission",
    ],
  },
  {
    company: "HudsonAlpha",
    role: "Bioinformatics Intern",
    duration: "Previous",
    link: "https://hudsonalpha.org/",
    logo: "/hudsonAlphalogo.png",
    bullets: [
      "Sequenced and processed 20M+ genetic sequences to improve taxonomic accuracy for Liriope muscari",
      "Results were published in BOLDSystems",
    ],
  },
]
