'use client';

import React from 'react';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Users, AlertTriangle, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Total Revenue', value: '₦4,850,000', change: '+18.4%', icon: DollarSign, color: 'from-green-500 to-emerald-600' },
    { title: 'Total Orders', value: '342', change: '+12.1%', icon: ShoppingBag, color: 'from-blue-500 to-indigo-600' },
    { title: 'Active Customers', value: '1,280', change: '+24.5%', icon: Users, color: 'from-purple-500 to-violet-600' },
    { title: 'Low Stock Items', value: '8 Variants', change: 'Action Needed', icon: AlertTriangle, color: 'from-orange-500 to-red-600' },
  ];

  const recentOrders = [
    { id: 'TP-20260920-84721', customer: 'Amina Bello', location: 'Lagos (Ikeja)', items: 3, total: 34500, status: 'PAID' },
    { id: 'TP-20260920-72109', customer: 'Emeka Okonkwo', location: 'Abuja (FCT)', items: 2, total: 42000, status: 'PROCESSING' },
    { id: 'TP-20260920-61902', customer: 'Tunde Bakare', location: 'Ogun (Abeokuta)', items: 1, total: 18000, status: 'SHIPPED' },
    { id: 'TP-20260920-58912', customer: 'Blessing Paul', location: 'Rivers (Port Harcourt)', items: 4, total: 65000, status: 'PAID' },
  ];


  return (
    <Container className="py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 mb-2">Admin Portal</Badge>
          <h1 className="text-3xl font-extrabold text-gray-900">Platform Analytics Dashboard</h1>
          <p className="text-gray-500 text-sm">Overview of revenue, order lifecycle, customer activity, and stock levels.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/products">
            <Button variant="outline" className="border-2 font-semibold">
              View Storefront
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => {
          const IconComponent = stat.icon;
          return (
            <Card key={idx} className="border-2 border-gray-100 hover:border-gray-200 transition-all shadow-md bg-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <Badge variant="secondary" className="text-xs font-bold bg-gray-100">
                    {stat.change}
                  </Badge>
                </div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.title}</h3>
                <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <Card className="border-2 border-gray-100 shadow-xl bg-white">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Recent Customer Orders</h2>
              <p className="text-xs text-gray-500">Real-time purchase activity across Nigerian states.</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-bold text-gray-900">Order Ref</th>
                  <th className="p-4 font-bold text-gray-900">Customer</th>
                  <th className="p-4 font-bold text-gray-900">Delivery State</th>
                  <th className="p-4 font-bold text-gray-900">Items</th>
                  <th className="p-4 font-bold text-gray-900">Total</th>
                  <th className="p-4 font-bold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {recentOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-bold text-blue-600">{order.id}</td>
                    <td className="p-4 font-semibold text-gray-900">{order.customer}</td>
                    <td className="p-4 text-xs text-gray-600">{order.location}</td>
                    <td className="p-4 font-medium">{order.items}</td>
                    <td className="p-4 font-bold text-gray-900">₦{order.total.toLocaleString()}</td>
                    <td className="p-4">
                      <Badge className="bg-green-100 text-green-700 border-0 text-xs">{order.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </Container>
  );
}
