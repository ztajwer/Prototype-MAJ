"use client";

import { motion } from "framer-motion";
import { MajLogo } from "@/components/brand/MajLogo";

export function LogoMark() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <MajLogo
        background="light"
        height={140}
        priority
        imageClassName="rounded-lg bg-white p-2 shadow-maj-soft"
      />
    </motion.div>
  );
}
