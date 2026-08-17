export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string
}

export const projects: Project[] = [
  {
    title: "Veritas",
    description:
      "Designed an agent harness that generates and updates politically-neutral, encyclopedic articles by cross-referencing media, correcting for source-level bias, and re-verifying articles as new information emerges. Sourced trending topics via FAISS-based clustering and dedup from a daily stream of 5K+ grok.com conversations.",
    tech: ["TypeScript", "CloudSQL (GCP)", "FAISS", "Grok API", "Go"],
  },
  {
    title: "NFL Player Performance Forecaster",
    description:
      "Distilled gradient-boosted decision trees into a DNN to predict player stats, achieving 73% accuracy on over/under.",
    tech: ["PyTorch", "Python"],
    github: "https://github.com/RonnieyL/HailMary",
  },
  {
    title: "I Know a Spot",
    description:
      "Designed a social app for discovering and sharing scenic viewpoints with friends through a QR code-based friend system, featuring personalized recommendations and interactive maps with real-time geolocation tagging.",
    tech: ["React Native", "Firestore"],
    github: "https://github.com/manav-aggarwal4/iknowaspot",
  },
  {
    title: "Wall Street Simulator",
    description:
      "Created a secure paper-trading platform using Flask with real-time stock market data integration, enabling users to practice trading without financial risk through a scalable NoSQL database system.",
    tech: ["Flask", "Python", "HTML/CSS", "JavaScript", "Firebase"],
    github: "https://github.com/manav-aggarwal4/CS50-Finance",
  },
  {
    title: "OpenBook",
    description:
      "Developed a Web3-powered platform for college students to securely buy, sell, and trade textbooks via NFT-based campus verification, IPFS storage, and trustless stablecoin escrow smart contracts on Polygon.",
    tech: ["Next.js", "IPFS", "Polygon", "Solidity"],
    github: "https://github.com/manav-aggarwal4/OpenBook",
  },
  {
    title: "Plants vs Zombies Videogame",
    description:
      "Developed a complete recreation of the classic tower defense game with custom graphics, game mechanics, and interactive gameplay elements.",
    tech: ["Python", "Game Development"],
    github: "https://github.com/manav-aggarwal4/Plants-vs-Zombies-Videogame",
  },
  {
    title: "Yoda-Bigram",
    description:
      "Built a bigram language model using PyTorch that impersonates Yoda's speech patterns.",
    tech: ["Python", "PyTorch", "NLP", "Machine Learning"],
    github: "https://github.com/manav-aggarwal4/Yoda-Bigram",
  },
  {
    title: "DNA Analysis",
    description:
      "Developed an algorithm that identifies people based on analysis of their Short-Tandem-Repeats (STRs), implementing DNA profiling principles used in forensic analysis.",
    tech: ["Python", "Data Analysis", "Algorithms"],
    github: "https://github.com/manav-aggarwal4/DNA-Analysis",
  },
  {
    title: "Readability",
    description:
      "Developed a text readability analyzer implementing the Coleman-Liau index to automatically determine U.S. grade-level comprehension from written content.",
    tech: ["C", "Algorithms"],
    github: "https://github.com/manav-aggarwal4/Readability",
  },
]
