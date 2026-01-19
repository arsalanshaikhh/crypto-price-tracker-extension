import { useApp } from '../context/AppContext'

export default function Settings() {
  const { currency, setCurrency, theme, setTheme } = useApp()

  const currencies = [
    { code: 'usd', name: 'US Dollar', symbol: '$' },
    { code: 'eur', name: 'Euro', symbol: '€' },
    { code: 'jpy', name: 'Japanese Yen', symbol: '¥' },
    { code: 'gbp', name: 'British Pound', symbol: '£' },
    { code: 'cad', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'aud', name: 'Australian Dollar', symbol: 'A$' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-6">Settings</h2>
      </div>

      {/* Currency Selection */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3">Currency</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Choose your preferred currency for displaying prices
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`p-4 rounded-xl border transition-all duration-200 backdrop-blur-sm ${
                currency === curr.code
                  ? 'bg-primary-500/20 border-primary-500/50 text-primary-700 dark:text-primary-300 shadow-glass'
                  : 'bg-white/10 dark:bg-slate-800/10 border-white/20 dark:border-slate-700/20 hover:bg-white/20 dark:hover:bg-slate-800/20'
              }`}
            >
              <div className="text-left">
                <div className="font-semibold">{curr.symbol} {curr.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 uppercase mt-1">
                  {curr.code}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3">Appearance</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Customize how the extension looks and feels
          </p>
        </div>

        <div className="backdrop-blur-md bg-white/10 dark:bg-slate-800/10 border border-white/20 dark:border-slate-700/20 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">
                {theme === 'light' ? '☀️' : '🌙'}
              </div>
              <div>
                <div className="font-medium">
                  {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {theme === 'light' ? 'Bright and clean' : 'Easy on the eyes'}
                </div>
              </div>
            </div>
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="relative w-14 h-8 bg-white/20 dark:bg-slate-700/20 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
                  theme === 'dark' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-3">Data & Privacy</h3>
        </div>

        <div className="space-y-3">
          <div className="backdrop-blur-md bg-white/10 dark:bg-slate-800/10 border border-white/20 dark:border-slate-700/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto-refresh</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically update prices every 30 seconds
                </div>
              </div>
              <div className="w-12 h-6 bg-green-500/20 rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="backdrop-blur-md bg-white/10 dark:bg-slate-800/10 border border-white/20 dark:border-slate-700/20 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Notifications</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Get alerts when price targets are reached
                </div>
              </div>
              <div className="w-12 h-6 bg-green-500/20 rounded-full flex items-center px-1">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-6 border-t border-white/20 dark:border-slate-700/20">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Crypto Monitor v1.0.0
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Powered by CoinGecko API
          </p>
        </div>
      </div>
    </div>
  )
}