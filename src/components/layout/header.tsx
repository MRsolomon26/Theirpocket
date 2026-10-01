'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, User, Heart, ShoppingBag, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useWishlist } from '@/contexts/wishlist-context';
import { useCart } from '@/contexts/cart-context';
import { useSession, signOut } from 'next-auth/react';
import { useState, FormEvent } from 'react';
import { MobileMenu } from '@/components/navigation/mobile-menu';

export function Header() {
  const { wishlistCount } = useWishlist();
  const { cartCount, setIsCartOpen } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Theirpocket</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline underline-offset-4 transition-all">
            Products
          </Link>
          <Link href="/categories" className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline underline-offset-4 transition-all">
            Categories
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline underline-offset-4 transition-all">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline underline-offset-4 transition-all">
            Contact
          </Link>
        </nav>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex flex-1 max-w-lg mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full h-10 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-50 rounded-lg text-sm text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-1">
          {/* User Account - Logged In */}
          {status === 'authenticated' && session?.user ? (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex h-10 w-10 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <User className="h-5 w-5" />
              </Button>
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                    <p className="text-xs text-gray-500">{session.user.email}</p>
                  </div>
                  <Link
                    href="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    href="/account/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <Link
                    href="/account/addresses"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    Addresses
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* User Account - Not Logged In */}
              <Link href="/login">
                <Button variant="ghost" size="icon" className="hidden md:flex h-10 w-10 rounded-full hover:bg-gray-100 transition-colors text-gray-700">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/register" className="hidden md:block">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold h-10 px-5 rounded-lg transition-colors">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
          
          <Link href="/wishlist" className="hidden sm:block">
            <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:bg-gray-100 transition-colors text-gray-700">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-600 text-white border-0 rounded-full">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
          </Link>
          
          <Button
            variant="ghost"
            size="icon"
            className="relative h-10 w-10 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blue-600 text-white border-0 rounded-full">
                {cartCount}
              </Badge>
            )}
          </Button>

          <MobileMenu />
        </div>
      </div>

      {/* Mobile Quick Search Bar */}
      <div className="px-4 pb-3 md:hidden border-t border-gray-100">
        <form onSubmit={handleSearchSubmit} className="w-full">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-gray-50 rounded-lg text-sm text-gray-900 placeholder:text-gray-500"
            />
          </div>
        </form>
      </div>
    </header>
  );
}


