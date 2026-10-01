'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductGallery } from '@/components/product/product-gallery';
import { ShoppingCart, Heart, Share2, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useWishlist } from '@/contexts/wishlist-context';
import { useCart } from '@/contexts/cart-context';

interface QuickViewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    description?: string;
    isFeatured?: boolean;
    isBestseller?: boolean;
    category?: { name: string };
    variants?: Array<{
      id: string;
      price?: number;
      images?: string[];
      stock: number;
      sku?: string;
      size?: string;
      colour?: string;
    }>;
  };
}

export function QuickViewModal({ open, onOpenChange, product }: QuickViewModalProps) {
  const [selectedVariant, setSelectedVariant] = useState<{
    id: string;
    price?: number;
    images?: string[];
    stock: number;
    sku?: string;
    size?: string;
    colour?: string;
  } | null>(null);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      setSelectedVariant(product.variants[0]);
    }
  }, [product]);

  if (!product) return null;

  const firstVariant = selectedVariant || product.variants?.[0];
  const price = firstVariant?.price || product.basePrice;
  const images = firstVariant?.images || [];

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        ...product,
        price: product.basePrice,
        image: firstVariant?.images?.[0],
        category: product.category ? { name: product.category.name, slug: product.slug } : undefined,
        variants: product.variants?.map(v => ({
          id: v.id,
          name: v.size || v.colour || 'Variant',
          price: v.price,
          stock: v.stock,
      })),
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: firstVariant?.id,
      name: product.name,
      price: Number(price),
      originalPrice: Number(product.basePrice),
      image: firstVariant?.images?.[0],
      slug: product.slug,
      size: firstVariant?.size,
      colour: firstVariant?.colour,
      stock: firstVariant?.stock ?? 99,
      category: product.category?.name,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 hover:bg-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Images */}
          <div className="p-6">
            <ProductGallery images={images} productName={product.name} />
          </div>

          {/* Product Details */}
          <div className="p-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isFeatured && <Badge variant="default">Featured</Badge>}
                {product.isBestseller && <Badge variant="destructive">Bestseller</Badge>}
              </div>
              <DialogTitle className="text-2xl font-bold mb-2">{product.name}</DialogTitle>
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

            {/* Variant Selection */}
            {product.variants && product.variants.length > 1 && (
              <div className="space-y-3">
                <h3 className="font-medium">Select Variant</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants?.map((variant) => (
                    <Button
                      key={variant.id}
                      variant={variant.id === selectedVariant?.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedVariant(variant)}
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
              <Button
                className="flex-1"
                size="lg"
                disabled={!firstVariant || firstVariant.stock === 0}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleWishlistToggle}
              >
                <Heart
                  className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`}
                />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>


            {/* Product Info */}
            <div className="border-t pt-6 space-y-4">
              <div>
                <h3 className="font-medium mb-1">SKU</h3>
                <p className="text-sm text-muted-foreground">{firstVariant?.sku || 'N/A'}</p>
              </div>
              <div>
                <h3 className="font-medium mb-1">Category</h3>
                <p className="text-sm text-muted-foreground">{product.category?.name}</p>
              </div>
            </div>

            {/* View Full Details Button */}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                onOpenChange(false);
                window.location.href = `/products/${product.slug}`;
              }}
            >
              View Full Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
