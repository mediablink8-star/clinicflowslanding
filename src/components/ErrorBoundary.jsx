import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ClinicFlow error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-dark text-white flex items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
              <span className="text-2xl font-black">!</span>
            </div>
            <h1 className="text-2xl font-black mb-3">Κάτι πήγε στραβά</h1>
            <p className="text-text-muted mb-6 text-sm">
              Αντιμετωπίσαμε ένα μικρό πρόβλημα κατά τη φόρτωση. Δοκίμασε να κάνεις refresh.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20"
            >
              Ανανέωση σελίδας
            </button>
            {this.state.error && (
              <pre className="mt-6 text-left text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-lg p-3 overflow-auto max-h-40">
                {String(this.state.error?.message || this.state.error)}
              </pre>
            )}
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
