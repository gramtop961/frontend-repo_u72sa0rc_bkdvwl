import { useEffect, useState } from 'react'

export default function StatsCards({ baseUrl }) {
  const [stats, setStats] = useState({ products: 0, labels: 0, updates: 0 })

  const load = async () => {
    try {
      const [p, l, u] = await Promise.all([
        fetch(`${baseUrl}/api/products?limit=1`).then(r => r.ok ? r.json() : []),
        fetch(`${baseUrl}/api/labels?limit=1`).then(r => r.ok ? r.json() : []),
        fetch(`${baseUrl}/api/price-updates?limit=1`).then(r => r.ok ? r.json() : []),
      ])
      setStats({ products: p.length, labels: l.length, updates: u.length })
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => { load() }, [])

  const Card = ({ title, value, color }) => (
    <div className={`rounded-xl p-5 border bg-white/80 backdrop-blur ${color}`}>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  )

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card title="Prodotti" value={stats.products} color="border-blue-200" />
      <Card title="Etichette ESL" value={stats.labels} color="border-emerald-200" />
      <Card title="Aggiornamenti Prezzo" value={stats.updates} color="border-violet-200" />
    </div>
  )
}
