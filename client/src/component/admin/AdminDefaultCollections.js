import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/admindefaultcollections.css';

export default function AdminDefaultCollections() {
  useEffect(() => {
    document.getElementById('App').scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);
  return (
    <div className='account--body'>
      <div className='account--body__default__collections'>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/all-products',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              all products
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/new-releases',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              new releases
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/best-sellers',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              best sellers
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/t-shirt',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              t-shirt
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/sweat-shirt',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              sweatshirts
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/long-sleeve',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              long sleeve
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/hooded-shirt',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              hooded shirt
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/polo',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              polo
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/henley',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              henley
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/classic',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              classic
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/split',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              split
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/elongated',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              elongated
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/crew-neck',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              crew neck
            </h3>
          </div>
        </Link>
        <Link
          className='link'
          to={{
            pathname: '/account/default-collections/v-neck',
          }}
        >
          <div className='account--body__default__collections__collection'>
            <h3 className='account--body__default__collections__collection__h3'>
              v-neck
            </h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
