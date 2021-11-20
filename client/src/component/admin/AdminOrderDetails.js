import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { request } from '../../js/axios';

export default function AdminOrderDetails() {
  const host = '';
  const { id } = useParams();
  const [order, setOrder] = useState('');

  useEffect(() => {
    document.getElementById('App').scrollTo({
      top: 0,
      behavior: 'auto',
    });

    const getData = async () => {
      const res = await request('GET', `api/v1/orders/${id}`);
      if (res) {
        if (res.data.status === 'success') {
          setOrder(res.data.data.order);
        }
      }
    };
    getData();
  }, [id]);

  const deliverOrder = async () => {
    const res = await request('PATCH', `api/v1/orders/${id}`, {
      delivered: true,
    });
    if (res) {
      if (res.data.status === 'success') {
        window.location.replace(`${window.location.origin}/account/orders`);
      }
    }
  };

  return (
    <div className='account--body'>
      {order ? (
        <div className='account--body__orderdetail'>
          <div className='account--body__orderdetail__user'>
            <h3 className='account--body__orderdetail__header'>user</h3>
            <div className='account--body__orderdetail__user__info'>
              <h4 className='account---body__orderdetail__user__h4'>
                <span>name :</span>
                {order.user.name}
              </h4>
              <h4 className='account---body__orderdetail__user__h4'>
                <span>email :</span>
                {order.user.email}
              </h4>
              <h4 className='account---body__orderdetail__user__h4'>
                <span>phone :</span>
                {order.phoneNum}
              </h4>
            </div>
          </div>
          <div className='account--body__orderdetail__products'>
            <h3 className='account--body__orderdetail__header'>products</h3>
            <div className='account--body__orderdetail__products--container'>
              {order.shoppings.map((item, i) => {
                return (
                  <div
                    key={i}
                    className='account--body__orderdetail__products__product'
                  >
                    <img
                      src={`${host}/api/v1/images/${item.product.imageCover}`}
                      alt=''
                      className='account--body__orderdetail__products__product__img'
                    />
                    <div className='account--body__orderdetail__products__product__detail'>
                      <h4 className='account--body__orderdetail__products__product__h4'>
                        {item.product.color} {item.product.name}
                      </h4>
                      <h4 className='account--body__orderdetail__products__product__h4'>
                        <span>$</span>
                        {item.product.price}
                      </h4>
                      <h4 className='account--body__orderdetail__products__product__h4'>
                        <span>size :</span>
                        {item.size}
                      </h4>
                      <h4 className='account--body__orderdetail__products__product__h4'>
                        <span>quantity :</span>
                        {item.quantity}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='account--body__orderdetail__address'>
            <h3>client address</h3>
            <h4>
              <span>city: </span>
              {order.shippingAddress.address.city}
            </h4>
            <h4>
              <span>country: </span>
              {order.shippingAddress.address.country}
            </h4>
            <h4>
              <span>line1: </span>
              {order.shippingAddress.address.line1}
            </h4>
            <h4>
              <span>line2: </span>
              {order.shippingAddress.address.line2}
            </h4>
            <h4>
              <span>postal_code: </span>
              {order.shippingAddress.address.postal_code}
            </h4>
            <h4>
              <span>state: </span>
              {order.shippingAddress.address.state}
            </h4>
          </div>

          <button
            className='account--body__orderdetail__deliver'
            onClick={deliverOrder}
          >
            deliver
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
