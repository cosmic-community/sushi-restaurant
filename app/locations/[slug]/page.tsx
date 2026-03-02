// app/locations/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getLocationBySlug, getReviewsByLocation, getMetafieldValue } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'
import type { Metadata } from 'next'
import type { LocationHours } from '@/types'

interface LocationPageProps {
  params: Promise<{ slug: string }>
}

// Changed: Helper to format hours JSON object into a readable multiline string
function formatHours(hours: LocationHours | string | undefined): string {
  if (!hours) return ''
  if (typeof hours === 'string') return hours
  const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const
  const dayLabels: Record<string, string> = {
    monday: 'Mon',
    tuesday: 'Tue',
    wednesday: 'Wed',
    thursday: 'Thu',
    friday: 'Fri',
    saturday: 'Sat',
    sunday: 'Sun',
  }
  return dayOrder
    .map((day) => {
      const value = hours[day]
      if (!value) return null
      return `${dayLabels[day]}: ${value}`
    })
    .filter(Boolean)
    .join('\n')
}

// Changed: Helper to extract numeric rating from select-dropdown object
function getRatingNumber(rating: unknown): number {
  if (typeof rating === 'number') return rating
  if (typeof rating === 'string') return parseInt(rating, 10) || 0
  if (typeof rating === 'object' && rating !== null && 'key' in rating) {
    return parseInt(String((rating as { key: string }).key), 10) || 0
  }
  return 0
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { slug } = await params
  const location = await getLocationBySlug(slug)
  if (!location) return { title: 'Not Found — Omakase' }
  // Changed: Use formatHours instead of rendering the object directly
  const hoursText = formatHours(location.metadata?.hours)
  return {
    title: `${location.title} — Omakase`,
    description: `Visit Omakase at ${location.metadata?.address || location.title}. ${hoursText}`,
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params
  const location = await getLocationBySlug(slug)

  if (!location) {
    notFound()
  }

  let reviews: Awaited<ReturnType<typeof getReviewsByLocation>> = []
  if (location.id) {
    reviews = await getReviewsByLocation(location.id)
  }

  const locImage = location.metadata?.image?.imgix_url
  // Changed: Use getRatingNumber to safely extract numeric rating
  const averageRating =
    reviews.length > 0
      ? Math.round(
            reviews.reduce((sum, r) => sum + getRatingNumber(r.metadata?.rating), 0) / reviews.length
          )
      : 0

  // Changed: Format hours for display
  const formattedHours = formatHours(location.metadata?.hours)

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <div className="section-padding py-4 border-b border-gold-400/10">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/locations" className="text-cream-200/50 hover:text-gold-300 transition-colors">
            Locations
          </Link>
          <span className="text-cream-200/30">/</span>
          <span className="text-cream-100">{location.title}</span>
        </div>
      </div>

      {/* Hero Image */}
      {locImage && (
        <section className="relative h-[40vh] sm:h-[50vh]">
          <img
            src={`${locImage}?w=1920&h=800&fit=crop&auto=format,compress`}
            alt={location.title}
            width={1920}
            height={800}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
        </section>
      )}

      {/* Location Details */}
      <section className="py-16 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold tracking-[0.3em] text-gold-400 uppercase mb-3">
                Omakase
              </p>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold text-cream-50">
                {location.title}
              </h1>

              {reviews.length > 0 && (
                <div className="mt-4 flex items-center gap-3">
                  <StarRating rating={averageRating} />
                  <span className="text-sm text-cream-200/50">
                    {averageRating}/5 · {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                  </span>
                </div>
              )}

              {location.content && (
                <div className="mt-8 text-cream-200/70 leading-relaxed text-lg">
                  {location.content}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="bg-ink-900/50 border border-gold-400/10 rounded-lg p-8 h-fit">
              <h3 className="text-sm font-semibold tracking-wider text-gold-400 uppercase mb-6">
                Details
              </h3>
              <div className="space-y-5">
                {location.metadata?.address && (
                  <div>
                    <p className="text-xs text-cream-200/40 uppercase tracking-wider mb-1">Address</p>
                    <p className="text-cream-100">{location.metadata.address}</p>
                    {location.metadata?.city && (
                      <p className="text-cream-200/60 text-sm">{location.metadata.city}</p>
                    )}
                  </div>
                )}
                {location.metadata?.phone && (
                  <div>
                    <p className="text-xs text-cream-200/40 uppercase tracking-wider mb-1">Phone</p>
                    <a
                      href={`tel:${location.metadata.phone}`}
                      className="text-cream-100 hover:text-gold-300 transition-colors"
                    >
                      {location.metadata.phone}
                    </a>
                  </div>
                )}
                {/* Changed: Render formatted hours string instead of raw object */}
                {formattedHours && (
                  <div>
                    <p className="text-xs text-cream-200/40 uppercase tracking-wider mb-1">Hours</p>
                    <p className="text-cream-100 whitespace-pre-line text-sm leading-relaxed">
                      {formattedHours}
                    </p>
                  </div>
                )}
              </div>

              {location.metadata?.reservation_link && (
                <a
                  href={location.metadata.reservation_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full px-6 py-3.5 bg-gold-400 text-ink-950 text-center text-sm font-semibold tracking-wider uppercase hover:bg-gold-300 transition-colors rounded-sm"
                >
                  Make a Reservation
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews for this Location */}
      {reviews.length > 0 && (
        <section className="py-16 section-padding bg-ink-900/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-cream-50 mb-8">
              Guest Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-ink-900/60 border border-gold-400/10 rounded-lg p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    {/* Changed: Extract numeric rating for StarRating */}
                    <StarRating rating={getRatingNumber(review.metadata?.rating)} size="sm" />
                    {review.metadata?.visit_date && (
                      <span className="text-xs text-cream-200/40">
                        {new Date(review.metadata.visit_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  {review.metadata?.review_text && (
                    <p className="text-cream-200/70 text-sm leading-relaxed italic">
                      &ldquo;{review.metadata.review_text}&rdquo;
                    </p>
                  )}
                  <p className="mt-3 text-sm font-semibold text-cream-100">
                    — {review.metadata?.reviewer_name || 'Anonymous Guest'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}