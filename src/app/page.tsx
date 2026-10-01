import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductGrid } from '@/components/product/product-grid';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Truck, Shield, RefreshCw, Sparkles, Package, HeadphonesIcon, Clock } from 'lucide-react';
import Link from 'next/link';
import { HeroSlider } from '@/components/home/hero-slider';
import { queryProducts, getCachedCategories } from '@/lib/products-service';

export default async function Home() {
  const featuredData = queryProducts({ featured: true, limit: 8 });
  const bestsellerData = queryProducts({ bestseller: true, limit: 8 });
  const categories = getCachedCategories();

  const featuredProducts = featuredData.products;
  const bestsellerProducts = bestsellerData.products;


  return (
    <main className="min-h-screen">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Features Bar */}
      <section className="bg-white border-y shadow-sm">
        <Container className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Truck className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over ₦5,000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% protected</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <RefreshCw className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <HeadphonesIcon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">24/7 Support</h3>
                <p className="text-sm text-gray-600">Dedicated customer service</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge className="mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">Categories</Badge>
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Shop by Category</h2>
              <p className="text-gray-600">Explore our curated collections</p>
            </div>
            <Link href="/categories">
              <Button variant="outline" className="border-2 hover:bg-primary hover:text-white transition-colors">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.slice(0, 5).map((category: { id: string; name: string; slug: string; imageUrl?: string | null; _count?: { products: number } }, index: number) => {

              const gradients = [
                'from-pink-500 to-rose-500',
                'from-blue-500 to-cyan-500',
                'from-green-500 to-emerald-500',
                'from-orange-500 to-amber-500',
                'from-purple-500 to-violet-500',
              ];
              return (
                <Link key={category.id} href={`/products?category=${category.slug}`}>
                  <Card className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative">
                      {category.imageUrl ? (
                        <img
                          src={category.imageUrl}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center`}>
                          <Package className="h-16 w-16 text-white/80" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <CardContent className="p-4 text-center bg-white">
                      <h3 className="font-bold mb-1 text-gray-900 group-hover:text-primary transition-colors">{category.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {category._count?.products || 0} items
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge className="mb-2 bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">Featured</Badge>
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Trending Now</h2>
              <p className="text-gray-600">Handpicked favorites just for you</p>
            </div>
            <Link href="/products?featured=true">
              <Button variant="outline" className="border-2 hover:bg-primary hover:text-white transition-colors">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <ProductGrid products={featuredProducts} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              No featured products available
            </div>
          )}
        </Container>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
        <Container>
          <div className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border-2 border-white/20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920')] bg-cover bg-center opacity-20" />
            <div className="relative p-12 md:p-20 text-center text-white">
              <Badge className="mb-4 bg-white/20 backdrop-blur text-white border-white/30">
                <Clock className="h-4 w-4 mr-1" />
                Limited Time Offer
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Mega Sale Up to 70% Off
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Don't miss out on our biggest sale of the season. Shop now and save big!
              </p>
              <Link href="/products">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 font-semibold shadow-xl">
                  Shop the Sale
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <Badge className="mb-2 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">Bestsellers</Badge>
              <h2 className="text-3xl font-bold mb-2 text-gray-900">Most Loved</h2>
              <p className="text-gray-600">Top-rated products by our customers</p>
            </div>
            <Link href="/products?bestseller=true">
              <Button variant="outline" className="border-2 hover:bg-primary hover:text-white transition-colors">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {bestsellerProducts.length > 0 ? (
            <ProductGrid products={bestsellerProducts} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              No bestseller products available
            </div>
          )}
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-700">
        <Container>
          <Card className="bg-white/10 backdrop-blur-sm border-2 border-white/20">
            <CardContent className="p-12 text-center text-white">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                Subscribe to our newsletter and get 10% off your first order, plus exclusive access to sales and new arrivals.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-white/30 bg-white/20 backdrop-blur text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="px-8 bg-white text-blue-600 hover:bg-white/90 font-semibold">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </main>
  );
}
