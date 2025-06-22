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
      className="text-center mb-10"
    >
      {/* Profile logo with enhanced animation */}
      <motion.div 
        className="w-36 h-36 mx-auto mb-6 rounded-3xl p-3 gradient-coral shadow-2xl relative"
        whileHover={{ 
          scale: 1.05,
          rotate: [0, -2, 2, 0],
          transition: { duration: 0.3 }
        }}
      >
        <div className="w-full h-full rounded-3xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-inner">
          <img 
            src="/demonflare-logo.webp" 
            alt="Demonflare Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Animated ring effect */}
        <div className="absolute inset-0 rounded-3xl border-4 border-white/30 animate-pulse" />
      </motion.div>
      
      {/* Enhanced name styling */}
      <motion.h1 
        className="text-5xl font-black mb-4 relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-700 bg-clip-text text-transparent drop-shadow-lg">
          {profile.name}
        </span>
      </motion.h1>
      
      {/* Enhanced bio */}
      <motion.p 
        className="text-foreground/80 text-xl font-semibold px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-white/30 inline-block shadow-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {profile.bio}
      </motion.p>
    </motion.div>
  );
}
