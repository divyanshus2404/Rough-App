'use client'

import Link from 'next/link'
import { ShieldCheck, ArrowRight, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SignupPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  
  const supabase = createClient()

  const handleEmailCheck = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email.toLowerCase().endsWith('.edu')) {
      setError('You must use a valid university .edu email address to join Swaptopia.')
      return
    }
    
    setStep(2)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        }
      }
    })

    if (signUpError) {
      setError(signUpError.message)
      setIsLoading(false)
    } else {
      // Account created, redirect to strict onboarding
      window.location.href = '/onboarding'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="max-w-md w-full bg-white p-10 rounded-3xl border border-border/50 shadow-soft relative text-center min-h-[500px] flex flex-col">
        
        <div>
          <Link href="/" className="flex justify-center mb-6">
            <span className="text-3xl font-extrabold tracking-tighter text-brand">Swaptopia</span>
          </Link>
          <h2 className="mt-2 text-3xl font-extrabold text-foreground">
            Join the Campus Network
          </h2>
          <p className="mt-2 text-sm text-muted">
            Create an account to start buying and selling safely.
          </p>
        </div>

        <div className="flex-1 mt-8">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.form key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleEmailCheck} className="space-y-6">
                
                <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl flex items-start gap-3 text-left">
                  <ShieldCheck size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Swaptopia is exclusive to verified students. You must register with an active <strong>.edu</strong> email address.
                  </p>
                </div>

                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input id="email-address" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="appearance-none relative block w-full px-4 py-4 border border-border placeholder-muted text-foreground rounded-xl focus:outline-none focus:ring-brand focus:border-brand sm:text-sm transition-colors bg-gray-50/50 focus:bg-white text-lg text-center" placeholder="yourname@university.edu" />
                </div>

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                <button type="submit" className="w-full flex items-center justify-center px-4 py-4 border border-transparent rounded-xl shadow-sm bg-brand text-base font-bold text-white hover:bg-brand-dark transition-colors gap-2">
                  Continue <ArrowRight size={18} />
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} onSubmit={handleSignup} className="space-y-6 text-left">
                
                <p className="text-sm font-semibold text-brand text-center">{email}</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">Full Name</label>
                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="appearance-none relative block w-full px-4 py-3 border border-border placeholder-muted text-foreground rounded-xl focus:outline-none focus:ring-brand focus:border-brand sm:text-sm transition-colors bg-gray-50/50 focus:bg-white" placeholder="Jane Doe" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">Create a Password</label>
                    <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="appearance-none relative block w-full px-4 py-3 border border-border placeholder-muted text-foreground rounded-xl focus:outline-none focus:ring-brand focus:border-brand sm:text-sm transition-colors bg-gray-50/50 focus:bg-white" placeholder="Min. 8 characters" />
                  </div>
                </div>

                {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

                <div className="pt-2 flex gap-3">
                  <button type="button" onClick={() => setStep(1)} disabled={isLoading} className="px-6 py-4 border border-border rounded-xl text-muted font-bold hover:bg-gray-50 transition-colors disabled:opacity-50">
                    Back
                  </button>
                  <button type="submit" disabled={isLoading} className="flex-1 flex items-center justify-center px-4 py-4 border border-transparent rounded-xl shadow-sm bg-brand text-base font-bold text-white hover:bg-brand-dark transition-colors gap-2 disabled:opacity-50">
                    {isLoading && <Loader2 size={18} className="animate-spin" />}
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </motion.form>
            )}

          </AnimatePresence>
        </div>

        <div className="mt-8 text-sm text-muted">
           Already have an account?{' '}
           <Link href="/login" className="font-semibold text-brand hover:text-brand-dark">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
