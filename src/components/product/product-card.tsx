'use client';

import Link from 'next/link';
import { ShoppingCart, Heart, Eye, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';
import { QuickViewModal } from '@/components/product/quick-view-modal';
import { useWishlist } from '@/contexts/wishlist-context';
import { useCart } from '@/contexts/cart-context';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  slug: string;
  rating?: number;
  variants?: Array<{ id: string; name: string; price?: number; stock: number }>;
  basePrice?: number;
  category?: { name: string; slug: string };
  description?: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  isNew,
  isFeatured,
  isBestseller,
  slug,
  rating,
  variants,
  basePrice,
  category,
  description,
}: ProductCardProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const productData = {
    id,
    name,
    price,
    originalPrice,
    image,
    slug,
    rating,
    variants,
    basePrice: basePrice ?? price,
    category,
    description,
    isFeatured,
    isBestseller,
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(id)) {
      removeFromWishlist(id);
    } else {
      addToWishlist(productData);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const firstVariant = variants?.[0];
    addToCart({
      productId: id,
      variantId: firstVariant?.id,
      name,
      price,
      originalPrice,
      image,
      slug,
      stock: firstVariant?.stock ?? 99,
      category: category?.name,
    });
  };

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-blue-500 bg-white">
        <Link href={`/products/${slug}`}>
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            {image ? (
              <img
                src={image}
                alt={name}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-gray-100 to-gray-200">
                <span className="text-gray-400">No image</span>
              </div>
            )}
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
              {isNew && (
                <Badge className="text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                  <Zap className="h-3 w-3 mr-1" />
                  New
                </Badge>
              )}
              {isFeatured && (
                <Badge className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                  Featured
                </Badge>
              )}
              {isBestseller && (
                <Badge className="text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                  Bestseller
                </Badge>
              )}
              {discount > 0 && (
                <Badge className="text-xs bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                  -{discount}%
                </Badge>
              )}
            </div>

            {/* Quick Actions */}
            <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform translate-x-0 sm:translate-x-2 sm:group-hover:translate-x-0 z-10">
              <Button 
                size="icon" 
                className="h-9 w-9 bg-white/95 hover:bg-white shadow-md sm:shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-pink-500 rounded-full"
                onClick={handleWishlistToggle}
              >
                <Heart className={`h-4 w-4 ${isInWishlist(id) ? 'fill-pink-500 text-pink-500' : 'text-gray-700'}`} />
              </Button>
              <Button 
                size="icon" 
                className="h-9 w-9 bg-white/95 hover:bg-white shadow-md sm:shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500 rounded-full hidden sm:flex"
                onClick={(e) => {
                  e.preventDefault();
                  setIsQuickViewOpen(true);
                }}
              >
                <Eye className="h-4 w-4 text-gray-700" />
              </Button>
            </div>

            {/* Rating */}
            {rating && (
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/95 backdrop-blur px-2 py-1 rounded-full text-xs z-10 shadow-md">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">{rating}</span>
              </div>
            )}
          </div>
        </Link>

        <CardContent className="p-4 bg-white">
          <Link href={`/products/${slug}`} className="block">
            <h3 className="font-bold text-sm line-clamp-2 text-gray-900 hover:text-blue-600 transition-colors group-hover:underline">
              {name}
            </h3>
          </Link>
          <div className="mt-2 flex items-center gap-2">
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 bg-white">
          <Button 
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all" 
            size="sm"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>


      <QuickViewModal
        open={isQuickViewOpen}
        onOpenChange={setIsQuickViewOpen}
        product={productData}
      />
    </>
  );
}
