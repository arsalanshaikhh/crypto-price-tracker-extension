// Background script for Chrome extension

const API_KEY = 'CG-6fF1XY7ErEgcxWvy3cx4CkMj'

chrome.runtime.onInstalled.addListener(() => {
  console.log('Crypto Monitor extension installed')
  chrome.alarms.create('priceCheck', { delayInMinutes: 1, periodInMinutes: 1 })
})

// Handle alarms for periodic price checks
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'priceCheck') {
    // Get alerts
    const { alerts } = await chrome.storage.sync.get('alerts') as { alerts?: any[] }
    if (alerts && Array.isArray(alerts) && alerts.length > 0) {
      const coinIds = [...new Set(alerts.map((a: any) => a.coinId))]
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd&x_cg_demo_api_key=${API_KEY}`)
        const prices = await response.json()
        alerts.forEach((alert: any) => {
          const price = prices[alert.coinId]?.usd
          if (price) {
            let triggered = false
            if (alert.condition === 'above' && price > alert.price) triggered = true
            if (alert.condition === 'below' && price < alert.price) triggered = true
            if (triggered) {
              chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icons/icon48.png',
                title: 'Price Alert',
                message: `${alert.coinId} is ${alert.condition} ${alert.price}`
              })
              // Remove alert
              const newAlerts = alerts.filter((a: any) => a.id !== alert.id)
              chrome.storage.sync.set({ alerts: newAlerts })
            }
          }
        })
      } catch (error) {
        console.error('Error checking prices:', error)
      }
    }
  }
})