import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

const orderSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  customerEmail: z.string().email('Valid email is required'),
  customerPhone: z.string().min(10, 'Phone number is required'),
  shippingAddress: z.object({
    streetAddress: z.string().min(5, 'Street address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    country: z.string().default('Nigeria'),
  }),
  paymentMethod: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    variantId: z.string(),
    productName: z.string(),
    variantName: z.string().optional(),
    sku: z.string().optional(),
    quantity: z.number().int().positive(),
    unitPrice: z.number(),
    totalPrice: z.number(),
  })),
  subtotal: z.number(),
  shippingFee: z.number(),
  total: z.number(),
  discountAmount: z.number().optional(),
  couponCode: z.string().optional(),
});

// POST /api/orders - Create order
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const body = await request.json();
    const validatedData = orderSchema.parse(body);

    // Generate order number
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `TP-${dateStr}-${randomNum}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: session?.user?.id || null,
        status: 'PENDING_PAYMENT',
        paymentStatus: 'PENDING',
        subtotal: validatedData.subtotal,
        shippingFee: validatedData.shippingFee,
        total: validatedData.total,
        customerName: validatedData.customerName,
        customerEmail: validatedData.customerEmail,
        customerPhone: validatedData.customerPhone,
        shippingAddress: validatedData.shippingAddress,
        paymentProvider: validatedData.paymentMethod,
        orderItems: {
          create: validatedData.items.map((item) => ({
            variantId: item.variantId,
            productId: item.productId,
            productName: item.productName,
            variantName: item.variantName,
            sku: item.sku,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return NextResponse.json({
      message: 'Order created successfully',
      order,
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
