'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Truck, Package, ArrowRight, Home } from 'lucide-react';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderNumber = params?.orderNumber as string || 'TP-ORDER-SUCCESS';

  return (
    <Container className="py-16">
      <Card className="max-w-2xl mx-auto border-2 border-green-100 shadow-2xl bg-white overflow-hidden rounded-3xl">
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 p-8 text-center text-white relative">
          <div className="h-20 w-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/40 shadow-xl">
            <CheckCircle className="h-12 w-12 text-white" />
          </div>
          <Badge className="bg-white/20 text-white border-white/30 mb-2">Order Confirmed</Badge>
          <h1 className="text-3xl font-extrabold mb-1">Thank You For Your Order!</h1>
          <p className="text-white/90 text-sm">We've received your order and are preparing it for shipment.</p>
        </div>

        <CardContent className="p-8 space-y-6">
          <div className="bg-gray-50 rounded-2xl p-4 border flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <span className="text-xs text-gray-500 font-semibold block uppercase">Order Reference Number</span>
              <span className="text-lg font-black text-blue-600 tracking-wider">{orderNumber}</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1 font-bold text-xs">
              Status: Processing
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-gray-100 bg-blue-50/50 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Truck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-900">Estimated Delivery</h4>
                <p className="text-xs text-gray-600 font-medium">1 - 3 Business Days</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-100 bg-purple-50/50 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
                <Package className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-900">Tracking Code</h4>
                <p className="text-xs text-gray-600 font-medium">SMS & Email Confirmation Sent</p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full border-2 font-bold py-5">
                <Home className="h-4 w-4 mr-2" />
                Return to Home
              </Button>
            </Link>
            <Link href="/products" className="flex-1">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-5 shadow-lg">
                Continue Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
