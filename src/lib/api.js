/**
 * BazarDor API layer — lib/api.js
 * All API calls centralised here. Base URL from env variable.
 */

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://openapi.programming-hero.com/api/bazardor";

class ApiError extends Error {
  constructor(status, url) {
    super(`API error ${status}: ${url}`);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * Wrapper around fetch with basic error handling.
 * @template T
 * @param {string} path
 * @returns {Promise<T>}
 */
async function apiFetch(path) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new ApiError(res.status, url);
  }

  const data = await res.json();
  return data;
}

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------

/**
 * Fetch all products (optionally filtered by category slug).
 * @param {string} [category]
 * @returns {Promise<import('./types').Product[]>}
 */
export async function getProducts(category) {
  const path = category
    ? `/products?category=${encodeURIComponent(category)}`
    : "/products";
  return apiFetch(path);
}

/**
 * Fetch a single product by its numeric ID.
 * @param {number|string} id
 * @returns {Promise<import('./types').Product>}
 */
export async function getProductById(id) {
  return apiFetch(`/products/${encodeURIComponent(id)}`);
}

/**
 * Fetch a product by its slug.
 * The API does not expose a slug endpoint so we fetch all and filter.
 * @param {string} slug
 * @returns {Promise<import('./types').Product | null>}
 */
export async function getProductBySlug(slug) {
  const products = await getProducts();
  return products.find((p) => p.slug === slug) ?? null;
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

/**
 * Fetch all categories.
 * @returns {Promise<import('./types').Category[]>}
 */
export async function getCategories() {
  return apiFetch("/categories");
}

/**
 * Fetch a single category by slug (returns metadata only, not products).
 * @param {string} slug
 * @returns {Promise<import('./types').Category | null>}
 */
export async function getCategoryBySlug(slug) {
  try {
    return await apiFetch(`/categories/${encodeURIComponent(slug)}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

// ---------------------------------------------------------------------------
// Derived helpers
// ---------------------------------------------------------------------------

/**
 * Return up to `limit` products whose change.dir is "up", sorted by pct desc.
 * @param {import('./types').Product[]} products
 * @param {number} [limit=6]
 */
export function getRisers(products, limit = 6) {
  return products
    .filter((p) => p.change?.dir === "up" && typeof p.change?.pct === "number")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, limit);
}

/**
 * Return up to `limit` products whose change.dir is "down", sorted by pct asc.
 * @param {import('./types').Product[]} products
 * @param {number} [limit=6]
 */
export function getFallers(products, limit = 6) {
  return products
    .filter(
      (p) => p.change?.dir === "down" && typeof p.change?.pct === "number"
    )
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, limit);
}

/**
 * Sort a products array by today price (does not mutate original).
 * @param {import('./types').Product[]} products
 * @param {"asc"|"desc"} direction
 */
export function sortByPrice(products, direction) {
  const copy = [...products];
  return copy.sort((a, b) =>
    direction === "asc" ? a.today - b.today : b.today - a.today
  );
}

/**
 * Calculate min, max and average today price from market records.
 * @param {import('./types').MarketPrice[]} markets
 */
export function calcMarketStats(markets) {
  if (!markets || markets.length === 0) return null;
  const mins = markets.map((m) => m.min);
  const maxs = markets.map((m) => m.max);
  const min = Math.min(...mins);
  const max = Math.max(...maxs);
  const avg = Math.round(
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
  );
  return { min, max, avg };
}
