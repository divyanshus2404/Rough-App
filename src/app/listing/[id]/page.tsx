import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ShieldCheck, MessageCircle, MapPin, Share, Heart } from 'lucide-react'
import Link from 'next/link'

export default function ListingDetail({ params }: { params: { id: string } }) {
  // Mock data for visual demonstration
  const listing = {
    id: params.id,
    title: 'Apple iPad Pro M2 11" with Apple Pencil',
    price: '$650',
    description: 'Selling my iPad Pro M2 (11-inch, 128GB, Space Gray) along with the Apple Pencil 2nd Gen. It is in pristine condition with no scratches. Always kept in a case with a screen protector. I am upgrading to a MacBook so I no longer need this. Perfect for taking notes in class!',
    category: 'Electronics',
    condition: 'Like New',
    seller: {
      name: 'Alex M.',
      verified: true,
      joined: 'Aug 2024',
      rating: 4.9,
      reviews: 12
    },
    location: 'North Campus Library',
    postedAt: '2 days ago',
    images: ['iPad Front', 'iPad Back', 'Pencil Box']
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 bg-background min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center gap-2 text-sm text-muted mb-6">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <span>/</span>
            <Link href="/browse" className="hover:text-foreground transition-colors">Browse</Link>
            <span>/</span>
            <span className="text-foreground">{listing.category}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column: Images & Description */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery Mock */}
              <div className="rounded-2xl overflow-hidden bg-white border border-border shadow-soft">
                <div className="aspect-video bg-gradient-to-br from-brand/5 to-brand-light/10 flex items-center justify-center relative">
                   <h2 className="text-3xl font-bold text-muted/50 tracking-widest uppercase">{listing.images[0]}</h2>
                   {/* Decorative 3D-ish Badge */}
                   <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-brand shadow-sm border border-brand/20">
                     {listing.condition}
                   </div>
                </div>
                <div className="flex p-4 gap-4 overflow-x-auto bg-gray-50 border-t border-border">
                  {listing.images.map((img, i) => (
                    <div key={i} className={`w-24 h-24 rounded-lg flex-shrink-0 flex items-center justify-center font-semibold text-xs border-2 cursor-pointer transition-all ${i === 0 ? 'border-brand bg-brand/5 text-brand' : 'border-border bg-white text-muted hover:border-brand/50'}`}>
                      {img}
                    </div>
                  ))}
                </div>
              </div>

              {/* Details */}
              <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                <h2 className="text-2xl font-bold text-foreground mb-4">Description</h2>
                <p className="text-muted leading-relaxed whitespace-pre-wrap">{listing.description}</p>
                
                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-t border-b border-border">
                  <div>
                    <span className="block text-sm text-muted mb-1">Category</span>
                    <span className="font-semibold text-foreground">{listing.category}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-muted mb-1">Condition</span>
                    <span className="font-semibold text-foreground">{listing.condition}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-muted mb-1">Posted</span>
                    <span className="font-semibold text-foreground">{listing.postedAt}</span>
                  </div>
                  <div>
                    <span className="block text-sm text-muted mb-1">Location</span>
                    <span className="font-semibold text-foreground flex items-center"><MapPin size={14} className="mr-1"/> Campus</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Price & Action Cards */}
            <div className="space-y-6">
              
              <div className="bg-white p-6 rounded-2xl border border-border shadow-soft sticky top-24">
                <div className="flex justify-between items-start mb-6">
                  <h1 className="text-4xl font-extrabold text-foreground">{listing.price}</h1>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-full bg-gray-50 text-muted hover:text-brand hover:bg-brand/5 transition-colors">
                      <Share size={20} />
                    </button>
                    <button className="p-2 rounded-full bg-gray-50 text-muted hover:text-red-500 hover:bg-red-50 transition-colors">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-foreground mb-6 leading-snug">{listing.title}</h2>
                
                <div className="space-y-3 mb-6">
                  <button className="w-full py-4 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <MessageCircle size={20} /> Message Seller
                  </button>
                  <button className="w-full py-4 bg-white border-2 border-brand text-brand font-bold rounded-xl hover:bg-brand/5 transition-all">
                    Make an Offer
                  </button>
                </div>

                <div className="bg-green-50 text-green-800 p-4 rounded-xl flex items-start gap-3 border border-green-200">
                  <ShieldCheck size={24} className="text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm">Protected by Swaptopia Trust</h4>
                    <p className="text-xs mt-1 opacity-90">Payments are held securely until you receive the item and confirm it matches the description.</p>
                  </div>
                </div>
              </div>

              {/* Seller Profile Mini */}
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h3 className="font-bold text-foreground mb-4">About the Seller</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xl font-bold">
                    {listing.seller.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{listing.seller.name}</span>
                      {listing.seller.verified && (
                        <span className="bg-blue-100 text-blue-700 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-full flex items-center gap-1">
                          <ShieldCheck size={10} /> Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted">★ {listing.seller.rating} ({listing.seller.reviews} reviews)</p>
                  </div>
                </div>
                <p className="text-sm text-muted text-center border-t border-border pt-4">Joined {listing.seller.joined}</p>
              </div>

            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
