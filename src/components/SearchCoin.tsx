import { useState, useEffect } from 'react'
import { searchCoins } from '../services/api'

interface SearchCoinProps {
  onAdd: (coinId: string) => void
  onClose: () => void
}

export default function SearchCoin({ onAdd, onClose }: SearchCoinProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [debounceTimer, setDebounceTimer] = useState<number | null>(null)

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim()) {
      setLoading(true)
      try {
        const data = await searchCoins(searchQuery)
        setResults(data.slice(0, 10)) // Limit to 10 results
      } catch (error) {
        setResults([])
      }
      setLoading(false)
    } else {
      setResults([])
    }
  }

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    const timer = setTimeout(() => {
      handleSearch(query)
    }, 300) // 300ms debounce

    setDebounceTimer(timer)

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 border border-white/20 dark:border-slate-700/20 rounded-2xl shadow-glass w-96 max-w-sm mx-4 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/20 dark:border-slate-700/20">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Search Cryptocurrency</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-white/20 dark:hover:bg-slate-800/20 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="p-6">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 pl-12 bg-white/50 dark:bg-slate-800/50 border border-white/30 dark:border-slate-600/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent backdrop-blur-sm transition-all"
              placeholder="Search by name or symbol..."
              autoFocus
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary-500 border-t-transparent"></div>
            </div>
          )}

          {!loading && results.length === 0 && query && (
            <div className="text-center py-8">
              <div className="text-3xl mb-2">🔍</div>
              <p className="text-gray-500 dark:text-gray-400">No results found</p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try a different search term</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="px-2 pb-2">
              {results.map(coin => (
                <div
                  key={coin.id}
                  className="mx-4 mb-2 p-3 rounded-xl hover:bg-white/20 dark:hover:bg-slate-800/20 transition-all duration-200 cursor-pointer group"
                  onClick={() => {
                    onAdd(coin.id)
                    onClose()
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img src={coin.thumb} alt={coin.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                          {coin.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">+</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}