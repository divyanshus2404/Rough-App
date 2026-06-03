import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tighter text-brand">
              Swaptopia
            </Link>
            <p className="mt-2 text-sm text-muted">
              The premier hyperlocal marketplace for university students. Swap smart, live better.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Marketplace</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><Link href="/browse" className="hover:text-brand transition-colors">Browse All</Link></li>
              <li><Link href="/categories/books" className="hover:text-brand transition-colors">Textbooks</Link></li>
              <li><Link href="/categories/electronics" className="hover:text-brand transition-colors">Electronics</Link></li>
              <li><Link href="/categories/furniture" className="hover:text-brand transition-colors">Furniture</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><Link href="/help" className="hover:text-brand transition-colors">Help Center</Link></li>
              <li><Link href="/safety" className="hover:text-brand transition-colors">Trust & Safety</Link></li>
              <li><Link href="/contact" className="hover:text-brand transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li><Link href="/privacy" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-brand transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 flex items-center justify-between">
          <p className="text-base text-muted">
            &copy; {new Date().getFullYear()} Swaptopia Inc. All rights reserved.
          </p>
          <div className="flex space-x-6 text-muted text-sm">
            <span>Verified Student Network</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
