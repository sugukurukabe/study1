"use client";

import Hero from "@/components/home/Hero";
import Navbar from "@/components/layout/Navbar";
import { BookOpen, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Navbar />

      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-6">Master the Exams</h2>
            <p className="text-black/40 text-lg">Specially designed courses for SSW Tier 2 candidates.</p>
          </div>
          <button className="px-8 py-4 rounded-full bg-black text-white font-bold hover:bg-brand-accent hover:text-white transition-colors">
            View All Courses
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="glass-panel h-96 rounded-[3rem] p-10 flex flex-col justify-end group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-black/5 mb-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-3xl font-bold font-outfit mb-2">SSW Agriculture {i === 1 ? "Level 1" : i === 2 ? "Level 2" : "Special Check"}</h3>
                <p className="text-black/30">Intensive curriculum for specialized workers.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Section with Glass Cards */}
      <section className="py-40 px-6 bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-bold font-outfit mb-10 leading-tight">
              Built for <span className="text-gradient">Every Learner</span>
            </h2>
            <div className="space-y-8">
              {[
                { title: "4 Languages", desc: "Japanese, Vietnamese, Indonesian, English support." },
                { title: "Offline First", desc: "Learn anywhere, even without internet access." },
                { title: "Gamified", desc: "Earn badges and keep your motivation high." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="mt-1 w-2 h-2 rounded-full bg-brand-accent ring-4 ring-brand-accent/20" />
                  <div>
                    <h4 className="text-2xl font-bold font-outfit mb-2">{item.title}</h4>
                    <p className="text-black/40 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-brand-primary/10 rounded-[4rem] blur-[100px]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 border border-white/5 rounded-[4rem]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-panel w-64 h-80 rounded-[3rem] shadow-[0_0_80px_rgba(0,0,0,0.5)] transform -rotate-12 hover:rotate-0 transition-transform duration-700 flex flex-col items-center justify-center p-8">
                <Zap className="w-20 h-20 text-brand-primary mb-6" />
                <span className="text-xs tracking-widest uppercase opacity-40">Ready to Start?</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-[20vh] bg-transparent" />
    </div>
  );
}
