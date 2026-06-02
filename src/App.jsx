import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Stethoscope, ArrowRight, Sparkles, Shield, Calendar, Plus } from 'lucide-react';

const Cloud3D = ({ delay, duration, top, scale, opacity }) => (
  <motion.div
    initial={{ x: '-30%', opacity: 0 }}
    animate={{ 
      x: ['-30%', '130%'],
      opacity: [0, opacity, opacity, 0],
      y: [0, 20, 0]
    }}
    transition={{
      x: { duration, repeat: Infinity, delay, ease: "linear" },
      opacity: { duration, repeat: Infinity, delay, ease: "linear" },
      y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }}
    className="absolute pointer-events-none"
    style={{ top }}
  >
    <div style={{ transform: `scale(${scale})` }}>
      <div className="w-96 h-48 bg-white/20 rounded-full blur-[80px]" />
    </div>
  </motion.div>
);

const FloatingIcon = ({ delay }) => (
  <motion.div
    animate={{ 
      opacity: [0, 0.4, 0],
      scale: [0.5, 1, 0.5],
      y: [-20, -120],
      x: Math.random() * 50 - 25
    }}
    transition={{ duration: 5, repeat: Infinity, delay, ease: "easeOut" }}
    className="absolute text-white/20 pointer-events-none"
    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
  >
    <Plus size={20} />
  </motion.div>
);

export default function App() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(useSpring(y, { stiffness: 100, damping: 30 }), [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(useSpring(x, { stiffness: 100, damping: 30 }), [-0.5, 0.5], ["-15deg", "15deg"]);

  return (
    <div 
      className="relative min-h-screen w-full sky-gradient overflow-hidden flex items-center justify-center font-sans"
      onMouseMove={(e) => {
        x.set(e.clientX / window.innerWidth - 0.5);
        y.set(e.clientY / window.innerHeight - 0.5);
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-yellow-200/10 rounded-full blur-[150px]" />
        <Cloud3D top="10%" duration={40} delay={0} scale={2} opacity={0.3} />
        <Cloud3D top="40%" duration={55} delay={5} scale={3} opacity={0.2} />
        <Cloud3D top="70%" duration={35} delay={15} scale={1.5} opacity={0.4} />
        {[...Array(10)].map((_, i) => <FloatingIcon key={i} delay={i * 1.2} />)}
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-3 rounded-2xl shadow-lg shadow-primary/20">
            <Stethoscope className="text-white w-7 h-7" />
          </div>
          <span className="text-2xl font-black text-white">ClinicFlow</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white/80 font-bold">
          <a href="#" className="hover:text-white transition-colors">Υπηρεσίες</a>
          <a href="#" className="hover:text-white transition-colors">Τιμές</a>
          <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-xl border border-white/10 backdrop-blur-md">
            Σύνδεση
          </button>
        </div>
      </nav>

      <motion.div 
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative z-10 flex flex-col items-center text-center px-4"
      >
        <motion.div style={{ transform: "translateZ(50px)" }} className="glass px-4 py-1 rounded-full mb-8 border border-white/20 inline-flex items-center gap-2">
          <span className="text-white/60 text-sm">• AI Sophia</span>
          <span className="text-white text-sm font-bold">AI Clinic Management</span>
          <span className="bg-rose-500 text-[10px] text-white px-2 py-0.5 rounded-full font-black">NEW</span>
        </motion.div>

        <motion.h1 
          style={{ transform: "translateZ(100px)" }}
          className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none"
        >
          Το Μέλλον της <br />
          <span className="text-primary italic">Διαχείρισης</span> <br />
          Ιατρείου
        </motion.h1>

        <motion.p 
          style={{ transform: "translateZ(60px)" }}
          className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12 font-medium"
        >
          Αυτοματοποιήστε τα πάντα. Από το πρώτο κλικ του ασθενούς μέχρι το τελευταίο ραντεβού της ημέρας.
        </motion.p>

        <motion.div style={{ transform: "translateZ(80px)" }} className="flex flex-col sm:flex-row gap-6">
          <button className="bg-primary hover:scale-110 active:scale-95 text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center gap-3 transition-all shadow-[0_20px_50px_rgba(0,163,224,0.3)] group">
            Ξεκινήστε Τώρα <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
          <button className="glass hover:bg-white/10 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all border border-white/20">
            Προβολή Demo
          </button>
        </motion.div>
      </motion.div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl">
        <div className="glass rounded-3xl p-6 flex flex-wrap items-center justify-around gap-6 border border-white/20 shadow-2xl">
          <div className="flex items-center gap-2 text-white font-bold">
            <Shield size={20} className="text-primary" /> GDPR Ready
          </div>
          <div className="flex items-center gap-2 text-white font-bold">
            <Sparkles size={20} className="text-primary" /> AI Powered
          </div>
          <div className="flex items-center gap-2 text-white font-bold">
            <Calendar size={20} className="text-primary" /> 24/7 Support
          </div>
        </div>
      </div>
    </div>
  );
}
