import { supabase } from '../../lib/supabase'

export const revalidate = 0

export default async function VillasPage() {
  const { data: villas, error } = await supabase
    .from('villas')
    .select('*')
    .order('name')

  if (error) return <p>Something went wrong: {error.message}</p>

  return (
    <main style={{ padding: 40, fontFamily: 'sans-serif' }}>
      <h1>🏝️ Villa Directory</h1>
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