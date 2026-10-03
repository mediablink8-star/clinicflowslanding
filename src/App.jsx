import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Demo from './components/Demo'
import ProductTour from './components/ProductTour'
import Capabilities from './components/Capabilities'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Navbar />
      <main>
        <Hero />
        <Demo />
        <ProductTour />
        <Capabilities />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
