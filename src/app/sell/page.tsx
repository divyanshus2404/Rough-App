'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { UploadCloud, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SellPage() {
  const [step, setStep] = useState(1)
  
  return (
    <>
      <Navigation />
      <main className="flex-1 bg-surface min-h-screen py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Create a Listing</h1>
            <p className="text-muted mt-2">Sell your items quickly to verified students on campus.</p>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-soft overflow-hidden">
            {/* Progress Bar */}
            <div className="flex border-b border-border">
              <div className={`flex-1 py-4 text-center font-semibold text-sm ${step >= 1 ? 'text-brand border-b-2 border-brand' : 'text-muted'}`}>1. Details</div>
              <div className={`flex-1 py-4 text-center font-semibold text-sm ${step >= 2 ? 'text-brand border-b-2 border-brand' : 'text-muted'}`}>2. Pricing</div>
              <div className={`flex-1 py-4 text-center font-semibold text-sm ${step >= 3 ? 'text-brand border-b-2 border-brand' : 'text-muted'}`}>3. Review</div>
            </div>

            <div className="p-8">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Listing Title</label>
                    <input type="text" placeholder="e.g. MacBook Pro M1 2020 256GB" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                      <select className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand bg-white text-foreground">
                        <option>Select Category</option>
                        <option>Electronics</option>
                        <option>Books & Notes</option>
                        <option>Furniture</option>
                        <option>Clothing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Condition</label>
                      <select className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand bg-white text-foreground">
                        <option>Select Condition</option>
                        <option>New</option>
                        <option>Like New</option>
                        <option>Good</option>
                        <option>Fair</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Photos</label>
                    <div className="w-full h-40 border-2 border-dashed border-border rounded-xl bg-gray-50 flex flex-col items-center justify-center text-muted hover:bg-gray-100 transition-colors cursor-pointer group">
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <UploadCloud size={24} className="text-brand" />
                      </div>
                      <span className="font-semibold text-sm">Click or drag photos here</span>
                      <span className="text-xs mt-1">Up to 5 images (PNG, JPG)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                    <textarea rows={4} placeholder="Describe your item, its history, any flaws, etc." className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-none"></textarea>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button onClick={() => setStep(2)} className="px-8 py-3 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all">
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Price</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold text-lg">$</span>
                      <input type="number" placeholder="0.00" className="w-full pl-8 pr-4 py-4 text-lg border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3">
                    <input type="checkbox" id="swap" className="w-5 h-5 mt-0.5 rounded border-gray-300 text-brand focus:ring-brand" />
                    <div>
                      <label htmlFor="swap" className="font-bold text-blue-900 block cursor-pointer">Open to Swapping?</label>
                      <p className="text-sm text-blue-800 mt-1 opacity-90">Allow other students to offer items of equivalent value instead of cash.</p>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-between">
                    <button onClick={() => setStep(1)} className="px-6 py-3 border border-border text-muted font-bold rounded-xl hover:bg-gray-50 transition-all">
                      Back
                    </button>
                    <button onClick={() => setStep(3)} className="px-8 py-3 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all">
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 text-center py-8">
                  <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                     <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-extrabold text-foreground">Ready to Publish!</h2>
                  <p className="text-muted text-lg max-w-md mx-auto">
                    Your listing looks great. It will be immediately visible to all verified students on campus.
                  </p>

                  <div className="pt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <button onClick={() => setStep(2)} className="px-6 py-4 border border-border text-muted font-bold rounded-xl hover:bg-gray-50 transition-all">
                      Make Changes
                    </button>
                    <Link href="/browse" className="px-8 py-4 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all">
                      Publish Listing
                    </Link>
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
