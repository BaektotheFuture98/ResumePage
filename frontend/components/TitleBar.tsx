'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface TitleBarProps {
  title: string;
}

export default function TitleBar({ title }: TitleBarProps) {
  return (
    <motion.div
      className="ie-titlebar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-1 flex-1 min-w-0 overflow-hidden">
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="7" fill="#4169E1" />
          <text x="4" y="12" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">e</text>
        </svg>
        <span className="text-xs font-bold whitespace-nowrap overflow-hidden text-ellipsis text-shadow">
          RESUME : {title} - Microsoft Internet Explorer
        </span>
      </div>
      <div className="flex gap-0.5 flex-shrink-0">
        <button
          className="w-4.5 h-4.5 bg-win-gray border-2 border-t border-l border-t-win-white border-l-win-white border-b-win-gray-darker border-r-win-gray-darker flex items-center justify-center text-xs font-bold cursor-pointer hover:opacity-80 active:border-b-white active:border-r-white active:border-t-win-gray-darker active:border-l-win-gray-darker"
          aria-label="Minimize"
          title="Minimize"
        >
          _
        </button>
        <button
          className="w-4.5 h-4.5 bg-win-gray border-2 border-t border-l border-t-win-white border-l-win-white border-b-win-gray-darker border-r-win-gray-darker flex items-center justify-center text-xs font-bold cursor-pointer hover:opacity-80 active:border-b-white active:border-r-white active:border-t-win-gray-darker active:border-l-win-gray-darker"
          aria-label="Maximize"
          title="Maximize"
        >
          □
        </button>
        <button
          className="w-4.5 h-4.5 bg-win-gray border-2 border-t border-l border-t-win-white border-l-win-white border-b-win-gray-darker border-r-win-gray-darker flex items-center justify-center text-xs font-bold cursor-pointer hover:opacity-80 active:border-b-white active:border-r-white active:border-t-win-gray-darker active:border-l-win-gray-darker"
          aria-label="Close"
          title="Close window"
        >
          ×
        </button>
      </div>
    </motion.div>
  );
}
