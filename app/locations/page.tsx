import Link from 'next/link'
import { getLocations } from '@/lib/cosmic'
import SectionHeading from '@/components/SectionHeading'
import type { Metadata } from 'next'
import type { LocationHours } from '@/types'

export const metadata: Metadata = {
  title: 'Our Locations — Omakase',
  description: 'Find an Omakase location near you in Los Angeles. View hours, address, and make a reservation.',
}

// Changed: Helper to get a short hours summary string from the hours JSON object
function getHoursSummary(hours: LocationHours | string | undefined): string {
  if (!hours) return ''
  if (typeof hours === 'string') return hours
  if (typeof hours !== 'object') return ''
  // Find the first open day to show as a summary
  const days = ['tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'monday'] as const
  for (const day of days) {
    const value = hours[day]
    if (value && value !== 'Closed') {
      return value
    }
  }
  return ''
}

// Changed: Helper to safely convert any value to a renderable string
function safeString(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (typeof value === 'object' && 'value' in value) {
    return String((value as { value: unknown }).value)
  }
  return ''
}

export default async function LocationsPage() {
  const locations = await getLocations()

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 section-padding bg-ink-900/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Visit Us"
            title="Our Locations"
            description="Each Omakase location is a sanctuary of culinary excellence. Find the one nearest to you and begin your journey."
          />
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-16 section-padding">
        <div className="max-w-7xl mx-auto">
          {locations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {locations.map((location) => {
                const locImage = location.metadata?.image?.imgix_url
                // Changed: Extract a displayable hours string from the JSON object
                const hoursSummary = getHoursSummary(location.metadata?.hours)
                // Changed: Safely extract string values to prevent object-as-React-child errors
                const addressText = safeString(location.metadata?.address)
                const cityText = safeString(location.metadata?.city)
                const phoneText = safeString(location.metadata?.phone)
                return (
                  <Link
                    key={location.id}
                    href={`/locations/${location.slug}`}
                    className="group bg-ink-900/50 border border-gold-400/10 rounded-lg overflow-hidden card-hover"
                  >
                    <div className="aspect-[16/9] overflow-hidden">
                      {locImage ? (
                        <img
                          src={`${locImage}?w=1000&h=562&fit=crop&auto=format,compress`}
                          alt={location.title}
                          width={500}
                          height={281}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-ink-800 flex items-center justify-center">
                          <span className="text-5xl">📍</span>
                        </div>
                      )}
                    </div>
                    <div className="p-8">
                      <h2 className="text-2xl font-serif font-bold text-cream-50 group-hover:text-gold-300 transition-colors">
                        {location.title}
                      </h2>
                      <div className="mt-4 space-y-2">
                        {addressText && (
                          <div className="flex items-start gap-3">
                            <span className="text-gold-400 text-sm mt-0.5">📍</span>
                            <p className="text-sm text-cream-200/60">
                              {addressText}
                              {cityText && `, ${cityText}`}
                            </p>
                          </div>
                        )}
                        {phoneText && (
                          <div className="flex items-center gap-3">
                            <span className="text-gold-400 text-sm">📞</span>
                            <p className="text-sm text-cream-200/60">{phoneText}</p>
                          </div>
                        )}
                        {/* Changed: Render hours summary string instead of raw object */}
                        {hoursSummary && (
                          <div className="flex items-start gap-3">
                            <span className="text-gold-400 text-sm mt-0.5">🕐</span>
                            <p className="text-sm text-cream-200/60">{hoursSummary}</p>
                          </div>
                        )}
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wider uppercase">
                        View Details
                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl">📍</span>
              <p className="mt-4 text-cream-200/50 text-lg">
                Locations coming soon. Stay tuned.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}