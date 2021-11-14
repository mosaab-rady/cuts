import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { request } from '../js/axios';
import Hero from '../component/Hero';
import '../css/collection.css';
import CollectionBar from '../component/CollectionBar';
import ProductCart from '../component/ProductCart';
import MidSection from '../component/MidSection';

export default function Collection() {
  // const { state, search } = useLocation();
  const location = useLocation();
  const [collection, setCollection] = useState();
  const [products, setProducts] = useState([]);
  const [productscopy, setProductscopy] = useState([]);
  // const [products, setProducts] = useState('');
  // const [name, setName] = useState('');
  // const [imgCover, setImgCover] = useState('');

  useEffect(() => {
    document.getElementById('App').scrollTo({
      top: 0,
      behavior: 'auto',
    });

    const getData = async () => {
      const response = await request(
        'GET',
        `/api/v1/collections${location.pathname}`
      );
      if (response) {
        if (response.data.status === 'success') {
          setCollection(response.data.data.collection);
          setProducts(response.data.data.collection.products);
          setProductscopy(response.data.data.collection.products);
        }
      }
      // let response;
      // if (state.id) {
      //   response = await request(
      //     'GET',
      //     `/api/v1/collections/${state.id}/products`
      //   );
      //   if (response) {
      //     if (response.data.status === 'success') {
      //       setName(response.data.data.collection.name);
      //       setImgCover(response.data.data.collection.imageCover);
      //       setProducts(response.data.data.collection.products);
      //     }
      //   }
      // }
      // if (state.sort) {
      //   response = await request('GET', `/api/v1/products/${search}`);
      //   if (response) {
      //     if (response.data.status === 'success') {
      //       setName(state.sort);
      //       setImgCover(`/image/${state.sort}/imageCover`);
      //       setProducts(response.data.data.products);
      //     }
      //   }
      // }
      // if (state.collection) {
      //   response = await request('GET', `/api/v1/products/${state.collection}`);
      //   if (response) {
      //     if (response.data.status === 'success') {
      //       setName(state.collection);
      //       setImgCover(`/image/${state.collection}/imageCover`);
      //       setProducts(response.data.data.products);
      //     }
      //   }
      // }
    };
    getData();
  }, [location]);

  return collection ? (
    <section className='collection'>
      <div className='collection__hero'>
        {collection.imageCover && collection.name ? (
          <Hero
            img={collection.imageCover}
            name={collection.name}
            btn={false}
          />
        ) : (
          ''
        )}
      </div>

      <section className='collection__body'>
        <div className='collection__body__nav'>
          <CollectionBar
            products={products}
            setProductscopy={setProductscopy}
          />
        </div>
        <div className='collection__body__products'>
          {productscopy
            ? productscopy.map((item, i) => {
                return <ProductCart product={item} key={i} />;
              })
            : ''}
        </div>
      </section>
      <div className='collection__midsection'>
        <MidSection />
      </div>
    </section>
  ) : (
    ''
  );
}
