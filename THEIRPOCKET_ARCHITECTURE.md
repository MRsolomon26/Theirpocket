# THEIRPOCKET — FINAL TECHNICAL ARCHITECTURE & DEVELOPMENT ROADMAP

**Document Version:** 2.0  
**Date:** September 20, 2026  
**Status:** Phase 1 Complete - Product Catalogue & Visual Design  
**Target:** Production E-Commerce Platform for Nigerian Fashion Market

---

## DOCUMENT UPDATE LOG
- **v1.0 (Sept 16, 2026):** Initial architecture planning
- **v2.0 (Sept 20, 2026):** Updated to reflect Phase 1 completion - Product catalogue, visual design, and enhanced UI implemented

---

## EXECUTIVE SUMMARY

Theirpocket is a professional fashion e-commerce platform designed for the Nigerian market, selling clothing, shoes, watches, bags, and accessories. The platform must be mobile-first, fast, secure, and capable of scaling toward 1M+ registered users without premature over-engineering.

**Core Philosophy:** Simple on the surface. Powerful underneath.

---

## 1. PRODUCT ARCHITECTURE

### Business Model
- **Type:** Direct-to-consumer fashion e-commerce
- **Target Market:** Nigeria (with potential for regional expansion)
- **Value Proposition:** Quality fashion at affordable prices
- **Brand Positioning:** Professional, modern, clean, trustworthy, fashion-focused

### Product Categories
1. **Clothing** - T-shirts, polos, shirts, hoodies, trousers, jeans, shorts, joggers, jackets, native wear, two-piece outfits, singlets, boxers, underwear, caps
2. **Shoes** - Sneakers, slides, sandals, loafers, formal shoes, boots
3. **Watches** - Fashion watches, classic watches, everyday watches
4. **Bags** - Backpacks, crossbody bags, waist bags, handbags, laptop bags
5. **Accessories** - Sunglasses, bracelets, chains, rings, wallets, belts, caps, other wearables

### Core User Flows
1. **Browse** → Homepage → Categories → Products
2. **Search** → Search results → Filters → Products
3. **Product** → Product detail → Add to cart
4. **Cart** → Cart review → Checkout
5. **Checkout** → Guest or logged in → Delivery → Payment → Confirmation
6. **Account** → Order history → Profile → Addresses
7. **Admin** → Dashboard → Products/Orders/Inventory/Customers

---

## 2. RECOMMENDED TECHNOLOGY STACK

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (selectively, where useful)
- **Icons:** Lucide React
- **State Management:** React Context + Server Components (initially), Zustand if needed
- **Forms:** React Hook Form + Zod validation
- **Data Fetching:** Next.js built-in fetch, Server Actions for mutations

### Backend
- **Architecture:** Next.js API Routes + Server Actions (monolithic initially)
- **Runtime:** Node.js
- **API Layer:** Next.js Route Handlers
- **Validation:** Zod
- **Authentication:** NextAuth.js v5 (Auth.js)
- **Background Jobs:** Vercel Cron Jobs or separate Node.js service if needed

### Database
- **Primary:** PostgreSQL (Supabase or Neon for managed hosting)
- **ORM:** Prisma
- **Caching:** Redis (Upstash for managed Redis) - introduced where value is proven
- **Search:** PostgreSQL full-text search initially, upgrade to Meilisearch/Algolia when justified

### Storage & CDN
- **Images:** Cloudinary (recommended) or S3-compatible storage + CloudFront CDN
- **Static Assets:** Vercel Edge Network

### Payment
- **Primary:** Paystack (Nigeria-focused)
- **Secondary:** Flutterwave (for flexibility)
- **Abstraction:** Custom payment service interface for provider switching

### Monitoring & Analytics
- **Error Tracking:** Sentry
- **Analytics:** Google Analytics 4 + custom event tracking
- **Performance:** Vercel Analytics + Web Vitals
- **Uptime:** UptimeRobot or similar

### Deployment
- **Platform:** Vercel (recommended for Next.js)
- **Database:** Supabase or Neon
- **Redis:** Upstash
- **CI/CD:** Vercel Git integration

---

## 3. FRONTEND ARCHITECTURE

### Design Principles
- **Mobile-First:** Design for small screens first, enhance for larger screens
- **Component-Driven:** Reusable, composable components
- **Server-First:** Use Server Components by default, Client Components only when necessary
- **Performance-First:** Optimize for Core Web Vitals

### Directory Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth group
│   ├── (shop)/            # Shop group
│   ├── (admin)/           # Admin group
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── product/          # Product components
│   ├── cart/             # Cart components
│   └── admin/            # Admin components
├── lib/                   # Utilities
│   ├── db.ts             # Database client
│   ├── auth.ts           # Auth configuration
│   ├── validations.ts    # Zod schemas
│   └── utils.ts          # Helper functions
├── types/                 # TypeScript types
├── hooks/                 # Custom React hooks
└── styles/                # Global styles
```

### Component Architecture
- **Server Components:** Product listings, category pages, checkout forms
- **Client Components:** Cart drawer, mobile menu, image galleries, interactive filters
- **Shared Components:** Buttons, cards, inputs, modals

### State Management Strategy
- **Server State:** Server Components + React Cache
- **Client State:** React Context for cart, user session
- **Form State:** React Hook Form
- **URL State:** Search params for filters, sorting

### Performance Strategy
- **Code Splitting:** Automatic via Next.js App Router
- **Image Optimization:** Next.js Image component with Cloudinary
- **Font Optimization:** Next.js Font optimization
- **Lazy Loading:** Dynamic imports for non-critical components
- **Bundle Size:** Tree-shaking, avoid unnecessary dependencies

---

## 4. BACKEND ARCHITECTURE

### Architecture Decision: Monolithic Next.js
**Rationale:**
- Single codebase reduces complexity
- Server Actions provide seamless frontend-backend integration
- Easier deployment and maintenance
- Can extract services later if needed
- Adequate for projected scale (1M+ registered users ≠ 1M concurrent)

### API Design
- **RESTful API:** Standard REST conventions
- **Server Actions:** For mutations (cart, checkout, auth)
- **Validation:** Zod schemas on all inputs
- **Error Handling:** Consistent error responses
- **Rate Limiting:** Per-IP and per-user limits

### API Structure
```
/api/
├── auth/              # Authentication endpoints
├── products/          # Product CRUD
├── categories/        # Category management
├── cart/              # Cart operations
├── orders/            # Order management
├── payments/          # Payment webhooks
├── inventory/         # Inventory operations
├── admin/             # Admin operations
└── webhooks/          # External webhooks
```

### Background Jobs
- **Order processing:** Async order status updates
- **Email sending:** Queue for transactional emails
- **Inventory sync:** Background stock updates
- **Analytics:** Async event aggregation

### Service Layer Pattern
```typescript
// Example service structure
services/
├── productService.ts
├── orderService.ts
├── paymentService.ts
├── inventoryService.ts
├── shippingService.ts
└── emailService.ts
```

---

## 5. DATABASE ARCHITECTURE

### Database Choice: PostgreSQL
**Rationale:**
- ACID compliance for transaction integrity
- Excellent for e-commerce with complex relationships
- Strong JSON support for flexible schemas
- Mature ecosystem and tooling
- Scalable to millions of records
- Full-text search capabilities

### Core Tables

#### Users
```sql
users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  phone VARCHAR(20),
  role ENUM('customer', 'staff', 'admin', 'super_admin'),
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
)
```

#### Products
```sql
products (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  base_price DECIMAL(10,2) NOT NULL,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_bestseller BOOLEAN DEFAULT false,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
)
```

#### Product Variants
```sql
product_variants (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  sku VARCHAR(100) UNIQUE NOT NULL,
  size VARCHAR(50),
  colour VARCHAR(50),
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER DEFAULT 0,
  weight DECIMAL(10,2),
  images JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### Categories
```sql
categories (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES categories(id),
  image_url VARCHAR(500),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### Inventory
```sql
inventory (
  id UUID PRIMARY KEY,
  variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER NOT NULL DEFAULT 0,
  reserved_quantity INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 10,
  last_restocked_at TIMESTAMP,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### Inventory Transactions
```sql
inventory_transactions (
  id UUID PRIMARY KEY,
  variant_id UUID REFERENCES product_variants(id),
  type ENUM('purchase', 'sale', 'adjustment', 'return'),
  quantity INTEGER NOT NULL,
  previous_quantity INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  reason TEXT,
  order_id UUID REFERENCES orders(id),
  performed_by UUID REFERENCES users(id),
  created_at TIMESTAMP
)
```

#### Orders
```sql
orders (
  id UUID PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID REFERENCES users(id),
  status ENUM('pending_payment', 'paid', 'processing', 'packed', 'shipped', 'delivered', 'payment_failed', 'cancelled', 'refunded', 'return_requested', 'returned'),
  payment_status ENUM('pending', 'paid', 'failed', 'refunded'),
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_fee DECIMAL(10,2) NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'NGN',
  
  -- Customer info
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  
  -- Shipping info
  shipping_address JSONB NOT NULL,
  shipping_method VARCHAR(100),
  shipping_zone VARCHAR(100),
  estimated_delivery DATE,
  
  -- Payment info
  payment_provider VARCHAR(50),
  payment_reference VARCHAR(255),
  paid_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  deleted_at TIMESTAMP
)
```

#### Order Items
```sql
order_items (
  id UUID PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  variant_id UUID REFERENCES product_variants(id),
  product_name VARCHAR(255) NOT NULL,
  variant_name VARCHAR(255),
  sku VARCHAR(100),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP
)
```

#### Addresses
```sql
addresses (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  label VARCHAR(100),
  recipient_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  street_address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Nigeria',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### Cart
```sql
cart_items (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  session_id VARCHAR(255),
  variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### Coupons
```sql
coupons (
  id UUID PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  type ENUM('percentage', 'fixed'),
  value DECIMAL(10,2) NOT NULL,
  min_order_value DECIMAL(10,2),
  max_uses INTEGER,
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### Shipping Zones
```sql
shipping_zones (
  id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  states JSONB NOT NULL,
  base_fee DECIMAL(10,2) NOT NULL,
  free_shipping_threshold DECIMAL(10,2),
  estimated_days INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### Audit Logs
```sql
audit_logs (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  action VARCHAR(255) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP
)
```

#### Analytics Events
```sql
analytics_events (
  id UUID PRIMARY KEY,
  session_id VARCHAR(255),
  user_id UUID REFERENCES users(id),
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP
)
```

### Indexes
- **Products:** slug, category_id, is_published, is_featured
- **Variants:** sku, product_id, (product_id, size, colour)
- **Orders:** user_id, status, order_number, created_at
- **Inventory:** variant_id
- **Analytics:** event_type, created_at, user_id

### Relationships
- Users → Orders (one-to-many)
- Users → Addresses (one-to-many)
- Users → Cart (one-to-many)
- Products → Variants (one-to-many)
- Variants → Inventory (one-to-one)
- Variants → Order Items (one-to-many)
- Orders → Order Items (one-to-many)
- Categories → Products (one-to-many)

---

## 6. PRODUCT/VARIANT ARCHITECTURE

### Product Model
```
Product (Base Information)
├── id, name, slug, description
├── category_id
├── base_price
├── is_published, is_featured, is_bestseller
└── variants (Array)
    ├── Variant 1
    │   ├── sku
    │   ├── size (e.g., "M", "L", "XL")
    │   ├── colour (e.g., "Black", "White")
    │   ├── price (can differ from base)
    │   ├── stock
    │   ├── images (array of URLs)
    │   └── is_active
    ├── Variant 2
    └── Variant 3
```

### Variant Strategy
- **Size:** Standardized sizes (S, M, L, XL, XXL for clothes; 40, 41, 42 for shoes)
- **Colour:** Standardized colour names with hex codes
- **SKU:** Auto-generated or manual (e.g., TSH-BLK-M-001)
- **Pricing:** Variant-specific pricing allowed (different sizes may have different prices)
- **Images:** Variant-specific images, fallback to product images

### Inventory per Variant
- Each variant has independent stock
- Stock reservations during checkout
- Real-time stock validation
- Low stock alerts per variant

### Example: Oversized T-Shirt
```
Product: Oversized T-Shirt
Base Price: ₦8,500

Variants:
- Black / M (SKU: TSH-OV-BLK-M) | Price: ₦8,500 | Stock: 15
- Black / L (SKU: TSH-OV-BLK-L) | Price: ₦8,500 | Stock: 8
- Black / XL (SKU: TSH-OV-BLK-XL) | Price: ₦9,000 | Stock: 3
- White / M (SKU: TSH-OV-WHT-M) | Price: ₦8,500 | Stock: 11
- White / L (SKU: TSH-OV-WHT-L) | Price: ₦8,500 | Stock: 6
```

---

## 7. INVENTORY ARCHITECTURE

### Core Principles
1. **Single Source of Truth:** Database is the authoritative inventory source
2. **Transactional Integrity:** All stock changes in database transactions
3. **Audit Trail:** Every stock change logged
4. **Prevent Overselling:** Stock reservation during checkout
5. **Real-time Validation:** Stock checked before order completion

### Stock Flow
```
Initial Stock → Add to Inventory
              ↓
Customer Adds to Cart → Reserve Stock (optional)
              ↓
Payment Successful → Deduct Stock
              ↓
Payment Failed → Release Reserved Stock
              ↓
Order Cancelled → Return Stock
              ↓
Order Returned → Return Stock
```

### Stock Reservation Strategy (V1)
- **Simple Approach:** Check stock at checkout, deduct on payment success
- **No Complex Reservations:** Avoid race conditions with simple transaction
- **Optimistic Locking:** Use database row locking during payment processing

### Stock Transaction Types
- **PURCHASE:** New stock added
- **SALE:** Stock sold (deducted)
- **ADJUSTMENT:** Manual correction
- **RETURN:** Stock returned from customer

### Low Stock Alerts
- Threshold per variant (default: 10)
- Admin dashboard alerts
- Email notifications for critical items

### Inventory Management (Admin)
- View current stock by variant
- Manual stock adjustments
- Bulk stock updates
- Stock history view
- Low stock report

---

## 8. ORDER ARCHITECTURE

### Order Lifecycle State Machine
```
PENDING_PAYMENT
    ↓ (payment successful)
PAID
    ↓ (order confirmed)
PROCESSING
    ↓ (items packed)
PACKED
    ↓ (shipped)
SHIPPED
    ↓ (delivered)
DELIVERED

Alternative States:
- PAYMENT_FAILED (from PENDING_PAYMENT)
- CANCELLED (from PENDING_PAYMENT, PAID, PROCESSING)
- REFUNDED (from PAID, PROCESSING, PACKED, SHIPPED)
- RETURN_REQUESTED (from DELIVERED)
- RETURNED (from RETURN_REQUESTED)
```

### Order Creation Flow
```
1. Customer initiates checkout
2. Validate cart items (stock, price, variants)
3. Create order with status: PENDING_PAYMENT
4. Initialize payment
5. Customer completes payment
6. Webhook received: verify payment
7. If verified: update status to PAID, deduct stock
8. If failed: update status to PAYMENT_FAILED
9. Send confirmation email
```

### Order Number Generation
- Format: TP-YYYYMMDD-XXXXX (e.g., TP-20240916-00001)
- Sequential per day
- Unique constraint

### Idempotency
- Payment reference used as idempotency key
- Prevent duplicate order creation
- Handle webhook retries safely

### Order Status Transitions
```typescript
const validTransitions = {
  pending_payment: ['paid', 'payment_failed', 'cancelled'],
  paid: ['processing', 'cancelled', 'refunded'],
  processing: ['packed', 'cancelled', 'refunded'],
  packed: ['shipped', 'cancelled', 'refunded'],
  shipped: ['delivered', 'refunded'],
  delivered: ['return_requested'],
  payment_failed: ['cancelled'],
  cancelled: [],
  refunded: [],
  return_requested: ['returned'],
  returned: []
}
```

---

## 9. PAYMENT ARCHITECTURE

### Payment Providers (Nigeria Focus)
- **Primary:** Paystack
- **Secondary:** Flutterwave
- **Future:** Interswitch, others

### Payment Abstraction Layer
```typescript
interface PaymentProvider {
  initializePayment(data: PaymentInitData): Promise<PaymentResponse>;
  verifyPayment(reference: string): Promise<PaymentVerification>;
  processRefund(transactionId: string, amount: number): Promise<RefundResponse>;
}

class PaystackProvider implements PaymentProvider { }
class FlutterwaveProvider implements PaymentProvider { }
```

### Payment Flow
```
1. Customer clicks "Pay"
2. Server creates order (PENDING_PAYMENT)
3. Server initializes payment with provider
4. Provider returns payment URL/checkout
5. Customer redirected to provider checkout
6. Customer completes payment
7. Provider redirects back to Theirpocket
8. Provider sends webhook to Theirpocket
9. Theirpocket verifies payment server-side
10. If verified: update order to PAID, deduct stock, send email
11. If failed: updateOrder to PAYMENT_FAILED
```

### Security Requirements
- **Never trust client-side payment success**
- **Always verify server-side via provider API**
- **Verify payment amount matches order total**
- **Use webhook signatures for verification**
- **Implement idempotency for webhook retries**
- **Store only non-sensitive data (reference, not card details)**

### Webhook Handling
- Secure endpoint with signature verification
- Idempotent processing
- Async processing to avoid timeouts
- Retry logic for failed webhooks
- Logging for all webhook events

### Failed Payment Handling
- Update order status to PAYMENT_FAILED
- Notify customer via email
- Allow retry payment
- Clear reserved stock (if using reservations)

### Refund Handling
- Admin-initiated refunds
- Server-side refund request to provider
- Update order status to REFUNDED
- Return stock to inventory
- Notify customer via email

---

## 10. SHIPPING ARCHITECTURE

### Shipping Zones
- Geographic-based shipping rules
- Nigeria-focused states/regions
- Configurable per zone

### Zone Structure
```
Zone: Lagos
├── States: ["Lagos"]
├── Base Fee: ₦2,000
├── Free Shipping Threshold: ₦50,000
└── Estimated Delivery: 1-2 days

Zone: South West
├── States: ["Ogun", "Oyo", "Osun", "Ondo", "Ekiti"]
├── Base Fee: ₦2,500
├── Free Shipping Threshold: ₦50,000
└── Estimated Delivery: 2-3 days

Zone: North Central
├── States: ["Abuja", "Kogi", "Kwara", "Niger", "Plateau", "Nasarawa"]
├── Base Fee: ₦3,000
├── Free Shipping Threshold: ₦75,000
└── Estimated Delivery: 3-5 days
```

### Shipping Fee Calculation
```typescript
function calculateShippingFee(state: string, orderTotal: number): number {
  const zone = findZoneByState(state);
  if (orderTotal >= zone.free_shipping_threshold) {
    return 0;
  }
  return zone.base_fee;
}
```

### Delivery Methods (V1)
- **Standard Delivery:** Regular shipping
- **Future:** Express delivery, pickup locations

### Order Tracking (V2)
- Basic tracking via provider integration
- Customer-facing tracking page
- SMS/email updates on status changes

### Logistics Integration (Future)
- GIG Logistics
- FedEx (international)
- DHL (international)
- Local courier APIs

---

## 11. AUTHENTICATION ARCHITECTURE

### Authentication: NextAuth.js v5 (Auth.js)
**Rationale:**
- Built for Next.js App Router
- Supports multiple providers
- Session management
- Type-safe with TypeScript
- Active development and community

### Auth Providers
- **Credentials:** Email/password (primary)
- **Future:** Google, Facebook (social login)

### User Roles
```typescript
enum UserRole {
  CUSTOMER = 'customer',
  STAFF = 'staff',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin'
}
```

### Session Management
- JWT tokens for stateless sessions
- Secure HTTP-only cookies
- Session expiration: 7 days (configurable)
- Refresh token mechanism

### Password Security
- bcrypt hashing (cost factor: 12)
- Password strength requirements
- Secure password reset flow
- Rate limiting on auth endpoints

### Guest Checkout
- Allow checkout without account creation
- Create temporary user record
- Prompt account creation after order
- Merge guest cart with user cart on signup

### Authorization
```typescript
function requireRole(role: UserRole) {
  return async (session: Session) => {
    if (!session?.user || session.user.role !== role) {
      throw new Error('Unauthorized');
    }
  };
}
```

### Protected Routes
- Middleware for route protection
- API route protection
- Admin dashboard protection

---

## 12. ADMIN ARCHITECTURE

### Admin Dashboard Structure
```
/admin
├── /dashboard              # Overview metrics
├── /products               # Product management
│   ├── /list              # Product list
│   ├── /create            # Create product
│   ├── /[id]/edit         # Edit product
│   └── /[id]/variants     # Manage variants
├── /orders                # Order management
│   ├── /list              # Order list
│   ├── /[id]              # Order detail
│   └── /[id]/status       # Update status
├── /inventory             # Inventory management
│   ├── /overview          # Stock overview
│   ├── /adjustments       # Stock adjustments
│   └── /low-stock         # Low stock alerts
├── /customers             # Customer management
│   ├── /list              # Customer list
│   └── /[id]              # Customer detail
├── /categories            # Category management
├── /coupons               # Coupon management
├── /shipping              # Shipping zones
└── /users                 # User/role management
```

### Admin Features (V1)
- **Dashboard:** Sales overview, recent orders, low stock alerts
- **Products:** CRUD, variant management, image upload, publish/unpublish
- **Orders:** View, update status, process refunds, view details
- **Inventory:** Stock adjustments, low stock view, stock history
- **Customers:** View customer info, order history
- **Categories:** Manage categories, hierarchy
- **Coupons:** Create and manage discount codes
- **Shipping:** Configure shipping zones and fees
- **Users:** Manage staff roles and permissions

### Admin Authorization
- Role-based access control
- Permission checks per route
- Audit logging for all admin actions

### Admin UI
- Responsive design (mobile-accessible)
- Data tables with sorting/filtering
- Bulk actions where appropriate
- Export functionality (CSV)

---

## 13. SECURITY ARCHITECTURE

### Authentication Security
- Secure password hashing (bcrypt)
- Rate limiting on auth endpoints
- Session management with secure cookies
- CSRF protection
- Secure password reset flow

### API Security
- **Input Validation:** Zod schemas on all inputs
- **Output Sanitization:** Prevent XSS in responses
- **Rate Limiting:** Per-IP and per-user limits
- **CORS:** Configured for allowed origins only
- **Helmet.js:** Security headers

### Data Security
- **Environment Variables:** All secrets in environment
- **Database:** Parameterized queries via Prisma (SQL injection protection)
- **Encryption:** Sensitive data encrypted at rest (future)
- **PII:** Minimal data collection, GDPR considerations

### Payment Security
- **Server-Side Verification:** Never trust client payment success
- **Webhook Signatures:** Verify provider signatures
- **Idempotency:** Prevent duplicate processing
- **No Card Data:** Never store card details

### Authorization
- Role-based access control
- Route protection via middleware
- API route protection
- Admin action authorization

### Secrets Management
- Never expose secrets to client
- Use environment variables
- Vercel environment variables for deployment
- Rotate secrets periodically

### Audit Logging
- Log all admin actions
- Log sensitive operations (price changes, stock adjustments)
- Include user, timestamp, action, changes

### Security Headers
```
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: configured appropriately
- Strict-Transport-Security: HTTPS only
```

### Rate Limiting Strategy
- Auth endpoints: 5 requests per minute
- API endpoints: 100 requests per minute
- Checkout: 10 requests per minute
- Per-user limits where appropriate

---

## 14. PERFORMANCE ARCHITECTURE

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **INP (Interaction to Next Paint):** < 200ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Image Optimization
- **Format:** WebP/AVIF with JPEG fallback
- **Responsive:** Multiple sizes via Next.js Image
- **Lazy Loading:** Below-fold images
- **Compression:** Automatic via Cloudinary
- **CDN:** Cloudinary CDN or CloudFront

### Code Optimization
- **Tree Shaking:** Automatic via Next.js
- **Code Splitting:** Route-based splitting
- **Dynamic Imports:** Non-critical components
- **Minification:** Automatic
- **Bundle Analysis:** Regular monitoring

### Caching Strategy
- **Static Assets:** Long cache headers
- **Product Pages:** Revalidate every 1 hour
- **Categories:** Revalidate every 6 hours
- **API Responses:** Short cache where appropriate
- **CDN:** Edge caching via Vercel

### Database Optimization
- **Indexes:** Proper indexing on frequently queried columns
- **Query Optimization:** N+1 prevention via Prisma includes
- **Connection Pooling:** Managed by Supabase/Neon
- **Read Replicas:** Future scaling

### Server-Side Rendering
- **Product Pages:** SSR for SEO
- **Category Pages:** SSR for SEO
- **Checkout:** CSR for security
- **Admin:** CSR for interactivity

### Font Optimization
- **Next.js Font:** Automatic optimization
- **Font Display:** swap for performance
- **Subset:** Only load needed characters

### Monitoring Performance
- **Vercel Analytics:** Real-user monitoring
- **Lighthouse CI:** Automated performance checks
- **Web Vitals:** Core metrics tracking

---

## 15. SEO ARCHITECTURE

### URL Structure
```
/                          # Homepage
/category/[slug]           # Category pages
/product/[slug]            # Product pages
/search                    # Search results
/cart                      # Cart
/checkout                  # Checkout
/account                   # Account dashboard
/account/orders            # Order history
/admin                     # Admin dashboard (noindex)
```

### Metadata Strategy
- **Dynamic Metadata:** Per-product and per-category
- **Open Graph:** Social sharing cards
- **Twitter Cards:** Twitter sharing
- **Canonical URLs:** Prevent duplicate content
- **Robots.txt:** Control crawler access

### Structured Data
- **Product Schema:** Product pages
- **Breadcrumb Schema:** Navigation hierarchy
- **Organization Schema:** Business info
- **Website Schema:** Site search

### Sitemap
- **XML Sitemap:** Auto-generated
- **Dynamic:** Updates with new products
- **Submitted:** To Google Search Console

### SEO Best Practices
- **Semantic HTML:** Proper heading hierarchy
- **Alt Text:** All images
- **Meta Descriptions:** Unique per page
- **Title Tags:** Optimized length
- **Internal Linking:** Related products
- **Page Speed:** Core Web Vitals

### Local SEO (Nigeria)
- **Business Info:** NAP consistency
- **Google My Business:** Integration
- **Local Keywords:** Nigeria-specific terms

---

## 16. ANALYTICS ARCHITECTURE

### Event Tracking
```typescript
events = {
  product_viewed: { productId, variantId, categoryId },
  category_viewed: { categoryId },
  search_performed: { query, resultsCount },
  add_to_cart: { productId, variantId, quantity },
  remove_from_cart: { productId, variantId, quantity },
  checkout_started: { cartValue, itemCount },
  payment_initiated: { orderId, amount, provider },
  payment_completed: { orderId, amount, provider },
  order_completed: { orderId, value, itemCount },
  order_failed: { orderId, reason }
}
```

### Analytics Tools
- **Google Analytics 4:** Primary analytics
- **Custom Events:** Business-specific tracking
- **Conversion Tracking:** Purchase events
- **E-commerce Tracking:** Product performance

### Metrics to Track
- **Product Performance:** Views, add-to-cart rate, conversion rate
- **Search:** Popular search terms, zero-result searches
- **Cart:** Abandonment rate, average cart value
- **Checkout:** Funnel drop-off points
- **Traffic:** Sources, devices, locations
- **Revenue:** Daily, weekly, monthly trends

### Privacy
- **No PII:** No personal data in analytics
- **Anonymization:** IP anonymization
- **Consent:** Cookie consent banner
- **GDPR:** Compliance considerations

---

## 17. MONITORING ARCHITECTURE

### Error Tracking: Sentry
- **Application Errors:** JavaScript and server errors
- **API Errors:** Failed API calls
- **Performance:** Slow transactions
- **User Context:** User info on errors
- **Release Tracking:** Error rates per release

### Uptime Monitoring
- **Website Uptime:** Downtime alerts
- **API Endpoints:** Health checks
- **Response Time:** Performance degradation alerts

### Performance Monitoring
- **Core Web Vitals:** Real-user monitoring
- **Page Load Times:** Per route
- **API Response Times:** Per endpoint
- **Database Query Performance:** Slow query alerts

### Business Metrics
- **Order Volume:** Unusual spikes/drops
- **Payment Failures:** High failure rates
- **Error Rates:** Checkout errors
- **Stock Issues:** Out-of-stock events

### Alerting
- **Critical:** Immediate alerts (site down, payment failures)
- **Warning:** Non-urgent (performance degradation)
- **Info:** Scheduled reports

---

## 18. BACKUP & DISASTER RECOVERY

### Database Backups
- **Automated Daily:** Full database backups
- **Retention:** 30 days daily, 12 weekly, 36 monthly
- **Point-in-Time Recovery:** Via provider (Supabase/Neon)
- **Backup Encryption:** Encrypted at rest

### Image Backups
- **Primary:** Cloudinary (redundant storage)
- **Secondary:** S3 backup (optional)
- **CDN:** Edge caching as backup

### Configuration Backups
- **Environment Variables:** Secure storage
- **Code Repository:** Git history
- **Infrastructure as Code:** Vercel configuration

### Disaster Recovery Plan
1. **Identify Incident:** Monitoring alerts
2. **Assess Impact:** Determine severity
3. **Restore Service:** Failover if needed
4. **Restore Data:** From backups
5. **Investigate:** Root cause analysis
6. **Prevent:** Implement fixes
7. **Document:** Post-incident report

### Recovery Testing
- **Monthly:** Backup restoration tests
- **Quarterly:** Full disaster recovery drill
- **Documentation:** Updated procedures

---

## 19. SCALABILITY STRATEGY

### Progressive Scalability Approach

#### Stage 1: V1 Launch (Current)
- Single Vercel deployment
- Single PostgreSQL instance
- No Redis (or minimal use)
- CDN for static assets
- Target: 1,000-10,000 users

#### Stage 2: Growth (10K-100K users)
- Optimize database queries
- Add Redis for caching
- Implement aggressive caching
- Optimize images further
- Horizontal scaling via Vercel
- Target: 100,000 users

#### Stage 3: Scale (100K-500K users)
- Database read replicas
- Dedicated Redis instance
- Background job queue
- Separate analytics database
- CDN optimization
- Target: 500,000 users

#### Stage 4: Large Scale (500K-1M+ users)
- Database connection pooling
- Advanced caching strategies
- Potential service extraction (payments, emails)
- Load balancing
- Geographic CDN distribution
- Target: 1M+ users

#### Stage 5: Advanced (Only if needed)
- Database sharding (if single DB can't handle)
- Microservices (if justified by bottlenecks)
- Multi-region deployment (if global)
- Specialized search infrastructure

### Anti-Patterns to Avoid
- **Premature Sharding:** Before single DB is maxed
- **Microservices:** Before monolithic is proven insufficient
- **Multi-Region:** Before single region is insufficient
- **Complex Queues:** Before background jobs are needed
- **Over-Caching:** Before cache invalidation is understood

### Scalability Enablers
- **Stateless Architecture:** Easy horizontal scaling
- **Modular Code:** Easy to extract services
- **Clear Boundaries:** Well-defined service interfaces
- **Monitoring:** Know when to scale
- **Load Testing:** Proactive capacity planning

---

## 20. V1 FEATURES (MUST HAVE)

### Customer-Facing - COMPLETED ✓
- [x] Homepage (hero slider, categories, new arrivals, best sellers, promotion)
- [x] Category browsing
- [x] Product catalogue with variants (350+ products)
- [x] Product detail pages
- [x] Search functionality
- [x] Filters (category, price range, color, size, availability)
- [x] Sorting (price, name, newest)
- [x] Pagination
- [x] Quick view modal
- [x] Wishlist functionality
- [x] Related products section
- [x] Mobile-responsive design
- [x] Loading skeletons
- [x] Empty states
- [x] Professional visual design (Jumia/Temu inspired with colored icons and gradients)

### Customer-Facing - PENDING
- [ ] Shopping cart (UI exists, needs backend integration)
- [ ] Guest checkout
- [ ] Customer account creation
- [ ] Order history
- [ ] Address management
- [ ] Payment integration (Paystack)
- [ ] Order confirmation
- [ ] Order tracking page

### Admin-Facing - PENDING
- [ ] Admin dashboard
- [ ] Product management (CRUD)
- [ ] Variant management
- [ ] Image upload
- [ ] Category management
- [ ] Order management
- [ ] Order status updates
- [ ] Inventory management
- [ ] Stock adjustments
- [ ] Customer management
- [ ] Basic analytics
- [ ] Staff role management

### Technical - PENDING
- [ ] Authentication system (NextAuth.js v5)
- [ ] Authorization (roles)
- [ ] Input validation (Zod)
- [ ] Error handling
- [ ] SEO foundation (metadata, sitemap)
- [ ] Analytics foundation (event tracking)
- [ ] Performance optimization
- [ ] Security measures
- [ ] Monitoring setup
- [ ] Backup strategy

---

## 21. V2 FEATURES (AFTER CORE STABLE)

### Customer Experience
- [x] Wishlist functionality (COMPLETED in Phase 1)
- Product reviews and ratings
- Recently viewed products
- Advanced search (autocomplete, suggestions)
- Product comparison
- Order tracking page
- Advanced filtering

### Marketing
- Coupons and discount codes
- Flash sales
- Promotional banners
- Abandoned cart recovery emails
- Email marketing integration
- Loyalty points system
- Referral program

### Admin Enhancements
- Advanced analytics dashboard
- Sales reports
- Customer insights
- Bulk operations
- Advanced inventory management
- Promotion management
- Email campaign management

### Technical
- Advanced search (Meilisearch/Algolia)
- Redis caching optimization
- Background job optimization
- Advanced monitoring
- A/B testing framework

---

## 22. FUTURE FEATURES (ONLY WHEN BUSINESS JUSTIFIES)

### Multi-Vendor
- Seller dashboards
- Vendor management
- Commission system
- Multi-vendor checkout

### International
- Multi-language support
- Multi-currency support
- Multi-country shipping
- Regional payment providers

### Advanced Architecture
- Database sharding
- Multi-region deployment
- Microservices extraction
- Advanced distributed systems

### Advanced Features
- Subscription commerce
- AI-powered recommendations
- Full offline PWA
- Complex push notifications
- Advanced personalization

---

## 23. FINAL DEVELOPMENT PHASES - UPDATED PROGRESS

### COMPLETED PHASES ✓

### PHASE 1: Foundation & Setup (COMPLETED)
**Status:** Complete
**Completed:**
- [x] Next.js 15 project initialized with TypeScript
- [x] Tailwind CSS configured
- [x] Prisma with PostgreSQL set up
- [x] Environment variables configured
- [x] Git repository initialized
- [x] shadcn/ui components installed
- [x] Base directory structure created
- [x] Linting and formatting configured

### PHASE 2: Database & Backend Foundation (COMPLETED)
**Status:** Complete
**Completed:**
- [x] Database schema designed and implemented
- [x] Prisma models created (User, Product, Variant, Category, Order, etc.)
- [x] Database migrations run
- [x] API route structure created
- [x] Product API endpoints implemented
- [x] Category API endpoints implemented
- [x] Validation schemas (Zod) partially implemented
- [x] Error handling middleware set up

**Pending:**
- [ ] Authentication system (NextAuth.js v5)
- [ ] Complete validation schemas
- [ ] Service layer implementation

### PHASE 3: Core Frontend Components (COMPLETED)
**Status:** Complete
**Completed:**
- [x] Layout components (header, footer, navigation)
- [x] Mobile menu structure
- [x] Responsive grid system
- [x] Core UI components (buttons, cards, inputs, badges, modals)
- [x] Loading and error states (skeletons, empty states)
- [x] Image optimization setup
- [x] Routing structure implemented
- [x] Professional visual design with gradients and colored icons

### PHASE 4: Product & Catalogue System (COMPLETED)
**Status:** Complete
**Completed:**
- [x] Product data models implemented
- [x] Product listing page with pagination
- [x] Product detail page with variant display
- [x] Category pages with enhanced design
- [x] Search functionality
- [x] Advanced filters (category, price range, color, size)
- [x] Sorting (price, name, newest)
- [x] Product images gallery
- [x] Quick view modal
- [x] Wishlist functionality with localStorage
- [x] Related products section
- [x] 350+ products generated with scalable data generator
- [x] Professional hero slider with 4 slides
- [x] Enhanced product cards with hover effects
- [x] Newsletter section

---

### NEXT PHASE: RECOMMENDED ORDER

Based on the original architecture plan and current progress, here are the recommended next phases:

### PHASE 5: Authentication & Account Management (RECOMMENDED NEXT)
**Goal:** User authentication, registration, profile management
**Duration:** 1-2 weeks
**Tasks:**
- [ ] Set up NextAuth.js v5 configuration
- [ ] Create user registration page
- [ ] Create user login page
- [ ] Implement password reset flow
- [ ] Create user profile page
- [ ] Implement address management
- [ ] Add role-based authorization middleware
- [ ] Create account settings page
- [ ] Implement session management
- [ ] Add social login providers (Google, Facebook) - optional

**Deliverables:**
- Working authentication system
- User registration and login
- Profile management
- Address book
- Role-based access control

---

### PHASE 6: Cart & Checkout System
**Goal:** Shopping cart, checkout flow
**Duration:** 1-2 weeks
**Tasks:**
- [ ] Implement cart functionality (backend)
- [ ] Build cart drawer/modal (UI exists, needs backend)
- [ ] Create checkout page
- [ ] Implement guest checkout
- [ ] Add address form
- [ ] Implement shipping calculation
- [ ] Build order summary
- [ ] Create order confirmation page
- [ ] Add cart persistence

**Deliverables:**
- Working shopping cart
- Complete checkout flow
- Guest checkout
- Order confirmation

---

### PHASE 7: Payment Integration
**Goal:** Paystack integration, payment verification
**Duration:** 1 week
**Tasks:**
- [ ] Implement Paystack SDK
- [ ] Create payment initialization
- [ ] Build payment verification
- [ ] Implement webhook handling
- [ ] Add idempotency
- [ ] Create payment failure handling
- [ ] Implement refund functionality
- [ ] Test payment flow end-to-end

**Deliverables:**
- Working payment integration
- Webhook handling
- Payment verification
- Refund processing

---

### PHASE 8: Inventory & Order Management
**Goal:** Inventory system, order lifecycle
**Duration:** 1-2 weeks
**Tasks:**
- [ ] Implement inventory tracking
- [ ] Build stock deduction logic
- [ ] Create order state machine
- [ ] Implement order status updates
- [ ] Build inventory transaction logging
- [ ] Add low stock alerts
- [ ] Create stock adjustment interface
- [ ] Test inventory integrity

**Deliverables:**
- Working inventory system
- Order lifecycle management
- Stock transaction logging
- Low stock alerts

---

### PHASE 9: Admin Dashboard
**Goal:** Complete admin interface
**Duration:** 2-3 weeks
**Tasks:**
- [ ] Build admin dashboard layout
- [ ] Create product management interface
- [ ] Implement variant management
- [ ] Build order management interface
- [ ] Create inventory management
- [ ] Implement customer management
- [ ] Add basic analytics
- [ ] Create staff role management
- [ ] Implement audit logging

**Deliverables:**
- Complete admin dashboard
- Product/order/inventory management
- Basic analytics
- Role-based access

---

### PHASE 10: Shipping & Notifications
**Goal:** Shipping zones, email notifications
**Duration:** 1 week
**Tasks:**
- [ ] Implement shipping zone system
- [ ] Build shipping fee calculation
- [ ] Create delivery estimation
- [ ] Set up email service (SendGrid/Mailgun)
- [ ] Implement transactional emails
- [ ] Create order confirmation emails
- [ ] Add shipping notification emails
- [ ] Implement WhatsApp support (optional)

**Deliverables:**
- Working shipping system
- Email notifications
- Order tracking foundation

---

### PHASE 11: SEO & Analytics
**Goal:** SEO optimization, analytics tracking
**Duration:** 1 week
**Tasks:**
- [ ] Implement dynamic metadata
- [ ] Create XML sitemap
- [ ] Add structured data
- [ ] Configure robots.txt
- [ ] Set up Google Analytics
- [ ] Implement event tracking
- [ ] Add Open Graph tags
- [ ] Optimize page titles and descriptions

**Deliverables:**
- SEO-optimized pages
- Analytics tracking
- Sitemap generation
- Structured data

---

### PHASE 12: Security & Performance
**Goal:** Security hardening, performance optimization
**Duration:** 1 week
**Tasks:**
- [ ] Implement rate limiting
- [ ] Add security headers
- [ ] Configure CORS properly
- [ ] Audit authentication flows
- [ ] Implement CSRF protection
- [ ] Optimize database queries
- [ ] Add caching where appropriate
- [ ] Optimize images and assets
- [ ] Implement CDN configuration
- [ ] Run security audit

**Deliverables:**
- Hardened security
- Optimized performance
- CDN integration
- Security audit report

---

### PHASE 13: Testing & QA
**Goal:** Comprehensive testing
**Duration:** 1-2 weeks
**Tasks:**
- [ ] Write unit tests for business logic
- [ ] Create integration tests for APIs
- [ ] Build E2E tests with Playwright
- [ ] Test payment flows
- [ ] Test inventory integrity
- [ ] Test mobile responsiveness
- [ ] Perform load testing
- [ ] Security penetration testing
- [ ] Cross-browser testing
- [ ] Accessibility testing

**Deliverables:**
- Test suite
- Test coverage report
- Load test results
- Security audit results

---

### PHASE 14: Deployment & Launch
**Goal:** Production deployment, monitoring setup
**Duration:** 1 week
**Tasks:**
- [ ] Configure production environment
- [ ] Set up Vercel deployment
- [ ] Configure production database
- [ ] Set up Redis (if needed)
- [ ] Configure monitoring (Sentry)
- [ ] Set up error tracking
- [ ] Implement backup strategy
- [ ] Configure CDN
- [ ] Set up SSL certificates
- [ ] Final testing in production

**Deliverables:**
- Production deployment
- Monitoring setup
- Backup strategy
- Live application
- Configure domain and SSL
- Perform final smoke tests
- Launch to production

**Deliverables:**
- Live production site
- Monitoring dashboard
- Backup system
- Launch checklist

---

## 24. DEPENDENCIES BETWEEN PHASES

```
Phase 1 (Foundation)
    ↓
Phase 2 (Database & Backend)
    ↓
Phase 3 (Frontend Components)
    ↓
Phase 4 (Product System)
    ↓
Phase 5 (Cart & Checkout)
    ↓
Phase 6 (Payment)
    ↓
Phase 7 (Inventory & Orders)
    ↓
Phase 8 (Admin Dashboard)
    ↓
Phase 9 (Shipping & Notifications)
    ↓
Phase 10 (SEO & Analytics)
    ↓
Phase 11 (Security & Performance)
    ↓
Phase 12 (Testing)
    ↓
Phase 13 (Deployment)
```

**Parallel Opportunities:**
- Phase 3 can start after Phase 1 (frontend independent of backend)
- Phase 10 (SEO) can be done alongside Phase 4-5
- Phase 11 (Security) can be done incrementally

---

## 25. TESTING STRATEGY

### Unit Testing
- **Tools:** Jest
- **Coverage:** Business logic, services, utilities
- **Target:** 80%+ coverage on critical paths

### Integration Testing
- **Tools:** Jest + Supertest
- **Scope:** API endpoints, database operations
- **Focus:** Payment flows, inventory operations

### End-to-End Testing
- **Tools:** Playwright
- **Scenarios:**
  - Browse → Search → Product → Add to Cart → Checkout → Payment
  - Admin: Create product → Manage inventory → Process order
  - Guest checkout flow
  - Failed payment handling
  - Out-of-stock handling

### Load Testing
- **Tools:** k6
- **Scenarios:**
  - 100 concurrent users browsing
  - 50 concurrent checkouts
  - Peak traffic simulation
- **Target:** Handle 10,000 concurrent users

### Security Testing
- **Tools:** OWASP ZAP, manual audit
- **Scope:** SQL injection, XSS, CSRF, auth bypass
- **Frequency:** Before launch, quarterly

### Performance Testing
- **Tools:** Lighthouse, WebPageTest
- **Metrics:** Core Web Vitals, load time
- **Target:** Mobile score > 90, LCP < 2.5s

### Mobile Testing
- **Devices:** Various Android/iOS devices
- **Emulators:** Browser DevTools
- **Focus:** Touch interactions, responsive layouts

---

## 26. DEPLOYMENT STRATEGY

### Vercel Deployment
- **Platform:** Vercel (recommended for Next.js)
- **Environment:** Preview deployments per PR
- **Production:** Automatic on merge to main
- **Domains:** Custom domain configuration
- **SSL:** Automatic via Vercel

### Database Deployment
- **Provider:** Supabase or Neon
- **Environment:** Separate dev/staging/prod databases
- **Migrations:** Automated via Prisma
- **Backups:** Automated daily backups

### Redis Deployment
- **Provider:** Upstash (if needed)
- **Environment:** Separate instances per environment
- **Persistence:** Configurable retention

### CI/CD Pipeline
```
Git Push
    ↓
Vercel Build
    ↓
Run Tests
    ↓
Deploy to Preview
    ↓
Manual Review
    ↓
Merge to Main
    ↓
Deploy to Production
```

### Environment Variables
- **Development:** .env.local (gitignored)
- **Production:** Vercel environment variables
- **Secrets:** Never committed to git

### Rollback Strategy
- **Vercel:** One-click rollback to previous deployment
- **Database:** Migration rollback capability
- **Code:** Git revert if needed

---

## 27. RISKS AND MITIGATIONS

### Technical Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Database performance issues | Medium | High | Proper indexing, query optimization, read replicas when needed |
| Payment integration failures | Low | High | Thorough testing, webhook retry logic, fallback options |
| Inventory overselling | Medium | High | Transactional stock handling, proper locking |
| Security vulnerabilities | Low | Critical | Security audits, dependency updates, secure coding practices |
| Performance degradation | Medium | High | Monitoring, caching, CDN, optimization |
| Downtime | Low | High | Monitoring, backups, disaster recovery plan |

### Business Risks

| Risk | Likelihood | Impact | Mitigation |
| Payment provider downtime | Low | High | Multiple payment providers, clear communication |
| Low stock on popular items | High | Medium | Low stock alerts, bulk ordering |
| High cart abandonment | Medium | Medium | Streamlined checkout, abandoned cart emails (V2) |
| Poor mobile experience | Medium | High | Mobile-first design, extensive mobile testing |

### Mitigation Strategies
- **Monitoring:** Early detection of issues
- **Testing:** Comprehensive test coverage
- **Backups:** Regular, tested backups
- **Documentation:** Clear procedures for common issues
- **Communication:** Clear error messages to users

---

## 28. ESTIMATED DEVELOPMENT COMPLEXITY

### Phase Complexity Ratings
- **Phase 1 (Foundation):** Low - Standard setup
- **Phase 2 (Database):** Medium - Complex schema design
- **Phase 3 (Frontend):** Medium - Many components
- **Phase 4 (Products):** High - Complex variant logic
- **Phase 5 (Cart/Checkout):** High - Critical user flow
- **Phase 6 (Payments):** High - Security critical
- **Phase 7 (Inventory):** High - Transactional integrity
- **Phase 8 (Admin):** High - Many features
- **Phase 9 (Shipping):** Medium - Business logic
- **Phase 10 (SEO):** Low - Configuration
- **Phase 11 (Security):** Medium - Hardening
- **Phase 12 (Testing):** High - Comprehensive
- **Phase 13 (Deployment):** Medium - Configuration

### Total Estimated Timeline
- **Minimum:** 12 weeks (aggressive)
- **Realistic:** 15 weeks (recommended)
- **Conservative:** 18 weeks (with buffer)

### Resource Requirements
- **Developer:** 1 senior full-stack developer
- **Designer:** 1 UI/UX designer (part-time)
- **QA:** 1 QA engineer (part-time, during Phase 12)

---

## COMPARISON WITH PREVIOUS 21-PHASE PLAN

### What Should Remain
- Core technology stack (Next.js, TypeScript, PostgreSQL)
- Mobile-first design principle
- Security focus
- Performance optimization
- Admin dashboard as V1 requirement
- Inventory as core system
- Order lifecycle management
- Payment abstraction layer

### What Should Move Earlier
- **Inventory:** From Phase 15 → Phase 7 (core system)
- **Admin Dashboard:** From Phase 11 → Phase 8 (V1 requirement)
- **Analytics:** From Phase 18 → Phase 10 (built from start)
- **SEO:** From Phase 16 → Phase 10 (architectural foundation)
- **Security:** From Phase 13 → Phase 11 (continuous, not end-stage)

### What Should Move Later (V2)
- **Wishlist/Reviews:** From Phase 13 → V2
- **Coupons/Promotions:** From Phase 14 → V2
- **Loyalty/Referral:** From V1 → V2
- **PWA/Offline:** From Phase 10 → V2 or later
- **Push Notifications:** From V1 → V2
- **Multi-currency/Multi-language:** From V1 → Future
- **Database Sharding:** From V1 → Future (only if needed)
- **Multi-region Deployment:** From V1 → Future (only if needed)

### What Should Be Removed
- **Microservices Architecture:** Premature for V1
- **Complex Distributed Systems:** Over-engineering
- **Advanced AI Recommendations:** Not V1
- **Multi-vendor Marketplace:** Not current business model
- **Subscription Commerce:** Not current business model

### What Should Be Added
- **Audit Logging:** For admin actions
- **Order State Machine:** Explicit lifecycle
- **Payment Abstraction:** Provider-agnostic interface
- **Shipping Zones:** Geographic-based shipping
- **Product Variant Architecture:** Proper size/color/SKU model
- **Image Management System:** Optimization and CDN
- **Observability Layer:** Monitoring and alerting
- **Backup & Disaster Recovery:** Explicit strategy
- **Progressive Scalability:** Stage-based approach

### What Should Be Simplified
- **Search:** Start with PostgreSQL, upgrade later
- **Caching:** Introduce Redis only when value proven
- **Load Testing:** Target 10K concurrent, not 1M concurrent
- **Infrastructure:** Single region initially, scale later
- **Monitoring:** Essential metrics only, avoid over-monitoring

---

## CONCLUSION

This architecture provides a solid foundation for Theirpocket to launch as a professional, scalable e-commerce platform while avoiding premature over-engineering. The progressive scalability approach ensures the platform can grow toward 1M+ users without building unnecessary complexity from day one.

**Key Principles:**
1. **Simple on the surface, powerful underneath**
2. **Mobile-first, performance-optimized**
3. **Security-first approach**
4. **Progressive scalability**
5. **Real production functionality, no mocks**

**Next Step:** Approval of this architecture before proceeding to Phase 1 implementation.

---

**Document End**
