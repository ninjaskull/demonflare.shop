import { motion } from "framer-motion";
import { LinkConfig } from "@/types/config";
import { Store, Instagram, Grid3X3, Music, Twitter, ExternalLink } from "lucide-react";
import { SiTiktok } from "react-icons/si";

interface LinksListProps {
  links: LinkConfig[];
}

const getIcon = (iconName: string) => {
  const iconMap = {
    store: Store,
    instagram: Instagram,
    grid: Grid3X3,
    tiktok: SiTiktok,
    twitter: Twitter,
    music: Music,
  };
  
  return iconMap[iconName as keyof typeof iconMap] || ExternalLink;
};

export function LinksList({ links }: LinksListProps) {
  return (
    <div className="space-y-4 mb-8">
      {links.map((link, index) => {
        const IconComponent = getIcon(link.icon);
        
        return (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: "easeOut",
              delay: index * 0.1 
            }}
            whileHover={{ 
              y: -3,
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className="block w-full p-6 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl text-center text-card-foreground no-underline relative overflow-hidden group transition-all duration-300 border border-white/30"
          >
            <div className="flex items-center justify-center space-x-4 relative z-10">
              <div className="p-2 rounded-xl bg-white/50 backdrop-blur-sm shadow-md group-hover:scale-110 transition-transform duration-300">
                <IconComponent size={28} className="text-foreground drop-shadow-sm" />
              </div>
              <span className="font-bold text-xl text-foreground">{link.title}</span>
            </div>
            
            {/* Enhanced gradient overlay on hover */}
            <div className={`absolute inset-0 ${link.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-all duration-300`} />
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/30 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            
            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/40 transition-all duration-300" />
          </motion.a>
        );
      })}
    </div>
  );
}
