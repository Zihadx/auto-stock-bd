"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
      {children}
    </motion.div>
  );
}
