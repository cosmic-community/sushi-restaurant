import Link from 'next/link'
import { getMenuCategories, getMenuItems, getLocations, getReviews } from '@/lib/cosmic'
import MenuItemCard from '@/components/MenuItemCard'
import StarRating from '@/components/StarRating'
import SectionHeading from '@/components/SectionHeading'

export default async function HomePage() {
  const [categories, menuItems, locations, reviews] = await Promise.all([
    getMenuCategories(),
    getMenuItems(),
    getLocations(),
    getReviews(),
  ])

  const featuredItems = menuItems
    .filter((item) => item.metadata?.chefs_recommendation)
    .slice(0, 4)

  const displayItems = featuredItems.length > 0 ? featuredItems : menuItems.slice(0, 4)
  const displayReviews = reviews.filter((r) => (r.metadata?.rating ?? 0) >= 4).slice(0, 3)

  const heroImage = menuItems.find((item) => item.metadata?.image?.imgix_url)?.metadata?.image?.imgix_url

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {heroImage ? (
            <img
              src={`${heroImage}?w=1920&h=1080&fit=crop&auto=format,compress&q=80`}
              alt="Omakase sushi"
              width={1920}
              height={1080}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-ink-900" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center section-padding max-w-4xl mx-auto pt-20">
          <p className="text-xs font-semibold tracking-[0.4em] text-gold-400 uppercase mb-6 animate-fade-in">
            Los Angeles&apos; Finest Sushi Experience
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-cream-50 leading-[0.95] animate-slide-up">
            The Art of
            <br />
            <span className="gold-gradient-text">Omakase</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-cream-200/60 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Where centuries of Japanese culinary tradition meet the vibrant spirit of Los Angeles. 
            Each piece crafted with precision, passion, and the finest ingredients.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link
              href="/menu"
              className="px-8 py-3.5 bg-gold-400 text-ink-950 text-sm font-semibold tracking-wider uppercase hover:bg-gold-300 transition-colors duration-300 rounded-sm"
            >
              Explore Our Menu
            </Link>
            <Link
              href="/locations"
              className="px-8 py-3.5 border border-gold-400/40 text-gold-300 text-sm font-semibold tracking-wider uppercase hover:bg-gold-400/10 transition-colors duration-300 rounded-sm"
            >
              Find a Location
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-5 h-5 text-gold-400/50" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
          </svg>
        </div>
      </section>

      {/* Menu Categories */}
      {categories.length > 0 && (
        <section className="py-24 section-padding">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="Our Menu"
              title="Curated Categories"
              description="Explore our carefully crafted menu, organized by the finest traditions of Japanese cuisine."
            />
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const catImage = category.metadata?.image?.imgix_url
                return (
                  <Link
                    key={category.id}
                    href={`/menu?category=${category.slug}`}
                    className="group relative aspect-[3/2] rounded-lg overflow-hidden card-hover"
                  >
                    {catImage ? (
                      <img
                        src={`${catImage}?w=800&h=540&fit=crop&auto=format,compress`}
                        alt={category.title}
                        width={400}
                        height={270}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-ink-800" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-serif font-bold text-cream-50 group-hover:text-gold-300 transition-colors">
                        {category.metadata?.name || category.title}
                      </h3>
                      {category.metadata?.description && (
                        <p className="mt-1 text-sm text-cream-200/50 line-clamp-2">
                          {category.metadata.description}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Featured Items */}
      {displayItems.length > 0 && (
        <section className="py-24 section-padding bg-ink-900/30">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="Chef's Selection"
              title="Featured Dishes"
              description="Handpicked by our master chef — each dish a testament to the art of sushi."
            />
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wider uppercase hover:text-gold-300 transition-colors"
              >
                View Full Menu
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Locations */}
      {locations.length > 0 && (
        <section className="py-24 section-padding">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="Visit Us"
              title="Our Locations"
              description="Find your nearest Omakase and experience the magic of authentic sushi."
            />
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location) => {
                const locImage = location.metadata?.image?.imgix_url
                return (
                  <Link
                    key={location.id}
                    href={`/locations/${location.slug}`}
                    className="group bg-ink-900/50 border border-gold-400/10 rounded-lg overflow-hidden card-hover"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      {locImage ? (
                        <img
                          src={`${locImage}?w=800&h=450&fit=crop&auto=format,compress`}
                          alt={location.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-ink-800 flex items-center justify-center">
                          <span className="text-4xl">📍</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-cream-50 group-hover:text-gold-300 transition-colors">
                        {location.title}
                      </h3>
                      {location.metadata?.address && (
                        <p className="mt-2 text-sm text-cream-200/50">
                          {location.metadata.address}
                        </p>
                      )}
                      {location.metadata?.city && (
                        <p className="text-sm text-cream-200/40">
                          {location.metadata.city}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      {displayReviews.length > 0 && (
        <section className="py-24 section-padding bg-ink-900/30">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              eyebrow="Guest Experiences"
              title="What Our Guests Say"
              description="Hear from those who have experienced the Omakase difference."
            />
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayReviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-ink-900/60 border border-gold-400/10 rounded-lg p-8"
                >
                  <StarRating rating={review.metadata?.rating ?? 0} />
                  {review.metadata?.review_text && (
                    <p className="mt-4 text-cream-200/70 text-sm leading-relaxed line-clamp-4 italic">
                      &ldquo;{review.metadata.review_text}&rdquo;
                    </p>
                  )}
                  <div className="mt-6 pt-4 border-t border-gold-400/10">
                    <p className="text-sm font-semibold text-cream-100">
                      {review.metadata?.reviewer_name || 'Anonymous Guest'}
                    </p>
                    {review.metadata?.visit_date && (
                      <p className="text-xs text-cream-200/40 mt-1">
                        {new Date(review.metadata.visit_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/reviews"
                className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wider uppercase hover:text-gold-300 transition-colors"
              >
                Read All Reviews
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 section-padding text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase mb-4">
            An Experience Awaits
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-cream-50">
            Reserve Your Seat
          </h2>
          <p className="mt-4 text-cream-200/60 leading-relaxed">
            Join us for an unforgettable culinary journey. Our omakase experience is a celebration of
            the finest seasonal ingredients, crafted by master sushi chefs.
          </p>
          <Link
            href="/locations"
            className="mt-8 inline-block px-10 py-4 bg-gold-400 text-ink-950 text-sm font-semibold tracking-wider uppercase hover:bg-gold-300 transition-colors duration-300 rounded-sm"
          >
            Find a Location &amp; Reserve
          </Link>
        </div>
      </section>
    </div>
  )
}