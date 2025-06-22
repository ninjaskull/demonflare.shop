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
          className="block w-full p-4 bg-card rounded-2xl shadow-md hover:shadow-xl text-center text-card-foreground no-underline relative overflow-hidden group"
        >
          <div className="flex items-center justify-center space-x-3 relative z-10">
            <span className="text-xl">{link.icon}</span>
            <span className="font-semibold">{link.title}</span>
          </div>
          
          {/* Gradient overlay on hover */}
          <div className={`absolute inset-0 ${link.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
        </motion.a>
      ))}
    </div>
  );
}
