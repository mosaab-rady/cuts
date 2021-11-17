import React, { useContext } from 'react';
import { Route, Switch } from 'react-router';
import '../css/myaccount.css';
import Addresses from './Addresses';
import AccountBar from './AccountBar';
import OrderHistory from './OrderHistory';
import { myContext } from '../Context';
import AdminCollections from './admin/AdminCollections';
import AdminProducts from './admin/AdminProducts';
import AdminDefaultCollections from './admin/AdminDefaultCollections';
import AdminCollectionDetail from './admin/AdminCollectionDetail';
import AddCollection from './admin/AddCollection';
import AdminDefaultCollectionDetail from './admin/AdminDefaultCollectionDetail';
import AddProduct from './admin/AddProduct';
import AdominProductDetail from './admin/AdominProductDetail';
import AdminOrders from './admin/AdminOrders';

export default function MyAccount() {
  const { currentUser } = useContext(myContext);
  return (
    <div className='my--account'>
      <AccountBar />
      <Switch>
        <Route exact path='/account'>
          <OrderHistory />
        </Route>
        <Route exact path='/account/addresses'>
          <Addresses />
        </Route>
        {currentUser.role === 'admin' ? (
          <Switch>
            <Route exact path='/account/collections'>
              <AdminCollections />
            </Route>
            <Route exact path='/account/collections/add-collection'>
              <AddCollection />
            </Route>
            <Route exact path='/account/collections/:collection'>
              <AdminCollectionDetail />
            </Route>
            <Route exact path='/account/default-collections'>
              <AdminDefaultCollections />
            </Route>
            <Route exact path='/account/default-collections/:collection'>
              <AdminDefaultCollectionDetail />
            </Route>
            <Route exact path='/account/products'>
              <AdminProducts />
            </Route>
            <Route exact path='/account/products/add-product'>
              <AddProduct />
            </Route>
            <Route exact path='/account/products/:slug'>
              <AdominProductDetail />
            </Route>
            <Route path='/account/orders'>
              <AdminOrders />
            </Route>
          </Switch>
        ) : (
          ''
        )}
      </Switch>
    </div>
  );
}
