'use client';

import { motion } from 'framer-motion';
import React from 'react';

export default function Marquee() {
  return (
    <motion.div
      className="bg-win-blue text-yellow-300 px-2 py-1 font-mono text-sm overflow-hidden whitespace-nowrap mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="inline-block"
        animate={{ x: [0, -1000] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        🎉 Welcome to my Resume Page! This site is best viewed in Internet Explorer 5.0 or higher. 📄 Click on my photo to upload a new profile picture! 🎨 JavaScript enabled for best experience! ✨
      </motion.div>
    </motion.div>
  );
}
