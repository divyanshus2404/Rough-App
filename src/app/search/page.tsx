import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { Search } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string }
}) {
  const query = searchParams.q || ''
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key',
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
      },
    }
  )

  let listings = []
  
  if (query) {
    const { data } = await supabase
      .from('listings')
      .select('*, profiles(full_name, trust_score, is_verified_student, is_public)')
      .eq('status', 'active')
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false })
      
    // Filter out listings where the seller's profile is not public
    // Alternatively, if we just want to hide their name, we do that in the UI.
    // The requirement said: "have the option to keep my profile private/public".
    listings = data || []
  }

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-foreground">
            Search Results
          </h1>
          <p className="text-muted mt-2">
            Showing results for <span className="font-semibold text-brand">"{query}"</span>
          </p>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-20 bg-surface rounded-3xl border border-border/50">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand mb-4">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-foreground">No items found</h3>
            <p className="text-muted mt-2 max-w-md mx-auto">
              We couldn't find anything matching "{query}". Try adjusting your search terms or browse categories.
            </p>
            <Link href="/browse" className="inline-block mt-6 px-6 py-3 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition-colors">
              Browse All Items
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing: any) => (
              <Link key={listing.id} href={`/listing/${listing.id}`} className="group relative bg-surface rounded-2xl border border-border/50 overflow-hidden hover:shadow-hover transition-all duration-300 flex flex-col">
                <div className="aspect-square bg-gray-100 dark:bg-gray-800 relative overflow-hidden">
                  {listing.images && listing.images.length > 0 ? (
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted">No Image</div>
                  )}
                  {listing.is_swap_open && (
                    <span className="absolute top-3 right-3 bg-brand text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      Open to Swap
                    </span>
                  )}
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-bold text-foreground line-clamp-1 mb-1">{listing.title}</h3>
                  <p className="text-lg font-extrabold text-brand mb-4">
                    {listing.currency === 'INR' ? '₹' : '$'}{listing.price}
                  </p>
                  
                  <div className="mt-auto flex items-center gap-2 pt-4 border-t border-border/50">
                    <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center text-brand text-xs font-bold">
                      {listing.profiles?.is_public ? listing.profiles.full_name?.charAt(0) : '?'}
                    </div>
                    <span className="text-xs text-muted font-medium truncate">
                      {listing.profiles?.is_public ? listing.profiles.full_name : 'Private User'}
                    </span>
                    {listing.profiles?.is_verified_student && (
                      <span className="ml-auto text-green-500" title="Verified Student">✓</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  )
}
