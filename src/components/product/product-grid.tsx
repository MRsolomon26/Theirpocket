import { ProductCard } from './product-card';

interface ProductGridProps {
  products: Array<{
    id: string;
    name: string;
    basePrice: number;
    image?: string;
    isFeatured?: boolean;
    isBestseller?: boolean;
    slug: string;
    category?: { name: string; slug: string };
    description?: string;
    variants?: Array<{
      id: string;
      name: string;
      price?: number;
      stock: number;
      images?: string[];
    }>;
  }>;
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => {
        const firstVariant = product.variants?.[0];
        const price = firstVariant?.price || product.basePrice;
        const image = firstVariant?.images?.[0];
        
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={price}
            originalPrice={product.basePrice}
            image={image}
            isFeatured={product.isFeatured}
            isBestseller={product.isBestseller}
            slug={product.slug}
            variants={product.variants}
            basePrice={product.basePrice}
            category={product.category}
            description={product.description}
          />
        );
      })}
    </div>
  );
}
