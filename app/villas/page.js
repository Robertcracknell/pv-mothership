'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../../lib/supabase'

export default function VillasPage() {
  const router = useRouter()
  const [villas, setVillas] = useState([])
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      const { data } = await supabase
        .from('villas')
        .select('*')
        .order('name')
      setVillas(data ?? [])
      setChecking(false)
    }
    load()
  }, [router])

  async function logout() {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (checking) return <p style={{ padding: 40 }}>Checking your keycard... 🪪</p>

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>🏝️ Villa Directory</h1>
      <button onClick={logout} style={{ marginBottom: 20 }}>Log out</button>
      <ul>
        {villas.map((villa) => (
          <li key={villa.id} style={{ marginBottom: 12 }}>
            <strong>{villa.name}</strong> — {villa.location} ·{' '}
            {villa.bedrooms} beds · ${villa.price_per_night}/night
          </li>
        ))}
      </ul>
    </main>
  )
}