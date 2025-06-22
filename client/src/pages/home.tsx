import { ProfileHeader } from "@/components/profile-header";
import { LinksList } from "@/components/links-list";
import { ShopifyProduct } from "@/components/shopify-product";
import linksConfig from "@/config/links.json";
import shopifyConfig from "@/config/shopify.json";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Enhanced Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100/40 via-orange-100/40 to-yellow-100/40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-red-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-orange-400/25 to-yellow-400/25 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-red-400/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-red-300/20 to-orange-300/20 rounded-full blur-2xl animate-bounce" style={{animationDuration: '3s'}} />
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 bg-gradient-to-r from-orange-300/15 to-yellow-300/15 rounded-full blur-xl animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}} />
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
          
          {/* Enhanced Footer */}
          <div className="text-center mt-12 mb-4">
            <div className="inline-block px-6 py-3 bg-white/70 backdrop-blur-sm rounded-full border border-white/40 shadow-lg">
              <p className="text-sm font-semibold text-foreground/80">Demonflare - Anime Collectibles Hub</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
