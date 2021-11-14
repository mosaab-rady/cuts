import './App.css';
import { Switch, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Overview from './pages/Overview';
import Collection from './pages/Collection';
import Product from './pages/Product';
import Shop from './pages/Shop';
import Account from './pages/Account';
import Footer from './component/Footer';

function App() {
  return (
    <div className='App' id='App'>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Overview />
        </Route>
        <Route path='/shop-all'>
          <Shop />
        </Route>
        <Route path='/shirts/:slug'>
          <Product />
        </Route>
        <Route path='/collections/:name'>
          <Collection />
        </Route>
        <Route path='/account'>
          <Account />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
