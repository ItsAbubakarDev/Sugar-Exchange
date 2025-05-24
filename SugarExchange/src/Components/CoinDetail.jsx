import React from 'react';
import './CoinDetail.css'; 
const CoinDetail = ({ id, imgsrc, name, symbol, price, marketcap }) => {
  return (
    <div className="coinDetail">
      <p className="coin-rank">#{id}</p>
      <div className="coin-image">
        <img src={imgsrc} alt={name} />
      </div>
      <div className="coin-name">
        <p>{name}</p>
      </div>
      <div className="coin-symbol">
        <p>{symbol}</p>
      </div>
      <div className="coin-price">
        <p>{price}</p>
      </div>
      <div className="coin-marketcap">
        <p>{marketcap}</p>
      </div>
    </div>
  );
};

export default CoinDetail;