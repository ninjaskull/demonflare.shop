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
      <div className="w-28 h-28 mx-auto mb-6 rounded-full p-1 gradient-neon shadow-2xl shadow-primary/50">
        <div className="w-full h-full rounded-full bg-card flex items-center justify-center border-2 border-primary/30">
          <span className="text-3xl font-bold gradient-cyber bg-clip-text text-transparent">{profile.avatar}</span>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold gradient-cyber bg-clip-text text-transparent mb-3">{profile.name}</h1>
      <p className="text-muted-foreground text-base">{profile.bio}</p>
    </motion.div>
  );
}
