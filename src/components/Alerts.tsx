import { useApp } from '../context/AppContext'
import { useState } from 'react'
import AddAlert from './AddAlert'

export default function Alerts() {
  const { alerts, removeAlert, addAlert } = useApp()
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div>
      <h2 className="text-xl mb-2">Alerts</h2>
      {alerts.map(alert => (
        <div key={alert.id} className="flex justify-between items-center mb-2 p-2 border rounded">
          <div>
            {alert.coinId} {alert.condition} ${alert.price}
          </div>
          <button onClick={() => removeAlert(alert.id)} className="text-red-500">Remove</button>
        </div>
      ))}
      <button onClick={() => setShowAdd(true)} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Add Alert</button>
      {showAdd && <AddAlert onAdd={(alert) => { addAlert(alert); setShowAdd(false) }} onClose={() => setShowAdd(false)} />}
    </div>
  )
}