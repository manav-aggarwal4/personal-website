export interface Writing {
  title: string
  slug: string
  date: string
  tag?: string
  /** Short blurb for the parerga panel */
  teaser?: string
  paragraphs: string[]
}

export const writings: Writing[] = [
  {
    title: 'on the best energy drinks',
    slug: 'energy-drinks',
    date: '2026',
    tag: 'notes',
    teaser: 'a short tier list: ghost, celsius, and blue monster.',
    paragraphs: [
      'ghost is the clear all-rounder: strong without the crash, and the flavor lineup actually tastes like something you chose on purpose.',
      'celsius fizz-free green tea mango is the quiet favorite for deep work — clean caffeine, no carbonation, and that mango-tea thing that does not wreck your stomach mid-sprint.',
      'blue monster still holds the throne for pure nostalgia and blunt force; it is not refined, but when you need the classic blue can ritual, nothing else quite hits the same.',
    ],
  },
]

export function getWritingBySlug(slug: string) {
  return writings.find((w) => w.slug === slug)
}
