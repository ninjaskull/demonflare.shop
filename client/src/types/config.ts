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
