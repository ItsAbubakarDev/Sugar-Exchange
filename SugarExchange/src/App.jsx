import { useState } from 'react'
import './App.css'
import Header from './Components/Header';
import FirstHomePart from './Components/FirstHomePart';
import TradingViewWidget from './Components/TradingViewWidget';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header></Header>
      <FirstHomePart></FirstHomePart>
      <TradingViewWidget></TradingViewWidget>
    </>
  )
}

export default App
