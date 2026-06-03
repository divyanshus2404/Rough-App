import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { ShieldCheck, CreditCard, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage({ params }: { params: { id: string } }) {
  // Mock data
  const listing = {
    title: 'Apple iPad Pro M2 11" with Apple Pencil',
    price: '$650',
    seller: 'Alex M.',
    image: 'iPad Pro',
    fee: '$15.00',
    total: '$665.00'
  }

  return (
    <>
      <Navigation />
      <main className="flex-1 bg-surface min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex items-center gap-2">
            <Link href={`/listing/${params.id}`} className="text-brand hover:text-brand-dark font-medium">&larr; Back to Listing</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Payment Details */}
            <div className="space-y-6">
              <h1 className="text-3xl font-extrabold text-foreground">Secure Checkout</h1>
              
              <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="text-brand" /> Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-brand bg-brand/5 rounded-xl cursor-pointer">
                    <input type="radio" name="payment" defaultChecked className="w-4 h-4 text-brand focus:ring-brand" />
                    <span className="ml-3 font-semibold flex-1">UPI (Paytm, PhonePe, GPay)</span>
                    <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">No Extra Fees</span>
                  </label>
                  
                  <label className="flex items-center p-4 border border-border hover:border-brand hover:bg-brand/5 rounded-xl cursor-pointer transition-colors">
                    <input type="radio" name="payment" className="w-4 h-4 text-brand focus:ring-brand" />
                    <span className="ml-3 font-semibold">Credit/Debit Card</span>
                  </label>
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <h3 className="font-bold text-foreground mb-3">Meetup Preference</h3>
                  <div className="p-3 bg-gray-50 border border-border rounded-lg text-sm text-muted">
                    Seller preferred location: <strong>North Campus Library</strong>
                  </div>
                </div>
              </div>

              <div className="bg-green-50/50 border border-green-100 p-6 rounded-2xl flex items-start gap-4">
                 <ShieldCheck size={32} className="text-green-600 flex-shrink-0" />
                 <div>
                   <h3 className="font-bold text-green-900 text-lg">Swaptopia Escrow Protection</h3>
                   <p className="text-sm text-green-800 mt-1 leading-relaxed">
                     Your money is held securely in escrow. We won't release the funds to the seller until you meet up, inspect the item, and confirm you've received it.
                   </p>
                 </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-soft sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>
                
                <div className="flex gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand/10 to-brand-light/20 rounded-xl flex items-center justify-center font-bold text-muted text-xs text-center p-2 border border-border">
                    {listing.image}
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground leading-tight line-clamp-2">{listing.title}</h3>
                    <p className="text-sm text-muted mt-1">Seller: {listing.seller}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted mb-6">
                  <div className="flex justify-between">
                    <span>Item Price</span>
                    <span className="font-semibold text-foreground">{listing.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Trust Fee (2.5%)</span>
                    <span className="font-semibold text-foreground">{listing.fee}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6 flex justify-between items-center">
                  <span className="font-bold text-foreground text-lg">Total</span>
                  <span className="font-extrabold text-brand text-2xl">{listing.total}</span>
                </div>

                <button className="w-full py-4 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <Lock size={18} /> Pay Securely
                </button>
                
                <p className="text-xs text-center text-muted mt-4">
                  By paying, you agree to our Terms of Service and Swaptopia Escrow Policy.
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
