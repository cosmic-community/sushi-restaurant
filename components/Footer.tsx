import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-ink-950 border-t border-gold-400/10">
      <div className="max-w-7xl mx-auto section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🍣</span>
              <span className="text-lg font-semibold tracking-wide gold-gradient-text">
                OMAKASE
              </span>
            </Link>
            <p className="text-sm text-cream-200/50 leading-relaxed max-w-xs">
              Authentic Japanese culinary artistry in the heart of Los Angeles.
              Every piece tells a story of tradition and excellence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Our Menu', href: '/menu' },
                { name: 'Locations', href: '/locations' },
                { name: 'Guest Reviews', href: '/reviews' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-200/60 hover:text-gold-300 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold tracking-[0.2em] text-gold-400 uppercase mb-4">
              Contact
            </h3>
            <div className="space-y-3 text-sm text-cream-200/60">
              <p>Los Angeles, California</p>
              <p>
                <a href="mailto:hello@omakase.la" className="hover:text-gold-300 transition-colors">
                  hello@omakase.la
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold-400/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-cream-200/30">
            © {currentYear} Omakase. All rights reserved.
          </p>
          <p className="text-xs text-cream-200/30">
            Crafted with precision in Los Angeles
          </p>
        </div>
      </div>
    </footer>
  )
}