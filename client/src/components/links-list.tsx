import { motion } from "framer-motion";
import { LinkConfig } from "@/types/config";
import { Store, Instagram, Grid3X3, Music, Twitter, ExternalLink } from "lucide-react";
import { SiFacebook } from "react-icons/si";

interface LinksListProps {
  links: LinkConfig[];
}

const getIcon = (iconName: string) => {
  const iconMap = {
    store: Store,
    instagram: Instagram,
    grid: Grid3X3,
    facebook: SiFacebook,
    twitter: Twitter,
    music: Music,
  };
  
  return iconMap[iconName as keyof typeof iconMap] || ExternalLink;
};

export function LinksList({ links }: LinksListProps) {
  return (
    <div className="space-y-3 mb-8">
      {links.map((link, index) => {
        const IconComponent = getIcon(link.icon);
        
        return (
          <motion.a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: "easeOut",
              delay: index * 0.1 
            }}
            whileHover={{ 
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center w-full px-4 py-4 bg-white rounded-full shadow-sm hover:shadow-md text-gray-900 no-underline transition-all duration-200 border border-gray-100 group"
          >
            <div className="flex items-center space-x-3 w-full">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                <IconComponent size={18} className="text-gray-700" />
              </div>
              <span className="font-medium text-gray-900 flex-1">{link.title}</span>
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
