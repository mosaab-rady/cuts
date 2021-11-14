import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../css/productCart.css';
import { myContext } from '../Context';

export default function ProductCart({ product, setSidebar }) {
  const host = 'http://localhost:5000';
  const { dispatch } = useContext(myContext);

  const addToCart = (e, order) => {
    e.preventDefault();
    dispatch({ type: 'ADD_TO_CART', payload: order });
  };

  const hidesidebar = () => {
    const sidebar = document.getElementById('sidebar--container');
    if (sidebar) {
      setSidebar(false);
    }
  };

  return (
    <div className='product'>
      <section className='product__img'>
        <Link
          onClick={hidesidebar}
          to={{
            pathname: `/shirts/${product.slug}`,
            search: `fabric=${product.fabric}&color=${product.color}`,
            state: {
              id: product.id,
            },
          }}
        >
          <img
            className='product__imgCover'
            src={`${host}/api/v1/images/${product.imageCover}`}
            alt=''
          />
          <img
            className='product__imgDetail'
            src={`${host}/api/v1/images/${product.imageDetail}`}
            alt=''
          />
        </Link>
        <h4 className='product__img__status'>{product.status}</h4>
      </section>
      <section className='product__btn'>
        <div className='product__btn__quickadd'>
          <h4>+ quick add</h4>
        </div>
        <div className='product__btn__sizes'>
          <div
            onClick={(e) => {
              addToCart(e, {
                id: product._id,
                size: 's',
                image: product.imageCover,
                name: product.name,
                color: product.color,
                price: product.price,
                total: product.price,
                quantity: 1,
              });
            }}
            className={
              product.size.small === 0
                ? 'not--available'
                : 'product__btn__sizes__size'
            }
          >
            <h4>s</h4>
          </div>
          <div
            onClick={(e) => {
              addToCart(e, {
                id: product._id,
                size: 'm',
                image: product.imageCover,
                price: product.price,
                name: product.name,
                total: product.price,
                color: product.color,
                quantity: 1,
              });
            }}
            className={
              product.size.medium === 0
                ? ' not--available'
                : 'product__btn__sizes__size'
            }
          >
            <h4>m</h4>
          </div>
          <div
            onClick={(e) => {
              addToCart(e, {
                id: product._id,
                size: 'l',
                image: product.imageCover,
                name: product.name,
                price: product.price,
                total: product.price,
                color: product.color,
                quantity: 1,
              });
            }}
            className={
              product.size.large === 0
                ? ' not--available'
                : 'product__btn__sizes__size'
            }
          >
            <h4>l</h4>
          </div>
          <div
            onClick={(e) => {
              addToCart(e, {
                id: product._id,
                size: 'xl',
                name: product.name,
                image: product.imageCover,
                price: product.price,
                total: product.price,
                color: product.color,
                quantity: 1,
              });
            }}
            className={
              product.size.xLarge === 0
                ? ' not--available'
                : 'product__btn__sizes__size'
            }
          >
            <h4>xl</h4>
          </div>
          <div
            onClick={(e) => {
              addToCart(e, {
                id: product._id,
                size: 'xxl',
                name: product.name,
                image: product.imageCover,
                price: product.price,
                total: product.price,
                color: product.color,
                quantity: 1,
              });
            }}
            className={
              product.size.xxLarge === 0
                ? ' not--available'
                : 'product__btn__sizes__size'
            }
          >
            <h4>xxl</h4>
          </div>
        </div>
      </section>
      <section className='product__footer'>
        <h6 className='product__footer__color'>{product.color}</h6>
        <Link
          onClick={hidesidebar}
          className='link'
          to={{
            pathname: `/shirts/${product.name}`,
            search: `color=${product.color}`,
            state: {
              id: product.id,
            },
          }}
        >
          <h5 className='product__footer__name'>{product.name}</h5>
        </Link>
        <h6 className='product__footer__price'>
          <span>$</span>
          {product.price}
        </h6>
      </section>
    </div>
  );
}
