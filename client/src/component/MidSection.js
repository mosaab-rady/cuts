import React, { useEffect, useState } from 'react';
import { request } from '../js/axios';
import Section from './Section';

export default function MidSection() {
  const [collections, setCollections] = useState('');

  useEffect(() => {
    const getData = async () => {
      const res = await request(
        'GET',
        '/api/v1/collections/display?mode=second'
      );
      if (res) {
        if (res.data.status === 'success') {
          setCollections(res.data.data.collection[0]);
        }
      }
    };
    getData();
  }, []);

  return (
    <section className='overview__collections'>
      <Section
        image='image/best-sellers/image'
        name='best sellers'
        slug='best-sellers'
      />
      {collections ? (
        <Section
          image={collections.image}
          name={collections.name}
          slug={collections.slug}
        />
      ) : (
        ''
      )}
    </section>
  );
}
