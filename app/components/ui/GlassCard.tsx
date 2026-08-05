interface GlassCardProps {
  children: React.ReactNode
  className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div className={`glass rounded-3xl border-4 border-accent shadow-2xl px-8 py-6 flex items-center justify-center ${className}`}>
      {children}
    </div>
  )
}
