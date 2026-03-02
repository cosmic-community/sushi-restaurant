import { getMenuCategories, getMenuItems } from '@/lib/cosmic'
import MenuItemCard from '@/components/MenuItemCard'
import SectionHeading from '@/components/SectionHeading'
import MenuCategoryFilter from '@/components/MenuCategoryFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Menu — Omakase',
  description: 'Explore our curated sushi menu featuring the finest nigiri, sashimi, rolls, and seasonal specials.',
}

interface MenuPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  const { category: selectedCategorySlug } = await searchParams
  const [categories, allItems] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
  ])

  // Group items by category
  const itemsByCategory: Record<string, typeof allItems> = {}
  const uncategorizedItems: typeof allItems = []

  for (const item of allItems) {
    const catSlug = item.metadata?.category?.slug
    if (catSlug) {
      if (!itemsByCategory[catSlug]) {
        itemsByCategory[catSlug] = []
      }
      itemsByCategory[catSlug]!.push(item)
    } else {
      uncategorizedItems.push(item)
    }
  }

  const filteredCategories = selectedCategorySlug
    ? categories.filter((c) => c.slug === selectedCategorySlug)
    : categories

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 section-padding bg-ink-900/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Curated by Our Master Chef"
            title="Our Menu"
            description="Each dish is an expression of Japanese culinary tradition, crafted with the finest seasonal ingredients sourced from both local and international markets."
          />
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 1 && (
        <section className="section-padding py-8 border-b border-gold-400/10">
          <div className="max-w-7xl mx-auto">
            <MenuCategoryFilter
              categories={categories}
              selectedSlug={selectedCategorySlug}
            />
          </div>
        </section>
      )}

      {/* Menu Sections */}
      <section className="py-16 section-padding">
        <div className="max-w-7xl mx-auto space-y-20">
          {filteredCategories.map((category) => {
            const items = itemsByCategory[category.slug]
            if (!items || items.length === 0) return null

            return (
              <div key={category.id} id={category.slug}>
                <div className="mb-10">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-cream-50">
                    {category.metadata?.name || category.title}
                  </h2>
                  {category.metadata?.description && (
                    <p className="mt-2 text-cream-200/50 max-w-2xl">
                      {category.metadata.description}
                    </p>
                  )}
                  <div className="mt-4 w-16 h-px bg-gold-400/40" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              </div>
            )
          })}

          {/* Uncategorized items */}
          {!selectedCategorySlug && uncategorizedItems.length > 0 && (
            <div>
              <div className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-cream-50">
                  Specials
                </h2>
                <div className="mt-4 w-16 h-px bg-gold-400/40" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {uncategorizedItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )}

          {allItems.length === 0 && (
            <div className="text-center py-20">
              <span className="text-5xl">🍣</span>
              <p className="mt-4 text-cream-200/50 text-lg">
                Our menu is being prepared. Check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}