import { getReviews, getLocations } from '@/lib/cosmic'
import SectionHeading from '@/components/SectionHeading'
import StarRating from '@/components/StarRating'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Guest Reviews — Omakase',
  description: 'Read what our guests have to say about their dining experience at Omakase.',
}

export default async function ReviewsPage() {
  const [reviews, locations] = await Promise.all([getReviews(), getLocations()])

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.metadata?.rating ?? 0), 0) / reviews.length
        ).toFixed(1)
      : '0'

  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  for (const review of reviews) {
    const rating = review.metadata?.rating
    if (rating && rating >= 1 && rating <= 5) {
      ratingCounts[rating] = (ratingCounts[rating] ?? 0) + 1
    }
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 section-padding bg-ink-900/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Guest Experiences"
            title="Reviews"
            description="The words of our guests speak to the heart of what we do — creating unforgettable culinary moments."
          />
        </div>
      </section>

      {/* Stats */}
      {reviews.length > 0 && (
        <section className="section-padding py-12 border-b border-gold-400/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* Average Rating */}
              <div className="text-center md:text-left">
                <p className="text-6xl font-serif font-bold gold-gradient-text">
                  {averageRating}
                </p>
                <div className="mt-2">
                  <StarRating rating={Math.round(parseFloat(averageRating))} size="lg" />
                </div>
                <p className="mt-2 text-sm text-cream-200/50">
                  Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
                </p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = ratingCounts[star] ?? 0
                  const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="text-sm text-cream-200/50 w-12">{star} star</span>
                      <div className="flex-1 h-2 bg-ink-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold-400 rounded-full transition-all duration-700"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-cream-200/40 w-8 text-right">{count}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Reviews List */}
      <section className="py-16 section-padding">
        <div className="max-w-4xl mx-auto">
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => {
                const locationName = review.metadata?.location?.title
                return (
                  <div
                    key={review.id}
                    className="bg-ink-900/50 border border-gold-400/10 rounded-lg p-8"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                      <div>
                        <p className="text-lg font-semibold text-cream-50">
                          {review.metadata?.reviewer_name || 'Anonymous Guest'}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <StarRating rating={review.metadata?.rating ?? 0} size="sm" />
                          {locationName && (
                            <span className="text-xs text-cream-200/40">
                              at {locationName}
                            </span>
                          )}
                        </div>
                      </div>
                      {review.metadata?.visit_date && (
                        <span className="text-sm text-cream-200/40">
                          {new Date(review.metadata.visit_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      )}
                    </div>

                    {review.metadata?.review_text && (
                      <p className="text-cream-200/70 leading-relaxed">
                        {review.metadata.review_text}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl">⭐</span>
              <p className="mt-4 text-cream-200/50 text-lg">
                No reviews yet. Be the first to share your experience.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}