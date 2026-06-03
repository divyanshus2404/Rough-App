'use client'

import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { UploadCloud, CheckCircle2, X, Crop, RotateCw, Image as ImageIcon, Loader2, MapPin, ShieldCheck } from 'lucide-react'
import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Cropper from 'react-easy-crop'
import getCroppedImg from '@/utils/cropImage'
import { createClient } from '@/utils/supabase/client'
import { createListing } from '@/app/actions/listings'

const SWAP_CATEGORIES = [
  { id: 'electronics', label: 'Electronics' },
  { id: 'books-notes', label: 'Books & Notes' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'others', label: 'Others' }
]

const CURRENCIES = [
  { code: 'INR', symbol: '₹' },
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'CAD', symbol: '$' },
  { code: 'AUD', symbol: '$' }
]

export default function SellPage() {
  const [step, setStep] = useState(1)
  
  // Form State
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [condition, setCondition] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [currency, setCurrency] = useState('INR')
  const [isSwapOpen, setIsSwapOpen] = useState(false)
  const [swapPreferences, setSwapPreferences] = useState<string[]>([])

  // Image Upload & Crop State
  const [images, setImages] = useState<string[]>([]) // Array of cropped image URLs
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [isCropping, setIsCropping] = useState(false)
  const [imageToCrop, setImageToCrop] = useState<string | null>(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(undefined) // undefined = freeform
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const imageDataUrl = await readFile(file)
      setImageToCrop(imageDataUrl as string)
      setIsCropping(true)
    }
  }

  const readFile = (file: File) => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })
  }

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageToCrop!,
        croppedAreaPixels!,
        rotation
      )
      if (croppedImage) {
        setImages([...images, croppedImage])
      }
      setIsCropping(false)
      setImageToCrop(null)
      // Reset crop states
      setZoom(1)
      setRotation(0)
      setAspect(undefined)
    } catch (e) {
      console.error(e)
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const toggleSwapPreference = (id: string) => {
    setSwapPreferences(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    )
  }

  const [isPublishing, setIsPublishing] = useState(false)
  const [publishError, setPublishError] = useState('')
  const [publishSuccess, setPublishSuccess] = useState(false)

  const handlePublish = async () => {
    setIsPublishing(true)
    setPublishError('')
    
    try {
      // Basic validation
      if (!title || !category || !condition || !price || images.length === 0) {
        throw new Error("Please fill in all required fields and add at least one photo.")
      }

      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        throw new Error("Supabase is not configured yet. Connect your database to actually save this listing!")
      }

      const supabase = createClient()
      const uploadedImageUrls: string[] = []

      // 1. Upload Images to Supabase Storage
      for (let i = 0; i < images.length; i++) {
        const response = await fetch(images[i])
        const blob = await response.blob()
        const file = new File([blob], `listing-${Date.now()}-${i}.jpg`, { type: 'image/jpeg' })

        const { data, error } = await supabase.storage
          .from('listing_images')
          .upload(`public/${file.name}`, file)

        if (error) {
          throw new Error(`Failed to upload image: ${error.message}. Make sure the 'listing_images' bucket exists and is public.`)
        }

        const { data: publicUrlData } = supabase.storage
          .from('listing_images')
          .getPublicUrl(`public/${file.name}`)
          
        uploadedImageUrls.push(publicUrlData.publicUrl)
      }

      // 2. Call Server Action to save listing
      const result = await createListing({
        title,
        categoryId: category,
        condition,
        description,
        price: Number(price),
        currency,
        isSwapOpen,
        swapPreferences,
        images: uploadedImageUrls
      })

      if (result.success) {
        setPublishSuccess(true)
      }

    } catch (err: any) {
      setPublishError(err.message || "An unknown error occurred.")
    } finally {
      setIsPublishing(false)
    }
  }

  const selectedCurrencySymbol = CURRENCIES.find(c => c.code === currency)?.symbol || '₹'

  return (
    <>
      <Navigation />
      <main className="flex-1 bg-surface min-h-screen py-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
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
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 max-w-3xl mx-auto">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Listing Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. MacBook Pro M1 2020 256GB" className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand bg-white text-foreground">
                        <option value="">Select Category</option>
                        <option value="electronics">Electronics</option>
                        <option value="books-notes">Books & Notes</option>
                        <option value="furniture">Furniture</option>
                        <option value="clothing">Clothing</option>
                        <option value="stationery">Stationery</option>
                        <option value="sports-outdoors">Sports & Outdoors</option>
                        <option value="vehicles-bikes">Vehicles/Bikes</option>
                        <option value="sublets-housing">Sublets & Housing</option>
                        <option value="misc">Miscellaneous</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Condition</label>
                      <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand bg-white text-foreground">
                        <option value="">Select Condition</option>
                        <option value="New">New</option>
                        <option value="Like New">Like New</option>
                        <option value="Good">Good</option>
                        <option value="Fair">Fair</option>
                        <option value="Poor">Poor</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Photos</label>
                    
                    {/* Image Grid */}
                    {images.length > 0 && (
                      <div className="flex flex-wrap gap-4 mb-4">
                        {images.map((img, i) => (
                          <div key={i} className="relative w-24 h-24 rounded-xl border border-border overflow-hidden shadow-sm">
                            <img src={img} alt={`Cropped ${i}`} className="w-full h-full object-cover" />
                            <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 hover:bg-red-500 transition-colors backdrop-blur-sm">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {images.length < 5 && (
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-40 border-2 border-dashed border-brand/50 rounded-xl bg-brand/5 flex flex-col items-center justify-center text-brand hover:bg-brand/10 transition-colors cursor-pointer group"
                      >
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <UploadCloud size={24} className="text-brand" />
                        </div>
                        <span className="font-semibold text-sm">Upload or Take Photo</span>
                        <span className="text-xs mt-1 text-muted">Up to 5 images (PNG, JPG)</span>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileChange} className="hidden" />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Describe your item, its history, any flaws, etc." className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand resize-none"></textarea>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button onClick={() => setStep(2)} className="px-8 py-3 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all disabled:opacity-50" disabled={!title || !category || !condition || images.length === 0}>
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 max-w-3xl mx-auto">
                  
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Price & Currency</label>
                    <div className="flex gap-4">
                      <select 
                        value={currency} 
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-32 px-4 py-4 text-lg font-semibold border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand bg-gray-50 text-foreground appearance-none"
                      >
                        {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                      </select>
                      
                      <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted font-bold text-lg">{selectedCurrencySymbol}</span>
                        <input 
                          type="number" 
                          value={price} 
                          onChange={(e) => setPrice(e.target.value)} 
                          placeholder="0.00" 
                          className="w-full pl-8 pr-4 py-4 text-lg font-bold border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl">
                    <div className="flex gap-3 items-start mb-4">
                      <input type="checkbox" id="swap" checked={isSwapOpen} onChange={(e) => setIsSwapOpen(e.target.checked)} className="w-5 h-5 mt-0.5 rounded border-gray-300 text-brand focus:ring-brand" />
                      <div>
                        <label htmlFor="swap" className="font-bold text-blue-900 block cursor-pointer">Open to Swapping?</label>
                        <p className="text-sm text-blue-800 mt-1 opacity-90">Allow other students to offer items of equivalent value instead of cash.</p>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isSwapOpen && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }} 
                          animate={{ opacity: 1, height: 'auto' }} 
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-blue-200/50">
                            <label className="block text-sm font-semibold text-blue-900 mb-3">I'm looking to swap for:</label>
                            <div className="flex flex-wrap gap-2">
                              {SWAP_CATEGORIES.map(cat => (
                                <button
                                  key={cat.id}
                                  onClick={() => toggleSwapPreference(cat.id)}
                                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                                    swapPreferences.includes(cat.id) 
                                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm' 
                                      : 'bg-white text-blue-700 border-blue-200 hover:border-blue-400'
                                  }`}
                                >
                                  {cat.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="pt-8 flex justify-between">
                    <button onClick={() => setStep(1)} className="px-6 py-3 border border-border text-muted font-bold rounded-xl hover:bg-gray-50 transition-all">
                      Back
                    </button>
                    <button onClick={() => setStep(3)} disabled={!price} className="px-8 py-3 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all disabled:opacity-50">
                      Preview Post
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                  
                  {publishSuccess ? (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                         <CheckCircle2 size={48} />
                      </div>
                      <h2 className="text-3xl font-extrabold text-foreground">Listing Published!</h2>
                      <p className="text-muted text-lg max-w-md mx-auto mt-2">
                        Your listing "{title}" is now live on Swaptopia.
                      </p>
                      <div className="pt-8 flex justify-center">
                        <Link href="/browse" className="px-8 py-4 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all">
                          Browse Listings
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                        <h2 className="text-2xl font-bold text-foreground">Preview Your Listing</h2>
                        <button onClick={() => setStep(1)} className="text-sm font-semibold text-brand hover:text-brand-dark flex items-center gap-1 bg-brand/10 px-4 py-2 rounded-full">
                          Edit Details
                        </button>
                      </div>

                      {/* Mockup of the Listing Detail Page */}
                      <div className="bg-gray-50 rounded-2xl p-6 border border-border shadow-inner">
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          
                          {/* Image Gallery Mock */}
                          <div className="space-y-4">
                            <div className="w-full aspect-square rounded-2xl bg-white border border-border shadow-sm overflow-hidden flex items-center justify-center">
                              {images[0] ? (
                                <img src={images[0]} alt="Preview Main" className="w-full h-full object-cover" />
                              ) : (
                                <ImageIcon size={48} className="text-muted/30" />
                              )}
                            </div>
                            {images.length > 1 && (
                              <div className="flex gap-2 overflow-x-auto pb-2">
                                {images.slice(1).map((img, i) => (
                                  <div key={i} className="w-20 h-20 rounded-xl border border-border overflow-hidden flex-shrink-0">
                                    <img src={img} alt={`Preview ${i+1}`} className="w-full h-full object-cover" />
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Details Mock */}
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <span className="bg-brand/10 text-brand text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {category.replace('-', ' ')}
                              </span>
                              <span className="bg-gray-200 text-gray-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                {condition}
                              </span>
                            </div>

                            <h3 className="text-2xl font-bold text-foreground leading-tight mb-2">{title}</h3>
                            <h2 className="text-4xl font-extrabold text-foreground mb-6">{selectedCurrencySymbol}{price} <span className="text-sm text-muted font-medium">{currency}</span></h2>

                            <div className="bg-white p-4 rounded-xl border border-border shadow-sm mb-6">
                              <h4 className="font-bold text-sm text-foreground mb-2">Description</h4>
                              <p className="text-sm text-muted leading-relaxed whitespace-pre-wrap">{description || 'No description provided.'}</p>
                            </div>

                            {isSwapOpen && (
                              <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
                                <h4 className="font-bold text-sm text-blue-900 mb-2 flex items-center gap-2">Open to Swapping</h4>
                                {swapPreferences.length > 0 ? (
                                  <div className="flex flex-wrap gap-2">
                                    {swapPreferences.map(pref => {
                                      const label = SWAP_CATEGORIES.find(c => c.id === pref)?.label || pref
                                      return <span key={pref} className="bg-white text-blue-700 border border-blue-200 text-xs font-semibold px-2 py-1 rounded-md">{label}</span>
                                    })}
                                  </div>
                                ) : (
                                  <p className="text-xs text-blue-700">Willing to review all swap offers.</p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                      </div>

                      {publishError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm mt-6 text-left shadow-sm">
                          <p className="font-bold">Couldn't publish listing:</p>
                          <p>{publishError}</p>
                        </div>
                      )}

                      <div className="pt-8 flex justify-end border-t border-border mt-8">
                        <button onClick={handlePublish} disabled={isPublishing} className="px-8 py-4 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-lg w-full sm:w-auto">
                          {isPublishing && <Loader2 size={24} className="animate-spin" />}
                          {isPublishing ? "Publishing to Swaptopia..." : "Publish Listing Now"}
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}

            </div>
          </div>
        </div>

        {/* Crop Modal */}
        <AnimatePresence>
          {isCropping && imageToCrop && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-4 sm:p-8"
            >
              <div className="relative w-full max-w-3xl h-[60vh] sm:h-[70vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
                <Cropper
                  image={imageToCrop}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                />
              </div>

              {/* Cropper Controls */}
              <div className="w-full max-w-3xl mt-6 bg-gray-900 p-6 rounded-2xl border border-gray-800">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  
                  {/* Zoom Control */}
                  <div className="flex-1 w-full">
                    <label className="text-xs text-gray-400 font-medium mb-2 block uppercase tracking-wider">Zoom</label>
                    <input 
                      type="range" min={1} max={3} step={0.1} value={zoom} 
                      onChange={(e) => setZoom(Number(e.target.value))}
                      className="w-full accent-brand" 
                    />
                  </div>

                  {/* Rotation Control */}
                  <div className="flex-1 w-full">
                    <label className="text-xs text-gray-400 font-medium mb-2 block uppercase tracking-wider">Rotation</label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="range" min={0} max={360} step={1} value={rotation} 
                        onChange={(e) => setRotation(Number(e.target.value))}
                        className="w-full accent-brand" 
                      />
                      <button onClick={() => setRotation((r) => (r + 90) % 360)} className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                        <RotateCw size={18} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Aspect Ratio Presets */}
                <div className="mt-6 border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setAspect(undefined)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${aspect === undefined ? 'bg-brand text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>Free</button>
                    <button onClick={() => setAspect(1)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${aspect === 1 ? 'bg-brand text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>1:1</button>
                    <button onClick={() => setAspect(4/3)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${aspect === 4/3 ? 'bg-brand text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>4:3</button>
                    <button onClick={() => setAspect(16/9)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${aspect === 16/9 ? 'bg-brand text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>16:9</button>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button onClick={() => setIsCropping(false)} className="flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold text-gray-300 hover:text-white transition-colors">Cancel</button>
                    <button onClick={handleCropImage} className="flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold bg-brand text-white hover:bg-brand-dark transition-colors flex items-center justify-center gap-2">
                      <Crop size={18} /> Apply Crop
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
      <Footer />
    </>
  )
}
