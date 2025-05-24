import React, { useEffect, useState } from 'react';
import CoinDetail from './CoinDetail';
import './FeaturedCoins.css';

const FeaturedCoins = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin'
    )
      .then((res) => res.json())
      .then((data) => setCoins(data))
      .catch((err) => console.error('Error fetching coins:', err));
  }, []);

  return (
    <div className="coinList">
      {coins.map((coin) => (
        <CoinDetail
          key={coin.id}
          id={coin.market_cap_rank}
          imgsrc={coin.image}
          name={coin.name}
          symbol={coin.symbol.toUpperCase()}
          price={`$${coin.current_price.toLocaleString()}`}
          marketcap={`$${coin.market_cap.toLocaleString()}`}
        />
      ))}
    </div>
  );
};

export default FeaturedCoins;
