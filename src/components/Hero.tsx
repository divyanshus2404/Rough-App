'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import FloatingObjectsScene from './ui/FloatingObjects'

export default function Hero() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Background */}
      <FloatingObjectsScene />
      
      {/* Overlay Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-brand/10 text-brand text-sm font-semibold tracking-wide mb-4 border border-brand/20 glass">
            The #1 Student Marketplace
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-6 drop-shadow-sm">
            Swap Smart. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-brand-light">Live Better.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted mx-auto mb-10">
            Buy, sell, and swap items safely within your university community. Verified students, secure payments, and instant chat.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/browse"
              className="w-full sm:w-auto px-8 py-4 border border-transparent text-base font-semibold rounded-full text-white bg-brand hover:bg-brand-light shadow-soft hover:shadow-hover transition-all duration-300 transform hover:-translate-y-1"
            >
              Explore Listings
            </Link>
            <Link 
              href="/sell"
              className="w-full sm:w-auto px-8 py-4 border border-border text-base font-semibold rounded-full text-foreground bg-white/50 hover:bg-white glass shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Selling
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative gradient blur at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0 pointer-events-none" />
    </div>
  )
}
