import { useState } from 'react'
import { searchCoins } from '../services/api'
import { PortfolioItem } from '../context/AppContext'

interface AddHoldingProps {
  onAdd: (item: PortfolioItem) => void
  onClose: () => void
}

export default function AddHolding({ onAdd, onClose }: AddHoldingProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [amount, setAmount] = useState('')

  const handleSearch = async () => {
    if (query) {
      const data = await searchCoins(query)
      setResults(data)
    }
  }

  const handleAdd = () => {
    if (selected && amount) {
      onAdd({ coinId: selected.id, amount: parseFloat(amount) })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-80">
        <h3 className="text-lg mb-2">Add Holding</h3>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Search coin"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Search</button>
        <div className="mt-4 max-h-20 overflow-y-auto">
          {results.map(coin => (
            <div key={coin.id} onClick={() => setSelected(coin)} className={`p-1 cursor-pointer ${selected?.id === coin.id ? 'bg-blue-200' : ''}`}>
              {coin.name} ({coin.symbol})
            </div>
          ))}
        </div>
        {selected && (
          <div className="mt-4">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Amount"
            />
            <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Add</button>
          </div>
        )}
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  )
}