import { ProfileHeader } from "@/components/profile-header";
import { LinksList } from "@/components/links-list";
import { ShopifyProduct } from "@/components/shopify-product";
import linksConfig from "@/config/links.json";
import shopifyConfig from "@/config/shopify.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 pointer-events-none" />
      
      {/* Main Container */}
      <div className="relative z-10 min-h-screen py-8 px-4">
        <div className="max-w-md mx-auto overflow-hidden">
          
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
