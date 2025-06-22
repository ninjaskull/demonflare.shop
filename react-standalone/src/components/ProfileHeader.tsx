import { motion } from "framer-motion";
import { ProfileConfig } from "../config/config";

interface ProfileHeaderProps {
  profile: ProfileConfig;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-4"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
        />
      </motion.div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{profile.name}</h1>
      <p className="text-gray-600">{profile.bio}</p>
    </motion.div>
  );
}