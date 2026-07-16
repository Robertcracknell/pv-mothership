'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  async function sendLink() {
    setError(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/villas`,
      },
    })
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif', maxWidth: 400 }}>
      <h1>🚀 Mothership Login</h1>
      {sent ? (
        <p>✅ Check your email and click the magic link!</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: 10, width: '100%', marginBottom: 12 }}
          />
          <button onClick={sendLink} style={{ padding: 10, width: '100%' }}>
            Send magic link
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
      )}
    </main>
  )
}