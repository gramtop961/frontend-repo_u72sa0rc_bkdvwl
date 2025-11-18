import { useEffect, useMemo, useState } from 'react'

export default function ProductTable({ baseUrl }) {
  const [query, setQuery] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const r = await fetch(`${baseUrl}/api/products?q=${encodeURIComponent(query)}`)
      if (!r.ok) throw new Error('Errore caricamento prodotti')
      const data = await r.json()
      setItems(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onPriceChange = async (id, newPrice) => {
    try {
      const r = await fetch(`${baseUrl}/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: parseFloat(newPrice) })
      })
      if (!r.ok) throw new Error('Impossibile aggiornare il prezzo')
      await load()
    } catch (e) {
      alert(e.message)
    }
  }

  const onDelete = async (id) => {
    if (!confirm('Eliminare il prodotto?')) return
    const r = await fetch(`${baseUrl}/api/products/${id}`, { method: 'DELETE' })
    if (r.ok) setItems(items.filter(x => x.id !== id))
  }

  return (
    <div className="bg-white/80 backdrop-blur rounded-xl border p-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-4">
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cerca per nome, brand o SKU"
            className="flex-1 sm:w-72 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={load} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Cerca</button>
        </div>
        <a href="#add" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Aggiungi</a>
      </div>

      {loading && <p className="text-slate-500">Caricamento...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600 border-b">
              <th className="py-2 pr-4">Prodotto</th>
              <th className="py-2 pr-4">SKU</th>
              <th className="py-2 pr-4">Prezzo (€)</th>
              <th className="py-2 pr-4">ESL</th>
              <th className="py-2 pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="py-2 pr-4">
                  <div className="font-medium">{p.name}</div>
                  <div className="text-slate-500">{p.brand || p.category}</div>
                </td>
                <td className="py-2 pr-4">{p.sku}</td>
                <td className="py-2 pr-4">
                  <input
                    defaultValue={p.price}
                    type="number"
                    step="0.01"
                    onBlur={(e) => onPriceChange(p.id, e.target.value)}
                    className="w-28 border rounded px-2 py-1"
                  />
                </td>
                <td className="py-2 pr-4">{p.esl_id || '-'}</td>
                <td className="py-2 pr-4 text-right">
                  <button onClick={() => onDelete(p.id)} className="px-3 py-1 bg-red-600 text-white rounded">Elimina</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
