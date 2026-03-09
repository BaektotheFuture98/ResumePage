'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface StatusBarProps {
  isLoading?: boolean;
}

export default function StatusBar({ isLoading = false }: StatusBarProps) {
  const [message, setMessage] = useState('Done');

  useEffect(() => {
    const messages = [
      'Done',
      'Opening page https://resume.dev/...',
      'Done',
      'Contacting host: resume.dev...',
      'Done',
    ];

    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="ie-statusbar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div className="flex items-center gap-1.5 overflow-hidden">
        <span className="text-xs overflow-hidden whitespace-nowrap text-ellipsis">{message}</span>
      </div>
      <div className="flex items-center gap-1 flex-shrink-0">
        {isLoading && (
          <motion.span
            className="text-xs"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            ⟳
          </motion.span>
        )}
        <span className="text-xs">🔒 Secure</span>
      </div>
    </motion.div>
  );
}
