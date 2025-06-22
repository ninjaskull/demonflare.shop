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
          className="block w-full p-6 bg-white/60 backdrop-blur-md rounded-3xl shadow-lg hover:shadow-xl text-center text-card-foreground no-underline relative overflow-hidden group transition-all duration-500"
        >
          <div className="flex items-center justify-center space-x-4 relative z-10">
            <span className="text-3xl filter drop-shadow-sm">{link.icon}</span>
            <span className="font-bold text-xl text-foreground">{link.title}</span>
          </div>
          
          {/* Soft gradient overlay on hover */}
          <div className={`absolute inset-0 ${link.gradient} opacity-0 group-hover:opacity-30 rounded-3xl transition-all duration-500`} />
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
        </motion.a>
      ))}
    </div>
  );
}
