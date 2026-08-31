import type { Metadata } from 'next'
import { cs180Meta } from '../data/cs180'
import Cs180Nav from './Cs180Nav'

export const metadata: Metadata = {
  title: `cs 180 · Manav Aggarwal`,
  description: `${cs180Meta.course}: ${cs180Meta.name}. ${cs180Meta.term}, ${cs180Meta.school}.`,
}

export default function Cs180Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="marble-veins" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cs180Nav />
      {children}
    </>
  )
}
