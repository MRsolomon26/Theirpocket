import React from 'react';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ReturnsPage() {
  return (
    <Container className="py-12">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">30-Day Guarantee</Badge>
          <h1 className="text-4xl font-extrabold text-gray-900">Returns & Refund Policy</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Your satisfaction is our priority. If you're not completely happy with your purchase, we're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 border-green-100 bg-white shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="h-10 w-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center font-bold">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Eligible for Return</h3>
              <ul className="space-y-2 text-xs text-gray-600 list-disc list-inside">
                <li>Items returned within 30 days of delivery.</li>
                <li>Unworn, unwashed, and undamaged items with original tags attached.</li>
                <li>Defective or wrong items sent by mistake.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-100 bg-white shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="h-10 w-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center font-bold">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Non-Returnable Items</h3>
              <ul className="space-y-2 text-xs text-gray-600 list-disc list-inside">
                <li>Intimate apparel, boxers, and underwear (for hygiene reasons).</li>
                <li>Items marked as Final Sale or Clearance.</li>
                <li>Items returned without original packaging or tags.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-8 text-center space-y-4">
            <RefreshCw className="h-10 w-10 text-blue-600 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900">Need to Initiate a Return?</h2>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Contact our support team with your order reference number and reason for return. We'll arrange pickup or provide return location details.
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold">
                Contact Customer Support
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
