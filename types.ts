export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Changed: Added LocationHours interface to match the JSON structure from Cosmic CMS
export interface LocationHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface MenuCategory extends CosmicObject {
  type: 'menu-categories';
  metadata: {
    name?: string;
    description?: string;
    image?: CosmicImage;
    order?: number;
  };
}

export interface MenuItem extends CosmicObject {
  type: 'menu-items';
  metadata: {
    description?: string;
    price?: string;
    image?: CosmicImage;
    category?: MenuCategory;
    dietary_info?: string;
    seasonal?: boolean;
    chefs_recommendation?: boolean;
  };
}

export interface Location extends CosmicObject {
  type: 'locations';
  metadata: {
    address?: string;
    city?: string;
    phone?: string;
    hours?: LocationHours; // Changed: Updated from string to LocationHours to match actual CMS data
    image?: CosmicImage;
    reservation_link?: string;
  };
}

export interface Review extends CosmicObject {
  type: 'reviews';
  metadata: {
    reviewer_name?: string;
    rating?: number;
    review_text?: string;
    visit_date?: string;
    location?: Location;
  };
}