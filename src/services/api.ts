const API_BASE = 'https://api.coingecko.com/api/v3'
const API_KEY = 'CG-6fF1XY7ErEgcxWvy3cx4CkMj'

export interface Coin {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number | null
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: any
  last_updated: string
}

export interface HistoricalData {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

async function apiRequest(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`${url}&x_cg_demo_api_key=${API_KEY}`)
      if (response.status === 429) {
        // Rate limited, wait and retry
        const wait = Math.pow(2, i) * 1000 // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, wait))
        continue
      }
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      if (i === retries - 1) throw error
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }
}

export async function fetchCoins(ids: string[], currency = 'usd'): Promise<Coin[]> {
  const url = `${API_BASE}/coins/markets?vs_currency=${currency}&ids=${ids.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  return apiRequest(url)
}

export async function fetchAllCoins(currency = 'usd', page = 1): Promise<Coin[]> {
  const url = `${API_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=${page}&sparkline=false`
  return apiRequest(url)
}

export async function fetchHistoricalData(id: string, days: number, currency = 'usd'): Promise<HistoricalData> {
  const url = `${API_BASE}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
  return apiRequest(url)
}

export async function searchCoins(query: string): Promise<any[]> {
  const url = `${API_BASE}/search?query=${query}`
  const data = await apiRequest(url)
  return data.coins
}