import './App.css';
import FeaturedCoins from './Components/FeaturedCoins';
import FilterCoinCategory from './Components/FilterCoinCategory';
import FirstHomePart from './Components/FirstHomePart';
import Header from './Components/Header';
import Trade from './Components/Trade';
import TradingViewWidget from './Components/TradingViewWidget';
import Portfolio from './Components/Portfolio';

function App() {

  return (
    <>
      <Header></Header>
      <FirstHomePart></FirstHomePart>
      <TradingViewWidget></TradingViewWidget>
      <FeaturedCoins></FeaturedCoins>
      <FilterCoinCategory></FilterCoinCategory>
      <Portfolio></Portfolio>
    </>
  )
}

export default App
