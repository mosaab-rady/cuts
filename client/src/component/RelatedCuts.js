import React, { useEffect, useState } from 'react';
import { request } from '../js/axios';
import ProductCart from './ProductCart';

export default function RelatedCuts({ collar, cut }) {
  const [relatedcuts, setRelatedcuts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      let res;

      res = await request(
        'GET',
        `/api/v1/products/relatedcuts/${collar}/${cut}`
      );

      if (res) {
        if (res.data.status === 'success') {
          setRelatedcuts(res.data.data.products);
        }
      }
    };
    getData();
  }, [collar, cut]);

  return (
    <section className='related--cuts--container'>
      <h3 className='related--cuts--header'>related cuts</h3>
      <div className='related--cuts'>
        {relatedcuts.map((item, i) => {
          return <ProductCart key={i} product={item} />;
        })}
      </div>
    </section>
  );
}
