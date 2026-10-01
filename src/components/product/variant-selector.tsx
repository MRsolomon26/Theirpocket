'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Variant {
  id: string;
  sku: string;
  size?: string;
  colour?: string;
  price: number;
  stock: number;
  images?: string[];
}

interface VariantSelectorProps {
  variants: Variant[];
  onVariantChange: (variant: Variant) => void;
}

export function VariantSelector({ variants, onVariantChange }: VariantSelectorProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _variant = variants[0];
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
    onVariantChange(variant);
  };

  // Group variants by size and colour
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];
  const colours = [...new Set(variants.map((v) => v.colour).filter(Boolean))];

  return (
    <div className="space-y-4">
      {sizes.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Size</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const variant = variants.find((v) => v.size === size);
              const isSelected = selectedVariant.size === size;
              const isOutOfStock = variant?.stock === 0;

              return (
                <Button
                  key={size}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  disabled={isOutOfStock}
                  onClick={() => variant && handleVariantSelect(variant)}
                  className={isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  {size}
                  {isOutOfStock && <span className="ml-1 text-xs">(Out)</span>}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {colours.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Colour</h3>
          <div className="flex flex-wrap gap-2">
            {colours.map((colour) => {
              const variant = variants.find((v) => v.colour === colour);
              const isSelected = selectedVariant.colour === colour;
              const isOutOfStock = variant?.stock === 0;

              return (
                <Button
                  key={colour}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  disabled={isOutOfStock}
                  onClick={() => variant && handleVariantSelect(variant)}
                  className={isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  {colour}
                  {isOutOfStock && <span className="ml-1 text-xs">(Out)</span>}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fallback for variants without size/colour */}
      {sizes.length === 0 && colours.length === 0 && variants.length > 1 && (
        <div className="space-y-2">
          <h3 className="font-medium text-sm">Variant</h3>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant) => {
              const isSelected = selectedVariant.id === variant.id;
              const isOutOfStock = variant.stock === 0;

              return (
                <Button
                  key={variant.id}
                  variant={isSelected ? 'default' : 'outline'}
                  size="sm"
                  disabled={isOutOfStock}
                  onClick={() => handleVariantSelect(variant)}
                  className={isOutOfStock ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  {variant.sku}
                  {isOutOfStock && <span className="ml-1 text-xs">(Out)</span>}
                </Button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
