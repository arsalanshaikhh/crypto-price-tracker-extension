import React, { createContext, useContext, useState, useEffect } from 'react'

export interface Alert {
  id: string
  coinId: string
  condition: 'above' | 'below'
  price: number
}

export interface PortfolioItem {
  coinId: string
  amount: number
}

interface AppState {
  watchlist: string[]
  currency: string
  theme: 'light' | 'dark'
  alerts: Alert[]
  portfolio: PortfolioItem[]
}

interface AppContextType extends AppState {
  setWatchlist: (watchlist: string[]) => void
  addToWatchlist: (coinId: string) => void
  removeFromWatchlist: (coinId: string) => void
  setCurrency: (currency: string) => void
  setTheme: (theme: 'light' | 'dark') => void
  setAlerts: (alerts: Alert[]) => void
  addAlert: (alert: Alert) => void
  removeAlert: (id: string) => void
  setPortfolio: (portfolio: PortfolioItem[]) => void
  addPortfolioItem: (item: PortfolioItem) => void
  updatePortfolioItem: (coinId: string, amount: number) => void
  removePortfolioItem: (coinId: string) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlistState] = useState<string[]>([])
  const [currency, setCurrencyState] = useState<string>('usd')
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')
  const [alerts, setAlertsState] = useState<Alert[]>([])
  const [portfolio, setPortfolioState] = useState<PortfolioItem[]>([])

  useEffect(() => {
    // Load from chrome storage
    chrome.storage.sync.get(['watchlist', 'currency', 'theme', 'alerts', 'portfolio'], (result) => {
      if (result.watchlist && Array.isArray(result.watchlist)) setWatchlistState(result.watchlist as string[])
      if (result.currency && typeof result.currency === 'string') setCurrencyState(result.currency as string)
      if (result.theme && (result.theme === 'light' || result.theme === 'dark')) setThemeState(result.theme as 'light' | 'dark')
      if (result.alerts && Array.isArray(result.alerts)) setAlertsState(result.alerts as Alert[])
      if (result.portfolio && Array.isArray(result.portfolio)) setPortfolioState(result.portfolio as PortfolioItem[])
    })
  }, [])

  const saveToStorage = (key: string, value: any) => {
    chrome.storage.sync.set({ [key]: value })
  }

  const setWatchlist = (newWatchlist: string[]) => {
    setWatchlistState(newWatchlist)
    saveToStorage('watchlist', newWatchlist)
  }

  const addToWatchlist = (coinId: string) => {
    if (!watchlist.includes(coinId)) {
      const newList = [...watchlist, coinId]
      setWatchlist(newList)
    }
  }

  const removeFromWatchlist = (coinId: string) => {
    const newList = watchlist.filter(id => id !== coinId)
    setWatchlist(newList)
  }

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency)
    saveToStorage('currency', newCurrency)
  }

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
    saveToStorage('theme', newTheme)
  }

  const setAlerts = (newAlerts: Alert[]) => {
    setAlertsState(newAlerts)
    saveToStorage('alerts', newAlerts)
  }

  const addAlert = (alert: Alert) => {
    const newAlerts = [...alerts, alert]
    setAlerts(newAlerts)
  }

  const removeAlert = (id: string) => {
    const newAlerts = alerts.filter(a => a.id !== id)
    setAlerts(newAlerts)
  }

  const setPortfolio = (newPortfolio: PortfolioItem[]) => {
    setPortfolioState(newPortfolio)
    saveToStorage('portfolio', newPortfolio)
  }

  const addPortfolioItem = (item: PortfolioItem) => {
    const newPortfolio = [...portfolio, item]
    setPortfolio(newPortfolio)
  }

  const updatePortfolioItem = (coinId: string, amount: number) => {
    const newPortfolio = portfolio.map(p => p.coinId === coinId ? { ...p, amount } : p)
    setPortfolio(newPortfolio)
  }

  const removePortfolioItem = (coinId: string) => {
    const newPortfolio = portfolio.filter(p => p.coinId !== coinId)
    setPortfolio(newPortfolio)
  }

  return (
    <AppContext.Provider value={{
      watchlist,
      currency,
      theme,
      alerts,
      portfolio,
      setWatchlist,
      addToWatchlist,
      removeFromWatchlist,
      setCurrency,
      setTheme,
      setAlerts,
      addAlert,
      removeAlert,
      setPortfolio,
      addPortfolioItem,
      updatePortfolioItem,
      removePortfolioItem
    }}>
      {children}
    </AppContext.Provider>
  )
}