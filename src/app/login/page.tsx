import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand/5 blur-3xl" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-light/5 blur-3xl" />
      </div>

      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl border border-border/50 shadow-soft relative">
        <div>
          <Link href="/" className="flex justify-center mb-6">
            <span className="text-3xl font-extrabold tracking-tighter text-brand">Swaptopia</span>
          </Link>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-foreground">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-muted">
            Sign in to access your student marketplace
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action="#">
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none relative block w-full px-4 py-3 border border-border placeholder-muted text-foreground rounded-xl focus:outline-none focus:ring-brand focus:border-brand sm:text-sm transition-colors bg-gray-50/50 focus:bg-white" placeholder="University Email (.edu preferred)" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none relative block w-full px-4 py-3 border border-border placeholder-muted text-foreground rounded-xl focus:outline-none focus:ring-brand focus:border-brand sm:text-sm transition-colors bg-gray-50/50 focus:bg-white" placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded" />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-muted">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-semibold text-brand hover:text-brand-dark">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all shadow-md">
              Sign in
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-muted">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full flex items-center justify-center px-4 py-3 border border-border rounded-xl shadow-sm bg-white text-sm font-semibold text-foreground hover:bg-gray-50 transition-colors">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted">
           Don&apos;t have an account?{' '}
           <Link href="/signup" className="font-semibold text-brand hover:text-brand-dark">Sign up</Link>
        </div>
      </div>
    </div>
  )
}
