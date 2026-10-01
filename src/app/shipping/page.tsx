import React from 'react';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

const SHIPPING_ZONES = [
  { zone: 'Lagos State', states: 'Lagos Metro, Ikeja, Lekki, Victoria Island, Yaba', fee: '₦1,500', free: 'Free over ₦15,000', timeline: '1 - 2 Business Days' },
  { zone: 'South West Zone', states: 'Ogun, Oyo, Osun, Ondo, Ekiti', fee: '₦2,000', free: 'Free over ₦20,000', timeline: '2 - 3 Business Days' },
  { zone: 'North Central / Abuja', states: 'Abuja (FCT), Kwara, Niger, Kogi, Plateau', fee: '₦2,500', free: 'Free over ₦25,000', timeline: '3 - 4 Business Days' },
  { zone: 'South East & South South', states: 'Rivers, Edo, Delta, Anambra, Enugu, Abia, Imo', fee: '₦2,500', free: 'Free over ₦25,000', timeline: '3 - 4 Business Days' },
  { zone: 'North East & North West', states: 'Kano, Kaduna, Sokoto, Katsina, Borno, Adamawa', fee: '₦3,000', free: 'Free over ₦30,000', timeline: '4 - 5 Business Days' },
];

export default function ShippingPage() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">Delivery & Logistics</Badge>
          <h1 className="text-4xl font-extrabold text-gray-900">Shipping & Delivery Information</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            We deliver nationwide across Nigeria with speed, doorstep tracking, and secure handling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-2 border-blue-100 bg-blue-50/50">
            <CardContent className="p-6 text-center space-y-2">
              <Truck className="h-8 w-8 text-blue-600 mx-auto" />
              <h3 className="font-bold text-gray-900">Nationwide Delivery</h3>
              <p className="text-xs text-gray-600">Doorstep delivery to all 36 Nigerian states and Abuja.</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 bg-purple-50/50">
            <CardContent className="p-6 text-center space-y-2">
              <Clock className="h-8 w-8 text-purple-600 mx-auto" />
              <h3 className="font-bold text-gray-900">Express Dispatch</h3>
              <p className="text-xs text-gray-600">Orders placed before 12:00 PM are dispatched same-day.</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-100 bg-green-50/50">
            <CardContent className="p-6 text-center space-y-2">
              <ShieldCheck className="h-8 w-8 text-green-600 mx-auto" />
              <h3 className="font-bold text-gray-900">Safe & Insured</h3>
              <p className="text-xs text-gray-600">All packages are carefully packaged & protected.</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            Nigerian Shipping Rates & Timelines
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-lg bg-white">
            <table className="w-full text-left border-collapse text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-4 font-bold text-gray-900">Region</th>
                  <th className="p-4 font-bold text-gray-900">States Covered</th>
                  <th className="p-4 font-bold text-gray-900">Standard Fee</th>
                  <th className="p-4 font-bold text-gray-900">Free Shipping Threshold</th>
                  <th className="p-4 font-bold text-gray-900">Estimated Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {SHIPPING_ZONES.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/80 transition-colors">
                    <td className="p-4 font-bold text-gray-900">{row.zone}</td>
                    <td className="p-4 text-xs text-gray-500">{row.states}</td>
                    <td className="p-4 font-semibold text-gray-900">{row.fee}</td>
                    <td className="p-4"><Badge className="bg-green-100 text-green-700 border-0 text-xs">{row.free}</Badge></td>
                    <td className="p-4 font-medium text-blue-600">{row.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Container>
  );
}
