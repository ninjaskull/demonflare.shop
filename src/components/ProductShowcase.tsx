import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Product } from "../config/config";
import { useIsMobile } from "../hooks/useIsMobile";

interface ProductShowcaseProps {
  products: Product[];
}

export default function ProductShowcase({ products }: ProductShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();

  const handlePurchase = (product: Product) => {
    window.open(`https://demonflare.com/products/${product.handle}`, '_blank');
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  const getVisibleProducts = () => {
    if (products.length === 0) return [];
    
    const visibleCount = isMobile ? 2 : 3;
    const visibleProducts = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % products.length;
      visibleProducts.push(products[index]);
    }
    
    return visibleProducts;
  };

  if (products.length === 0) {
    return null;
  }

  const visibleProducts = getVisibleProducts();

  return (
    <motion.div 
      className="bg-white rounded-2xl p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Featured Products</h2>
      
      <div className="relative">
        <div className="flex space-x-4 justify-center items-center">
          {visibleProducts.map((product, idx) => (
            <motion.div
              key={`${product.id}-${idx}`}
              className={`flex-shrink-0 ${idx === 0 ? 'opacity-100' : 'opacity-60'} transition-opacity duration-300`}
              style={{ width: isMobile ? '120px' : '100px' }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div 
                className="rounded-lg overflow-hidden mb-2 aspect-square flex items-center justify-center p-2"
                style={{ backgroundColor: '#e9e9e9' }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover rounded"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xs font-medium text-gray-800 mb-1 line-clamp-2 text-center">
                {product.title}
              </h3>
              <p className="text-sm font-bold text-purple-600 mb-2 text-center">
                {product.price}
              </p>
              <motion.button
                onClick={() => handlePurchase(product)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs py-2 px-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 flex items-center justify-center space-x-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ShoppingCart className="w-3 h-3" />
                <span>Buy</span>
              </motion.button>
            </motion.div>
          ))}
        </div>

        {products.length > (isMobile ? 2 : 3) && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </>
        )}
      </div>

      {products.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}