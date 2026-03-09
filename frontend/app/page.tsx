'use client';

import { motion } from 'framer-motion';
import React from 'react';
import TitleBar from '@/components/TitleBar';
import MenuBar from '@/components/MenuBar';
import ToolBar from '@/components/ToolBar';
import AddressBar from '@/components/AddressBar';
import StatusBar from '@/components/StatusBar';
import ResumeContent from '@/components/ResumeContent';
import ViewCounter from '@/components/ViewCounter';
import Marquee from '@/components/Marquee';

export default function Home() {
  return (
    <motion.div
      className="ie-window"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Title Bar */}
      <TitleBar title="Resume" />

      {/* Menu Bar */}
      <MenuBar />

      {/* Toolbar */}
      <ToolBar />

      {/* Address Bar */}
      <AddressBar />

      {/* Content Area */}
      <motion.div className="ie-content print:overflow-visible">
        <div className="print-hide">
          <ViewCounter />
          <Marquee />
        </div>
        
        <ResumeContent />
      </motion.div>

      {/* Status Bar */}
      <StatusBar />
    </motion.div>
  );
}
