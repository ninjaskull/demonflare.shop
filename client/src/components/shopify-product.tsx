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
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDemonflareProduct();
  }, []);

  const fetchDemonflareProduct = async () => {
    try {
      // Fetch products from demonflare.com public API
      const response = await fetch('https://demonflare.com/products.json');
      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        // Select a random product
        const randomProduct = data.products[Math.floor(Math.random() * data.products.length)];
        
        setProduct({
          id: randomProduct.id,
          title: randomProduct.title,
          price: `₹${randomProduct.variants[0]?.price || '0.00'}`,
          image: randomProduct.images[0]?.src || '',
          handle: randomProduct.handle
        });
      } else {
        setError('No products found');
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading product:', err);
      setError('Failed to load product from demonflare.com');
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    if (product) {
      // Open product page on demonflare.com
      window.open(`https://demonflare.com/products/${product.handle}`, '_blank');
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4 text-center">Featured Product</h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="bg-card rounded-2xl shadow-lg overflow-hidden"
      >
        {loading ? (
          <div className="p-6 text-center">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-muted-foreground mt-4">Loading featured product...</p>
          </div>
        ) : error ? (
          <div className="p-6 text-center">
            <span className="text-3xl mb-4 block">⚠️</span>
            <p className="text-destructive mb-2">{error}</p>
            <p className="text-xs text-muted-foreground">
              Update your Shopify configuration in /src/config/shopify.json
            </p>
          </div>
        ) : product ? (
          <div className="p-0">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="font-semibold text-lg text-card-foreground mb-2">{product.title}</h3>
              <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePurchase}
                className="w-full gradient-primary text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                View Product
              </motion.button>
              
              <p className="text-xs text-muted-foreground mt-3 text-center">
                From demonflare.com
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <span className="text-3xl mb-4 block">🛍️</span>
            <p className="text-muted-foreground">No product available</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
