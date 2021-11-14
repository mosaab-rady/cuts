import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminProductCart({ item }) {
  const host = '';

  return (
    <div>
      <Link
        className='account--body__products__product link'
        to={{
          pathname: `/account/products/${item.slug}`,
          search: `fabric=${item.fabric}&color=${item.color}`,
        }}
      >
        <img
          src={`${host}/api/v1/images/${item.imageCover}`}
          className='account--body__products__product__img'
          alt=''
        />
        <div className='account--body__products__product__detail'>
          <h4 className='account--body__products__product__name'>
            {item.name}
            <span>{item.price}</span>
          </h4>
          <h4 className='account--body__products__product__amount'>
            amount :{item.amount}
          </h4>
          <div className='account--body__products__product__sizes'>
            <h4>
              <span>s : </span>
              {item.size.small}
            </h4>
            <h4>
              <span>m : </span>
              {item.size.medium}
            </h4>
            <h4>
              <span>l : </span>
              {item.size.large}
            </h4>
            <h4>
              <span>xL : </span>
              {item.size.xLarge}
            </h4>
            <h4>
              <span>xxL : </span>
              {item.size.xxLarge}
            </h4>
          </div>
        </div>
      </Link>
    </div>
  );
}
