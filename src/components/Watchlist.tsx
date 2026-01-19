import { useApp } from '../context/AppContext'
import { fetchCoins, Coin } from '../services/api'
import { useState, useEffect } from 'react'
import SearchCoin from './SearchCoin'

export default function Watchlist() {
  const { watchlist, currency, removeFromWatchlist, addToWatchlist, theme } = useApp()
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    if (watchlist.length > 0) {
      setLoading(true)
      fetchCoins(watchlist, currency).then(data => {
        setCoins(data)
        setLoading(false)
      }).catch(() => setLoading(false))
    } else {
      setCoins([])
    }
  }, [watchlist, currency])

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
    return num.toString()
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Watchlist</h2>
        <button
          onClick={() => setShowSearch(true)}
          className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors duration-200 shadow-soft hover:shadow-medium"
        >
          + Add Coin
        </button>
      </div>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary-500 border-t-transparent"></div>
        </div>
      )}

      {coins.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📊</div>
          <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>No coins in watchlist</p>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-2`}>Add some cryptocurrencies to track their prices</p>
        </div>
      )}

      <div className="grid gap-4">
        {coins.map(coin => {
          const isPositive = coin.price_change_percentage_24h >= 0
          return (
            <div
              key={coin.id}
              className="p-4 rounded-xl backdrop-blur-md bg-white/10 dark:bg-slate-800/10 border border-white/20 dark:border-slate-700/20 transition-all duration-300 hover:bg-white/20 dark:hover:bg-slate-800/20 hover:shadow-glass hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-lg">{coin.name}</h3>
                    <p className={`text-sm uppercase ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {coin.symbol}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-xl mb-1">
                    ${coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </div>
                </div>
              </div>

              <div className={`mt-4 pt-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}`}>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className={`text-xs uppercase tracking-wide ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Market Cap
                    </p>
                    <p className="font-medium">${formatNumber(coin.market_cap)}</p>
                  </div>
                  <div>
                    <p className={`text-xs uppercase tracking-wide ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      24h Volume
                    </p>
                    <p className="font-medium">${formatNumber(coin.total_volume)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => removeFromWatchlist(coin.id)}
                  className="px-3 py-1 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                >
                  Remove
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {showSearch && (
        <SearchCoin
          onAdd={(coinId: string) => {
            addToWatchlist(coinId)
            setShowSearch(false)
          }}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  )
}