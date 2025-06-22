import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShopifyConfig } from "@/types/config";

interface ShopifyProductProps {
  config: ShopifyConfig;
}

interface DemoProduct {
  title: string;
  price: string;
  image: string;
}

export function ShopifyProduct({ config }: ShopifyProductProps) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<DemoProduct | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeShopifyProduct();
  }, []);

  const initializeShopifyProduct = async () => {
    try {
      // Check if Shopify SDK is available
      if (typeof window.ShopifyBuy === 'undefined') {
        // Show demo product with configuration instructions
        setTimeout(() => {
          const demoProducts: DemoProduct[] = [
            {
              title: "Premium Coffee Blend",
              price: "$24.99",
              image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
            },
            {
              title: "Organic Face Cream",
              price: "$45.00",
              image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
            },
            {
              title: "Handmade Candle Set",
              price: "$32.50",
              image: "https://images.unsplash.com/photo-1602874801006-17f667b5043e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
            }
          ];
          
          const randomProduct = demoProducts[Math.floor(Math.random() * demoProducts.length)];
          setProduct(randomProduct);
          setLoading(false);
        }, 1000);
        return;
      }

      // Initialize Shopify client with provided configuration
      const client = window.ShopifyBuy.buildClient({
        domain: config.domain,
        storefrontAccessToken: config.storefrontAccessToken
      });

      // Select random product ID
      const randomProductId = config.productIds[
        Math.floor(Math.random() * config.productIds.length)
      ];

      // Fetch product from Shopify
      const shopifyProduct = await client.product.fetch(randomProductId);
      
      if (shopifyProduct) {
        setProduct({
          title: shopifyProduct.title,
          price: `$${shopifyProduct.variants[0].price.amount}`,
          image: shopifyProduct.images[0]?.src || ""
        });
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error loading Shopify product:', err);
      setError('Failed to load product. Please check your Shopify configuration.');
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    if (typeof window.ShopifyBuy !== 'undefined') {
      // TODO: Implement actual Shopify checkout flow
      alert('Shopify checkout would be implemented here');
    } else {
      alert('Configure your Shopify domain and access token in /src/config/shopify.json');
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
                Add to Cart
              </motion.button>
              
              <p className="text-xs text-muted-foreground mt-3 text-center">
                {typeof window.ShopifyBuy === 'undefined' 
                  ? 'Demo product - Configure Shopify for real functionality'
                  : 'Powered by Shopify'
                }
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
