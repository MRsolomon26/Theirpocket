'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Heart, ShoppingBag, User, Search } from 'lucide-react';
import { useWishlist } from '@/contexts/wishlist-context';
import { useCart } from '@/contexts/cart-context';
import { useSession } from 'next-auth/react';
import { Badge } from '@/components/ui/badge';

export function BottomNav() {
  const pathname = usePathname();
  const { wishlistCount } = useWishlist();
  const { cartCount, setIsCartOpen } = useCart();
  const { status } = useSession();

  // Hide on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:hidden">
      <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {/* Home */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isActive('/') ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Home className={`h-5 w-5 ${isActive('/') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Home</span>
        </Link>

        {/* Shop/Products */}
        <Link
          href="/products"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isActive('/products') ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Grid className={`h-5 w-5 ${isActive('/products') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Shop</span>
        </Link>

        {/* Categories */}
        <Link
          href="/categories"
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isActive('/categories') ? 'text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <Search className={`h-5 w-5 ${isActive('/categories') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">Explore</span>
        </Link>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isActive('/wishlist') ? 'text-pink-600 font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <div className="relative">
            <Heart className={`h-5 w-5 ${isActive('/wishlist') ? 'fill-pink-500 stroke-pink-500' : 'stroke-2'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 h-4 w-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                {wishlistCount > 99 ? '99+' : wishlistCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Saved</span>
        </Link>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center w-full h-full space-y-1 text-gray-500 hover:text-gray-900 transition-colors"
        >
          <div className="relative">
            <ShoppingBag className="h-5 w-5 stroke-2" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 h-4 w-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center animate-bounce">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">Cart</span>
        </button>

        {/* Account */}
        <Link
          href={status === 'authenticated' ? '/account' : '/login'}
          className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
            isActive('/account') || isActive('/login') ? 'text-purple-600 font-bold' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <User className={`h-5 w-5 ${isActive('/account') || isActive('/login') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
          <span className="text-[10px] tracking-tight">{status === 'authenticated' ? 'Account' : 'Login'}</span>
        </Link>
      </div>
    </div>
  );
}
