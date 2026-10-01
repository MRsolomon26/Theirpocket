import React from 'react';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <Badge className="bg-gradient-to-r from-green-600 to-teal-600 text-white border-0">Data Protection</Badge>
          <h1 className="text-4xl font-extrabold text-gray-900">Privacy Policy</h1>
          <p className="text-gray-600">Your privacy and security are paramount. Learn how we handle and protect your personal information.</p>
        </div>

        <Card className="border-2 border-gray-100 shadow-xl bg-white">
          <CardContent className="p-8 space-y-6 text-sm text-gray-700 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                1. Information We Collect
              </h2>
              <p>When you create an account or place an order, we collect information including your name, email address, phone number, and delivery shipping address in Nigeria.</p>
            </section>

            <section className="space-y-2 border-t pt-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                2. How We Use Your Data
              </h2>
              <p>We use your information strictly to process orders, communicate delivery updates, send payment confirmations, and improve your shopping experience. We never sell or lease customer data.</p>
            </section>

            <section className="space-y-2 border-t pt-4">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                3. Payment Security
              </h2>
              <p>Card and bank payments are processed securely via Paystack with 256-bit SSL encryption. Theirpocket does not store raw credit card numbers or banking passwords.</p>
            </section>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
