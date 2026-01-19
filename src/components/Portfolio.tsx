import { useApp } from '../context/AppContext'
import { fetchCoins, Coin } from '../services/api'
import { useState, useEffect } from 'react'
import AddHolding from './AddHolding'

export default function Portfolio() {
  const { portfolio, currency, removePortfolioItem, addPortfolioItem } = useApp()
  const [coins, setCoins] = useState<Coin[]>([])
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    const ids = portfolio.map(p => p.coinId)
    if (ids.length > 0) {
      fetchCoins(ids, currency).then(setCoins)
    } else {
      setCoins([])
    }
  }, [portfolio, currency])

  const totalValue = portfolio.reduce((sum, p) => {
    const coin = coins.find(c => c.id === p.coinId)
    return sum + (coin ? coin.current_price * p.amount : 0)
  }, 0)

  return (
    <div>
      <h2 className="text-xl mb-2">Portfolio</h2>
      <p className="mb-4">Total Value: ${totalValue.toFixed(2)}</p>
      {portfolio.map(p => {
        const coin = coins.find(c => c.id === p.coinId)
        const value = coin ? coin.current_price * p.amount : 0
        return (
          <div key={p.coinId} className="flex justify-between items-center mb-2 p-2 border rounded">
            <div>
              {coin && <img src={coin.image} alt={coin.name} className="w-6 h-6 inline mr-2" />}
              {p.coinId} - {p.amount}
            </div>
            <div>
              ${value.toFixed(2)}
              <button onClick={() => removePortfolioItem(p.coinId)} className="ml-2 text-red-500">Remove</button>
            </div>
          </div>
        )
      })}
      <button onClick={() => setShowAdd(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Holding</button>
      {showAdd && <AddHolding onAdd={(item) => { addPortfolioItem(item); setShowAdd(false) }} onClose={() => setShowAdd(false)} />}
    </div>
  )
}