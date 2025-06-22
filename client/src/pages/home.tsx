import { ProfileHeader } from "@/components/profile-header";
import { LinksList } from "@/components/links-list";
import { ShopifyProduct } from "@/components/shopify-product";
import linksConfig from "@/config/links.json";
import shopifyConfig from "@/config/shopify.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/25 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>
      
      {/* Main Container */}
      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-lg mx-auto overflow-hidden">
          
          {/* Profile Section */}
          <ProfileHeader profile={linksConfig.profile} />
          
          {/* Links Section */}
          <LinksList links={linksConfig.links} />
          
          {/* Shopify Product Section */}
          <ShopifyProduct config={shopifyConfig} />
          
          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground mt-8">
            <p>Demonflare - Anime Collectibles Hub</p>
          </div>
        </div>
      </div>
    </div>
  );
}
