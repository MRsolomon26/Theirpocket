import { Container } from '@/components/layout/container';
import { ProductGrid } from '@/components/product/product-grid';
import { EmptyState } from '@/components/shared/empty-state';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { queryProducts } from '@/lib/products-service';


type ResolvedSearchParams = {
  category?: string;
  search?: string;
  featured?: string;
  bestseller?: string;
  sort?: string;
  offset?: string;
  limit?: string;
};

interface ProductsPageProps {
  searchParams: Promise<ResolvedSearchParams>;
}

function buildQueryString(params: Record<string, string | undefined>, updates: Record<string, string | number | undefined>) {
  const newParams = { ...params, ...updates };
  return Object.entries(newParams)
    .filter(([_, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const data = queryProducts({
    category: resolvedSearchParams.category,
    search: resolvedSearchParams.search,
    featured: resolvedSearchParams.featured,
    bestseller: resolvedSearchParams.bestseller,
    sort: resolvedSearchParams.sort,
    offset: resolvedSearchParams.offset ? parseInt(resolvedSearchParams.offset) : 0,
    limit: resolvedSearchParams.limit ? parseInt(resolvedSearchParams.limit) : 20,
  });
  const { products, total, limit, offset, hasMore } = data;


  const currentPage = Math.floor(offset / limit) + 1;

  const totalPages = Math.ceil(total / limit);

  const pageTitle = resolvedSearchParams.search 
    ? `Search: "${resolvedSearchParams.search}"`
    : resolvedSearchParams.category
    ? `Category: ${resolvedSearchParams.category}`
    : 'All Products';

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{pageTitle}</h1>
        <p className="text-muted-foreground">
          {resolvedSearchParams.search 
            ? `Found ${total} results for "${resolvedSearchParams.search}"`
            : `Browse our complete collection of fashion items (${total} products)`
          }
        </p>
      </div>

      {/* Sort and Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <div className="flex gap-2">
            <Link href={`/products?${buildQueryString(resolvedSearchParams, { sort: 'newest' })}`}>
              <Button variant={resolvedSearchParams.sort === 'newest' || !resolvedSearchParams.sort ? 'default' : 'outline'} size="sm">
                Newest
              </Button>
            </Link>
            <Link href={`/products?${buildQueryString(resolvedSearchParams, { sort: 'price-asc' })}`}>
              <Button variant={resolvedSearchParams.sort === 'price-asc' ? 'default' : 'outline'} size="sm">
                Price: Low
              </Button>
            </Link>
            <Link href={`/products?${buildQueryString(resolvedSearchParams, { sort: 'price-desc' })}`}>
              <Button variant={resolvedSearchParams.sort === 'price-desc' ? 'default' : 'outline'} size="sm">
                Price: High
              </Button>
            </Link>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {offset + 1}-{Math.min(offset + limit, total)} of {total}
        </div>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="No products found"
          description={resolvedSearchParams.search 
            ? `No results found for "${resolvedSearchParams.search}". Try a different search term.`
            : 'Check back soon for new arrivals'
          }
        />
      ) : (
        <>
          <ProductGrid products={products} />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {currentPage === 1 ? (
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              ) : (
                <Link href={`/products?${buildQueryString(resolvedSearchParams, { offset: String((currentPage - 2) * limit) })}`}>
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                </Link>
              )}

              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  const isActive = pageNum === currentPage;
                  return isActive ? (
                    <Button key={pageNum} variant="default" size="icon">
                      {pageNum}
                    </Button>
                  ) : (
                    <Link key={pageNum} href={`/products?${buildQueryString(resolvedSearchParams, { offset: String((pageNum - 1) * limit) })}`}>
                      <Button variant="outline" size="icon">
                        {pageNum}
                      </Button>
                    </Link>
                  );
                })}
              </div>

              {!hasMore ? (
                <Button variant="outline" size="icon" disabled>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Link href={`/products?${buildQueryString(resolvedSearchParams, { offset: String(currentPage * limit) })}`}>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </Container>
  );
}

