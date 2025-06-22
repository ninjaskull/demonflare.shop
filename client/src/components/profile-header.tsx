import { motion } from "framer-motion";
import { ProfileConfig } from "@/types/config";

interface ProfileHeaderProps {
  profile: ProfileConfig;
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-12"
    >
      {/* Clean circular profile image with white background */}
      <motion.div 
        className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-lg bg-white border-2 border-gray-100"
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        <div className="w-full h-full flex items-center justify-center p-3">
          <img 
            src="https://cdn.shopify.com/s/files/1/0911/2528/5229/files/Favico.webp?v=1742737174" 
            alt="Demonflare Logo" 
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
      
      {/* Clean name styling */}
      <motion.h1 
        className="text-2xl font-bold text-gray-900 mb-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {profile.name}
      </motion.h1>
      
      {/* Simple bio */}
      <motion.p 
        className="text-gray-600 text-sm font-medium mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {profile.bio}
      </motion.p>
    </motion.div>
  );
}
