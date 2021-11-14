import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import '../css/productPage.css';
import { request } from '../js/axios';
import Slider from '../component/Slider';
import ProductDetails from '../component/ProductDetails';
import RelatedCuts from '../component/RelatedCuts';
import ComparisonPage from '../component/ComparisonPage';
import MidSection from '../component/MidSection';
import ProductReviews from '../component/ProductReviews';

export default function Product() {
  // const host = 'http://localhost:5000';
  // const { state } = useLocation();
  const location = useLocation();
  const [product, setProduct] = useState('');
  const [colors, setColors] = useState('');
  const [fabrics, setFabrics] = useState('');

  useEffect(() => {
    document.getElementById('App').scrollTo({
      top: 0,
      behavior: 'auto',
    });

    const getData = async () => {
      let response = await request(
        'GET',
        `/api/v1/products${location.pathname}/${location.search}`
      );
      if (response) {
        if (response.data.status === 'success') {
          setProduct(response.data.data.product);
          setColors(response.data.data.availableColors);
          setFabrics(response.data.data.fabrics);
        }
      }
    };

    //   if (state.id) {
    //     let response = await request('GET', `api/v1/products/${state.id}`);
    //     if (response) {
    //       if (response.data.status === 'success') {
    //         setProduct(response.data.data.product);
    //         setColors(response.data.data.availableColors);
    //         setFabrics(response.data.data.fabrics);
    //       }
    //     }
    //   }
    //   if (state.search) {
    //     let response = await request(
    //       'GET',
    //       `api/v1/products/product${state.search}`
    //     );
    //     if (response) {
    //       if (response.data.status === 'success') {
    //         setProduct(response.data.data.product);
    //         setColors(response.data.data.availableColors);
    //         setFabrics(response.data.data.fabrics);
    //       }
    //     }
    //   }
    // };
    getData();
  }, [location]);

  return product ? (
    <section className='product--page--container'>
      <section className='product--page'>
        <Slider product={product} />
        {colors && fabrics ? (
          <ProductDetails
            product={product}
            setProduct={setProduct}
            colors={colors}
            fabrics={fabrics}
            setColors={setColors}
          />
        ) : (
          ''
        )}
      </section>
      <RelatedCuts collar={product.collar} cut={product.cut} />
      <ComparisonPage />
      <ProductReviews
        id={product.id}
        ratingAvg={product.ratingsAverage}
        ratingQnt={product.ratingsQuantity}
      />
      <div className='product--page__collections'>
        <MidSection />
      </div>
    </section>
  ) : (
    ''
  );
}
