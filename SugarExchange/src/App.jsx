import { useState } from 'react'
import './App.css'
import Header from './Components/Header';
import FirstHomePart from './Components/FirstHomePart';
import TradingViewWidget from './Components/TradingViewWidget';
import FeaturedCoins from './Components/FeaturedCoins';
import Trade from './Components/Trade';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <FirstHomePart></FirstHomePart>
      <TradingViewWidget></TradingViewWidget>
      <FeaturedCoins></FeaturedCoins>
      <Trade></Trade>
    </>
  )
}

export default App
