import Link from 'next/link'
import type { MenuItem } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface MenuItemCardProps {
  item: MenuItem
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const imageUrl = item.metadata?.image?.imgix_url
  const price = item.metadata?.price
  const description = item.metadata?.description
  const dietaryInfo = getMetafieldValue(item.metadata?.dietary_info)
  const isSeasonal = item.metadata?.seasonal
  const isChefPick = item.metadata?.chefs_recommendation

  return (
    <Link
      href={`/menu/${item.slug}`}
      className="group block bg-ink-900/50 border border-gold-400/10 rounded-lg overflow-hidden card-hover"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {imageUrl ? (
          <img
            src={`${imageUrl}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={item.title}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-ink-800 flex items-center justify-center">
            <span className="text-4xl">🍣</span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isChefPick && (
            <span className="px-2.5 py-1 bg-gold-400 text-ink-950 text-[10px] font-bold tracking-wider uppercase rounded-sm">
              Chef&apos;s Pick
            </span>
          )}
          {isSeasonal && (
            <span className="px-2.5 py-1 bg-ink-950/80 text-gold-300 text-[10px] font-bold tracking-wider uppercase rounded-sm border border-gold-400/30">
              Seasonal
            </span>
          )}
        </div>

        {/* Price overlay */}
        {price && (
          <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-ink-950/85 backdrop-blur-sm text-gold-300 text-sm font-semibold rounded-sm">
            ${price}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-cream-50 group-hover:text-gold-300 transition-colors duration-300">
          {item.title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-cream-200/50 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
        {dietaryInfo && (
          <p className="mt-3 text-xs text-gold-400/60 tracking-wide uppercase">
            {dietaryInfo}
          </p>
        )}
      </div>
    </Link>
  )
}