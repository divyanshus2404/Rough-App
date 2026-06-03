import Navigation from '@/components/Navigation'
import { Users, ShoppingBag, AlertTriangle, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,420', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Active Listings', value: '845', icon: ShoppingBag, color: 'text-brand', bg: 'bg-brand/10' },
    { label: 'Reported Listings', value: '12', icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
    { label: 'Avg. Transaction', value: '$85', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Admin Dashboard</h1>
            <p className="text-muted mt-1">Manage Swaptopia platform metrics and reported content.</p>
          </div>
          <button className="px-4 py-2 bg-brand text-white font-semibold rounded-lg shadow hover:bg-brand-dark transition-colors">
            Download Report
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex items-center gap-4">
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
                 <stat.icon size={24} />
               </div>
               <div>
                 <p className="text-sm font-medium text-muted">{stat.label}</p>
                 <p className="text-2xl font-bold text-foreground">{stat.value}</p>
               </div>
            </div>
          ))}
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-gray-50/50">
              <h2 className="font-bold text-foreground">Reported Listings</h2>
              <button className="text-sm text-brand font-medium hover:text-brand-dark">View All</button>
            </div>
            <div className="divide-y divide-border">
              {[
                { id: '#10492', title: 'Fake AirPods Pro', reason: 'Counterfeit Item', status: 'Pending Review' },
                { id: '#10488', title: 'Calculus Textbook 8th Ed', reason: 'Spam/Duplicate', status: 'Removed' },
              ].map((item, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted">{item.id}</span>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                    </div>
                    <p className="text-sm text-red-600 flex items-center gap-1"><AlertTriangle size={14}/> {item.reason}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.status === 'Removed' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {item.status}
                    </span>
                    <button className="text-sm font-medium text-muted hover:text-foreground">Action</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-gray-50/50">
              <h2 className="font-bold text-foreground">Recent Verifications</h2>
            </div>
            <div className="p-6 space-y-4">
               {[
                 { name: 'Michael T.', domain: 'cs.university.edu', time: '10 mins ago' },
                 { name: 'Emma R.', domain: 'student.university.edu', time: '1 hr ago' },
                 { name: 'David L.', domain: 'alumni.university.edu', time: '3 hrs ago' },
               ].map((user, i) => (
                 <div key={i} className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-brand/10 text-brand flex items-center justify-center font-bold text-sm">
                     {user.name[0]}
                   </div>
                   <div>
                     <h4 className="font-semibold text-foreground text-sm leading-tight">{user.name}</h4>
                     <p className="text-xs text-muted">{user.domain}</p>
                   </div>
                   <span className="ml-auto text-xs text-muted">{user.time}</span>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
