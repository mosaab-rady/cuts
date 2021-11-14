import React from 'react';
import { Link } from 'react-router-dom';
import '../css/shopheader.css';

export default function ShopHeader() {
  const host = 'http://localhost:5000';

  return (
    <section className='shop--header'>
      <div className='shop--header__collection'>
        <Link
          className='link'
          to={{
            pathname: '/collections/t-shirt',
          }}
        >
          <img
            src={`${host}/api/v1/images/image/t-shirt/imageOverview`}
            className='shop--header__collection__img'
            alt=''
          />
          <h4 className='shop--header__collection__h4'>t-shirts</h4>
        </Link>
      </div>
      <div className='shop--header__collection'>
        <Link
          className='link'
          to={{
            pathname: '/collections/sweat-shirt',
          }}
        >
          <img
            src={`${host}/api/v1/images/image/sweat-shirt/imageOverview`}
            className='shop--header__collection__img'
            alt=''
          />
          <h4 className='shop--header__collection__h4'>sweatshirts</h4>
        </Link>
      </div>
      <div className='shop--header__collection'>
        <Link
          className='link'
          to={{
            pathname: '/collections/long-sleeve',
          }}
        >
          <img
            src={`${host}/api/v1/images/image/long-sleeve/imageOverview`}
            className='shop--header__collection__img'
            alt=''
          />
          <h4 className='shop--header__collection__h4'>long-sleeve</h4>
        </Link>
      </div>
      <div className='shop--header__collection'>
        <Link
          className='link'
          to={{
            pathname: '/collections/polo',
          }}
        >
          <img
            src={`${host}/api/v1/images/image/polo/imageOverview`}
            className='shop--header__collection__img'
            alt=''
          />
          <h4 className='shop--header__collection__h4'>polos</h4>
        </Link>
      </div>
    </section>
  );
}
