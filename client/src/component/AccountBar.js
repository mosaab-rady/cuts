import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { myContext } from '../Context';
import '../css/accountbar.css';
import { logout } from '../js/authentication';

export default function AccountBar() {
  const { currentUser, dispatch } = useContext(myContext);
  const [currentlink, setCurrentlink] = useState('order history');
  const location = useLocation();

  const displaylinks = () => {
    if (window.innerWidth <= 1000) {
      const links = document.getElementById('account--bar__links');
      if (links.style.display === 'block') {
        links.style.display = 'none';
      } else {
        links.style.display = 'block';
      }
    }
  };

  return (
    <div className='account--bar'>
      <div className='account--bar__user'>
        <h2 className='account--bar__user__name'>
          Hey {currentUser.name.split(' ')[0]}
        </h2>
        <h4 className='account--bar__user__email'>{currentUser.email}</h4>
      </div>
      <div className='account--bar__links--container'>
        <div className='account--bar__links__header'>
          <h4 className='account--bar__Links__link ' onClick={displaylinks}>
            {currentlink}
            <svg
              width='10'
              height='10'
              viewBox='0 0 5 4'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M2.5 4L0.334936 0.25H4.66506L2.5 4Z' fill='#b3b0b0' />
            </svg>
          </h4>
        </div>
        <div className='account--bar__links' id='account--bar__links'>
          <Link
            className='link account--bar__link'
            to={{
              pathname: '/account',
            }}
          >
            <h4
              onClick={() => {
                displaylinks();
                setCurrentlink('order history');
              }}
              className={
                location.pathname === '/account'
                  ? 'account--bar__Links__link account--bar__links__active'
                  : 'account--bar__Links__link'
              }
            >
              order history
            </h4>
          </Link>
          <Link
            className='link account--bar__link '
            to={{
              pathname: '/account/addresses',
            }}
          >
            <h4
              onClick={() => {
                displaylinks();
                setCurrentlink('address book');
              }}
              className={
                location.pathname === '/account/addresses'
                  ? 'account--bar__Links__link account--bar__links__active'
                  : 'account--bar__Links__link'
              }
            >
              address book
            </h4>
          </Link>
          <h4 className='account--bar__Links__link'>rewards</h4>
          {currentUser.role === 'admin' ? (
            <>
              <Link
                className='link account--bar__link '
                to={{
                  pathname: '/account/default-collections',
                }}
              >
                <h4
                  onClick={() => {
                    displaylinks();
                    setCurrentlink('default-collections');
                  }}
                  className={
                    location.pathname === '/account/default-collections'
                      ? 'account--bar__Links__link account--bar__links__active'
                      : 'account--bar__Links__link'
                  }
                >
                  default collections
                </h4>
              </Link>
              <Link
                className='link account--bar__link '
                to={{
                  pathname: '/account/collections',
                }}
              >
                <h4
                  onClick={() => {
                    displaylinks();
                    setCurrentlink('collections');
                  }}
                  className={
                    location.pathname === '/account/collections'
                      ? 'account--bar__Links__link account--bar__links__active'
                      : 'account--bar__Links__link'
                  }
                >
                  collections
                </h4>
              </Link>
              <Link
                className='link account--bar__link '
                to={{
                  pathname: '/account/products',
                }}
              >
                <h4
                  onClick={() => {
                    displaylinks();
                    setCurrentlink('products');
                  }}
                  className={
                    location.pathname === '/account/products'
                      ? 'account--bar__Links__link account--bar__links__active'
                      : 'account--bar__Links__link'
                  }
                >
                  products
                </h4>
              </Link>
              <Link
                className='link account--bar__link '
                to={{
                  pathname: '/account/orders',
                }}
              >
                <h4
                  onClick={() => {
                    displaylinks();
                    setCurrentlink('orders');
                  }}
                  className={
                    location.pathname === '/account/orders'
                      ? 'account--bar__Links__link account--bar__links__active'
                      : 'account--bar__Links__link'
                  }
                >
                  orders
                </h4>
              </Link>
            </>
          ) : (
            ''
          )}
          <h4
            onClick={() => {
              displaylinks();
              logout(dispatch);
            }}
            className='account--bar__Links__link'
          >
            sign out
          </h4>
        </div>
      </div>
    </div>
  );
}
