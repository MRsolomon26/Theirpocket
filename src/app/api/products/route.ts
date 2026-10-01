import { NextRequest, NextResponse } from 'next/server';
import { queryProducts } from '@/lib/products-service';

// GET /api/products - List products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const featured = searchParams.get('featured') || undefined;
    const bestseller = searchParams.get('bestseller') || undefined;
    const sort = searchParams.get('sort') || 'newest';
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const data = queryProducts({
      category,
      search,
      featured,
      bestseller,
      sort,
      limit,
      offset,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}


// POST /api/products - Create product (admin only)
export async function POST() {
  return NextResponse.json({ message: 'Product creation - Coming in Phase 8 (Admin Dashboard)' });
}
