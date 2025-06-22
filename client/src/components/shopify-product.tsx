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

  const getProductBackgroundColor = () => '#F9FAFB';

  const fetchDemonflareProducts = async () => {
    try {
      const response = await fetch('https://demonflare.com/products.json');
      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        const shuffled = data.products.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 4);
        
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
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="min-w-[200px] bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
                <div className="animate-pulse">
                  <div className="w-full h-48 bg-gray-100 rounded-xl mb-3"></div>
                  <div className="h-3 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <p className="text-red-500 mb-2 font-medium">{error}</p>
            <p className="text-xs text-gray-500">
              Failed to load products from demonflare.com
            </p>
          </div>
        ) : products.length > 0 ? (
          <div className="relative -mx-4 px-4">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2" style={{ scrollBehavior: 'smooth' }}>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-[200px] flex-shrink-0 snap-start"
                >
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md overflow-hidden transition-all duration-300 h-full hover:scale-105">
                    <div 
                      className="relative overflow-hidden"
                      style={{
                        backgroundColor: product.dominantColor
                      }}
                    >
                      <img 
                        src={product.image} 
                        alt={product.title} 
                        className="w-full h-48 object-contain p-2"
                      />
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 min-h-[2.5rem] leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-lg font-semibold text-purple-600 mb-3">
                        {product.price}
                      </p>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePurchase(product)}
                        className="w-full bg-purple-600 text-white font-medium py-2.5 px-4 rounded-full hover:bg-purple-700 transition-colors duration-200 text-sm"
                      >
                        Shop Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}