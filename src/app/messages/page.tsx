import Navigation from '@/components/Navigation'
import { Send, Image as ImageIcon } from 'lucide-react'

export default function MessagesPage() {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      <Navigation />
      
      <div className="flex-1 flex overflow-hidden max-w-7xl mx-auto w-full border-x border-border shadow-soft bg-white">
        
        {/* Left Sidebar: Conversations */}
        <div className="w-80 border-r border-border flex flex-col bg-gray-50/30">
          <div className="p-4 border-b border-border bg-white">
            <h2 className="text-xl font-bold text-foreground">Messages</h2>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {/* Conversation Item 1 (Active) */}
            <div className="p-4 border-b border-border bg-brand/5 cursor-pointer flex gap-3 relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand" />
              <div className="w-12 h-12 rounded-full bg-brand/20 flex-shrink-0 flex items-center justify-center text-brand font-bold">
                S
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-foreground truncate">Sarah K.</h3>
                  <span className="text-xs text-brand font-medium">10:42 AM</span>
                </div>
                <p className="text-sm text-foreground font-medium truncate">Are you available to meet at the library today?</p>
                <p className="text-xs text-muted mt-1 truncate">Re: Introduction to Algorithms</p>
              </div>
            </div>

            {/* Conversation Item 2 */}
            <div className="p-4 border-b border-border bg-white hover:bg-gray-50 cursor-pointer flex gap-3 transition-colors">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-muted font-bold">
                E
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-foreground truncate">Emma R.</h3>
                  <span className="text-xs text-muted">Yesterday</span>
                </div>
                <p className="text-sm text-muted truncate">I can do $140 if you pay cash.</p>
                <p className="text-xs text-muted mt-1 truncate">Re: Sony WH-1000XM4</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Area: Active Chat */}
        <div className="flex-1 flex flex-col bg-white relative">
          
          {/* Chat Header */}
          <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-bold">
                S
              </div>
              <div>
                <h3 className="font-bold text-foreground leading-tight">Sarah K.</h3>
                <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
                </p>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground">Introduction to Algorithms</p>
              <p className="text-xs text-brand font-bold">$45</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
            
            <div className="text-center">
              <span className="text-xs font-medium text-muted bg-gray-100 px-3 py-1 rounded-full">Today</span>
            </div>

            {/* Received Message */}
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-brand/20 flex-shrink-0 flex items-center justify-center text-brand font-bold text-xs">
                S
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm max-w-[70%]">
                <p className="text-foreground text-sm">Hi! Is this book still available?</p>
              </div>
            </div>

            {/* Sent Message */}
            <div className="flex items-end gap-2 justify-end">
              <div className="bg-brand text-white p-3 rounded-2xl rounded-br-sm max-w-[70%]">
                <p className="text-sm">Yes, it is! It's in great condition.</p>
              </div>
            </div>

            {/* Received Message */}
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-brand/20 flex-shrink-0 flex items-center justify-center text-brand font-bold text-xs">
                S
              </div>
              <div className="bg-gray-100 p-3 rounded-2xl rounded-bl-sm max-w-[70%]">
                <p className="text-foreground text-sm">Awesome. Are you available to meet at the library today?</p>
              </div>
            </div>

          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-white">
            <div className="flex items-end gap-2 bg-gray-50 border border-border p-2 rounded-2xl focus-within:ring-2 focus-within:ring-brand focus-within:border-brand transition-shadow">
              <button className="p-2 text-muted hover:text-brand transition-colors">
                <ImageIcon size={20} />
              </button>
              <textarea 
                rows={1}
                placeholder="Type a message..."
                className="flex-1 max-h-32 min-h-[40px] bg-transparent resize-none py-2 px-2 focus:outline-none text-foreground text-sm"
              />
              <button className="p-2 bg-brand text-white rounded-xl hover:bg-brand-dark transition-colors shadow-sm">
                <Send size={18} />
              </button>
            </div>
            <div className="text-center mt-2">
              <p className="text-[10px] text-muted">Never share your bank details or passwords in chat.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
