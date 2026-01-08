'use client';

import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface SmoothScrollLayoutProps {
    children: ReactNode;
}

export default function SmoothScrollLayout({ children }: SmoothScrollLayoutProps) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <AnimatePresence mode="wait">
                <motion.main
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="min-h-screen bg-[#070708] text-white selection:bg-purple-500/30"
                >
                    {children}
                </motion.main>
            </AnimatePresence>
        </ReactLenis>
    );
}
