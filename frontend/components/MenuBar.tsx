'use client';

import { motion } from 'framer-motion';
import React from 'react';

const menuItems = ['File', 'Edit', 'View', 'Go', 'Favorites', 'Tools', 'Help'];

export default function MenuBar() {
  return (
    <motion.div
      className="ie-menubar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      {menuItems.map((item, index) => (
        <motion.div
          key={item}
          className="px-2 py-0.5 text-xs cursor-pointer hover:bg-win-blue hover:text-white whitespace-nowrap transition-colors"
          whileHover={{ backgroundColor: '#000080', color: 'white' }}
          whileTap={{ scale: 0.95 }}
        >
          <u>{item[0]}</u>
          {item.slice(1)}
        </motion.div>
      ))}
    </motion.div>
  );
}
