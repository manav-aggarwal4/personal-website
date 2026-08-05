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
  tag?: string
  /** Short blurb for the parerga panel */
  teaser?: string
  /** Legacy plain paragraphs (optional) */
  paragraphs?: string[]
  intro?: string
  tiers?: WritingTier[]
}

export const writings: Writing[] = [
  {
    title: 'on the best energy drinks',
    slug: 'energy-drinks',
    date: 'august 2026',
    tag: 'notes',
    teaser: 'a short tier list: ghost, monster, celsius, and bum energy.',
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
