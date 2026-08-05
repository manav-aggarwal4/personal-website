export interface Interest {
  title: string
  detail: string
  /** Optional external link for the detail text */
  href?: string
}

export const interests: Interest[] = [
  {
    title: 'guitar',
    detail: 'super novice',
  },
  {
    title: 'soccer',
    detail: 'I love sunday league!',
  },
  {
    title: 'cooking + eating',
    detail: 'check out this page',
    href: 'https://beliapp.com/manava',
  },
  {
    title: 'travel',
    detail: 'just got back from korea and japan!!',
  },
]
