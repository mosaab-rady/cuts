import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';

import '../../css/adminproducts.css';

import { request } from '../../js/axios';
import AdminProductCart from './AdminProductCart';

export default function AdminProducts() {
  const location = useLocation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    document.getElementById('App').scrollTo({
      top: 0,
      behavior: 'auto',
    });

    const getData = async () => {
      const res = await request('GET', `api/v1/products${location.pathname}`);
      if (res) {
        if (res.data.status === 'success') {
          setProducts(res.data.data.products);
        }
      }
    };
    getData();
  }, [location]);

  return (
    <div className='account--body'>
      <div className='account--body__products'>
        <div className='account--body__products__addproduct'>
          <Link
            className='link'
            to={{
              pathname: '/account/products/add-product',
            }}
          >
            <h3 className='account--body__products__addproduct__h3'>
              add new product
            </h3>
          </Link>
        </div>
        <div className='account--body__products--container'>
          {products.map((item, i) => {
            return <AdminProductCart item={item} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
