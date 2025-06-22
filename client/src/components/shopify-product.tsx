import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ShopifyConfig } from "@/types/config";

interface ShopifyProductProps {
  config: ShopifyConfig;
}

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  handle: string;
  dominantColor?: string;
}

export function ShopifyProduct({ config }: ShopifyProductProps) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchDemonflareProducts();
  }, []);

  const extractDominantColor = (imageSrc: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            resolve('rgb(248, 113, 113)');
            return;
          }
          
          // Use smaller canvas for better performance
          const size = 100;
          canvas.width = size;
          canvas.height = size;
          ctx.drawImage(img, 0, 0, size, size);
          
          const imageData = ctx.getImageData(0, 0, size, size);
          const data = imageData.data;
          
          // Color frequency map
          const colorMap = new Map<string, number>();
          
          // Sample pixels and count colors
          for (let i = 0; i < data.length; i += 16) { // Sample every 4th pixel
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const alpha = data[i + 3];
            
            // Skip transparent or very light pixels
            if (alpha < 200 || r + g + b > 650) continue;
            
            // Group similar colors together (reduce precision)
            const rGroup = Math.floor(r / 32) * 32;
            const gGroup = Math.floor(g / 32) * 32;
            const bGroup = Math.floor(b / 32) * 32;
            
            const colorKey = `${rGroup},${gGroup},${bGroup}`;
            colorMap.set(colorKey, (colorMap.get(colorKey) || 0) + 1);
          }
          
          if (colorMap.size === 0) {
            resolve('rgb(248, 113, 113)');
            return;
          }
          
          // Find the most frequent color
          let maxCount = 0;
          let dominantColor = 'rgb(248, 113, 113)';
          
          // Sort colors by frequency and pick the most vibrant one
          const sortedColors = Array.from(colorMap.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3); // Take top 3 colors
          
          // Choose the most vibrant color among top frequent ones
          for (const [color, count] of sortedColors) {
            const [r, g, b] = color.split(',').map(Number);
            
            // Calculate color vibrancy (saturation)
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            const saturation = max === 0 ? 0 : (max - min) / max;
            
            // Prefer colors with higher saturation and reasonable frequency
            if (count > maxCount * 0.7 && saturation > 0.3) {
              maxCount = count;
              dominantColor = `rgb(${r}, ${g}, ${b})`;
              break;
            }
          }
          
          // If no vibrant color found, use the most frequent one
          if (dominantColor === 'rgb(248, 113, 113)' && sortedColors.length > 0) {
            const [r, g, b] = sortedColors[0][0].split(',').map(Number);
            dominantColor = `rgb(${r}, ${g}, ${b})`;
          }
          
          console.log(`Extracted color: ${dominantColor} from ${sortedColors.length} color groups`);
          resolve(dominantColor);
        } catch (error) {
          console.error('Error extracting color:', error);
          resolve('rgb(248, 113, 113)');
        }
      };
      
      img.onerror = () => {
        resolve('rgb(248, 113, 113)');
      };
      
      // Use proxy to avoid CORS issues
      img.crossOrigin = 'anonymous';
      img.src = imageSrc;
    });
  };

  const fetchDemonflareProducts = async () => {
    try {
      // Fetch products from demonflare.com public API
      const response = await fetch('https://demonflare.com/products.json');
      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        // Select 4 random products
        const shuffled = data.products.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 4);
        
        // Extract dominant colors for each product
        const productsWithColors = await Promise.all(
          selectedProducts.map(async (product: any, index: number) => {
            const dominantColor = await extractDominantColor(product.images[0]?.src || '');
            console.log(`Product ${index}: ${product.title} - Color: ${dominantColor}`);
            return {
              id: product.id,
              title: product.title,
              price: `₹${product.variants[0]?.price || '0.00'}`,
              image: product.images[0]?.src || '',
              handle: product.handle,
              dominantColor
            };
          })
        );
        
        setProducts(productsWithColors);
      } else {
        setError('No products found');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products from demonflare.com');
      setLoading(false);
    }
  };

  const handlePurchase = (product: Product) => {
    // Open product page on demonflare.com
    window.open(`https://demonflare.com/products/${product.handle}`, '_blank');
  };

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToProduct = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold gradient-coral bg-clip-text text-transparent mb-8 text-center">Featured Products</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="relative"
      >
        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[200px] bg-card rounded-2xl shadow-lg p-4">
                <div className="animate-pulse">
                  <div className="w-full h-48 bg-muted rounded-xl mb-3"></div>
                  <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-card rounded-2xl shadow-lg p-6 text-center">
            <span className="text-3xl mb-4 block">⚠️</span>
            <p className="text-destructive mb-2">{error}</p>
            <p className="text-xs text-muted-foreground">
              Failed to load products from demonflare.com
            </p>
          </div>
        ) : products.length > 0 ? (
          <div className="relative -mx-4 px-4">
            {/* Horizontal Scrolling Carousel */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2" style={{ scrollBehavior: 'smooth' }}>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-[200px] flex-shrink-0 snap-start"
                >
                  <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl overflow-hidden transition-all duration-500 h-full hover:scale-105">
                    <div 
                      className="relative overflow-hidden"
                      style={{
                        background: product.dominantColor 
                          ? `linear-gradient(135deg, ${product.dominantColor.replace('rgb(', 'rgba(').replace(')', ', 0.15)')}, ${product.dominantColor.replace('rgb(', 'rgba(').replace(')', ', 0.05)')})` 
                          : 'linear-gradient(135deg, rgba(248, 113, 113, 0.15), rgba(255, 165, 0, 0.05))'
                      }}
                    >
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-48 object-contain p-2"
                      />
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: product.dominantColor 
                            ? `radial-gradient(circle at center bottom, ${product.dominantColor.replace('rgb(', 'rgba(').replace(')', ', 0.2)')}, transparent 70%)` 
                            : 'radial-gradient(circle at center bottom, rgba(248, 113, 113, 0.2), transparent 70%)'
                        }}
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-card-foreground mb-2 line-clamp-2 min-h-[2.5rem] leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-lg font-bold text-primary mb-3">
                        {product.price}
                      </p>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePurchase(product)}
                        className="w-full gradient-coral text-white text-sm font-bold py-3 px-4 rounded-2xl hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        View Product
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Scroll Indicator Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {products.map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 rounded-full bg-muted transition-colors"
                />
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground text-center mt-3">
              From demonflare.com • Swipe to explore more
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-2xl shadow-lg p-6 text-center">
            <span className="text-3xl mb-4 block">🛍️</span>
            <p className="text-muted-foreground">No products available</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
