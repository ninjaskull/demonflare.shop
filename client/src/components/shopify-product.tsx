import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
}

export function ShopifyProduct({ config }: ShopifyProductProps) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchDemonflareProducts();
  }, []);

  const fetchDemonflareProducts = async () => {
    try {
      const response = await fetch('https://demonflare.com/products.json');
      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        const shuffled = data.products.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 3);
        
        const productsWithFormattedPrice = selectedProducts.map((product: any) => ({
          id: product.id,
          title: product.title,
          price: `₹${product.variants[0]?.price || '0.00'}`,
          image: product.images[0]?.src || '',
          handle: product.handle,
        }));
        
        setProducts(productsWithFormattedPrice);
      } else {
        setError('No products found');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('Failed to load products');
      setLoading(false);
    }
  };

  const handlePurchase = (product: Product) => {
    window.open(`https://demonflare.com/products/${product.handle}`, '_blank');
  };

  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 gap-3">
        {products.slice(0, 2).map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1 
            }}
            whileHover={{ y: -2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group cursor-pointer"
            onClick={() => handlePurchase(product)}
          >
            <div className="flex">
              <div className="w-20 h-20 bg-gray-50 flex items-center justify-center flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              
              <div className="flex-1 p-4 flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 text-sm truncate pr-2">
                    {product.title}
                  </h3>
                  <p className="text-purple-600 font-semibold text-sm mt-1">
                    {product.price}
                  </p>
                </div>
                
                <div className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-purple-100 flex items-center justify-center transition-colors duration-200 flex-shrink-0">
                  <svg className="w-3 h-3 text-gray-600 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}