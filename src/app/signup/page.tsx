import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-3xl" />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl border border-border/50 shadow-soft relative">
        <div>
          <Link href="/" className="flex justify-center mb-6">
            <span className="text-3xl font-extrabold tracking-tighter text-brand">Swaptopia</span>
          </Link>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-foreground">
            Join the Campus Network
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            Create an account to start buying and selling safely.
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action="#">
          <div className="space-y-4">
            <div>
              <label htmlFor="full-name" className="sr-only">Full Name</label>
              <input id="full-name" name="name" type="text" required className="appearance-none relative block w-full px-4 py-3 border border-border placeholder-muted text-foreground rounded-xl focus:outline-none focus:ring-brand focus:border-brand sm:text-sm transition-colors bg-gray-50/50 focus:bg-white" placeholder="Full Name" />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-4 py-3 border border-border placeholder-muted text-foreground rounded-xl focus:outline-none focus:ring-brand focus:border-brand sm:text-sm transition-colors bg-gray-50/50 focus:bg-white" placeholder="University Email (.edu preferred)" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" required className="appearance-none relative block w-full px-4 py-3 border border-border placeholder-muted text-foreground rounded-xl focus:outline-none focus:ring-brand focus:border-brand sm:text-sm transition-colors bg-gray-50/50 focus:bg-white" placeholder="Password (min. 8 characters)" />
            </div>
          </div>

          <div className="bg-green-50/50 border border-green-100 p-4 rounded-xl flex items-start gap-3">
             <ShieldCheck size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
             <p className="text-xs text-green-800 leading-relaxed">
               Using a valid university email automatically grants you a <strong>Verified Student Badge</strong>, boosting your trust score!
             </p>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all shadow-md">
              Create Account
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-muted">
           Already have an account?{' '}
           <Link href="/login" className="font-semibold text-brand hover:text-brand-dark">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
