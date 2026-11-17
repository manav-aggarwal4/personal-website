export interface WritingTier {
  rank: number
  name: string
  note?: string
  flavors: string[]
}

export interface Writing {
  title: string
  slug: string
  date: string
  /** Short blurb for the parerga panel */
  teaser?: string
  /** Legacy plain paragraphs (optional) */
  paragraphs?: string[]
  intro?: string
  tiers?: WritingTier[]
}

export const writings: Writing[] = [
  {
    title: 'Updating your Priors',
    slug: 'updating-your-priors',
    date: 'november 16, 2026',
    teaser: 'Why I think of college as pre-training, and how I’d make the most of it.',
  },
  {
    title: 'Life as an RL Run',
    slug: 'life-as-an-rl-run',
    date: 'november 2026',
    teaser: 'Here’s my take on viewing your life as a reinforcement learning run, and why you should do your own rollouts.',
  },
  {
    title: 'on the best energy drinks',
    slug: 'energy-drinks',
    date: 'august 2026',
    tiers: [
      {
        rank: 1,
        name: 'ghost',
        note: 'has nootropics too so ++1',
        flavors: ['blue rasberry', 'strawbango', 'ice tea lemonade'],
      },
      {
        rank: 2,
        name: 'monster',
        note: 'tride and true',
        flavors: [
          'white',
          'ultra violet (unsure the flavor profile actually exists in nature)',
          'strawberry kiwi',
        ],
      },
      {
        rank: 3,
        name: 'celsius',
        flavors: [
          'just the fizz-free mango green tea',
          'the rest are terrible',
        ],
      },
      {
        rank: 4,
        name: 'bum energy',
        note: "chris bumstead's brand, not enough caffeine though",
        flavors: ['cola', 'root beer', 'dr pepper'],
      },
    ],
  },
]

export function getWritingBySlug(slug: string) {
  return writings.find((w) => w.slug === slug)
}
