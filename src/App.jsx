import { useRef, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TrustBar from './components/TrustBar'
import Features from './components/Features'
import ProductTour from './components/ProductTour'
import VoiceDemo from './components/VoiceDemo'
import HowItWorks from './components/HowItWorks'
import Integrations from './components/Integrations'
import UseCases from './components/UseCases'
import Security from './components/Security'
import Stats from './components/Stats'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const featuresRef = useRef(null)
  const pricingRef = useRef(null)
  const [plans, setPlans] = useState(null)
  const [pricingLoading, setPricingLoading] = useState(true)

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'
    fetch(`${API_BASE}/api/public/plans`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setPlans(data.data)
      })
      .catch(() => {})
      .finally(() => setPricingLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <div className="mesh-bg" />
      <Navbar />
      <Hero />
      <TrustBar />
      <div ref={featuresRef}>
        <Features />
      </div>
      <ProductTour />
      <VoiceDemo />
      <HowItWorks />
      <Integrations />
      <UseCases />
      <Security />
      <Stats />
      <Testimonials />
      <div ref={pricingRef}>
        <Pricing plans={plans} loading={pricingLoading} />
      </div>
      <FAQ />
      <CTA />
      <Footer />
    </div>
  )
}
