import { useApp } from '../context/AppContext'
import { fetchHistoricalData } from '../services/api'
import { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export default function Charts() {
  const { watchlist } = useApp()
  const [selectedCoin, setSelectedCoin] = useState(watchlist[0] || '')
  const [timeframe, setTimeframe] = useState(7)
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    if (selectedCoin) {
      fetchHistoricalData(selectedCoin, timeframe).then(data => {
        setChartData({
          labels: data.prices.map((p: [number, number]) => new Date(p[0]).toLocaleDateString()),
          datasets: [{
            label: 'Price (USD)',
            data: data.prices.map((p: [number, number]) => p[1]),
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
          }]
        })
      })
    }
  }, [selectedCoin, timeframe])

  return (
    <div>
      <h2 className="text-xl mb-2">Charts</h2>
      <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)} className="border p-2 mb-2">
        {watchlist.map(id => <option key={id} value={id}>{id}</option>)}
      </select>
      <div className="mb-4">
        {[1, 7, 30].map(d => (
          <button key={d} onClick={() => setTimeframe(d)} className={`px-2 py-1 mr-2 rounded ${timeframe === d ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>{d}D</button>
        ))}
      </div>
      {chartData && <Line data={chartData} />}
    </div>
  )
}