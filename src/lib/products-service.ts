import { generateProducts, generateCategories } from '@/lib/mock-data-generator';

let cachedProducts: ReturnType<typeof generateProducts> | null = null;
let cachedCategories: ReturnType<typeof generateCategories> | null = null;

export function getCachedProducts() {
  if (!cachedProducts) {
    cachedProducts = generateProducts();
  }
  return cachedProducts;
}

export function getCachedCategories() {
  if (!cachedCategories) {
    cachedCategories = generateCategories();
  }
  return cachedCategories;
}

export function queryProducts(options: {
  category?: string;
  search?: string;
  featured?: string | boolean;
  bestseller?: string | boolean;
  sort?: string;
  limit?: number;
  offset?: number;
}) {
  const allProducts = getCachedProducts();
  let products = [...allProducts];

  // Category filter
  if (options.category) {
    products = products.filter((p) => p.category.slug === options.category);
  }

  // Search filter
  if (options.search) {
    const searchLower = options.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower) ||
        p.slug.includes(searchLower)
    );
  }

  // Featured filter
  if (options.featured === true || options.featured === 'true') {
    products = products.filter((p) => p.isFeatured);
  }

  // Bestseller filter
  if (options.bestseller === true || options.bestseller === 'true') {
    products = products.filter((p) => p.isBestseller);
  }

  // Sorting
  switch (options.sort) {
    case 'price-asc':
      products.sort((a, b) => a.basePrice - b.basePrice);
      break;
    case 'price-desc':
      products.sort((a, b) => b.basePrice - a.basePrice);
      break;
    case 'name-asc':
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-desc':
      products.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'newest':
    default:
      products.sort((a, b) => parseInt(b.id) - parseInt(a.id));
      break;
  }

  const total = products.length;
  const limit = options.limit || 20;
  const offset = options.offset || 0;
  const paginatedProducts = products.slice(offset, offset + limit);

  return {
    products: paginatedProducts,
    total,
    limit,
    offset,
    hasMore: offset + limit < total,
  };
}

export function getProductBySlug(slug: string) {
  const products = getCachedProducts();
  return products.find((p) => p.slug === slug) || null;
}
