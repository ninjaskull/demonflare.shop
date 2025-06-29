
import './App.css'
import ProfileHeader from './components/ProfileHeader'
import LinksList from './components/LinksList'
import ProductShowcase from './components/ProductShowcase'
import { config } from './config/config'

function App() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Artistic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main geometric shapes */}
        <svg className="absolute top-1/4 right-1/4 w-64 h-64 text-purple-100/30" viewBox="0 0 256 256" fill="none">
          <circle cx="128" cy="128" r="80" fill="currentColor" opacity="0.1"/>
          <circle cx="128" cy="128" r="40" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.2"/>
          <circle cx="180" cy="120" r="6" fill="currentColor" opacity="0.12"/>
          <path d="M160 40 Q 180 20 200 40 Q 180 60 160 40" fill="currentColor" opacity="0.06"/>
        </svg>
        
        {/* Enhanced floating artistic elements */}
        <div className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-gradient-to-r from-purple-200/20 to-blue-200/20 blur-xl animate-float" style={{animationDuration: '6s'}}></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-gradient-to-r from-indigo-200/15 to-violet-200/15 blur-lg animate-float" style={{animationDuration: '8s', animationDelay: '2s'}}></div>
        <div className="absolute top-2/3 left-1/6 w-12 h-12 rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-md animate-float" style={{animationDuration: '7s', animationDelay: '4s'}}></div>
        
        {/* Additional artistic shapes */}
        <div className="absolute top-1/6 right-1/5 w-24 h-8 bg-gradient-to-r from-pink-200/15 to-purple-200/15 rounded-full blur-lg animate-float transform rotate-45" style={{animationDuration: '9s', animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/5 left-1/3 w-14 h-14 bg-gradient-to-br from-cyan-200/12 to-blue-200/12 rounded-full blur-md animate-float" style={{animationDuration: '10s', animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-1/6 w-6 h-18 bg-gradient-to-b from-violet-200/18 to-indigo-200/18 rounded-full blur-sm animate-float" style={{animationDuration: '8s', animationDelay: '5s'}}></div>
        
        {/* Geometric artistic patterns */}
        <svg className="absolute top-1/3 left-1/5 w-32 h-32 text-purple-200/20" viewBox="0 0 128 128" fill="none">
          <polygon points="64,20 84,44 64,68 44,44" fill="currentColor" opacity="0.1" className="animate-pulse"/>
          <circle cx="64" cy="44" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.15"/>
        </svg>
        
        <svg className="absolute bottom-1/4 right-1/4 w-28 h-28 text-blue-200/20" viewBox="0 0 112 112" fill="none">
          <path d="M20 56 L56 20 L92 56 L56 92 Z" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.12"/>
          <circle cx="56" cy="56" r="8" fill="currentColor" opacity="0.08"/>
        </svg>
        
        {/* Abstract flowing lines */}
        <svg className="absolute top-1/5 left-1/2 w-40 h-20 text-indigo-200/15" viewBox="0 0 160 80" fill="none">
          <path d="M0 40 Q 40 10 80 40 T 160 40" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2"/>
          <path d="M0 50 Q 30 20 60 50 T 120 50" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.15"/>
        </svg>
        
        <svg className="absolute bottom-1/6 left-1/4 w-36 h-24 text-violet-200/15" viewBox="0 0 144 96" fill="none">
          <path d="M0 48 Q 36 24 72 48 Q 108 72 144 48" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.18"/>
          <path d="M20 60 Q 50 30 80 60 Q 110 90 140 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.12"/>
        </svg>
        
        {/* Scattered artistic dots */}
        <div className="absolute top-1/8 left-1/8 w-2 h-2 bg-purple-300/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/8 w-1.5 h-1.5 bg-blue-300/25 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/8 right-1/5 w-3 h-3 bg-indigo-300/20 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 left-1/12 w-1 h-1 bg-violet-300/35 rounded-full animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-2.5 h-2.5 bg-pink-300/25 rounded-full animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-md">
        <ProfileHeader profile={config.profile} />
        <LinksList links={config.links} />
        <ProductShowcase products={config.products.featured} />
      </div>
    </div>
  )
}

export default App