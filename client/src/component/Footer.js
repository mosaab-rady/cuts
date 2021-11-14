import React from 'react';
import { Link } from 'react-router-dom';
import '../css/footer.css';

export default function Footer() {
  return (
    <section className='footer'>
      <div className='footer__section__signup'>
        <h3 className='footer__section__header'>sign up for offers & news</h3>
        <Link
          to={{
            pathname: '/account',
          }}
          className='link footer__section__signup__div'
        >
          <h4 className='footer__section__signup__h4'>
            Sign up with your email
          </h4>
          <svg
            className='account--bar__links__svg'
            viewBox='0 0 43 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M42.0607 13.0607C42.6464 12.4749 42.6464 11.5251 42.0607 10.9393L32.5147 1.3934C31.9289 0.807612 30.9792 0.807612 30.3934 1.3934C29.8076 1.97918 29.8076 2.92893 30.3934 3.51472L38.8787 12L30.3934 20.4853C29.8076 21.0711 29.8076 22.0208 30.3934 22.6066C30.9792 23.1924 31.9289 23.1924 32.5147 22.6066L42.0607 13.0607ZM0 13.5H41V10.5H0V13.5Z'
              fill='white	'
            />
          </svg>
        </Link>
      </div>
      <div className='footer__sections'>
        <div className='footer__section__shop'>
          <h3 className='footer__section__header'>shop CUTS</h3>
          <Link
            className='link footer__section__link'
            to={{
              pathname: '/collections/t-shirt',
            }}
          >
            shirts
          </Link>
          <Link
            className='link footer__section__link'
            to={{
              pathname: '/collections/polo',
            }}
          >
            polos
          </Link>
          <Link
            className='link footer__section__link'
            to={{
              pathname: '/collections/sweat-shirt',
            }}
          >
            sweatshirts
          </Link>
          <h4 className='link footer__section__link'>accessories</h4>
          <h4 className='link footer__section__link'>gift cards</h4>
        </div>
        <div className='footer__section__cut'>
          <h3 className='footer__section__header'>#madethecut</h3>
          <h4 className='link footer__section__link'>blog</h4>
          <h4 className='link footer__section__link'>KITS</h4>
          <h4 className='link footer__section__link'>our story</h4>
          <h4 className='link footer__section__link'>VIP rewards</h4>
          <h4 className='link footer__section__link'>careers</h4>
          <h4 className='link footer__section__link'>become a retailer</h4>
          <h4 className='link footer__section__link'>become an ambassador</h4>
        </div>
        <div className='footer__section__support'>
          <h3 className='footer__section__header'>support</h3>
          <Link
            to={{ pathname: '/account' }}
            className='link footer__section__link'
          >
            my account
          </Link>
          <h4 className='link footer__section__link'>returns & exchanges</h4>
          <h4 className='link footer__section__link'>track my order</h4>
          <h4 className='link footer__section__link'>FAQ</h4>
          <h4 className='link footer__section__link'>contact us</h4>
          <h4 className='link footer__section__link'>size + fit</h4>
          <h4 className='link footer__section__link'>accessibility</h4>
        </div>
      </div>
    </section>
  );
}
