import React, { useState, useEffect } from 'react';
import './FirstHomePart.css';

const FirstHomePart = () => {
    const [cryptoPrices, setCryptoPrices] = useState({
        bitcoin: 0,
        ethereum: 0,
        dogecoin: 0
    });

    // Function to fetch cryptocurrency prices
    const fetchPrices = async () => {
        try {
            const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd';
            const response = await fetch(url);
            const data = await response.json();
            
            setCryptoPrices({
                bitcoin: data.bitcoin.usd,
                ethereum: data.ethereum.usd,
                dogecoin: data.dogecoin.usd
            });
        } catch (error) {
            console.error("Failed to fetch cryptocurrency prices:", error);
        }
    };

    // Fetch prices on component mount
    useEffect(() => {
        fetchPrices();
        
        // Optional: Set up interval to update prices every 30 seconds
        const interval = setInterval(fetchPrices, 30000);
        
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container">
            <div className="content">
                <h1>BUY & <br /> SELL <span>CRYPTO</span></h1>
                <p>World's biggest Cryptocurrency exchange available on web <br />as well as mobile phone</p>
                <a href="#" className="btn">Explore More</a>
            </div>

            <div className="coin-list">
                <div className="coin">
                    <img src="/bitcoin.png" alt="bitcoin" />
                    <div>
                        <h3>${cryptoPrices.bitcoin.toLocaleString()}</h3>
                        <p>Bitcoin</p>
                    </div>
                </div>

                <div className="coin">
                    <img src="ethereum.png" alt="ethereum" />
                    <div>
                        <h3>${cryptoPrices.ethereum.toLocaleString()}</h3>
                        <p>Ethereum</p>
                    </div>
                </div>

                <div className="coin">
                    <img src="dogecoin.png" alt="dogecoin" />
                    <div>
                        <h3>${cryptoPrices.dogecoin.toLocaleString()}</h3>
                        <p>Doge Coin</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FirstHomePart;