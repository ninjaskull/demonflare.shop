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

export interface ShopifyConfig {
  domain: string;
  storefrontAccessToken: string;
  productIds: string[];
}

export interface AppConfig {
  profile: ProfileConfig;
  links: LinkConfig[];
  shopify: ShopifyConfig;
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
      url: "https://instagram.com/demonflare",
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
  shopify: {
    domain: "demonflare.myshopify.com",
    storefrontAccessToken: "6d32b2a9292e66b6a9b06e7d33a6fc01",
    productIds: ["7719568761983", "7719568925823", "7747488489599"]
  }
};