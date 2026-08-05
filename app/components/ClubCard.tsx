import type { Club } from '../data/clubs'

interface ClubCardProps extends Club {}

export default function ClubCard({ name, role, logo, description, logoWidth }: ClubCardProps) {
  return (
    <div className="glass rounded-2xl border border-accent/20 p-6 flex flex-col items-center text-center gap-3 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-accent/40 group">
      <div className={`${logoWidth || 'w-16'} h-16 rounded-xl flex items-center justify-center mb-2 group-hover:rotate-6 transition-transform duration-300 overflow-hidden`}>
        <img src={logo} alt={`${name} Logo`} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-xl font-bold text-accent-dark dark:text-accent-light">{name}</h3>
      <span className="text-accent font-semibold text-sm bg-accent/10 px-3 py-1 rounded-full">{role}</span>
      <p className="text-foreground/80 dark:text-foreground/90 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
