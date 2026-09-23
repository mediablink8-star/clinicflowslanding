import { useRef, Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SalesDemo from './components/SalesDemo'
import ClinicCommandCenter from './components/ClinicCommandCenter'

const Features = lazy(() => import('./components/Features'))
const ProductTour = lazy(() => import('./components/ProductTour'))
const VoiceDemo = lazy(() => import('./components/VoiceDemo'))
const HowItWorks = lazy(() => import('./components/HowItWorks'))
const Integrations = lazy(() => import('./components/Integrations'))
const Security = lazy(() => import('./components/Security'))
const Pricing = lazy(() => import('./components/Pricing'))
const FAQ = lazy(() => import('./components/FAQ'))
const CTA = lazy(() => import('./components/CTA'))
const Footer = lazy(() => import('./components/Footer'))

export default function App() {
  const pricingRef = useRef(null)

  return (
    <div className="light-site min-h-screen bg-dark text-dark overflow-x-hidden">
      <div className="mesh-bg" />
      <Navbar />

      {/* 1. Promise: make the value obvious immediately */}
      <Hero />

      {/* 2. Sales story: pain → solution → live proof → pilot */}
      <SalesDemo />

      {/* 3. Proof: show what the owner actually gets */}
      <ClinicCommandCenter />

      {/* 4. Product depth, only after the business case is clear */}
      <section className="cv-auto"><Suspense fallback={null}><Features /></Suspense></section>
      <section className="cv-auto"><Suspense fallback={null}><ProductTour /></Suspense></section>
      <section className="cv-auto"><Suspense fallback={null}><VoiceDemo /></Suspense></section>
      <section className="cv-auto"><Suspense fallback={null}><HowItWorks /></Suspense></section>
      <section className="cv-auto"><Suspense fallback={null}><Integrations /></Suspense></section>
      <section className="cv-auto"><Suspense fallback={null}><Security /></Suspense></section>

      {/* 5. Commercial decision */}
      <div ref={pricingRef} className="cv-auto"><Suspense fallback={null}><Pricing /></Suspense></div>
      <section className="cv-auto"><Suspense fallback={null}><FAQ /></Suspense></section>
      <section className="cv-auto"><Suspense fallback={null}><CTA /></Suspense></section>
      <section className="cv-auto"><Suspense fallback={null}><Footer /></Suspense></section>
    </div>
  )
}
