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
      className="text-center mb-8"
    >
      {/* Profile avatar */}
      <div className="w-32 h-32 mx-auto mb-6 rounded-3xl p-1 gradient-coral shadow-xl">
        <div className="w-full h-full rounded-3xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <span className="text-4xl font-bold gradient-coral bg-clip-text text-transparent">{profile.avatar}</span>
        </div>
      </div>
      
      <h1 className="text-4xl font-bold gradient-coral bg-clip-text text-transparent mb-4">{profile.name}</h1>
      <p className="text-foreground/70 text-lg font-medium">{profile.bio}</p>
    </motion.div>
  );
}
