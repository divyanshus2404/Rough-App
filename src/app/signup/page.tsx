'use client'

import Link from 'next/link'
import { ShieldCheck, Camera, UploadCloud, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { registerStudent } from '@/app/actions/auth'

export default function SignupPage() {
  const [step, setStep] = useState(1)
  
  // Form State
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [enrollmentNumber, setEnrollmentNumber] = useState('')
  const [faceScanBase64, setFaceScanBase64] = useState<string>('')
  const [signatureBase64, setSignatureBase64] = useState<string>('')
  
  // UI State
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Camera State
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const signatureInputRef = useRef<HTMLInputElement>(null)

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraOpen(true)
      }
    } catch (err) {
      console.error("Camera error:", err)
      setError("Unable to access camera. Please check your permissions.")
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      setIsCameraOpen(false)
    }
  }

  const captureFace = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height)
        const imageDataUrl = canvasRef.current.toDataURL('image/jpeg')
        setFaceScanBase64(imageDataUrl)
        stopCamera()
      }
    }
  }

  const handleSignatureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => {
        setSignatureBase64(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    setError('')
    if (step === 1) {
      if (!email.toLowerCase().endsWith('.edu')) {
        setError('Please use a valid .edu university email address.')
        return
      }
      if (!name) {
        setError('Please enter your full name.')
        return
      }
    }
    if (step === 2 && !enrollmentNumber) {
      setError('Please enter your Enrollment Number.')
      return
    }
    if (step === 3 && !faceScanBase64) {
      setError('You must complete the face scan verification.')
      return
    }
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    if (!signatureBase64) {
      setError("Please upload your signature.")
      return
    }
    
    setIsSubmitting(true)
    setError('')

    const result = await registerStudent({
      email,
      name,
      enrollmentNumber,
      faceScanBase64,
      signatureBase64
    })

    setIsSubmitting(false)

    if (result.success) {
      setStep(5) // Success Step
    } else {
      setError(result.error || "An unexpected error occurred.")
    }
  }

  // Cleanup camera on unmount
  useEffect(() => {
    return () => stopCamera()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl border border-border/50 shadow-soft relative overflow-hidden">
        
        {/* Progress indicator */}
        {step < 5 && (
          <div className="flex justify-between mb-8 gap-2">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`h-1.5 flex-1 rounded-full ${step >= s ? 'bg-brand' : 'bg-gray-100'}`} />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* STEP 1: Basic Info */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-foreground">Basic Details</h2>
                <p className="mt-2 text-sm text-muted">We only allow verified students on Swaptopia.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:ring-brand focus:border-brand bg-gray-50/50 focus:bg-white" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">University Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:ring-brand focus:border-brand bg-gray-50/50 focus:bg-white" placeholder="jane@university.edu" />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>}

              <button onClick={handleNext} className="w-full mt-8 py-4 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all flex items-center justify-center gap-2">
                Continue <ArrowRight size={18} />
              </button>
              
              <div className="mt-6 text-center text-sm text-muted">
                 Already have an account? <Link href="/login" className="font-semibold text-brand">Sign in</Link>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Enrollment Number */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-foreground">Student ID</h2>
                <p className="mt-2 text-sm text-muted">Provide your unique enrollment number.</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-1">Enrollment / Roll Number</label>
                <input type="text" value={enrollmentNumber} onChange={e => setEnrollmentNumber(e.target.value)} className="w-full px-4 py-3 border border-border rounded-xl focus:ring-brand focus:border-brand bg-gray-50/50 focus:bg-white uppercase tracking-wider font-mono text-center text-lg" placeholder="123456789" />
                <p className="text-xs text-muted mt-2 text-center">This ID can only be registered once on Swaptopia to prevent dummy accounts.</p>
              </div>

              {error && <p className="text-red-500 text-sm mt-4 font-medium">{error}</p>}

              <button onClick={handleNext} className="w-full mt-8 py-4 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all flex items-center justify-center gap-2">
                Continue Verification <ArrowRight size={18} />
              </button>
              <button onClick={() => setStep(1)} className="w-full mt-3 py-3 text-muted font-bold hover:text-foreground transition-all">Back</button>
            </motion.div>
          )}

          {/* STEP 3: Face Scan */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-foreground">Face Scan</h2>
                <p className="mt-2 text-sm text-muted">Position your face in the circle to verify your identity.</p>
              </div>

              <div className="flex flex-col items-center justify-center">
                {faceScanBase64 ? (
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-green-500 shadow-lg">
                    <img src={faceScanBase64} alt="Face Scan" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 size={48} className="text-white drop-shadow-md" />
                    </div>
                  </div>
                ) : (
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-dashed border-brand bg-brand/5 flex flex-col items-center justify-center">
                    {!isCameraOpen ? (
                      <button onClick={startCamera} className="flex flex-col items-center justify-center text-brand font-semibold">
                        <Camera size={32} className="mb-2" />
                        Enable Camera
                      </button>
                    ) : (
                      <>
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover absolute inset-0 transform -scale-x-100" />
                        {/* Overlay ring to guide user */}
                        <div className="absolute inset-0 border-[12px] border-white/50 rounded-full pointer-events-none" />
                      </>
                    )}
                  </div>
                )}
                
                <canvas ref={canvasRef} className="hidden" />

                {isCameraOpen && !faceScanBase64 && (
                  <button onClick={captureFace} className="mt-6 px-8 py-3 bg-brand text-white font-bold rounded-full shadow-md hover:bg-brand-dark animate-pulse">
                    Capture Scan
                  </button>
                )}
                
                {faceScanBase64 && (
                  <button onClick={() => { setFaceScanBase64(''); startCamera() }} className="mt-6 text-sm font-semibold text-brand hover:underline">
                    Retake Scan
                  </button>
                )}
              </div>

              {error && <p className="text-red-500 text-sm mt-4 font-medium text-center">{error}</p>}

              <button onClick={handleNext} disabled={!faceScanBase64} className="w-full mt-8 py-4 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all disabled:opacity-50">
                Continue <ArrowRight size={18} className="inline ml-1" />
              </button>
              <button onClick={() => setStep(2)} className="w-full mt-3 py-3 text-muted font-bold hover:text-foreground transition-all">Back</button>
            </motion.div>
          )}

          {/* STEP 4: Signature Upload */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-foreground">Signature</h2>
                <p className="mt-2 text-sm text-muted">Upload a photo of your signature on a blank page.</p>
              </div>

              <div className="space-y-4">
                <div 
                  onClick={() => signatureInputRef.current?.click()}
                  className="w-full h-40 border-2 border-dashed border-brand/50 rounded-xl bg-brand/5 flex flex-col items-center justify-center text-brand hover:bg-brand/10 transition-colors cursor-pointer relative overflow-hidden"
                >
                  {signatureBase64 ? (
                    <img src={signatureBase64} alt="Signature" className="w-full h-full object-contain bg-white" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                        <UploadCloud size={24} className="text-brand" />
                      </div>
                      <span className="font-semibold text-sm">Upload Signature</span>
                    </>
                  )}
                  <input type="file" accept="image/*" ref={signatureInputRef} onChange={handleSignatureUpload} className="hidden" />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-4 font-medium text-center">{error}</p>}

              <button onClick={handleSubmit} disabled={isSubmitting || !signatureBase64} className="w-full mt-8 py-4 bg-brand text-white font-bold rounded-xl shadow-md hover:bg-brand-dark transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                {isSubmitting && <Loader2 size={20} className="animate-spin" />}
                {isSubmitting ? 'Submitting Verification...' : 'Submit Verification'}
              </button>
              <button onClick={() => setStep(3)} disabled={isSubmitting} className="w-full mt-3 py-3 text-muted font-bold hover:text-foreground transition-all">Back</button>
            </motion.div>
          )}

          {/* STEP 5: Success / Pending State */}
          {step === 5 && (
            <motion.div key="step5" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <div className="w-24 h-24 bg-blue-50 text-blue-500 border-4 border-blue-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={48} />
              </div>
              
              <h2 className="text-3xl font-extrabold text-foreground mb-4">Verification Pending</h2>
              
              <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl text-blue-900 shadow-inner">
                <p className="font-medium text-lg mb-2">Thank you, {name}!</p>
                <p className="text-sm opacity-90 leading-relaxed mb-4">
                  We have received your enrollment ID, face scan, and signature. Our trust team is currently reviewing your application.
                </p>
                <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-lg font-bold text-blue-800">
                  <Loader2 size={16} className="animate-spin" />
                  Please wait up to 12 hours.
                </div>
              </div>

              <div className="mt-8">
                <Link href="/" className="text-brand font-bold hover:underline">Return to Home</Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
