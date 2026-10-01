'use client';

import { Container } from '@/components/layout/container';
import { ProductGrid } from '@/components/product/product-grid';
import { EmptyState } from '@/components/shared/empty-state';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/contexts/wishlist-context';
import { Button } from '@/components/ui/button';

export default function WishlistPage() {
  const { wishlist, clearWishlist } = useWishlist();

  return (
    <Container className="py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-muted-foreground">
            {wishlist.length === 0
              ? 'Your wishlist is empty'
              : `${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} saved`}
          </p>
        </div>
        {wishlist.length > 0 && (
          <Button variant="outline" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Start adding products you love to your wishlist"
          icon={<Heart className="h-12 w-12 text-muted-foreground" />}
        />
      ) : (
        <ProductGrid
          products={wishlist.map((item) => ({
            ...item,
            basePrice: item.basePrice ?? item.price,
          }))}
        />
      )}
    </Container>
  );
}

