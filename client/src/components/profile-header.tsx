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
      {/* Clean circular profile image with eye-catching gradient */}
      <motion.div 
        className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-xl relative"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        <div className="w-full h-full bg-white/15 backdrop-blur-sm flex items-center justify-center relative z-10">
          <img 
            src="/demonflare-logo.webp" 
            alt="Demonflare Logo" 
            className="w-16 h-16 object-contain filter drop-shadow-md"
          />
        </div>
        {/* Animated glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-75 animate-pulse"></div>
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
