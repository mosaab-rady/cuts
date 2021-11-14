import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/shopsection.css';
import { request } from '../js/axios';
import ProductCart from './ProductCart';

export default function ShopSection({ type }) {
  const host = 'http://localhost:5000';
  const [products, setProducts] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await request('GET', `/api/v1/products/overview/${type}`);
      if (res) {
        if (res.data.status === 'success') {
          setProducts(res.data.data.products);
        }
      }
    };
    getData();
  }, [type]);

  return (
    <section className='shop--section'>
      <h3 className='shop--section__header'>{type}s</h3>
      <section className='shop--section__container'>
        <div className='shop--section__collection'>
          <Link
            to={{
              pathname: `/collections/${type}`,
            }}
          >
            <img
              src={`${host}/api/v1/images/image/${type}/image`}
              className='shop--section__collection__img'
              alt=''
            />
            <button className='shop--section__collection__btn'>
              shop all {type}s
            </button>
          </Link>
        </div>

        {products
          ? products.map((product, i) => {
              return <ProductCart product={product} key={i} />;
            })
          : ''}
        <div className='shop--section__products__link'>
          <Link
            className='link'
            to={{
              pathname: `/collections/${type}`,
            }}
          >
            <h4 className='shop--section__products__link__h4'>
              shop all {type}s
            </h4>
          </Link>
        </div>
      </section>
    </section>
  );
}
