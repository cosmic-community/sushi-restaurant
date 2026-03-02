// app/menu/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getMenuItemBySlug, getMenuItems } from '@/lib/cosmic'
import { getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'
import MenuItemCard from '@/components/MenuItemCard'
import type { Metadata } from 'next'

interface MenuItemPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: MenuItemPageProps): Promise<Metadata> {
  const { slug } = await params
  const item = await getMenuItemBySlug(slug)
  if (!item) return { title: 'Not Found — Omakase' }
  return {
    title: `${item.title} — Omakase Menu`,
    description: item.metadata?.description || `Discover ${item.title} at Omakase.`,
  }
}

export default async function MenuItemPage({ params }: MenuItemPageProps) {
  const { slug } = await params
  const item = await getMenuItemBySlug(slug)

  if (!item) {
    notFound()
  }

  const imageUrl = item.metadata?.image?.imgix_url
  const price = item.metadata?.price
  const description = item.metadata?.description
  const dietaryInfo = getMetafieldValue(item.metadata?.dietary_info)
  const isSeasonal = item.metadata?.seasonal
  const isChefPick = item.metadata?.chefs_recommendation
  const category = item.metadata?.category

  // Get related items from the same category
  let relatedItems: Awaited<ReturnType<typeof getMenuItems>> = []
  if (category?.id) {
    const allItems = await getMenuItems()
    relatedItems = allItems
      .filter((i) => i.metadata?.category?.slug === category.slug && i.slug !== slug)
      .slice(0, 3)
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="section-padding py-4 border-b border-gold-400/10">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/menu" className="text-cream-200/50 hover:text-gold-300 transition-colors">
            Menu
          </Link>
          <span className="text-cream-200/30">/</span>
          {category && (
            <>
              <Link
                href={`/menu?category=${category.slug}`}
                className="text-cream-200/50 hover:text-gold-300 transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
              <span className="text-cream-200/30">/</span>
            </>
          )}
          <span className="text-cream-100">{item.title}</span>
        </div>
      </div>

      {/* Item Detail */}
      <section className="py-16 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden">
              {imageUrl ? (
                <img
                  src={`${imageUrl}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={item.title}
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-ink-800 flex items-center justify-center">
                  <span className="text-7xl">🍣</span>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {isChefPick && (
                  <span className="px-3 py-1.5 bg-gold-400 text-ink-950 text-xs font-bold tracking-wider uppercase rounded-sm">
                    Chef&apos;s Pick
                  </span>
                )}
                {isSeasonal && (
                  <span className="px-3 py-1.5 bg-ink-950/80 text-gold-300 text-xs font-bold tracking-wider uppercase rounded-sm border border-gold-400/30">
                    Seasonal
                  </span>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center">
              {category && (
                <p className="text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase mb-3">
                  {category.metadata?.name || category.title}
                </p>
              )}

              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-cream-50">
                {item.title}
              </h1>

              {price && (
                <p className="mt-4 text-3xl font-semibold gold-gradient-text">
                  ${price}
                </p>
              )}

              {description && (
                <p className="mt-6 text-cream-200/70 text-lg leading-relaxed">
                  {description}
                </p>
              )}

              {dietaryInfo && (
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-gold-400 text-sm">🌿</span>
                  <p className="text-sm text-gold-400/80 tracking-wide">
                    {dietaryInfo}
                  </p>
                </div>
              )}

              <div className="mt-8 w-full h-px bg-gold-400/10" />

              <div className="mt-8">
                <Link
                  href="/locations"
                  className="inline-block px-8 py-3.5 bg-gold-400 text-ink-950 text-sm font-semibold tracking-wider uppercase hover:bg-gold-300 transition-colors rounded-sm"
                >
                  Reserve to Try This Dish
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Items */}
      {relatedItems.length > 0 && (
        <section className="py-16 section-padding bg-ink-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-cream-50 mb-8">
              More from {category?.metadata?.name || category?.title || 'Our Menu'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedItems.map((related) => (
                <MenuItemCard key={related.id} item={related} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}