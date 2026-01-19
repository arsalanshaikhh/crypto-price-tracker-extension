import { useState } from 'react'
import { useApp, Alert } from '../context/AppContext'

interface AddAlertProps {
  onAdd: (alert: Alert) => void
  onClose: () => void
}

export default function AddAlert({ onAdd, onClose }: AddAlertProps) {
  const { watchlist } = useApp()
  const [coinId, setCoinId] = useState('')
  const [condition, setCondition] = useState<'above' | 'below'>('above')
  const [price, setPrice] = useState('')

  const handleAdd = () => {
    if (coinId && price) {
      onAdd({ id: Date.now().toString(), coinId, condition, price: parseFloat(price) })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded w-80">
        <h3 className="text-lg mb-2">Add Alert</h3>
        <select value={coinId} onChange={(e) => setCoinId(e.target.value)} className="border p-2 w-full mb-2">
          <option value="">Select Coin</option>
          {watchlist.map(id => <option key={id} value={id}>{id}</option>)}
        </select>
        <select value={condition} onChange={(e) => setCondition(e.target.value as 'above' | 'below')} className="border p-2 w-full mb-2">
          <option value="above">Above</option>
          <option value="below">Below</option>
        </select>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Price"
        />
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Add</button>
        <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  )
}