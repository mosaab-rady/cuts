import React, { useEffect, useState } from 'react';
import { request } from '../js/axios';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await request('GET', '/api/v1/shopping/myshoppings');
      if (res) {
        if (res.data.status === 'success') {
          setOrders(res.data.data.shoppings);
        }
      }
    };
    getData();
  }, []);

  return (
    <div className='account--body'>
      <h2 className='account--body__header'>order history</h2>
      <div className='account--body__orders'>
        <table className='account--body__orders__table'>
          <thead>
            <tr>
              <th>order</th>
              <th>date</th>
              <th>status</th>
              <th>total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, i) => (
              <tr key={i}>
                <td>
                  {item.product.color} {item.product.name}{' '}
                  <span>{item.size}</span>
                </td>
                <td>{item.createdAt.split('T')[0]}</td>
                <td>{item.paid ? 'paid' : 'not paid'}</td>
                <td>${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
