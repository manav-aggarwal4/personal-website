export interface Reading {
  title: string
  author: string
  status: 'now' | 'favorite' | 'queue'
  note?: string
}

export const readings: Reading[] = [
  {
    title: 'zero to one',
    author: 'peter thiel',
    status: 'favorite',
  },
  {
    title: "liar's poker",
    author: 'michael lewis',
    status: 'favorite',
  },
  {
    title: "man's search for meaning",
    author: 'viktor frankl',
    status: 'favorite',
  },
  {
    title: 'sapiens',
    author: 'yuval noah harari',
    status: 'favorite',
  },
]
