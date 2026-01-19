# Crypto Price Monitor - Chrome Extension

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](manifest.json)

A powerful Chrome extension for real-time cryptocurrency price monitoring, featuring watchlists, customizable alerts, portfolio tracking, and interactive charts. Stay informed about market movements with ease.

## 🚀 Features

- **Real-Time Price Tracking**: Get live updates for cryptocurrencies directly in your browser.
- **Customizable Watchlist**: Add and manage your favorite coins for quick access.
- **Price Alerts**: Set notifications for price thresholds to never miss opportunities.
- **Portfolio Management**: Track your holdings, calculate profits/losses, and monitor performance.
- **Historical Charts**: Visualize price trends with interactive charts.
- **Multi-Currency Support**: View prices in various fiat currencies.
- **Dark/Light Mode**: Switch themes for comfortable viewing.
- **Offline Caching**: Access cached data when offline.
- **Rate Limiting Handling**: Smooth API interactions with built-in rate limiting.

## 📋 Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Google Chrome browser

## 🛠 Installation

### From GitHub Repository

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/crypto-price-monitor.git
   cd crypto-price-monitor
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Build the Extension**:
   ```bash
   npm run build
   ```

4. **Load in Chrome**:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" in the top right corner.
   - Click "Load unpacked" and select the `dist` folder from the project directory.

5. **Start Using**:
   - The extension icon will appear in your Chrome toolbar.
   - Click the icon to open the popup and start monitoring crypto prices.

## 📖 Usage

- **Dashboard**: View your watchlist and portfolio at a glance.
- **Add Holdings**: Input your crypto holdings to track portfolio value.
- **Set Alerts**: Define price alerts for specific coins.
- **Charts**: Analyze historical price data with interactive charts.
- **Settings**: Customize preferences like currency and theme.

## 🏗 Project Structure

```
crypto-price-monitor/
├── src/
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── context/        # React context
│   ├── background.ts   # Background script
│   └── popup.html      # Extension popup
├── public/
│   └── manifest.json   # Extension manifest
├── dist/               # Built extension files
├── Landing Page/       # Marketing landing page
└── README.md
```

## 🧪 Testing

Run the test suite with:
```bash
npm test
```

## 🚀 Deployment

To package for distribution:
1. Build the project: `npm run build`
2. Package the `dist` folder as a CRX file using Chrome's extension developer tools or third-party tools.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the maintainers.

## 🔗 Links

- [Landing Page](Landing%20Page/index.html)
- [CoinGecko API](https://www.coingecko.com/en/api)

---

Made with ❤️ for crypto enthusiasts.