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
      {/* Profile image with artistic background */}
      <motion.div 
        className="w-28 h-28 mx-auto mb-6 rounded-full overflow-hidden shadow-xl relative"
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)'
        }}
        whileHover={{ 
          scale: 1.05,
          rotate: [0, -2, 2, 0],
          transition: { duration: 0.4 }
        }}
      >
        {/* Artistic background patterns */}
        <div className="absolute inset-0">
          <div className="absolute top-2 right-2 w-3 h-3 bg-purple-200 rounded-full opacity-60"></div>
          <div className="absolute bottom-3 left-3 w-2 h-2 bg-blue-200 rounded-full opacity-50"></div>
          <div className="absolute top-1/2 left-1 w-1.5 h-1.5 bg-indigo-200 rounded-full opacity-40"></div>
          <div className="absolute bottom-1 right-1/3 w-1 h-1 bg-violet-200 rounded-full opacity-30"></div>
        </div>
        
        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle cx="20" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-purple-300"/>
            <circle cx="75" cy="70" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-300"/>
            <path d="M 10 80 Q 30 60 50 80" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-indigo-300"/>
          </svg>
        </div>
        
        <div className="w-full h-full flex items-center justify-center p-4 relative z-10">
          <img 
            src="https://cdn.shopify.com/s/files/1/0911/2528/5229/files/Favico.webp?v=1742737174" 
            alt="Demonflare Logo" 
            className="w-full h-full object-contain filter drop-shadow-sm"
          />
        </div>
        
        {/* Animated border glow */}
        <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-pulse"></div>
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
