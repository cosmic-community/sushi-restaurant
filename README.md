# 🍣 Omakase — High-End Sushi Restaurant

![Omakase Sushi Restaurant](https://imgix.cosmicjs.com/a0c63800-41f2-11f0-b8af-f39492e5cae1-sushi-platter.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A premium, visually stunning website for a high-end sushi restaurant in Los Angeles. Built with Next.js 16 and Cosmic CMS, Omakase delivers an immersive digital experience that reflects the artistry and precision of Japanese fine dining.

## Features

- 🍣 **Dynamic Menu System** — Browse curated categories with pricing, dietary info, and chef's picks
- 📍 **Location Pages** — Explore LA locations with hours, contact info, and reservation links
- ⭐ **Guest Reviews** — Authentic reviews with star ratings filtered by location
- ⚡ **Server-Side Rendering** — Lightning-fast with Next.js 16 App Router
- 🎨 **Luxury Design** — Dark Japanese-inspired aesthetic with gold accents
- 📱 **Fully Responsive** — Flawless on every device from mobile to desktop
- 🔄 **CMS Powered** — All content managed through [Cosmic](https://www.cosmicjs.com/docs)

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a5f4161c50cdb4b7bf99e0&clone_repository=69a5f5be1c50cdb4b7bf9a24)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a restaurant website with menu items (including images, pricing, and dietary info), menu categories, locations, and customer reviews. User instructions: A high end sushi restaurant in LA."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'Sushi Restaurant'. The content is managed in Cosmic CMS with the following object types: menu-categories, menu-items, locations, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: A high end sushi restaurant in LA."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first styling
- [Cosmic CMS](https://www.cosmicjs.com/docs) — Headless content management
- [@cosmicjs/sdk](https://www.npmjs.com/package/@cosmicjs/sdk) — Cosmic JavaScript SDK

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd omakase-sushi

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic bucket credentials

# Run development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Cosmic SDK Examples

### Fetching Menu Items
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: menuItems } = await cosmic.objects
  .find({ type: 'menu-items' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Location
```typescript
const { object: location } = await cosmic.objects
  .findOne({ type: 'locations', slug: 'downtown-la' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses the following Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| 🍣 Menu Categories | `menu-categories` | Menu sections (Nigiri, Sashimi, Rolls, etc.) |
| 🐟 Menu Items | `menu-items` | Individual dishes with pricing and dietary info |
| 📍 Locations | `locations` | Restaurant locations with hours and contact info |
| ⭐ Reviews | `reviews` | Customer reviews with ratings |

## Deployment

### Vercel (Recommended)

```bash
bun run build
```

Deploy to [Vercel](https://vercel.com) and set environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

### Netlify

Configure build settings:
- **Build command:** `bun run build`
- **Publish directory:** `.next`
- Set the same environment variables as above.
<!-- README_END -->