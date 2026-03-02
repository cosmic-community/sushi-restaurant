'use client'

import { useState } from 'react'
import Link from 'next/link'

const navigation = [
  { name: 'Menu', href: '/menu' },
  { name: 'Locations', href: '/locations' },
  { name: 'Reviews', href: '/reviews' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink-950/90 backdrop-blur-md border-b border-gold-400/10">
      <nav className="max-w-7xl mx-auto section-padding flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="text-3xl">🍣</span>
          <div>
            <span className="text-xl font-semibold tracking-wide gold-gradient-text">
              OMAKASE
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-gold-300/60 uppercase">
              Los Angeles
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium tracking-wider text-cream-200/80 hover:text-gold-300 transition-colors duration-300 uppercase"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/locations"
            className="ml-4 px-5 py-2.5 bg-gold-400 text-ink-950 text-sm font-semibold tracking-wider uppercase rounded-sm hover:bg-gold-300 transition-colors duration-300"
          >
            Reserve
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden text-cream-200 hover:text-gold-300 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-ink-950/98 backdrop-blur-lg border-t border-gold-400/10">
          <div className="section-padding py-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-lg font-medium tracking-wider text-cream-200/80 hover:text-gold-300 transition-colors uppercase"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/locations"
              className="block mt-4 px-5 py-3 bg-gold-400 text-ink-950 text-center text-sm font-semibold tracking-wider uppercase rounded-sm hover:bg-gold-300 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}