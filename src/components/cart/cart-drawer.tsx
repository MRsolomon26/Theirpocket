'use client';

import React from 'react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartSubtotal, cartCount } = useCart();

  return (
    <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
      <DialogContent className="sm:max-w-md max-w-full h-full md:h-[90vh] md:max-h-[700px] flex flex-col p-0 overflow-hidden rounded-none md:rounded-2xl border-0 md:border">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gray-50/80 backdrop-blur">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <DialogTitle className="text-lg font-bold text-gray-900">Your Shopping Cart</DialogTitle>
            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-0 text-xs">
              {cartCount} {cartCount === 1 ? 'item' : 'items'}
            </Badge>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Cart Items Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="h-20 w-20 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                <ShoppingBag className="h-10 w-10" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Your cart is empty</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Looks like you haven't added anything to your cart yet. Explore our latest fashion arrivals!
                </p>
              </div>
              <Button
                onClick={() => setIsCartOpen(false)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl font-semibold"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
                  )}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={() => setIsCartOpen(false)}
                        className="font-bold text-sm text-gray-900 hover:text-blue-600 truncate block"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors ml-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    {(item.size || item.colour) && (
                      <div className="flex gap-2 text-xs text-gray-500 mt-0.5">
                        {item.size && <span>Size: <strong className="text-gray-700">{item.size}</strong></span>}
                        {item.colour && <span>Colour: <strong className="text-gray-700">{item.colour}</strong></span>}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-sm text-blue-600">{formatPrice(item.price)}</span>

                    {/* Quantity controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="px-2 py-0.5 text-xs font-bold text-gray-800 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-200 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer / Subtotal */}
        {cart.length > 0 && (
          <div className="p-4 border-t bg-gray-50/80 backdrop-blur space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold text-gray-600">
              <span>Subtotal</span>
              <span className="text-lg font-bold text-gray-900">{formatPrice(cartSubtotal)}</span>
            </div>
            <p className="text-xs text-gray-500">Shipping & taxes calculated at checkout.</p>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link href="/cart" onClick={() => setIsCartOpen(false)}>
                <Button variant="outline" className="w-full border-2 font-semibold">
                  View Full Cart
                </Button>
              </Link>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl">
                  Checkout
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
