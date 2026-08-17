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
    company: "xai",
    role: "member of technical staff, post-training",
    duration: "december 2025 — present",
    link: "https://x.ai/",
    bullets: [
      "training grok 4.5, 4.6, and beyond",
      "use heavy mode on grok.com!",
    ],
  },
  {
    company: "annapurna labs",
    role: "software engineer [contract]",
    duration: "september 2025 — december 2025",
    link: "https://fortune.com/2025/04/01/amazon-annapurna-labs-chips-ai-anthropic-investment/",
    logo: "/anpa.avif",
    bullets: [
      "onboarded sft and grpo workloads onto aws neuron chips",
      "identified missing ops and wrote performant kernels",
    ],
  },
  {
    company: "sky computing lab",
    role: "undergraduate researcher",
    duration: "august 2025 — december 2025",
    link: "https://sky.cs.berkeley.edu/",
    logo: "/sky.png",
    bullets: [
      "worked on vllm and reasoning traces in coding agents",
    ],
  },
  {
    company: "amazon",
    role: "software development engineer intern",
    duration: "may 2025 — august 2025",
    link: "https://www.amazon.science/news-and-features/how-cloudtune-generates-amazon-store-forecasts-for-prime-day-black-friday-cyber-monday",
    logo: "/realamznScience.png",
    bullets: [
      "built an end-to-end predictive host count tool which improved customers' performance efficiency by 36% on average",
    ],
  },
  {
    company: "amd",
    role: "software engineer [contract]",
    duration: "august 2024 — may 2025",
    link: "https://www.amd.com/",
    logo: "/amdLogo.webp",
    bullets: [
      "built a full-stack data analytics dashboard to track institutional donation and outreach trends",
    ],
  },
  {
    company: "leidos",
    role: "engineering intern",
    duration: "june 2023 — july 2023",
    link: "https://www.nasa.gov/mission/artemis-ii/",
    logo: "/leidos logo.jpeg",
    bullets: [
      "conducted software-side tests on the personnel door gaskets for nasa's artemis ii rocket",
      "worked with the r&d team to model crystal behavior during nuclear fission",
    ],
  },
  {
    company: "hudsonalpha",
    role: "research intern",
    duration: "march 2023 — june 2023",
    link: "https://www.hudsonalpha.org/computational-analysis/",
    logo: "/hudsonAlphalogo.png",
    bullets: [
      "sequenced and processed 20m+ genetic sequences to improve taxonomic accuracy for liriope muscari",
      "results were published in boldsystems",
    ],
  },
]
