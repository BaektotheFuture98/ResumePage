'use client';

import { motion } from 'framer-motion';
import React from 'react';

const toolbarItems = [
  { icon: '⬅️', label: 'Back' },
  { icon: '➡️', label: 'Forward' },
  { icon: '🛑', label: 'Stop' },
  { icon: '🔄', label: 'Refresh' },
  { icon: '🏠', label: 'Home' },
  { icon: '🔎', label: 'Search' },
  { icon: '❤️', label: 'Favorites' },
  { icon: '📋', label: 'History' },
  { icon: '🖨️', label: 'Print' },
];

export default function ToolBar() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      className="ie-toolbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      {toolbarItems.map((item, index) => (
        <motion.button
          key={item.label}
          className="flex flex-col items-center px-1.5 py-0.5 cursor-pointer text-xs border border-transparent bg-transparent hover:border-2 hover:border-t-win-white hover:border-l-win-white hover:border-b-win-gray-darker hover:border-r-win-gray-darker active:border-t-win-gray-darker active:border-l-win-gray-darker active:border-b-win-white active:border-r-win-white whitespace-nowrap transition-all min-w-11"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={item.label === 'Print' ? handlePrint : undefined}
          title={item.label}
        >
          <span className="text-base leading-none mb-0.5">{item.icon}</span>
          <span className="text-xs">{item.label}</span>
        </motion.button>
      ))}
      <div className="w-px h-7 bg-win-gray-dark border-r border-win-white mx-0.5 flex-shrink-0" />
    </motion.div>
  );
}
