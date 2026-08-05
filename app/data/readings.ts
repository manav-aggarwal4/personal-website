export interface Reading {
  title: string
  author: string
  status: 'now' | 'favorite' | 'queue'
  note?: string
}

export const readings: Reading[] = [
  {
    title: 'designing data-intensive applications',
    author: 'martin kleppmann',
    status: 'now',
    note: 'systems, storage, and the hard parts of distributed truth',
  },
  {
    title: 'the art of doing science and engineering',
    author: 'richard hamming',
    status: 'favorite',
    note: 'how to think about important problems',
  },
  {
    title: 'surely you\'re joking, mr. feynman',
    author: 'richard feynman',
    status: 'favorite',
    note: 'curiosity as a lifestyle',
  },
  {
    title: 'the mythical man-month',
    author: 'frederick brooks',
    status: 'queue',
  },
  {
    title: 'meditations',
    author: 'marcus aurelius',
    status: 'favorite',
    note: 'still the best morning operating system',
  },
  {
    title: 'hackers & painters',
    author: 'paul graham',
    status: 'queue',
  },
]
