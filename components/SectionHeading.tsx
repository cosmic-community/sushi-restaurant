interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered = true,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
      {eyebrow && (
        <p className="text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-bold ${
          light ? 'text-ink-900' : 'text-cream-50'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            light ? 'text-ink-600' : 'text-cream-200/60'
          }`}
        >
          {description}
        </p>
      )}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="block w-12 h-px bg-gold-400/40" />
        <span className="text-gold-400 text-sm">✦</span>
        <span className="block w-12 h-px bg-gold-400/40" />
      </div>
    </div>
  )
}