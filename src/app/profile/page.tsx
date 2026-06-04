'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Navigation from '@/components/Navigation'
import { toggleProfilePrivacy } from '@/app/actions/profile'
import { ShieldCheck, Eye, EyeOff, Package } from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null)
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isToggling, setIsToggling] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        window.location.href = '/login'
        return
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setProfile(profileData)
      }

      const { data: listingsData } = await supabase
        .from('listings')
        .select('*, categories(name)')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })

      if (listingsData) {
        setListings(listingsData)
      }
      setLoading(false)
    }
    loadProfile()
  }, [])

  const handlePrivacyToggle = async () => {
    if (!profile) return
    setIsToggling(true)
    const newStatus = !profile.is_public
    const res = await toggleProfilePrivacy(newStatus)
    
    if (res.success) {
      setProfile({ ...profile, is_public: newStatus })
    }
    setIsToggling(false)
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <>
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Profile Card */}
        <div className="w-full md:w-1/3 space-y-6">
          <div className="bg-surface rounded-3xl border border-border/50 p-8 shadow-soft text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-brand-light/20 to-brand/20 dark:from-brand-light/10 dark:to-brand/10" />
            
            <div className="relative z-10 w-24 h-24 mx-auto bg-white dark:bg-gray-800 rounded-full border-4 border-surface shadow-md flex items-center justify-center text-3xl font-bold text-brand mt-4">
              {profile?.full_name?.charAt(0) || 'U'}
            </div>
            
            <h2 className="mt-4 text-2xl font-extrabold text-foreground">{profile?.full_name}</h2>
            <p className="text-muted text-sm">{profile?.email}</p>

            {profile?.is_verified_student && (
              <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-bold border border-green-200 dark:border-green-800">
                <ShieldCheck size={14} /> Verified Student
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-border/50 text-left">
              <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">Privacy Settings</h3>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-border/50">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${profile?.is_public ? 'bg-brand/10 text-brand' : 'bg-gray-200 dark:bg-gray-700 text-muted'}`}>
                    {profile?.is_public ? <Eye size={18} /> : <EyeOff size={18} />}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">Public Profile</p>
                    <p className="text-xs text-muted">Show your name to buyers</p>
                  </div>
                </div>
                
                <button 
                  onClick={handlePrivacyToggle}
                  disabled={isToggling}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-50 ${profile?.is_public ? 'bg-brand' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${profile?.is_public ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Postings */}
        <div className="w-full md:w-2/3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-extrabold text-foreground flex items-center gap-2">
              <Package size={24} className="text-brand" />
              My Postings
            </h2>
          </div>

          {listings.length === 0 ? (
            <div className="text-center py-20 bg-surface rounded-3xl border border-border/50">
              <p className="text-muted font-medium">You haven't posted anything yet.</p>
              <Link href="/sell" className="inline-block mt-4 px-6 py-2 bg-brand text-white font-bold rounded-full hover:bg-brand-dark transition-colors">
                Create a Listing
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {listings.map(listing => (
                <div key={listing.id} className="bg-surface rounded-2xl border border-border/50 overflow-hidden flex flex-col group relative">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative">
                    {listing.images?.[0] ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted">No Image</div>
                    )}
                    <span className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded shadow-sm ${listing.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                      {listing.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-bold text-foreground line-clamp-1">{listing.title}</h3>
                    <p className="text-brand font-extrabold mt-1">{listing.currency === 'INR' ? '₹' : '$'}{listing.price}</p>
                    
                    <div className="mt-auto pt-4 flex gap-2">
                       <Link href={`/listing/${listing.id}`} className="flex-1 py-1.5 text-center bg-gray-100 dark:bg-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                         View
                       </Link>
                       <button className="flex-1 py-1.5 text-center bg-brand/10 text-brand text-sm font-semibold rounded-lg hover:bg-brand/20 transition-colors">
                         Edit
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </>
  )
}
