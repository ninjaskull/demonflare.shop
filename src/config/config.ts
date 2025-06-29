export interface LinkConfig {
  title: string;
  url: string;
  icon: string;
  gradient: string;
}

export interface ProfileConfig {
  name: string;
  bio: string;
  avatar: string;
}

export interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  handle: string;
}

export interface ProductsConfig {
  featured: Product[];
}

export interface AppConfig {
  profile: ProfileConfig;
  links: LinkConfig[];
  products: ProductsConfig;
}

export const config: AppConfig = {
  profile: {
    name: "Demonflare",
    bio: "Anime Collectibles & Merchandise",
    avatar: "https://cdn.shopify.com/s/files/1/0626/6119/1023/files/Picsart_24-08-31_03-23-46-565.png?v=1725054854"
  },
  links: [
    {
      title: "Visit Our Store",
      url: "https://demonflare.com",
      icon: "store",
      gradient: "gradient-primary"
    },
    {
      title: "Instagram",
      url: "https://instagram.com/demonflare.shop",
      icon: "instagram",
      gradient: "gradient-secondary"
    },
    {
      title: "All Collections",
      url: "https://demonflare.com/collections",
      icon: "grid",
      gradient: "gradient-accent"
    },
    {
      title: "Twitter",
      url: "https://twitter.com/thedemonflare",
      icon: "twitter",
      gradient: "gradient-warning"
    },
    {
      title: "Facebook",
      url: "https://facebook.com/thedemonflare",
      icon: "facebook",
      gradient: "gradient-purple"
    },
    {
      title: "WhatsApp Support",
      url: "https://wa.me/917588993347",
      icon: "whatsapp",
      gradient: "gradient-success"
    }
  ],
  products: {
    featured: [
      {
        id: 1,
        title: "Demon Slayer Tanjiro Kamado Figure",
        price: "₹2,499",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
        handle: "demon-slayer-tanjiro-figure"
      },
      {
        id: 2,
        title: "Attack on Titan Eren Keychain",
        price: "₹599",
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=400&fit=crop&crop=center",
        handle: "attack-titan-eren-keychain"
      },
      {
        id: 3,
        title: "Naruto Uzumaki Poster Set",
        price: "₹899",
        image: "https://images.unsplash.com/photo-1578662015901-94769c4cbe88?w=400&h=400&fit=crop&crop=center",
        handle: "naruto-uzumaki-poster-set"
      },
      {
        id: 4,
        title: "One Piece Luffy Action Figure",
        price: "₹1,899",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center",
        handle: "one-piece-luffy-figure"
      }
    ]
  }
};