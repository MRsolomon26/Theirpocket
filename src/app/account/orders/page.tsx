'use client';

import React, { useState } from 'react';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/shared/empty-state';
import { ShoppingBag, Calendar, MapPin, ChevronRight, Package } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <Container className="py-16">
        <div className="text-center">Loading...</div>
      </Container>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  // Mock orders data - in production, this would come from API
  const orders = [
    {
      id: 'TP-20260930-12345',
      date: '2024-09-30',
      status: 'PROCESSING',
      total: 45000,
      items: 3,
      location: 'Lagos (Ikeja)',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'DELIVERED':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Container className="py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Orders</h1>
        <p className="text-gray-500 text-sm mt-1">Track and manage your order history</p>
      </div>

      {orders.length === 0 ? (
        <Card className="border-2 border-dashed border-gray-200">
          <CardContent className="py-16 text-center">
            <EmptyState
              title="No orders yet"
              description="You haven't placed any orders. Start shopping to see your order history here."
              icon={<Package className="h-16 w-16 text-blue-500 mx-auto mb-4" />}
            />
            <div className="mt-6">
              <Button onClick={() => router.push('/products')} className="bg-gradient-to-r from-blue-600 to-purple-600 font-semibold">
                Start Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Card key={order.id} className="border-2 border-gray-100 hover:border-gray-200 transition-all shadow-sm">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{order.id}</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(order.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-t border-b border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Items</p>
                    <p className="font-bold text-gray-900">{order.items}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total</p>
                    <p className="font-bold text-gray-900">₦{order.total.toLocaleString()}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <p className="text-xs text-gray-500 mb-1">Delivery Location</p>
                    <p className="font-bold text-gray-900 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {order.location}
                    </p>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <Button variant="outline" className="border-2 font-semibold">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
