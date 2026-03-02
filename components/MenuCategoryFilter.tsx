import Link from 'next/link'
import type { MenuCategory } from '@/types'

interface MenuCategoryFilterProps {
  categories: MenuCategory[]
  selectedSlug?: string
}

export default function MenuCategoryFilter({
  categories,
  selectedSlug,
}: MenuCategoryFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Link
        href="/menu"
        className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 ${
          !selectedSlug
            ? 'bg-gold-400 text-ink-950'
            : 'border border-gold-400/20 text-cream-200/60 hover:text-gold-300 hover:border-gold-400/40'
        }`}
      >
        All
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/menu?category=${category.slug}`}
          className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all duration-300 ${
            selectedSlug === category.slug
              ? 'bg-gold-400 text-ink-950'
              : 'border border-gold-400/20 text-cream-200/60 hover:text-gold-300 hover:border-gold-400/40'
          }`}
        >
          {category.metadata?.name || category.title}
        </Link>
      ))}
    </div>
  )
}