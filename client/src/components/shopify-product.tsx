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
          <div className="relative">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl">
              {/* Fade overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
              
              {/* Products Container */}
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 200}px)` }}
              >
                {products.map((product, index) => {
                  const isActive = index === currentIndex;
                  const isVisible = index >= currentIndex - 1 && index <= currentIndex + 2;
                  
                  if (!isVisible) return null;
                  
                  return (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="w-48 flex-shrink-0 p-2"
                    >
                      <div 
                        className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 cursor-pointer ${
                          isActive ? 'shadow-lg scale-105 ring-2 ring-purple-100' : 'hover:shadow-md hover:scale-102'
                        }`}
                        onClick={() => handlePurchase(product)}
                      >
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
                          
                          <button className="w-full bg-purple-600 text-white font-medium py-2 px-4 rounded-full hover:bg-purple-700 transition-colors duration-200 text-sm">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={prevProduct}
                disabled={currentIndex === 0}
                className="ml-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-20"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={nextProduct}
                disabled={currentIndex >= products.length - 1}
                className="mr-2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-20"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center space-x-2 mt-4">
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