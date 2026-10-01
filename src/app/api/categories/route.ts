import { NextResponse } from 'next/server';
import { generateCategories } from '@/lib/mock-data-generator';

// GET /api/categories - List categories
export async function GET() {
  try {
    const categories = generateCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
