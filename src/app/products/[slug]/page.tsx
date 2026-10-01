import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/shared/empty-state';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductGrid } from '@/components/product/product-grid';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { getProductBySlug, queryProducts } from '@/lib/products-service';

interface ProductDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;

  const product = getProductBySlug(slug);
  const relatedData = product ? queryProducts({ category: product.category.slug, limit: 5 }) : { products: [] };
  const relatedProducts = relatedData.products.filter((p) => p.id !== product?.id).slice(0, 4);


  if (!product) {
    return (
      <Container className="py-8">
        <EmptyState
          title="Product not found"
          description="The product you're looking for doesn't exist or has been removed."
        />
      </Container>
    );
  }

  const firstVariant = product.variants?.[0];
  const price = firstVariant?.price || product.basePrice;
  const images = firstVariant?.images || [];

  return (
    <Container className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <ProductGallery images={images} productName={product.name} />

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.isFeatured && <Badge variant="default">Featured</Badge>}
              {product.isBestseller && <Badge variant="destructive">Bestseller</Badge>}
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.category?.name}</p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatPrice(Number(price))}</span>
            {firstVariant && Number(firstVariant.price) !== Number(product.basePrice) && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(Number(product.basePrice))}
              </span>
            )}
          </div>

          {product.description && (
            <div className="prose prose-sm max-w-none">
              <p>{product.description}</p>
            </div>
          )}

          {/* Variant Selection - TODO: Implement in Phase 4 */}
          {product.variants && product.variants.length > 1 && (
            <div className="space-y-2">
              <h3 className="font-medium">Select Variant</h3>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant: { id: string; size?: string; colour?: string; price: number }) => (
                  <Button
                    key={variant.id}
                    variant={variant.id === firstVariant?.id ? 'default' : 'outline'}
                    size="sm"
                  >
                    {variant.size || variant.colour || 'Variant'}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Stock Status */}
          {firstVariant && (
            <div className="text-sm">
              {firstVariant.stock > 0 ? (
                <span className="text-green-600">In Stock ({firstVariant.stock} available)</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button className="flex-1" size="lg" disabled={!firstVariant || firstVariant.stock === 0}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Product Info */}
          <div className="border-t pt-6 space-y-4">
            <div>
              <h3 className="font-medium mb-1">SKU</h3>
              <p className="text-sm text-muted-foreground">{(firstVariant as { sku?: string })?.sku || 'N/A'}</p>
            </div>

            <div>
              <h3 className="font-medium mb-1">Category</h3>
              <p className="text-sm text-muted-foreground">{product.category?.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </Container>
  );
}
