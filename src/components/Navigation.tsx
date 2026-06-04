'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search, User, Plus } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useState } from 'react'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const navLinks = [
    { name: 'Feed', href: '/browse' },
    { name: 'Chat', href: '/chat' },
    { name: 'Profile', href: '/profile' },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LEFT: Logo & Links */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-xl font-extrabold tracking-tight text-foreground mr-2">
              Swaptopia
            </Link>
            
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href)
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                      isActive 
                        ? 'bg-brand/10 text-brand dark:bg-brand/20' 
                        : 'text-muted hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* CENTER: Search Bar */}
          <div className="flex-1 max-w-2xl mx-8 hidden sm:block">
            <form onSubmit={handleSearch} className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted group-focus-within:text-brand transition-colors">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-11 pr-4 py-2.5 border-none rounded-full bg-gray-100 dark:bg-gray-800/50 text-foreground placeholder-muted focus:outline-none focus:ring-2 focus:ring-brand/50 transition-all text-sm font-medium"
                placeholder="Search books, gadgets, more..."
              />
            </form>
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link 
              href="/sell" 
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-sm font-bold rounded-full text-white bg-gradient-to-r from-brand-light to-brand hover:from-brand hover:to-brand-dark shadow-md hover:shadow-lg transition-all transform hover:scale-105"
            >
              <Plus size={18} className="mr-1" />
              Post
            </Link>
            
            <Link 
              href="/profile" 
              className="flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 text-brand hover:bg-brand/20 transition-colors"
            >
              <User size={18} />
            </Link>
          </div>

        </div>
      </div>
    </nav>
  )
}
