'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ViewCounter() {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const fetchViewCount = async () => {
      try {
        const response = await axios.get('/api/views');
        setViewCount(response.data.view_count);
      } catch (error) {
        console.error('Failed to fetch view count:', error);
      }
    };

    const incrementView = async () => {
      try {
        const response = await axios.post('/api/views');
        setViewCount(response.data.view_count);
      } catch (error) {
        console.error('Failed to increment view count:', error);
      }
    };

    incrementView();
    fetchViewCount();
  }, []);

  return (
    <motion.div
      className="bg-yellow-50 border-2 border-t-win-gray-dark border-l-win-gray-dark border-b-win-white border-r-win-white px-2.5 py-1.5 mb-4 flex justify-between items-center flex-wrap gap-1 font-mono text-sm flex-wrap gap-1"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span>📊 Visitors:</span>
      <motion.div
        className="flex gap-0.5"
        whileHover={{ scale: 1.1 }}
      >
        {String(viewCount).padStart(6, '0').split('').map((digit, i) => (
          <motion.span
            key={i}
            className="bg-black text-lime-400 px-1 font-mono text-sm min-w-4 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
          >
            {digit}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}
