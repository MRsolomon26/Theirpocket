import { z } from 'zod';

// TODO: Replace with Prisma-generated types once DATABASE_URL is configured
// import type { UserRole, OrderStatus, PaymentStatus, CouponType } from '@prisma/client';

// Temporary enums matching Prisma schema - will be replaced by Prisma types
// These are exported for future use in Phase 4+
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

export enum OrderStatus {
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAID = 'PAID',
  PROCESSING = 'PROCESSING',
  PACKED = 'PACKED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  RETURN_REQUESTED = 'RETURN_REQUESTED',
  RETURNED = 'RETURNED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum CouponType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED',
}

// User validation schemas
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().optional(),
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  phone: z.string().optional(),
});

// Product validation schemas
export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  basePrice: z.number().positive('Price must be positive'),
  isPublished: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  isBestseller: z.boolean().optional(),
  variants: z.array(
    z.object({
      sku: z.string().min(1, 'SKU is required'),
      size: z.string().optional(),
      colour: z.string().optional(),
      price: z.number().positive('Price must be positive'),
      stock: z.number().int().min(0, 'Stock must be non-negative'),
      images: z.array(z.string()).optional(),
    })
  ).min(1, 'At least one variant is required'),
});

export const updateProductSchema = createProductSchema.partial();

// Product variant validation schemas
export const createVariantSchema = z.object({
  productId: z.string().min(1, 'Product is required'),
  sku: z.string().min(1, 'SKU is required'),
  size: z.string().optional(),
  colour: z.string().optional(),
  price: z.number().positive('Price must be positive'),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
  images: z.array(z.string()).optional(),
});

export const updateVariantSchema = createVariantSchema.partial();

// Category validation schemas
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().optional(),
  parentId: z.string().optional(),
  imageUrl: z.string().url('Invalid image URL').optional(),
  sortOrder: z.number().int().optional(),
  isActive: z.boolean().optional(),
});

export const updateCategorySchema = createCategorySchema.partial();

// Order validation schemas
export const createOrderSchema = z.object({
  userId: z.string().optional(),
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(1, 'Phone number is required'),
  shippingAddress: z.object({
    recipientName: z.string().min(1, 'Recipient name is required'),
    phone: z.string().min(1, 'Phone number is required'),
    streetAddress: z.string().min(1, 'Street address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    postalCode: z.string().optional(),
    country: z.string().default('Nigeria'),
  }),
  items: z.array(
    z.object({
      variantId: z.string().min(1, 'Variant is required'),
      quantity: z.number().int().positive('Quantity must be positive'),
    })
  ).min(1, 'At least one item is required'),
  shippingMethod: z.string().optional(),
  shippingZone: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    'PENDING_PAYMENT',
    'PAID',
    'PROCESSING',
    'PACKED',
    'SHIPPED',
    'DELIVERED',
    'PAYMENT_FAILED',
    'CANCELLED',
    'REFUNDED',
    'RETURN_REQUESTED',
    'RETURNED',
  ]),
});

// Address validation schemas
export const createAddressSchema = z.object({
  label: z.string().optional(),
  recipientName: z.string().min(1, 'Recipient name is required'),
  phone: z.string().min(1, 'Phone number is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  postalCode: z.string().optional(),
  country: z.string().default('Nigeria'),
  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();

// Coupon validation schemas
export const createCouponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required'),
  type: z.enum(['PERCENTAGE', 'FIXED']),
  value: z.number().positive('Value must be positive'),
  minOrderValue: z.number().positive().optional(),
  maxUses: z.number().int().positive().optional(),
  validFrom: z.date().optional(),
  validUntil: z.date().optional(),
  isActive: z.boolean().optional(),
});

export const updateCouponSchema = createCouponSchema.partial();

// Shipping zone validation schemas
export const createShippingZoneSchema = z.object({
  name: z.string().min(1, 'Zone name is required'),
  states: z.array(z.string()).min(1, 'At least one state is required'),
  baseFee: z.number().positive('Base fee must be positive'),
  freeShippingThreshold: z.number().positive().optional(),
  estimatedDays: z.number().int().positive().optional(),
  isActive: z.boolean().optional(),
});

export const updateShippingZoneSchema = createShippingZoneSchema.partial();

// Cart validation schemas
export const addToCartSchema = z.object({
  variantId: z.string().min(1, 'Variant is required'),
  quantity: z.number().int().positive('Quantity must be positive'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive('Quantity must be positive'),
});

// Search and filter validation schemas
export const searchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  size: z.string().optional(),
  colour: z.string().optional(),
  sortBy: z.enum(['price-asc', 'price-desc', 'popularity', 'newest']).optional(),
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().max(100).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
