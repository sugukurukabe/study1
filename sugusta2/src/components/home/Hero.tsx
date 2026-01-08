'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Sparkles, Globe, Zap, Trophy, Users, BookOpen } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const categories = [
    { title: "Agriculture", icon: "🌾", color: "from-green-500/20 to-emerald-500/20", description: "Master essential skills for the Agriculture exam." },
    { title: "Livestock", icon: "🐄", color: "from-amber-500/20 to-orange-500/20", description: "Comprehensive guide to Livestock management." },
    { title: "Food Service", icon: " Bento", color: "from-blue-500/20 to-indigo-500/20", description: "Excel in the Food Service & Restaurant industry." },
];

const tiers = [
    { name: "Tier 1 - Guest", icon: "🌱", color: "from-gray-400/10 to-gray-500/10", details: "Registration only. Access to video lectures." },
    { name: "Tier 2 - Learner", icon: "📖", color: "from-blue-400/20 to-brand-primary/20", details: "Social input. Learning history & badges." },
    { name: "Tier 3 - Verified", icon: "🏆", color: "from-brand-primary/40 to-brand-accent/40", details: "ID Verified. CBT Simulations & Scouts." },
];

function ParticleField() {
    const [particles, setParticles] = useState<any[]>([]);

    useEffect(() => {
        const p = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 20 + 10,
        }));
        setParticles(p);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-brand-accent/40"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
}

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

    return (
        <div ref={containerRef} className="relative">
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 overflow-hidden">
                <ParticleField />

                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none opacity-50" />

                <motion.div
                    style={{ opacity, scale }}
                    className="relative z-10 text-center px-4"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 mb-8">
                        <Sparkles className="w-4 h-4 text-brand-accent" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/40">Japan SSW Tier 2 Excellence</span>
                    </motion.div>

                    <h1 className="text-7xl md:text-[9rem] font-bold tracking-tight mb-8 font-outfit leading-none">
                        Sugu<span className="text-gradient drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">-Study</span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg md:text-2xl text-black/50 font-light leading-relaxed mb-16 px-4">
                        A premium, weightless learning ecosystem for your future in Japan.
                        <span className="block mt-4 text-sm tracking-widest uppercase opacity-40">Japanese · Vietnamese · Indonesian · English</span>
                    </p>
                </motion.div>

                {/* Floating Category Cards */}
                <div className="relative w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <CategoryCard key={cat.title} cat={cat} index={i} y1={y1} y2={y2} />
                    ))}
                </div>
            </section>

            {/* 3-Tier Comparison */}
            <section className="py-40 px-6 max-w-7xl mx-auto relative z-20">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-6">Tier Level-Up</h2>
                    <p className="text-black/40 max-w-xl mx-auto">Visualize your progress from guest to verified excellence.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "glass-panel rounded-[2.5rem] p-8 border-white/5 relative overflow-hidden group",
                                i === 2 ? "border-brand-primary/30 shadow-[0_0_50px_rgba(139,92,246,0.1)]" : ""
                            )}
                        >
                            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000", tier.color)} />
                            <div className="relative z-10">
                                <span className="text-4xl mb-6 block drop-shadow-lg">{tier.icon}</span>
                                <h3 className="text-2xl font-bold font-outfit mb-4">{tier.name}</h3>
                                <p className="text-black/40 text-sm leading-relaxed mb-8">{tier.details}</p>

                                <div className="flex gap-2">
                                    <div className="h-1 w-full bg-black/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: i === 0 ? "33%" : i === 1 ? "66%" : "100%" }}
                                            className="h-full bg-brand-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function CategoryCard({ cat, index, y1, y2 }: any) {
    const mouseX = useSpring(0, { stiffness: 500, damping: 50 });
    const mouseY = useSpring(0, { stiffness: 500, damping: 50 });

    function handleMouseMove({ currentTarget, clientX, clientY }: any) {
        let { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
    }

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

    return (
        <motion.div
            style={{
                y: index % 2 === 0 ? y1 : y2,
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            className="group glass-panel rounded-[3rem] p-10 aspect-[3/4] flex flex-col justify-end relative overflow-hidden cursor-pointer"
        >
            <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000", cat.color)} />

            <div className="relative z-10 translate-z-20">
                <span className="text-6xl mb-8 block drop-shadow-2xl">{cat.icon}</span>
                <h3 className="text-4xl font-bold font-outfit mb-4">{cat.title}</h3>
                <p className="text-black/30 text-base leading-relaxed">{cat.description}</p>
            </div>

            <div className="absolute top-10 right-10 w-16 h-16 rounded-full bg-black/5 border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
                <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="w-4 h-4 rounded-full bg-brand-accent blur-sm"
                />
            </div>
        </motion.div>
    );
}
