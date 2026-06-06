import { useRef, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'

const Features = lazy(() => import('./components/Features'))
const ProductTour = lazy(() => import('./components/ProductTour'))
const VoiceDemo = lazy(() => import('./components/VoiceDemo'))
const HowItWorks = lazy(() => import('./components/HowItWorks'))
const Integrations = lazy(() => import('./components/Integrations'))
const UseCases = lazy(() => import('./components/UseCases'))
const Security = lazy(() => import('./components/Security'))
const Stats = lazy(() => import('./components/Stats'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const Pricing = lazy(() => import('./components/Pricing'))
const FAQ = lazy(() => import('./components/FAQ'))
const CTA = lazy(() => import('./components/CTA'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  const featuresRef = useRef(null)
  const pricingRef = useRef(null)

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <div className="mesh-bg" />
      <Navbar />
      <Hero />
      <TrustBar />
      <div ref={featuresRef}>
        <Suspense fallback={null}><Features /></Suspense>
      </div>
      <Suspense fallback={null}><ProductTour /></Suspense>
      <Suspense fallback={null}><VoiceDemo /></Suspense>
      <Suspense fallback={null}><HowItWorks /></Suspense>
      <Suspense fallback={null}><Integrations /></Suspense>
      <Suspense fallback={null}><UseCases /></Suspense>
      <Suspense fallback={null}><Security /></Suspense>
      <Suspense fallback={null}><Stats /></Suspense>
      <Suspense fallback={null}><Testimonials /></Suspense>
      <div ref={pricingRef}>
        <Suspense fallback={null}><Pricing /></Suspense>
      </div>
      <Suspense fallback={null}><FAQ /></Suspense>
      <Suspense fallback={null}><CTA /></Suspense>
      <Suspense fallback={null}><Footer /></Suspense>
    </div>
  )
}
