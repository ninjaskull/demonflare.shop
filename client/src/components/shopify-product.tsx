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
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
                <div className="animate-pulse">
                  <div className="w-full h-24 bg-gray-100 rounded-xl mb-2"></div>
                  <div className="h-2 bg-gray-100 rounded w-3/4 mb-1"></div>
                  <div className="h-2 bg-gray-100 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-gray-100 rounded"></div>
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
          <div className="grid grid-cols-3 gap-3">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handlePurchase(product)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md overflow-hidden transition-all duration-200 cursor-pointer"
              >
                <div 
                  className="relative overflow-hidden"
                  style={{
                    backgroundColor: product.dominantColor
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-24 object-contain p-1"
                  />
                </div>
                
                <div className="p-3">
                  <h3 className="font-medium text-xs text-gray-900 mb-1 line-clamp-2 min-h-[2rem] leading-tight">
                    {product.title}
                  </h3>
                  <p className="text-sm font-semibold text-purple-600 mb-2">
                    {product.price}
                  </p>
                  
                  <button className="w-full bg-purple-600 text-white font-medium py-1.5 px-2 rounded-full hover:bg-purple-700 transition-colors duration-200 text-xs">
                    Shop Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}