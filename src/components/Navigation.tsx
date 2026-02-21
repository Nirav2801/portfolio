"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROFILE, NAV_LINKS } from "../data/constants";

interface NavigationProps {
  onNavClick: (id: string) => void;
  onHomeClick: () => void;
}

export default function Navigation({
  onNavClick,
  onHomeClick,
}: NavigationProps) {
  return (
    <motion.nav
      className="fixed bottom-6 md:bottom-auto md:top-6 left-1/2 z-40 bg-white/80 backdrop-blur-2xl text-stone-900 pl-6 pr-2 py-2 rounded-full shadow-2xl border border-white/50 flex items-center gap-1 md:gap-2 max-w-[calc(100vw-32px)] md:max-w-none overflow-x-auto no-scrollbar"
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <button
        onClick={onHomeClick}
        className="font-display font-bold tracking-tight pr-4 border-r border-stone-200 hover:text-blue-600 transition-colors mr-2 text-lg"
      >
        {PROFILE.name.charAt(0)}.
      </button>
      {NAV_LINKS.map((link) => (
        <button
          key={link.label}
          onClick={() => onNavClick(link.href.replace("#", ""))}
          className="px-4 py-2 rounded-full text-sm font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-all whitespace-nowrap"
        >
          {link.label}
        </button>
      ))}
    </motion.nav>
  );
}
