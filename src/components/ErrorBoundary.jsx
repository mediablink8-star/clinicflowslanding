import { Component } from 'react'

/**
 * Last-resort guard for live demos.
 *
 * If any component throws while rendering, fall back to a working recovery
 * panel rather than a blank page. The primary CTA is a real link so the
 * presenter can still reach the signup even in the degraded state.
 */
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
        <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
          <div className="max-w-md">
            <p className="eyebrow">ClinicFlow</p>
            <h1 className="mt-4 text-[1.75rem]">Κάτι πήγε στραβά</h1>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-2">
              Υπάρξε πρόβλημα στην εμφάνιση της σελίδας. Μπορείτε να δοκιμάσετε ξανά, ή να
              ξεκινήσετε αμέσως τη δοκιμή σας.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="bg-ink px-5 py-3 text-sm font-medium text-canvas transition-colors hover:bg-ink-2"
              >
                Ανανέωση σελίδας
              </button>
              <a
                href="https://clinicflows.vercel.app/register"
                className="border border-line px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink-4"
              >
                Δοκιμή δωρεάν
              </a>
            </div>

            {this.state.error && (
              <pre className="mt-8 max-h-40 overflow-auto border border-line bg-surface p-3 text-left text-[0.6875rem] text-ink-3">
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
