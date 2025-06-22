import { useState, useEffect } from "react";
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

  const getProductBackgroundColor = () => '#e9e9e9';

  const fetchDemonflareProducts = async () => {
    try {
      const response = await fetch('https://demonflare.com/products.json');
      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        const shuffled = data.products.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 6);
        
        const productsWithColors = selectedProducts.map((product: any) => ({
          id: product.id,
          title: product.title,
          price: `₹${product.variants[0]?.price || '0.00'}`,
          image: product.images[0]?.src || '',
          handle: product.handle,
          dominantColor: getProductBackgroundColor()
        }));
        
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
    window.open(`https://demonflare.com/products/${product.handle}`, '_blank');
  };

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">Featured Products</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="relative"
      >
        {loading ? (
          <div className="relative h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <p className="text-red-500 mb-2 font-medium">{error}</p>
            <p className="text-xs text-gray-500">
              Failed to load products from demonflare.com
            </p>
          </div>
        ) : products.length > 0 ? (
          <div className="relative h-80 overflow-hidden perspective-1000">
            <div className="relative w-full h-full preserve-3d">
              {products.map((product, index) => {
                const angle = (index / products.length) * 360;
                const isActive = index === currentIndex;
                const nextIndex = (currentIndex + 1) % products.length;
                const prevIndex = (currentIndex - 1 + products.length) % products.length;
                
                let zIndex = 1;
                let scale = 0.8;
                let opacity = 0.6;
                
                if (isActive) {
                  zIndex = 10;
                  scale = 1;
                  opacity = 1;
                } else if (index === nextIndex || index === prevIndex) {
                  zIndex = 5;
                  scale = 0.9;
                  opacity = 0.8;
                }
                
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, rotateY: angle }}
                    animate={{ 
                      opacity,
                      scale,
                      rotateY: angle - (currentIndex * (360 / products.length)),
                      z: isActive ? 50 : 0
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: "easeInOut"
                    }}
                    whileHover={{ 
                      scale: isActive ? 1.05 : scale,
                      z: isActive ? 60 : 10
                    }}
                    onClick={() => {
                      if (isActive) {
                        handlePurchase(product);
                      } else {
                        setCurrentIndex(index);
                      }
                    }}
                    className="absolute top-1/2 left-1/2 w-48 cursor-pointer"
                    style={{
                      transform: `translate(-50%, -50%) rotateY(${angle - (currentIndex * (360 / products.length))}deg) translateZ(120px)`,
                      zIndex,
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl">
                      <div 
                        className="relative overflow-hidden h-32"
                        style={{
                          backgroundColor: product.dominantColor
                        }}
                      >
                        <img 
                          src={product.image} 
                          alt={product.title} 
                          className="w-full h-full object-contain p-2"
                        />
                        {isActive && (
                          <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                            Featured
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] leading-tight">
                          {product.title}
                        </h3>
                        <p className="text-lg font-semibold text-purple-600 mb-3">
                          {product.price}
                        </p>
                        
                        {isActive && (
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-full hover:bg-purple-700 transition-colors duration-200 text-sm"
                          >
                            Shop Now
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none">
              <button
                onClick={prevProduct}
                className="pointer-events-auto ml-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              
              <button
                onClick={nextProduct}
                className="pointer-events-auto mr-4 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-20"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            
            {/* Dots indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-purple-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}