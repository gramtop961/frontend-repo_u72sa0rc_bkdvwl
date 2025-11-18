import { useState } from 'react'

export default function AddProductModal({ baseUrl }) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', sku: '', brand: '', price: '' })
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const r = await fetch(`${baseUrl}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          sku: form.sku,
          brand: form.brand,
          price: parseFloat(form.price || '0'),
        })
      })
      if (!r.ok) throw new Error('Impossibile creare il prodotto')
      setOpen(false)
      setForm({ name: '', sku: '', brand: '', price: '' })
      window.location.reload()
    } catch (e) {
      alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="add">
      <button onClick={() => setOpen(true)} className="hidden">Apri</button>
      {open && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Nuovo Prodotto</h3>
            <form onSubmit={submit} className="space-y-3">
              <input required value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Nome" className="w-full border rounded px-3 py-2" />
              <input required value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} placeholder="SKU" className="w-full border rounded px-3 py-2" />
              <input value={form.brand} onChange={e=>setForm({...form, brand:e.target.value})} placeholder="Brand" className="w-full border rounded px-3 py-2" />
              <input required type="number" step="0.01" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} placeholder="Prezzo" className="w-full border rounded px-3 py-2" />

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={()=>setOpen(false)} className="px-3 py-2 rounded border">Annulla</button>
                <button disabled={loading} className="px-3 py-2 rounded bg-blue-600 text-white">{loading ? 'Salvataggio...' : 'Salva'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
