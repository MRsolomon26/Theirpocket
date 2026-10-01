'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    title: 'Summer Collection 2024',
    subtitle: 'Discover the latest trends in fashion',
    description: 'Up to 50% off on selected items. Limited time offer.',
    cta: 'Shop Now',
    ctaLink: '/products',
    badge: 'New Arrival',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&q=80',
    gradient: 'from-orange-500 via-pink-500 to-purple-600',
  },
  {
    id: 2,
    title: 'Premium Quality',
    subtitle: 'Fashion that speaks your style',
    description: 'Handpicked collection of premium clothing and accessories.',
    cta: 'Explore Collection',
    ctaLink: '/categories',
    badge: 'Premium',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80',
    gradient: 'from-blue-600 via-purple-600 to-pink-500',
  },
  {
    id: 3,
    title: 'Flash Sale',
    subtitle: 'Hurry! Deals ending soon',
    description: 'Get up to 70% off on bestsellers. Don\'t miss out!',
    cta: 'Shop Sale',
    ctaLink: '/products?bestseller=true',
    badge: 'Flash Sale',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    gradient: 'from-red-500 via-orange-500 to-yellow-500',
  },
  {
    id: 4,
    title: 'Free Shipping',
    subtitle: 'On orders over ₦5,000',
    description: 'Shop worry-free with our fast and reliable delivery.',
    cta: 'Start Shopping',
    ctaLink: '/products',
    badge: 'Free Delivery',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1920&q=80',
    gradient: 'from-green-500 via-teal-500 to-blue-500',
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-90`} />
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-2xl">
                <Badge
                  variant="secondary"
                  className="mb-4 bg-white/20 backdrop-blur text-white border-white/30 text-sm px-4 py-1"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  {slide.badge}
                </Badge>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/90 mb-2 font-medium">
                  {slide.subtitle}
                </p>
                <p className="text-lg text-white/80 mb-8">
                  {slide.description}
                </p>
                <Link href={slide.ctaLink}>
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-white/90 text-lg px-8 py-6 font-semibold shadow-xl"
                  >
                    {slide.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur hover:bg-white/30 text-white p-3 rounded-full transition-all hover:scale-110 z-10"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur hover:bg-white/30 text-white p-3 rounded-full transition-all hover:scale-110 z-10"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
