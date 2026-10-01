'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  categories: { id: string; name: string; slug: string }[];
  onFilterChange: (_filters: {
    category?: string;
    priceRange?: [number, number];
    featured?: boolean;
    bestseller?: boolean;
    colors?: string[];
    sizes?: string[];
  }) => void;
}

const COLORS = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Gray', value: '#6B7280' },
  { name: 'Brown', value: '#92400E' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

export function ProductFilters({ categories, onFilterChange }: ProductFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const handleCategoryChange = (slug: string) => {
    const newCategory = selectedCategory === slug ? '' : slug;
    setSelectedCategory(newCategory);
    onFilterChange({
      category: newCategory || undefined,
      priceRange,
      featured: featuredOnly,
      bestseller: bestsellerOnly,
      colors: selectedColors,
      sizes: selectedSizes,
    });
  };

  const handlePriceRangeChange = (values: number[]) => {
    const newRange: [number, number] = [values[0], values[1]];
    setPriceRange(newRange);
    onFilterChange({
      category: selectedCategory || undefined,
      priceRange: newRange,
      featured: featuredOnly,
      bestseller: bestsellerOnly,
      colors: selectedColors,
      sizes: selectedSizes,
    });
  };

  const handleFeaturedToggle = () => {
    const newValue = !featuredOnly;
    setFeaturedOnly(newValue);
    onFilterChange({
      category: selectedCategory || undefined,
      priceRange,
      featured: newValue,
      bestseller: bestsellerOnly,
      colors: selectedColors,
      sizes: selectedSizes,
    });
  };

  const handleBestsellerToggle = () => {
    const newValue = !bestsellerOnly;
    setBestsellerOnly(newValue);
    onFilterChange({
      category: selectedCategory || undefined,
      priceRange,
      featured: featuredOnly,
      bestseller: newValue,
      colors: selectedColors,
      sizes: selectedSizes,
    });
  };

  const handleColorToggle = (colorName: string) => {
    const newColors = selectedColors.includes(colorName)
      ? selectedColors.filter((c) => c !== colorName)
      : [...selectedColors, colorName];
    setSelectedColors(newColors);
    onFilterChange({
      category: selectedCategory || undefined,
      priceRange,
      featured: featuredOnly,
      bestseller: bestsellerOnly,
      colors: newColors,
      sizes: selectedSizes,
    });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(newSizes);
    onFilterChange({
      category: selectedCategory || undefined,
      priceRange,
      featured: featuredOnly,
      bestseller: bestsellerOnly,
      colors: selectedColors,
      sizes: newSizes,
    });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 50000]);
    setFeaturedOnly(false);
    setBestsellerOnly(false);
    setSelectedColors([]);
    setSelectedSizes([]);
    onFilterChange({});
  };

  const hasActiveFilters = selectedCategory || featuredOnly || bestsellerOnly || selectedColors.length > 0 || selectedSizes.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.slug ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleCategoryChange(category.slug)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Price Range</h4>
        <div className="px-2">
          <Slider
            min={0}
            max={50000}
            step={1000}
            value={priceRange}
            onValueChange={handlePriceRangeChange}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>₦{priceRange[0].toLocaleString()}</span>
            <span>₦{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Color</h4>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorToggle(color.name)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColors.includes(color.name)
                  ? 'border-primary scale-110 ring-2 ring-primary/50'
                  : 'border-gray-300 hover:scale-110'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
        {selectedColors.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedColors.map((color) => (
              <Badge key={color} variant="secondary" className="text-xs">
                {color}
                <button
                  onClick={() => handleColorToggle(color)}
                  className="ml-1 hover:text-destructive"
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Size Filter */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Size</h4>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <Badge
              key={size}
              variant={selectedSizes.includes(size) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleSizeToggle(size)}
            >
              {size}
            </Badge>
          ))}
        </div>
      </div>

      {/* Featured Filter */}
      <div className="space-y-2">
        <h4 className="font-medium text-sm">Special</h4>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={featuredOnly ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={handleFeaturedToggle}
          >
            Featured
          </Badge>
          <Badge
            variant={bestsellerOnly ? 'destructive' : 'outline'}
            className="cursor-pointer"
            onClick={handleBestsellerToggle}
          >
            Bestseller
          </Badge>
        </div>
      </div>
    </div>
  );
}
