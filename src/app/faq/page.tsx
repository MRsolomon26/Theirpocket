import React from 'react';
import { Container } from '@/components/layout/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How long does delivery take within Nigeria?',
    a: 'Deliveries within Lagos take 1-2 business days. Deliveries to South West states take 2-3 days, while Abuja and other states take 3-5 business days.'
  },
  {
    q: 'How do I pay for my order?',
    a: 'We accept Paystack (Debit Cards, USSD, Bank Transfer), direct bank transfers to GTBank/Zenith Bank, and Pay on Delivery for select Lagos orders.'
  },
  {
    q: 'Can I track my order status?',
    a: 'Yes! As soon as your order is dispatched, you will receive an SMS and email notification with your tracking code.'
  },
  {
    q: 'What if I order the wrong size?',
    a: 'Don’t worry! We offer a 30-day exchange policy. Simply contact our support team to exchange your item for the correct size.'
  },
  {
    q: 'Are your fashion items authentic and high quality?',
    a: '100% yes! All clothing, shoes, watches, and accessories are direct-from-manufacturer quality checked before shipping.'
  },
];

export default function FAQPage() {
  return (
    <Container className="py-12">
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">Help Center</Badge>
          <h1 className="text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600">Find answers to common questions about shopping, shipping, sizes, and payments at Theirpocket.</p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <Card key={index} className="border-2 border-gray-100 hover:border-blue-200 transition-all shadow-sm">
              <CardContent className="p-6 space-y-2">
                <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed pl-7">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
}
