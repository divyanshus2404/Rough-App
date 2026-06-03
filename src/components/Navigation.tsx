'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, ShoppingBag, User } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function Navigation() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 w-full glass border-b border-border/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-brand">
              Swaptopia
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                <Search size={18} />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-border rounded-full leading-5 bg-white/50 placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand sm:text-sm transition-all duration-300"
                placeholder="Search for books, electronics, notes..."
              />
            </div>
          </div>

          {/* Auth & Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/sell" className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-brand hover:bg-brand-light shadow-soft hover:shadow-hover transition-all duration-300">
              Start Selling
            </Link>
            <button className="p-2 text-muted hover:text-foreground transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand rounded-full"></span>
            </button>
            <Link href="/login" className="p-2 text-muted hover:text-foreground transition-colors">
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
