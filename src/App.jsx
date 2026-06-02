import { useRef, useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Pricing from './components/Pricing'
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

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <div className="mesh-bg" />
      <Navbar />
      <Hero />
      <div ref={featuresRef}>
        <Features />
      </div>
      <HowItWorks />
      <div ref={pricingRef}>
        <Pricing plans={plans} loading={pricingLoading} />
      </div>
      <CTA />
      <Footer />
    </div>
  )
}