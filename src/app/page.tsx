import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import FeaturedListings from '@/components/FeaturedListings'
import Footer from '@/components/Footer'
import { ShieldCheck, Zap, LockKeyhole } from 'lucide-react'

export default function Home() {
  return (
    <>
      <Navigation />
      
      <main className="flex-1">
        <Hero />
        
        <FeaturedListings />

        {/* How It Works Section */}
        <section className="py-24 bg-surface border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight">How Swaptopia Works</h2>
              <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
                Your campus marketplace made simple, secure, and lightning fast.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
              {/* Decorative line connecting steps */}
              <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-brand/20 via-brand to-brand/20 -z-10" />
              
              {[
                { step: '1', title: 'Verify', desc: 'Sign up with your .edu email to join your exclusive campus network.' },
                { step: '2', title: 'List or Find', desc: 'Post your items in seconds, or search for exactly what you need nearby.' },
                { step: '3', title: 'Swap Safely', desc: 'Chat in-app, meet on campus, and securely pay or trade.' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-brand flex items-center justify-center shadow-soft mb-6 relative">
                    <span className="text-3xl font-bold text-brand">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-24 bg-gradient-to-b from-surface to-background border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand/5 border border-brand/10 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-6">
                  Built on Trust. <br /> Secured for Students.
                </h2>
                <p className="text-lg text-muted mb-8">
                  Swaptopia isn&apos;t just another marketplace. It&apos;s a closed-loop system designed specifically for your university, ensuring you only interact with verified peers.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: ShieldCheck, text: 'Verified Student Profiles & .edu Enforcement' },
                    { icon: LockKeyhole, text: 'Escrow-like Secure Payments (UPI/Cards)' },
                    { icon: Zap, text: 'Instant In-App Chat to protect your phone number' }
                  ].map((feature, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-brand">
                        <feature.icon size={20} />
                      </div>
                      <span className="text-foreground font-medium">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 w-full max-w-md relative">
                {/* Abstract Security/Trust Graphic */}
                <div className="aspect-square rounded-full bg-gradient-to-tr from-brand/20 to-brand-light/40 animate-pulse-slow flex items-center justify-center relative">
                  <div className="w-3/4 h-3/4 rounded-full bg-white shadow-xl flex items-center justify-center">
                    <ShieldCheck size={80} className="text-brand" strokeWidth={1.5} />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-2xl shadow-lg rotate-12 flex items-center justify-center">
                     <LockKeyhole size={40} className="text-foreground/80" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                     <Zap size={32} className="text-brand-light" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
