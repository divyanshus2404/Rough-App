'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface ListingProps {
  id: string
  title: string
  price: string
  image: string
  category: string
  condition: string
}

function TiltCard({ listing }: { listing: ListingProps }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useTransform(x, [-0.5, 0.5], [15, -15])
  const mouseYSpring = useTransform(y, [-0.5, 0.5], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{
        rotateX: mouseYSpring,
        rotateY: mouseXSpring,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] rounded-2xl bg-white border border-border/50 shadow-soft cursor-pointer transition-shadow hover:shadow-hover"
    >
      <div style={{ transform: "translateZ(30px)" }} className="absolute inset-0 p-4 flex flex-col pointer-events-none">
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-muted/10 flex items-center justify-center">
          {/* We will use a placeholder or real image later, for now just a colored box to represent it */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-brand-light/20" />
          <span className="text-muted text-sm font-medium z-10">{listing.image}</span>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-brand bg-brand/10 px-2 py-1 rounded-full uppercase tracking-wider">{listing.category}</span>
              <span className="text-xs text-muted font-medium bg-muted/10 px-2 py-1 rounded-full">{listing.condition}</span>
            </div>
            <h3 className="text-xl font-bold text-foreground leading-tight line-clamp-2">{listing.title}</h3>
          </div>
          <div className="flex items-center justify-between mt-4 border-t border-border/50 pt-4">
            <span className="text-2xl font-extrabold text-foreground">{listing.price}</span>
            <button className="text-sm font-semibold text-white bg-foreground px-4 py-2 rounded-full pointer-events-auto hover:bg-brand transition-colors">
              View
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function FeaturedListings() {
  const dummyListings = [
    { id: '1', title: 'Apple iPad Pro M2 11" with Apple Pencil', price: '$650', image: 'iPad Pro', category: 'Electronics', condition: 'Like New' },
    { id: '2', title: 'Introduction to Algorithms (4th Edition)', price: '$45', image: 'Book', category: 'Books', condition: 'Good' },
    { id: '3', title: 'Ergonomic Office Chair - Herman Miller', price: '$200', image: 'Chair', category: 'Furniture', condition: 'Used' },
  ]

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Featured Finds</h2>
            <p className="mt-2 text-lg text-muted">Handpicked deals from verified students.</p>
          </div>
          <Link href="/browse" className="text-brand font-semibold hover:text-brand-dark transition-colors">
            View All &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
          {dummyListings.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TiltCard listing={listing} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
