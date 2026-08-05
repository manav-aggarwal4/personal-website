interface SectionHeaderProps {
  title: string
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div 
      className="w-screen grid grid-cols-[1fr_auto_1fr] items-center gap-0 mb-32 select-none left-1/2 -translate-x-1/2 relative" 
      style={{ minHeight: '80px', position: 'relative' }}
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-blue-800 to-blue-900 dark:from-transparent dark:via-blue-300 dark:to-blue-400" />
      <h2 className="px-8 text-6xl font-extrabold tracking-tight text-center text-blue-800 dark:text-blue-300 whitespace-nowrap">
        {title}
      </h2>
      <div className="h-1.5 w-full bg-gradient-to-l from-transparent via-blue-800 to-blue-900 dark:from-transparent dark:via-blue-300 dark:to-blue-400" />
    </div>
  )
}
