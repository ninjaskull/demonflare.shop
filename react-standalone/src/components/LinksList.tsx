import { motion } from "framer-motion";
import { LinkConfig } from "../config/config";
import { Store, Instagram, Grid3X3, Music, Twitter, ExternalLink } from "lucide-react";
import { SiFacebook, SiWhatsapp } from "react-icons/si";

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
    whatsapp: SiWhatsapp,
    music: Music,
  };
  
  return iconMap[iconName as keyof typeof iconMap] || ExternalLink;
};

export default function LinksList({ links }: LinksListProps) {
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
            className={`${link.gradient} block w-full p-4 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-3">
              <IconComponent className="w-5 h-5" />
              <span>{link.title}</span>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}