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
      <div className="w-24 h-24 mx-auto mb-4 rounded-full p-1 gradient-primary">
        <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">{profile.avatar}</span>
        </div>
      </div>
      
      <h1 className="text-2xl font-bold text-foreground mb-2">{profile.name}</h1>
      <p className="text-muted-foreground text-sm">{profile.bio}</p>
    </motion.div>
  );
}
