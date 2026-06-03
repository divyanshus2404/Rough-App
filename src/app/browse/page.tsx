import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Filter, Search } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const dummyListings = [
  { id: '1', title: 'Apple iPad Pro M2 11" with Apple Pencil', price: '$650', image: 'iPad Pro', category: 'Electronics', condition: 'Like New', seller: 'Alex M.', distance: '0.2 miles' },
  { id: '2', title: 'Introduction to Algorithms (4th Edition)', price: '$45', image: 'Book', category: 'Books', condition: 'Good', seller: 'Sarah K.', distance: '0.5 miles' },
  { id: '3', title: 'Ergonomic Office Chair - Herman Miller', price: '$200', image: 'Chair', category: 'Furniture', condition: 'Used', seller: 'David L.', distance: '1.2 miles' },
  { id: '4', title: 'Sony WH-1000XM4 Noise Cancelling Headphones', price: '$150', image: 'Headphones', category: 'Electronics', condition: 'Like New', seller: 'Emma R.', distance: '0.8 miles' },
  { id: '5', title: 'Organic Chemistry Notes (A+ Grade)', price: '$15', image: 'Notes', category: 'Books & Notes', condition: 'Good', seller: 'Michael T.', distance: '0.1 miles' },
  { id: '6', title: 'Mini Fridge for Dorm', price: '$40', image: 'Fridge', category: 'Furniture', condition: 'Used', seller: 'Jessica W.', distance: '0.3 miles' },
]

export default function BrowsePage() {
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Browse Listings</h1>
              <p className="text-muted mt-1">Find what you need from verified students nearby.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
                <input 
                  type="text" 
                  placeholder="Search Swaptopia..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-shadow"
                />
              </div>
              <button className="flex items-center justify-center px-4 py-2 bg-white border border-border rounded-lg shadow-sm text-foreground hover:bg-gray-50 transition-colors">
                <Filter size={18} className="mr-2" /> Filters
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 space-y-6">
              <div className="bg-white p-5 rounded-xl border border-border shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Categories</h3>
                <ul className="space-y-3">
                  {['All Categories', 'Books & Notes', 'Electronics', 'Furniture', 'Clothing'].map((cat, i) => (
                    <li key={i}>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="category" className="w-4 h-4 text-brand border-gray-300 focus:ring-brand" defaultChecked={i === 0} />
                        <span className="text-muted group-hover:text-foreground transition-colors">{cat}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-border shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input type="number" placeholder="Min" className="w-full px-3 py-2 border border-border rounded-md text-sm" />
                  <span className="text-muted">-</span>
                  <input type="number" placeholder="Max" className="w-full px-3 py-2 border border-border rounded-md text-sm" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-border shadow-sm">
                <h3 className="font-semibold text-foreground mb-4">Condition</h3>
                <ul className="space-y-3">
                  {['Any', 'New', 'Like New', 'Good', 'Used'].map((cond, i) => (
                    <li key={i}>
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded text-brand border-gray-300 focus:ring-brand" />
                        <span className="text-muted group-hover:text-foreground transition-colors">{cond}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyListings.map((listing) => (
                  <Link href={`/listing/${listing.id}`} key={listing.id} className="group flex flex-col bg-white rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300">
                    <div className="w-full h-48 bg-gradient-to-br from-brand/5 to-brand/10 flex items-center justify-center relative overflow-hidden">
                      <span className="text-muted font-medium z-10 group-hover:scale-110 transition-transform duration-300">{listing.image}</span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-semibold text-brand bg-brand/10 px-2 py-1 rounded-full uppercase tracking-wider">{listing.category}</span>
                        <span className="text-xs text-muted font-medium bg-muted/10 px-2 py-1 rounded-full">{listing.condition}</span>
                      </div>
                      <h3 className="text-base font-bold text-foreground leading-tight line-clamp-2 mb-2 group-hover:text-brand transition-colors">{listing.title}</h3>
                      <div className="mt-auto">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-2xl font-extrabold text-foreground">{listing.price}</span>
                          <span className="text-sm text-muted bg-gray-100 px-2 py-1 rounded-md">{listing.distance}</span>
                        </div>
                        <div className="flex items-center gap-2 border-t border-border pt-3">
                          <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center text-brand text-xs font-bold">
                            {listing.seller[0]}
                          </div>
                          <span className="text-sm text-muted font-medium">{listing.seller}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
