'use client';

import { motion } from 'framer-motion';
import { Home, BookOpen, User, Menu } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

const navItems = [
    { name: 'Learn', icon: BookOpen, href: '/courses' },
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Profile', icon: User, href: '/profile' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [lang, setLang] = useState('JA');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={cn(
                    "glass-panel pointer-events-auto flex items-center gap-2 p-2 rounded-full",
                    scrolled ? "bg-white/60 scale-95" : "bg-black/5 scale-100"
                )}
            >
                {navItems.map((item) => (
                    <Link key={item.name} href={item.href} className="group relative">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full transition-colors hover:bg-white/10"
                        >
                            <item.icon className="w-5 h-5 text-black/70 group-hover:text-brand-accent transition-colors" />
                            <span className="text-sm font-medium text-black/70 group-hover:text-black transition-colors">
                                {item.name}
                            </span>
                        </motion.div>
                    </Link>
                ))}
                <div className="w-px h-6 bg-black/10 mx-1" />
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setLang(l => l === 'JA' ? 'EN' : 'JA')}
                    className="px-3 py-1 rounded-full text-xs font-bold border border-black/10 hover:bg-black/5 transition-colors text-black/50 hover:text-black"
                >
                    {lang}
                </motion.button>
                <div className="w-px h-6 bg-black/10 mx-1" />
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-brand-primary/20 hover:bg-brand-primary/40 transition-colors"
                >
                    <Menu className="w-5 h-5 text-brand-primary" />
                </motion.button>
            </motion.div>
        </nav>
    );
}
