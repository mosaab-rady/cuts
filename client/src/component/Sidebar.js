import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/sidebar.css';
import { request } from '../js/axios';
import DropShop from './DropShop';
import NavbarDropCollections from './NavbarDropCollections';
import ProductCart from './ProductCart';

export default function Sidebar({ setSidebar }) {
  const [bestSellers, setBestSellers] = useState([]);
  const [shop, setShop] = useState(false);
  const [collections, setCollections] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await request('GET', 'api/v1/products/best-sellers?limit=3');
      if (res) {
        if (res.data.status === 'success') {
          setBestSellers(res.data.data.products);
        }
      }
    };
    getData();
  }, []);

  const hidesidebar = () => {
    setSidebar(false);
  };

  return (
    <div className='navbar__sidebar'>
      <div className='navbar__sidebar__header'>
        <div className='navbar__sidebar__header__search'>
          <svg
            width='17px'
            height='17px'
            viewBox='0 0 22 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18.3584 7.86266C18.3584 11.4686 14.6768 14.7253 9.67918 14.7253C4.68155 14.7253 1 11.4686 1 7.86266C1 4.25671 4.68155 1 9.67918 1C14.6768 1 18.3584 4.25671 18.3584 7.86266Z'
              fill='white'
              stroke='black'
              strokeWidth='2'
            />
            <line
              y1='-1'
              x2='8.61907'
              y2='-1'
              transform='matrix(0.702427 0.711756 -0.837974 0.545711 13.9457 13.8653)'
              stroke='black'
              strokeWidth='2'
            />
          </svg>
          <input
            type='text'
            className='navbar__sidebar__header__search__inp'
            placeholder='Search'
          />
        </div>
        <svg
          onClick={hidesidebar}
          className='navbar__sidebar__header__close'
          width='17'
          height='17'
          viewBox='0 0 17 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1 1L16 19M16 1L1 19'
            stroke='black'
            strokeWidth='2'
            strokeinecap='round'
          />
        </svg>
      </div>
      <div className='navbar__sidebar__bestsellers--container'>
        <h4 className='navbar__sidebar__bestsellers__h4'>best sellers</h4>
        <div className='navbar__sidebar__bestsellers'>
          {bestSellers.map((item, i) => (
            <ProductCart key={i} product={item} setSidebar={setSidebar} />
          ))}
        </div>
      </div>
      <div className='navbar__sidebar__groups'>
        <div className='navbar__sidebar__groups__group'>
          <h3
            className='navbar__sidebar__groups__group__h3'
            onClick={() => setShop(true)}
          >
            shop{' '}
            <svg
              onClick={() => setShop(true)}
              width='13px'
              height='13px'
              viewBox='0 0 12 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M1 1L11 9.5L1 17' stroke='black' strokeWidth='2' />
            </svg>
          </h3>
          {shop ? (
            <div className='navbar__sidebar__shop--container'>
              <div className='navbar__sidebar__shop__header'>
                <h4 className='navbar__sidebar__shop__header__h4'>
                  <svg
                    onClick={() => setShop(false)}
                    className='navbar__sidebar__header__close'
                    width='15'
                    height='15'
                    viewBox='0 0 12 17'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10.5 1.5L2.5 8.5L10.5 15.5'
                      stroke='black'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                  shop
                </h4>
                <svg
                  onClick={() => {
                    hidesidebar();
                    setShop(false);
                  }}
                  className='navbar__sidebar__header__close'
                  width='17'
                  height='17'
                  viewBox='0 0 17 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 1L16 19M16 1L1 19'
                    stroke='black'
                    strokeWidth='2'
                    strokeinecap='round'
                  />
                </svg>
              </div>
              <DropShop
                setCollections={setCollections}
                setShop={setShop}
                setSidebar={setSidebar}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='navbar__sidebar__groups__group'>
          <h3
            className='navbar__sidebar__groups__group__h3'
            onClick={() => setCollections(true)}
          >
            collections{' '}
            <svg
              onClick={() => setCollections(true)}
              width='13px'
              height='13px'
              viewBox='0 0 12 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M1 1L11 9.5L1 17' stroke='black' strokeWidth='2' />
            </svg>
          </h3>
          {collections ? (
            <div className='navbar__sidebar__collections--container'>
              <div className='navbar__sidebar__shop__header'>
                <h4 className='navbar__sidebar__shop__header__h4'>
                  <svg
                    onClick={() => setCollections(false)}
                    className='navbar__sidebar__header__close'
                    width='15'
                    height='15'
                    viewBox='0 0 12 17'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M10.5 1.5L2.5 8.5L10.5 15.5'
                      stroke='black'
                      strokeWidth='2'
                      strokeLinecap='round'
                    />
                  </svg>
                  collections
                </h4>
                <svg
                  onClick={() => {
                    hidesidebar();
                    setCollections(false);
                  }}
                  className='navbar__sidebar__header__close'
                  width='17'
                  height='17'
                  viewBox='0 0 17 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 1L16 19M16 1L1 19'
                    stroke='black'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              </div>
              <NavbarDropCollections
                setCollections={setCollections}
                setSidebar={setSidebar}
                setShop={setShop}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className='navbar__sidebar__groups__group'>
          <Link
            onClick={hidesidebar}
            className='link'
            to={{
              pathname: '/collections/t-shirt',
            }}
          >
            {' '}
            <h3 className='navbar__sidebar__groups__group__h3'>
              shirts
              <svg
                width='13px'
                height='13px'
                viewBox='0 0 12 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M1 1L11 9.5L1 17' stroke='black' strokeWidth='2' />
              </svg>
            </h3>
          </Link>
        </div>
        <div className='navbar__sidebar__groups__group'>
          <Link
            onClick={hidesidebar}
            className='link'
            to={{
              pathname: '/collections/sweat-shirt',
            }}
          >
            <h3 className='navbar__sidebar__groups__group__h3'>
              sweat shirts{' '}
              <svg
                width='13px'
                height='13px'
                viewBox='0 0 12 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M1 1L11 9.5L1 17' stroke='black' strokeWidth='2' />
              </svg>
            </h3>
          </Link>
        </div>
        <div className='navbar__sidebar__groups__group'>
          <Link
            onClick={hidesidebar}
            className='link'
            to={{
              pathname: '/collections/all-products',
            }}
          >
            <h3 className='navbar__sidebar__groups__group__h3'>
              all products
              <svg
                width='13px'
                height='13px'
                viewBox='0 0 12 18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M1 1L11 9.5L1 17' stroke='black' strokeWidth='2' />
              </svg>
            </h3>
          </Link>
        </div>
      </div>
      <div className='navbar__sidebar__account__group'>
        <h4 className='navbar__sidebar__account__group__h4'>gift cards</h4>
        <Link
          onClick={hidesidebar}
          className='link'
          to={{
            pathname: '/account',
          }}
        >
          <h4 className='navbar__sidebar__account__group__h4'>account</h4>
        </Link>
      </div>
      <div className='navbar__sidebar__footer'>
        <div className='navbar__sidebar__footer__headers'>
          <h3>brand</h3>
          <h4>our story</h4>
          <h4>blog</h4>
          <h4>rewards</h4>
          <h4>become an ambassador</h4>
          <h4>become a retailer</h4>
          <h4>shop instagram</h4>
        </div>
        <div className='navbar__sidebar__footer__signup'>
          <h4 className='navbar__sidebar__footer__signup__h4'>
            get 15% off your first purchase
          </h4>
          <Link
            onClick={hidesidebar}
            className='link'
            to={{
              pathname: '/account',
            }}
          >
            <h3 className='navbar__sidebar__footer__signup__h3'>
              sign up with your email
              <svg
                viewBox='0 0 43 24'
                fill='none'
                width='1rem'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M42.0607 13.0607C42.6464 12.4749 42.6464 11.5251 42.0607 10.9393L32.5147 1.3934C31.9289 0.807612 30.9792 0.807612 30.3934 1.3934C29.8076 1.97918 29.8076 2.92893 30.3934 3.51472L38.8787 12L30.3934 20.4853C29.8076 21.0711 29.8076 22.0208 30.3934 22.6066C30.9792 23.1924 31.9289 23.1924 32.5147 22.6066L42.0607 13.0607ZM0 13.5H41V10.5H0V13.5Z'
                  fill='black'
                />
              </svg>
            </h3>
          </Link>
        </div>
      </div>
    </div>
  );
}
