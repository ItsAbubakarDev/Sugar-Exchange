// Trade.jsx
import React, { useState, useEffect } from 'react';
import './Trade.css';

const Trade = () => {
  const [selectedExchange, setSelectedExchange] = useState('binance');
  const [tradeType, setTradeType] = useState('buy');
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [amount, setAmount] = useState('');
  const [coinPrices, setCoinPrices] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const popularCoins = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    { id: 'binancecoin', symbol: 'BNB', name: 'Binance Coin' },
    { id: 'cardano', symbol: 'ADA', name: 'Cardano' },
    { id: 'solana', symbol: 'SOL', name: 'Solana' },
    { id: 'ripple', symbol: 'XRP', name: 'XRP' },
    { id: 'polkadot', symbol: 'DOT', name: 'Polkadot' },
    { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin' },
    { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche' },
    { id: 'chainlink', symbol: 'LINK', name: 'Chainlink' }
  ];

  const exchanges = ['binance', 'bybit', 'okx', 'bitget', 'kucoin', 'huobi', 'gate.io'];

  useEffect(() => {
    fetchCoinPrices();
    const interval = setInterval(fetchCoinPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchCoinPrices = async () => {
    try {
      const ids = popularCoins.map(c => c.id).join(',');
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
      );
      setCoinPrices(await res.json());
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch live prices. Please try again.');
    }
  };

  const handleTrade = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }
    setLoading(true);
    setMessage('');

    try {
      const coinData = popularCoins.find(c => c.id === selectedCoin);
      const price = coinPrices[selectedCoin]?.usd || 0;
      const qty = parseFloat(amount);
      const total = qty * price;
      await new Promise(r => setTimeout(r, 1000));
      setMessage(
        `✅ Trade Executed Successfully!\n` +
        `${tradeType.toUpperCase()} ${qty} ${coinData.symbol}\n` +
        `at $${price.toLocaleString()} per coin\n` +
        `on ${selectedExchange.toUpperCase()}\n` +
        `Total: $${total.toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })} (SIMULATION ONLY)`
      );
      setAmount('');
    } catch {
      setMessage('❌ Trade simulation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const currentPrice = coinPrices[selectedCoin]?.usd || 0;
  const estimatedTotal = (parseFloat(amount) || 0) * currentPrice;
  const coinData = popularCoins.find(c => c.id === selectedCoin);

  return (
    <div className="trade-container">
      <div className="trade-wrapper">
        <h1 className="trade-title">Crypto Trading Simulator</h1>
        <p className="trade-subtitle">Practice trading with live market prices</p>

        <label className="trade-label">Exchange</label>
        <select
          className="trade-select"
          value={selectedExchange}
          onChange={e => setSelectedExchange(e.target.value)}
        >
          {exchanges.map(x => (
            <option key={x} value={x}>{x.charAt(0).toUpperCase()+x.slice(1)}</option>
          ))}
        </select>

        <label className="trade-label">Trade Type</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`trade-type-btn ${tradeType==='buy' ? 'trade-type-buy' : 'trade-type-inactive'}`}
            onClick={() => setTradeType('buy')}
          >Buy</button>
          <button
            className={`trade-type-btn ${tradeType==='sell' ? 'trade-type-sell' : 'trade-type-inactive'}`}
            onClick={() => setTradeType('sell')}
          >Sell</button>
        </div>

        <label className="trade-label">Cryptocurrency</label>
        <select
          className="trade-select"
          value={selectedCoin}
          onChange={e => setSelectedCoin(e.target.value)}
        >
          {popularCoins.map(c => (
            <option key={c.id} value={c.id}>
              {c.name} ({c.symbol}) {' - '} 
              {coinPrices[c.id]?.usd ? `$${coinPrices[c.id].usd.toLocaleString()}` : 'Loading...'}
            </option>
          ))}
        </select>

        <label className="trade-label">Amount ({coinData?.symbol})</label>
        <input
          className="trade-input"
          type="number"
          step="0.00000001"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder={`Enter ${coinData?.symbol} amount`}
        />

        {amount && currentPrice > 0 && (
          <div className="trade-summary">
            <div className="trade-summary-item">
              <span>Current Price:</span><span>${currentPrice.toLocaleString()}</span>
            </div>
            <div className="trade-summary-item">
              <span>Estimated Total:</span><span className="value">${estimatedTotal.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
            </div>
          </div>
        )}

        <button
          className="trade-submit"
          disabled={loading || currentPrice===0}
          onClick={handleTrade}
        >
          {loading ? <div className="trade-spinner"></div> : `${tradeType.charAt(0).toUpperCase()+tradeType.slice(1)} ${coinData?.symbol}`}
        </button>

        {message && (
          <div className={`trade-message ${message.includes('✅') ? 'success':'error'}`}> {message} </div>
        )}

        <p className="trade-footer">
          🔴 Live prices from CoinGecko API • Updates every 30 seconds
        </p>
      </div>
    </div>
  );
};

export default Trade;
