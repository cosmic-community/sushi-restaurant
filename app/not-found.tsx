import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 section-padding">
      <div className="text-center max-w-md">
        <span className="text-6xl">🍣</span>
        <h1 className="mt-6 text-4xl font-serif font-bold text-cream-50">Page Not Found</h1>
        <p className="mt-4 text-cream-200/50 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist. Perhaps the menu has changed, or
          you&apos;ve wandered off the path.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-gold-400 text-ink-950 text-sm font-semibold tracking-wider uppercase hover:bg-gold-300 transition-colors rounded-sm"
          >
            Back to Home
          </Link>
          <Link
            href="/menu"
            className="px-6 py-3 border border-gold-400/40 text-gold-300 text-sm font-semibold tracking-wider uppercase hover:bg-gold-400/10 transition-colors rounded-sm"
          >
            View Menu
          </Link>
        </div>
      </div>
    </div>
  )
}