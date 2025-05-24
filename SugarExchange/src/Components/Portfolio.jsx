// src/Components/Portfolio.jsx
import React, { useState, useEffect } from 'react';
import './Portfolio.css';

const Portfolio = ({ userId }) => {
  const [portfolio, setPortfolio] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [coins, setCoins] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState('all');
  const [selectedCoin, setSelectedCoin] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch portfolio
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/portfolio/${userId}`);
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const data = await res.json();
        setPortfolio(data);
        // build filter lists
        setExchanges([ ...new Set(data.map(item => item.exchange)) ]);
        setCoins([ ...new Set(data.map(item => item.coin)) ]);
      } catch (err) {
        setError('Failed to load portfolio.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  // 2. Apply filters whenever data or selection changes
  useEffect(() => {
    let temp = portfolio;
    if (selectedExchange !== 'all') {
      temp = temp.filter(item => item.exchange === selectedExchange);
    }
    if (selectedCoin !== 'all') {
      temp = temp.filter(item => item.coin === selectedCoin);
    }
    setFiltered(temp);
  }, [portfolio, selectedExchange, selectedCoin]);

  // 3. Render
  if (loading) return <div className="portfolio-loading">Loading…</div>;
  if (error)   return <div className="portfolio-error">{error}</div>;

  return (
    <div className="portfolio-container">
      <h2>Your Portfolio</h2>

      <div className="portfolio-filters">
        <label>
          Exchange:
          <select
            value={selectedExchange}
            onChange={e => setSelectedExchange(e.target.value)}
          >
            <option value="all">All</option>
            {exchanges.map(ex => (
              <option key={ex} value={ex}>{ex}</option>
            ))}
          </select>
        </label>

        <label>
          Coin:
          <select
            value={selectedCoin}
            onChange={e => setSelectedCoin(e.target.value)}
          >
            <option value="all">All</option>
            {coins.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Optional: insert chart here */}
      {/* <div className="portfolio-chart">
        // e.g. a simple Chart.js or Recharts component
      </div> */}

      <table className="portfolio-table">
        <thead>
          <tr>
            <th>Exchange</th>
            <th>Coin</th>
            <th>Quantity</th>
            <th>Current Value</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(({ exchange, coin, quantity, value }) => (
            <tr key={`${exchange}-${coin}`}>
              <td>{exchange}</td>
              <td>{coin}</td>
              <td>{quantity}</td>
              <td>${value.toFixed(2)}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                No entries match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
