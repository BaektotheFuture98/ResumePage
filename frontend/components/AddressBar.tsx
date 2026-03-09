'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface AddressBarProps {
  url?: string;
}

export default function AddressBar({ url = 'https://resume.dev/' }: AddressBarProps) {
  return (
    <motion.div
      className="flex items-center gap-1.5 px-1.5 py-0.5 bg-win-gray border-b border-win-gray-dark flex-shrink-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <label className="text-xs font-normal whitespace-nowrap flex-shrink-0">Address</label>
      <input
        type="text"
        value={url}
        readOnly
        className="flex-1 min-w-0 bg-white px-1.5 py-0.5 text-xs font-mono win-field overflow-hidden text-ellipsis whitespace-nowrap"
        aria-label="Address bar"
      />
      <motion.button
        className="px-2 py-0.5 bg-win-gray text-xs cursor-pointer whitespace-nowrap flex-shrink-0 win-raised hover:opacity-80 active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
        whileTap={{ scale: 0.95 }}
        title="Go to address"
      >
        Go
      </motion.button>
    </motion.div>
  );
}
