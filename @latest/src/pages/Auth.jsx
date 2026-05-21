import { useState } from 'react'

function Auth({ onLogin }) {
  const [authMode, setAuthMode] = useState('login')
  const [credentials, setCredentials] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const isSignUp = authMode === 'signup'

  function handleChange(event) {
    const { name, value } = event.target
    setCredentials((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (isSignUp && !credentials.fullName.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!credentials.email.includes('@') || !credentials.password.trim()) {
      setError('Please enter a valid email and password.')
      return
    }

    setError('')
    onLogin(credentials.email)
  }

  function handleGoogleLogin() {
    setError('')
    onLogin('google.patient@medicarehospital.com')
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <div className="auth-copy">
          <p className="eyebrow">MediCare Hospital</p>
          <h1>{isSignUp ? 'Create your patient account' : 'Sign in to continue'}</h1>
          <p>
            Access appointments, department services, consultation payments, and
            symptom submission from your patient portal.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <button className="google-auth-button" type="button" onClick={handleGoogleLogin}>
            <span aria-hidden="true">G</span>
            Continue with Google
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <div className="auth-switch" role="tablist" aria-label="Authentication mode">
            <button
              className={!isSignUp ? 'auth-switch-active' : ''}
              type="button"
              onClick={() => {
                setAuthMode('login')
                setError('')
              }}
            >
              Log in
            </button>
            <button
              className={isSignUp ? 'auth-switch-active' : ''}
              type="button"
              onClick={() => {
                setAuthMode('signup')
                setError('')
              }}
            >
              Sign up
            </button>
          </div>

          {isSignUp ? (
            <div className="form-row">
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={credentials.fullName}
                onChange={handleChange}
                placeholder="Jane Doe"
              />
            </div>
          ) : null}

          <div className="form-row">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="patient@example.com"
            />
          </div>

          <div className="form-row">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          {error ? <p className="form-error">{error}</p> : null}

          <button className="primary-button" type="submit">
            {isSignUp ? 'Create account' : 'Log in'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Auth
