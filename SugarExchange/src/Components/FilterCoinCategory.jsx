import React, { useState, useEffect } from 'react';
import './FilterCoinCategory.css';

const FilterCoinCategory = () => {
  const [filters, setFilters] = useState({
    exchange: '',
    category: '',
    minPrice: '',
    maxPrice: ''
  });
  
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Popular exchanges list
  const exchanges = [
    'Binance',
    'Bybit',
    'OKX',
    'Coinbase',
    'Kraken',
    'KuCoin',
    'Huobi',
    'Gate.io',
    'Bitget',
    'MEXC'
  ];

  // Coin categories
  const categories = [
    'DeFi',
    'GameFi',
    'Metaverse',
    'NFT',
    'Layer 1',
    'Layer 2',
    'Meme',
    'AI',
    'Storage',
    'Privacy',
    'Oracle',
    'Infrastructure',
    'Yield Farming',
    'DEX',
    'Lending'
  ];

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Fetch filtered coins from backend
  const fetchCoins = async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      
      if (filters.exchange) queryParams.append('exchange', filters.exchange);
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);

      const response = await fetch(`/api/coins/filter?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch coins');
      }

      const data = await response.json();
      setCoins(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching coins:', err);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters
  const handleApplyFilters = () => {
    fetchCoins();
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      exchange: '',
      category: '',
      minPrice: '',
      maxPrice: ''
    });
    setCoins([]);
  };

  // Format price
  const formatPrice = (price) => {
    if (price >= 1) {
      return `$${price.toFixed(2)}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  // Format market cap
  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else if (marketCap >= 1e3) {
      return `$${(marketCap / 1e3).toFixed(2)}K`;
    }
    return `$${marketCap?.toFixed(2) || 'N/A'}`;
  };

  return (
    <div className="filter-coin-container">
      <div className="filter-section">
        <h2>Filter Cryptocurrencies</h2>
        
        {/* Exchange Filter */}
        <div className="filter-group">
          <label htmlFor="exchange">Exchange</label>
          <select
            id="exchange"
            value={filters.exchange}
            onChange={(e) => handleFilterChange('exchange', e.target.value)}
          >
            <option value="">All Exchanges</option>
            {exchanges.map(exchange => (
              <option key={exchange} value={exchange}>
                {exchange}
              </option>
            ))}
          </select>
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filters */}
        <div className="price-range-group">
          <div className="filter-group">
            <label htmlFor="minPrice">Min Price ($)</label>
            <input
              type="number"
              id="minPrice"
              placeholder="0.00"
              step="0.000001"
              min="0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label htmlFor="maxPrice">Max Price ($)</label>
            <input
              type="number"
              id="maxPrice"
              placeholder="1000.00"
              step="0.000001"
              min="0"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="filter-actions">
          <button 
            className="apply-btn"
            onClick={handleApplyFilters}
            disabled={loading}
          >
            {loading ? 'Applying...' : 'Apply Filters'}
          </button>
          <button 
            className="reset-btn"
            onClick={handleResetFilters}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="results-section">
        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}

        {loading && (
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading coins...</p>
          </div>
        )}

        {!loading && coins.length > 0 && (
          <div className="coins-grid">
            <h3>Found {coins.length} coins</h3>
            {coins.map((coin, index) => (
              <div key={coin._id || index} className="coin-card">
                <div className="coin-header">
                  <div className="coin-info">
                    {coin.logo && (
                      <img 
                        src={coin.logo} 
                        alt={coin.name} 
                        className="coin-logo"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div>
                      <h4>{coin.name}</h4>
                      <span className="coin-symbol">{coin.symbol}</span>
                    </div>
                  </div>
                  <div className="coin-price">
                    {formatPrice(coin.price)}
                  </div>
                </div>
                
                <div className="coin-details">
                  <div className="detail-row">
                    <span>Exchange:</span>
                    <span className="exchange-tag">{coin.exchange}</span>
                  </div>
                  <div className="detail-row">
                    <span>Category:</span>
                    <span className="category-tag">{coin.category}</span>
                  </div>
                  {coin.marketCap && (
                    <div className="detail-row">
                      <span>Market Cap:</span>
                      <span>{formatMarketCap(coin.marketCap)}</span>
                    </div>
                  )}
                  {coin.volume24h && (
                    <div className="detail-row">
                      <span>24h Volume:</span>
                      <span>{formatMarketCap(coin.volume24h)}</span>
                    </div>
                  )}
                  {coin.change24h !== undefined && (
                    <div className="detail-row">
                      <span>24h Change:</span>
                      <span className={coin.change24h >= 0 ? 'positive' : 'negative'}>
                        {coin.change24h > 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && coins.length === 0 && !error && (
          <div className="no-results">
            <p>No coins found matching your criteria. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterCoinCategory;