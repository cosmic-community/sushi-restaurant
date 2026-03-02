export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <div className="inline-flex items-center gap-2">
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        <p className="mt-4 text-sm text-cream-200/40 tracking-wider uppercase">
          Preparing your experience...
        </p>
      </div>
    </div>
  )
}