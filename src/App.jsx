import { useMemo } from 'react'
import StatsCards from './components/StatsCards'
import ProductTable from './components/ProductTable'
import AddProductModal from './components/AddProductModal'

function App() {
  const baseUrl = useMemo(() => import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000', [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(46,134,222,0.15),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.15),transparent_25%)]" />
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" className="w-8 h-8" />
            <h1 className="font-semibold">TabaDigit • Gestione ESL</h1>
          </div>
          <nav className="text-sm opacity-80 flex items-center gap-4">
            <a href="/test" className="hover:opacity-100">Diagnostica</a>
            <a href="https://www.tabadigit.it" target="_blank" className="hover:opacity-100">Sito</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 text-white">
          <h2 className="text-2xl font-semibold">Dashboard</h2>
          <p className="opacity-80">Gestisci prodotti, etichette e prezzi digitali per la tua tabaccheria</p>
        </div>

        <StatsCards baseUrl={baseUrl} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProductTable baseUrl={baseUrl} />
          </div>
          <div className="space-y-6">
            <section className="bg-white/80 backdrop-blur rounded-xl border p-4">
              <h3 className="font-semibold mb-3">Carica Catalogo</h3>
              <p className="text-sm text-slate-600 mb-3">Importa l'elenco prodotti dal gestionale o da file CSV.</p>
              <input type="file" accept=".csv" className="block w-full text-sm" onChange={() => alert('Per la demo, il caricamento CSV non è attivo.')} />
            </section>

            <section className="bg-white/80 backdrop-blur rounded-xl border p-4">
              <h3 className="font-semibold mb-3">Sincronizzazione ESL</h3>
              <p className="text-sm text-slate-600">Visualizza lo stato delle etichette e pianifica aggiornamenti prezzo.</p>
              <div className="flex gap-2">
                <button className="px-3 py-2 rounded bg-emerald-600 text-white" onClick={() => alert('Sincronizzazione in corso...')}>Sincronizza</button>
                <button className="px-3 py-2 rounded border" onClick={() => alert('Pianificazione effettuata')}>Pianifica</button>
              </div>
            </section>

            <section className="bg-white/80 backdrop-blur rounded-xl border p-4">
              <h3 className="font-semibold mb-3">Aggiungi Prodotto</h3>
              <p className="text-sm text-slate-600 mb-3">Crea rapidamente un nuovo articolo nel catalogo.</p>
              <button onClick={() => document.querySelector('#add button').click()} className="px-3 py-2 rounded bg-blue-600 text-white">Nuovo</button>
              <AddProductModal baseUrl={baseUrl} />
            </section>
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center text-white/70 py-6">
        © {new Date().getFullYear()} TabaDigit — Soluzioni per vetrine digitali
      </footer>
    </div>
  )
}

export default App
