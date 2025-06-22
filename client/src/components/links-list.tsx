import { motion } from "framer-motion";
import { LinkConfig } from "@/types/config";

interface LinksListProps {
  links: LinkConfig[];
}

export function LinksList({ links }: LinksListProps) {
  return (
    <div className="space-y-4 mb-8">
      {links.map((link, index) => (
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
            y: -2,
            transition: { duration: 0.2 }
          }}
          className="block w-full p-5 bg-card/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-primary/20 hover:border-primary/40 text-center text-card-foreground no-underline relative overflow-hidden group transition-all duration-300"
        >
          <div className="flex items-center justify-center space-x-4 relative z-10">
            <span className="text-2xl filter drop-shadow-lg">{link.icon}</span>
            <span className="font-bold text-lg">{link.title}</span>
          </div>
          
          {/* Animated gradient overlay on hover */}
          <div className={`absolute inset-0 ${link.gradient} opacity-0 group-hover:opacity-15 rounded-2xl transition-all duration-500`} />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12 animate-pulse" />
        </motion.a>
      ))}
    </div>
  );
}
