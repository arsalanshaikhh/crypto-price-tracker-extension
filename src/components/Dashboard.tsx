import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import Watchlist from './Watchlist'
import Portfolio from './Portfolio'
import Alerts from './Alerts'
import Charts from './Charts'
import Settings from './Settings'

export default function Dashboard() {
  const { theme, setTheme } = useApp()
  const [tab, setTab] = useState('watchlist')

  const tabs = [
    { key: 'watchlist', label: 'Watchlist', icon: '📊' },
    { key: 'portfolio', label: 'Portfolio', icon: '💼' },
    { key: 'alerts', label: 'Alerts', icon: '🔔' },
    { key: 'charts', label: 'Charts', icon: '📈' },
    { key: 'settings', label: 'Settings', icon: '⚙️' }
  ]

  return (
    <div className={`flex w-96 h-[600px] ${theme === 'dark' ? 'dark' : ''} relative overflow-hidden rounded-2xl`}>
      {/* Background with glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-900/80 dark:to-slate-800/60 backdrop-blur-xl"></div>

      {/* Sidebar */}
      <div className="relative w-16 flex flex-col items-center py-4 space-y-2 backdrop-blur-md bg-white/10 dark:bg-slate-800/10 border-r border-white/20 dark:border-slate-700/20">
        {/* Logo/Title */}
        <div className="mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-glass">
            ₿
          </div>
        </div>

        {/* Navigation Tabs */}
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
              tab === t.key
                ? 'bg-primary-500/80 text-white shadow-glass'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white/10 dark:bg-slate-700/10 hover:bg-white/20 dark:hover:bg-slate-700/20'
            }`}
            title={t.label}
          >
            {t.icon}
          </button>
        ))}

        {/* Theme Toggle */}
        <div className="mt-auto">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white bg-white/10 dark:bg-slate-700/10 hover:bg-white/20 dark:hover:bg-slate-700/20"
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        {/* Header */}
        <div className="px-6 py-4 backdrop-blur-md bg-white/10 dark:bg-slate-800/10 border-b border-white/20 dark:border-slate-700/20">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            {tabs.find(t => t.key === tab)?.label}
          </h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="animate-fade-in">
            {tab === 'watchlist' && <Watchlist />}
            {tab === 'portfolio' && <Portfolio />}
            {tab === 'alerts' && <Alerts />}
            {tab === 'charts' && <Charts />}
            {tab === 'settings' && <Settings />}
          </div>
        </div>
      </div>
    </div>
  )
}