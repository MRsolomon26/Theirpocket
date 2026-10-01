'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { EmptyState } from '@/components/shared/empty-state';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Tag, ShieldCheck, Truck } from 'lucide-react';
import { toast } from 'sonner';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartSubtotal, cartCount } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'WELCOME10') {
      setDiscountPercent(10);
      setAppliedCoupon('WELCOME10');
      toast.success('Coupon WELCOME10 applied! 10% discount subtracted.');
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
      setAppliedCoupon('VIP20');
      toast.success('Coupon VIP20 applied! 20% discount subtracted.');
    } else {
      toast.error('Invalid coupon code. Try WELCOME10 for 10% off!');
    }
  };

  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const estimatedShipping = cartSubtotal > 15000 || cartSubtotal === 0 ? 0 : 2000;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + estimatedShipping);

  return (
    <Container className="py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 text-sm mt-1">
          {cartCount === 0
            ? 'Your shopping cart is currently empty.'
            : `Review your ${cartCount} item${cartCount > 1 ? 's' : ''} before proceeding to checkout.`}
        </p>
      </div>

      {cart.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="py-16 text-center">
            <EmptyState
              title="Your cart is empty"
              description="Explore our latest collections and find quality fashion pieces at affordable prices."
              icon={<ShoppingBag className="h-16 w-16 text-blue-500 mx-auto mb-4" />}
            />
            <div className="mt-6">
              <Link href="/products">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Explore Products
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Item List */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-gray-200">
              <span className="text-sm font-semibold text-gray-900">Product Items ({cart.length})</span>
              <button
                onClick={clearCart}
                className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-3">
              {cart.map((item) => (
                <Card key={item.id} className="overflow-hidden border border-gray-200 hover:border-gray-300 transition-all">
                  <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4">
                    {/* Item Thumbnail */}
                    <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>
                      )}
                    </div>

                    {/* Item Specs & Title */}
                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <Link href={`/products/${item.slug}`} className="font-semibold text-sm text-gray-900 hover:text-blue-600 transition-colors block truncate">
                        {item.name}
                      </Link>
                      {item.category && <p className="text-xs text-gray-500 mt-0.5">{item.category}</p>}
                      
                      {(item.size || item.colour) && (
                        <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                          {item.size && (
                            <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                              Size: {item.size}
                            </Badge>
                          )}
                          {item.colour && (
                            <Badge variant="outline" className="text-xs border-gray-300 text-gray-700">
                              Colour: {item.colour}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 border-t sm:border-t-0 pt-3 sm:pt-0">
                      <span className="font-semibold text-base text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium text-gray-900 min-w-[32px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="pt-4 flex justify-between items-center">
              <Link href="/products">
                <Button variant="outline" className="border border-gray-300 font-medium h-10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="border border-gray-200 shadow-sm sticky top-20">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

                {/* Promo Coupon Form */}
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 block">Promo Code</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="e.g. WELCOME10"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="uppercase text-sm h-10 border-gray-300"
                    />
                    <Button type="submit" variant="outline" className="h-10 border-gray-300">
                      Apply
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                      Coupon {appliedCoupon} (-{discountPercent}%) Applied
                    </Badge>
                  )}
                </form>

                {/* Subtotal Calculations */}
                <div className="space-y-3 text-sm border-t pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">{formatPrice(cartSubtotal)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    {estimatedShipping === 0 ? (
                      <span className="font-medium text-green-600">FREE</span>
                    ) : (
                      <span className="font-medium text-gray-900">{formatPrice(estimatedShipping)}</span>
                    )}
                  </div>

                  <div className="border-t pt-3 flex justify-between items-center">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-gray-900">{formatPrice(finalTotal)}</span>
                  </div>
                </div>

                {/* Checkout Link */}
                <Link href="/checkout">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>

                {/* Value Props */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t text-xs text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-green-600" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </Container>
  );
}
