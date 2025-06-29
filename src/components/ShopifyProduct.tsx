import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { ShopifyConfig } from "../config/config";
import { useIsMobile } from "../hooks/useIsMobile";

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

export default function ShopifyProduct({ config }: ShopifyProductProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      // Try Shopify Storefront API first
      const query = `
        query getProducts($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on Product {
              id
              title
              handle
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 1) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
            }
          }
        }
      `;

      const productGids = config.productIds.map(id => `gid://shopify/Product/${id}`);

      const response = await fetch(`https://${config.domain}/api/2023-04/graphql.json`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': config.storefrontAccessToken,
        },
        body: JSON.stringify({
          query,
          variables: {
            ids: productGids
          }
        }),
      });

      const data = await response.json();
      
      if (data.data && data.data.nodes && data.data.nodes.length > 0) {
        const fetchedProducts = data.data.nodes
          .filter((product: any) => product !== null)
          .map((product: any) => ({
            id: parseInt(product.id.split('/').pop()),
            title: product.title,
            price: `₹${parseFloat(product.priceRange.minVariantPrice.amount).toFixed(0)}`,
            image: product.images.edges[0]?.node.originalSrc || '',
            handle: product.handle,
          }));

        if (fetchedProducts.length > 0) {
          setProducts(fetchedProducts);
          return;
        }
      }

      // If Shopify API fails, log the error for debugging
      console.error('Shopify API returned no products or failed');
      throw new Error('Shopify API failed to return products');
    } catch (error) {
      console.error('Error fetching products:', error);
      
      // Last fallback: Use hardcoded featured products
      const fallbackProducts = [
        {
          id: 1,
          title: "Demon Slayer Tanjiro Figure",
          price: "₹2,499",
          image: "https://cdn.shopify.com/s/files/1/0626/6119/1023/products/demon-slayer-tanjiro.jpg?v=1650000000",
          handle: "demon-slayer-tanjiro-figure"
        },
        {
          id: 2,
          title: "Attack on Titan Eren Keychain",
          price: "₹599",
          image: "https://cdn.shopify.com/s/files/1/0626/6119/1023/products/attack-titan-eren.jpg?v=1650000000",
          handle: "attack-titan-eren-keychain"
        },
        {
          id: 3,
          title: "Naruto Uzumaki Poster Set",
          price: "₹899",
          image: "https://cdn.shopify.com/s/files/1/0626/6119/1023/products/naruto-poster-set.jpg?v=1650000000",
          handle: "naruto-uzumaki-poster-set"
        }
      ];
      
      setProducts(fallbackProducts);
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = (product: Product) => {
    window.open(`https://${config.domain.replace('.myshopify.com', '.com')}/products/${product.handle}`, '_blank');
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

  if (loading) {
    return (
      <motion.div 
        className="bg-white rounded-2xl p-6 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Featured Products</h2>
        <div className="flex space-x-4 justify-center">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-24 h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </motion.div>
    );
  }

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
                  className="w-full h-full object-contain"
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