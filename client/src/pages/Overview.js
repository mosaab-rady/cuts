import React, { useEffect, useState } from 'react';
import '../css/overview.css';
import { request } from '../js/axios';
import { isInViewport } from '../js/viewport';
// import Comparison from '../component/Comparison';
import Cut from '../component/Cut';
import Hero from '../component/Hero';
import Section from '../component/Section';
import { Link } from 'react-router-dom';
import ProductCart from '../component/ProductCart';
import ComparisonPage from '../component/ComparisonPage';
import MidSection from '../component/MidSection';

export default function Overview() {
  const [mainCollection, setMainCollection] = useState('');
  const [bestSellers, setBestSellers] = useState('');

  useEffect(() => {
    document.getElementById('App').scrollTo({
      top: 0,
      behavior: 'auto',
    });

    const getData = async () => {
      let response = await request(
        'GET',
        `/api/v1/collections/display?mode=main`
      );
      if (response) {
        if (response.data.status === 'success') {
          setMainCollection(response.data.data.collection[0]);
        }
      }

      response = await request('GET', 'api/v1/products/best-sellers?limit=3');
      if (response) {
        if (response.data.status === 'success') {
          setBestSellers(response.data.data.products);
        }
      }
    };
    getData();
    myFn();
  }, []);

  const myFn = () => {
    const div = document.getElementById('our--mission');
    if (div) {
      if (isInViewport(div)) {
        document.getElementById('our--mission').className = 'slideUp';
      } else if (!isInViewport(div)) {
        document.getElementById('our--mission').className =
          'overview__our--mission';
      }
    }
  };

  const app = document.getElementById('App');
  if (app) {
    app.onscroll = function () {
      myFn();
    };
  }

  return (
    <section className='overview' id='overview'>
      {mainCollection ? (
        <div className='overview__hero'>
          <Hero
            img={mainCollection.imageHero}
            name={mainCollection.name}
            slug={mainCollection.slug}
            btn={true}
          />
        </div>
      ) : (
        ''
      )}
      <div className='overview__our--mission' id='our--mission'>
        <h4 className='overview__our--mission__h4'>our mission</h4>
        <h3 className='overview__our--mission__h3'>
          We're here to outfit the world’s most ambitious people.
        </h3>
      </div>

      <MidSection />

      {bestSellers ? (
        <section className='overview__mid--group'>
          <h3 className='overview__mid--group__h3'>best sellers</h3>
          <div className='overview__mid--group__products'>
            {bestSellers.map((product, i) => {
              return <ProductCart key={i} product={product} />;
            })}
          </div>
        </section>
      ) : (
        ''
      )}

      <section className='third--collection'>
        <Section
          image='image/new-releases/imageHero'
          name='new releases'
          slug='new-releases'
        />
      </section>

      <section className='overview__cuts--container'>
        <h3 className='overview__cuts__h3'>shop by cut</h3>
        <div className='overview__cuts'>
          <Link
            className='link'
            to={{
              pathname: '/collections/crew-neck',
            }}
          >
            <Cut top={true} name='crew' img='crew.webp' />
          </Link>
          <Link
            className='link'
            to={{
              pathname: '/collections/v-neck',
            }}
          >
            <Cut top={true} name='v-neck' img='v-neck.webp' />
          </Link>
          <Link
            className='link'
            to={{
              pathname: '/collections/henley',
            }}
          >
            <Cut top={true} name='henley' img='hanly.webp' />
          </Link>
          <Link
            className='link'
            to={{
              pathname: '/collections/classic',
            }}
          >
            <Cut top={false} name='classic' img='classic.webp' />
          </Link>
          <Link
            className='link'
            to={{
              pathname: '/collections/split',
            }}
          >
            <Cut top={false} name='split' img='split.webp' />
          </Link>
          <Link
            className='link'
            to={{
              pathname: '/collections/elongated',
            }}
          >
            <Cut top={false} name='elongated' img='elongated.webp' />
          </Link>
        </div>
      </section>
      <ComparisonPage />
    </section>
  );
}
