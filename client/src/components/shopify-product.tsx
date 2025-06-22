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
      // Fetch products from demonflare.com public API
      const response = await fetch('https://demonflare.com/products.json');
      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        // Select 4 random products
        const shuffled = data.products.sort(() => 0.5 - Math.random());
        const selectedProducts = shuffled.slice(0, 4).map((product: any) => ({
          id: product.id,
          title: product.title,
          price: `₹${product.variants[0]?.price || '0.00'}`,
          image: product.images[0]?.src || '',
          handle: product.handle
        }));
        
        setProducts(selectedProducts);
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
      <h2 className="text-lg font-semibold text-foreground mb-4 text-center">Featured Products</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="relative"
      >
        {loading ? (
          <div className="bg-card rounded-2xl shadow-lg p-6 text-center">
            <div className="animate-pulse">
              <div className="w-full h-64 bg-muted rounded-xl mb-4"></div>
              <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-muted-foreground mt-4">Loading featured products...</p>
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
          <>
            {/* Main Product Display */}
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src={products[currentIndex].image} 
                  alt={products[currentIndex].title} 
                  className="w-full h-72 object-cover"
                />
                
                {/* Navigation Arrows */}
                {products.length > 1 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={prevProduct}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={nextProduct}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-2">
                  {products[currentIndex].title}
                </h3>
                <p className="text-2xl font-bold text-primary mb-4">
                  {products[currentIndex].price}
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePurchase(products[currentIndex])}
                  className="w-full gradient-primary text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
                >
                  View Product
                </motion.button>
                
                <p className="text-xs text-muted-foreground mt-3 text-center">
                  From demonflare.com
                </p>
              </div>
            </div>
            
            {/* Product Thumbnails */}
            {products.length > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                {products.map((product, index) => (
                  <motion.button
                    key={product.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => goToProduct(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex 
                        ? 'border-primary shadow-lg' 
                        : 'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
            
            {/* Product Counter */}
            {products.length > 1 && (
              <div className="text-center mt-3">
                <p className="text-xs text-muted-foreground">
                  {currentIndex + 1} of {products.length} products
                </p>
              </div>
            )}
          </>
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
