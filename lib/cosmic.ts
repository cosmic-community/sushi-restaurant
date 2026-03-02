import { createBucketClient } from '@cosmicjs/sdk'
import type { MenuCategory, MenuItem, Location, Review } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

// Menu Categories
export async function getMenuCategories(): Promise<MenuCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'menu-categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const categories = response.objects as MenuCategory[]
    return categories.sort((a, b) => {
      const orderA = a.metadata?.order ?? 999
      const orderB = b.metadata?.order ?? 999
      return orderA - orderB
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch menu categories')
  }
}

export async function getMenuCategoryBySlug(slug: string): Promise<MenuCategory | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'menu-categories', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as MenuCategory
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch menu category')
  }
}

// Menu Items
export async function getMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'menu-items' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as MenuItem[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch menu items')
  }
}

export async function getMenuItemBySlug(slug: string): Promise<MenuItem | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'menu-items', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as MenuItem
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch menu item')
  }
}

export async function getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'menu-items', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as MenuItem[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch menu items by category')
  }
}

// Locations
export async function getLocations(): Promise<Location[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'locations' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.objects as Location[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch locations')
  }
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'locations', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return response.object as Location
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch location')
  }
}

// Reviews
export async function getReviews(): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const reviews = response.objects as Review[]
    return reviews.sort((a, b) => {
      const dateA = new Date(a.metadata?.visit_date || a.created_at).getTime()
      const dateB = new Date(b.metadata?.visit_date || b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews')
  }
}

export async function getReviewsByLocation(locationId: string): Promise<Review[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'reviews', 'metadata.location': locationId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return response.objects as Review[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch reviews by location')
  }
}