'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/cart-context';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, ShieldCheck, CreditCard, CheckCircle2, Lock, ArrowLeft, MapPin, Phone, User, Mail, Truck, Package, ChevronDown, Search } from 'lucide-react';
import { toast } from 'sonner';

const NIGERIAN_STATES = [
  { name: 'Lagos', zone: 'Lagos', fee: 1500, freeThreshold: 15000, days: '1-2 Days' },
  { name: 'Ogun', zone: 'South West', fee: 2000, freeThreshold: 20000, days: '2-3 Days' },
  { name: 'Oyo', zone: 'South West', fee: 2000, freeThreshold: 20000, days: '2-3 Days' },
  { name: 'Osun', zone: 'South West', fee: 2000, freeThreshold: 20000, days: '2-3 Days' },
  { name: 'Ondo', zone: 'South West', fee: 2000, freeThreshold: 20000, days: '2-3 Days' },
  { name: 'Ekiti', zone: 'South West', fee: 2000, freeThreshold: 20000, days: '2-3 Days' },
  { name: 'Abuja (FCT)', zone: 'North Central', fee: 2500, freeThreshold: 25000, days: '3-4 Days' },
  { name: 'Rivers', zone: 'South South', fee: 2500, freeThreshold: 25000, days: '3-4 Days' },
  { name: 'Anambra', zone: 'South East', fee: 2500, freeThreshold: 25000, days: '3-4 Days' },
  { name: 'Enugu', zone: 'South East', fee: 2500, freeThreshold: 25000, days: '3-4 Days' },
  { name: 'Kano', zone: 'North West', fee: 3000, freeThreshold: 30000, days: '4-5 Days' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, clearCart } = useCart();
  const stateInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: 'Lagos',
  });

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'card' | 'flutterwave' | 'transfer'>('paystack');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateSearchQuery, setStateSearchQuery] = useState('');
  const [showStateDropdown, setShowStateDropdown] = useState(false);

  const filteredStates = NIGERIAN_STATES.filter(state => 
    state.name.toLowerCase().includes(stateSearchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowStateDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedStateObj = NIGERIAN_STATES.find((s) => s.name === formData.state) || NIGERIAN_STATES[0];
  const shippingFee = cartSubtotal >= selectedStateObj.freeThreshold ? 0 : selectedStateObj.fee;
  const discountAmount = (cartSubtotal * discountPercent) / 100;
  const totalAmount = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME10') {
      setDiscountPercent(10);
      toast.success('Coupon WELCOME10 applied! (10% OFF)');
    } else if (code === 'VIP20') {
      setDiscountPercent(20);
      toast.success('Coupon VIP20 applied! (20% OFF)');
    } else {
      toast.error('Invalid promo code. Try WELCOME10');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone || !formData.streetAddress || !formData.city) {
      toast.error('Please fill in all required shipping fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: {
            streetAddress: formData.streetAddress,
            city: formData.city,
            state: formData.state,
            country: 'Nigeria',
          },
          paymentMethod,
          items: cart.map((item) => ({
            productId: item.productId,
            variantId: item.variantId || 'default',
            productName: item.name,
            variantName: item.size || item.colour,
            quantity: item.quantity,
            unitPrice: item.price,
            totalPrice: item.price * item.quantity,
          })),
          subtotal: cartSubtotal,
          shippingFee,
          total: totalAmount,
          discountAmount,
          couponCode: couponCode || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      clearCart();
      toast.success('Order placed successfully!');
      router.push(`/checkout/success/${data.orderNumber}`);
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Container className="py-16 text-center">
        <div className="max-w-md mx-auto space-y-4">
          <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="text-gray-500 text-sm">Add items to your cart before checking out.</p>
          <Button onClick={() => router.push('/products')} className="bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Explore Products
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Container className="py-8">
        {/* Checkout Header */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-500 mt-1">Complete your order by providing shipping and payment details</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">1</div>
              <span className="ml-2 text-sm font-medium text-gray-900">Shipping</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200" />
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">2</div>
              <span className="ml-2 text-sm font-medium text-gray-900">Payment</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-200" />
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-sm font-semibold">3</div>
              <span className="ml-2 text-sm font-medium text-gray-500">Complete</span>
            </div>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Shipping & Payment Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* Shipping Address Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Full Name *</label>
                    <div className="relative">
                      <User className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                      <Input
                        required
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="pl-10 h-11 border-gray-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                      <Input
                        required
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10 h-11 border-gray-300"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="h-4 w-4 text-gray-400 absolute left-3 top-3" />
                    <Input
                      required
                      placeholder="+234 800 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10 h-11 border-gray-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Street Address *</label>
                  <textarea
                    required
                    placeholder="House number, street name, landmark, additional directions"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className="w-full min-h-[100px] px-3 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">City / Local Govt *</label>
                    <Input
                      required
                      placeholder="Ikeja, Lekki, Yaba, etc."
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="h-11 border-gray-300"
                    />
                  </div>

                  <div className="relative" ref={dropdownRef}>
                    <label className="text-sm font-medium text-gray-700 block mb-2">State *</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        ref={stateInputRef}
                        required
                        placeholder="Search state..."
                        value={stateSearchQuery || formData.state}
                        onChange={(e) => {
                          setStateSearchQuery(e.target.value);
                          setShowStateDropdown(true);
                        }}
                        onFocus={() => setShowStateDropdown(true)}
                        className="pl-10 h-11 border-gray-300 pr-10"
                      />
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                    {showStateDropdown && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                        {filteredStates.length > 0 ? (
                          filteredStates.map((state) => (
                            <button
                              key={state.name}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, state: state.name });
                                setStateSearchQuery('');
                                setShowStateDropdown(false);
                              }}
                              className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 transition-colors ${
                                formData.state === state.name ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-900'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span>{state.name}</span>
                                <span className="text-xs text-gray-500">{state.days}</span>
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500">No states found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {/* Paystack Option */}
                  <label
                    onClick={() => setPaymentMethod('paystack')}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === 'paystack'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-opacity-20'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm overflow-hidden">
                        <div className="flex items-center gap-1 px-2">
                          <div className="h-6 w-1 bg-blue-600 rounded-full" />
                          <div className="h-6 w-1 bg-green-500 rounded-full" />
                          <div className="h-6 w-1 bg-yellow-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Paystack</h4>
                        <p className="text-xs text-gray-500">Card, Transfer, USSD, QR</p>
                      </div>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'paystack' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'paystack' && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                  </label>

                  {/* Flutterwave Option */}
                  <label
                    onClick={() => setPaymentMethod('flutterwave')}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === 'flutterwave'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-opacity-20'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded-lg bg-white border border-gray-200 flex items-center justify-center shadow-sm overflow-hidden">
                        <div className="flex items-center gap-1 px-2">
                          <div className="h-6 w-1 bg-orange-500 rounded-full" />
                          <div className="h-6 w-1 bg-blue-500 rounded-full" />
                          <div className="h-6 w-1 bg-cyan-400 rounded-full" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Flutterwave</h4>
                        <p className="text-xs text-gray-500">Card, Bank Transfer, Barter</p>
                      </div>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'flutterwave' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'flutterwave' && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                  </label>

                  {/* Card Payment Option */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-opacity-20'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center shadow-sm">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Credit/Debit Card</h4>
                        <p className="text-xs text-gray-500">Visa, Mastercard, Verve</p>
                      </div>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'card' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'card' && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                  </label>

                  {/* Bank Transfer Option */}
                  <label
                    onClick={() => setPaymentMethod('transfer')}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      paymentMethod === 'transfer'
                        ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-opacity-20'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 rounded-lg bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center shadow-sm">
                        <div className="text-white font-bold text-xs text-center leading-tight">
                          BANK<br/>TRANSFER
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm text-gray-900">Bank Transfer</h4>
                        <p className="text-xs text-gray-500">Direct bank payment</p>
                      </div>
                    </div>
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      paymentMethod === 'transfer' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                    }`}>
                      {paymentMethod === 'transfer' && <CheckCircle2 className="h-3 w-3 text-white" />}
                    </div>
                  </label>
                </div>

                {/* Payment Gateway Info */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 mb-1">Secure Payment</p>
                      <p className="text-gray-600 text-xs">All transactions are encrypted and secure. We support major Nigerian payment gateways including Paystack, Flutterwave, and direct bank transfers.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        {/* Right Column: Order Items & Summary */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border border-gray-200 shadow-sm sticky top-6">
            <CardHeader className="bg-gray-50 border-b">
              <CardTitle className="text-lg font-semibold">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Order Items */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900">Items ({cart.length})</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                      <div className="h-16 w-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border">
                        {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.quantity} × {formatPrice(item.price)}
                        </p>
                        {item.size && (
                          <p className="text-xs text-gray-400">Size: {item.size}</p>
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Coupon Code */}
              <div className="border-t pt-4">
                <label className="text-sm font-medium text-gray-700 block mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="uppercase h-10 border-gray-300"
                  />
                  <Button type="button" onClick={handleApplyCoupon} variant="outline" className="h-10 border-gray-300">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(cartSubtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Discount</span>
                    <span className="font-medium text-green-600">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  {shippingFee === 0 ? (
                    <span className="font-medium text-green-600">FREE</span>
                  ) : (
                    <span className="font-medium text-gray-900">{formatPrice(shippingFee)}</span>
                  )}
                </div>

                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-base font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold h-12 text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Lock className="h-4 w-4" />
                    Place Order
                  </span>
                )}
              </Button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Truck className="h-4 w-4 text-blue-600" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </Container>
    </div>
  );
}
