import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { request } from '../../js/axios';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    document.getElementById('App').scrollTo({
      top: 0,
      behavior: 'auto',
    });

    const getData = async () => {
      const res = await request('GET', 'api/v1/orders');
      if (res) {
        if (res.data.status === 'success') {
          setOrders(res.data.data.orders);
        }
      }
    };
    getData();
  }, []);
  return (
    <div className='account--body'>
      <div className='account--body__orders'>
        <table className='account--body__orders__table'>
          <thead>
            <tr>
              <th>products</th>
              <th>user</th>
              <th>phone</th>
              <th>date</th>
              <th>delivered</th>
              <th>details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, i) => (
              <tr key={i} className='account--body__orders__table__tr'>
                <td>
                  {item.shoppings.map((product, i) => {
                    return (
                      <h4
                        className='account--body__orders__table__td__h4'
                        key={i}
                      >
                        {product.product.name}
                      </h4>
                    );
                  })}
                </td>
                <td>{item.user.email}</td>
                <td>{item.phoneNum}</td>
                <td>{item.createdAt.split('T')[0]}</td>
                <td>{item.delivered ? 'true' : 'false'}</td>
                <td>
                  <Link
                    className='link'
                    to={{
                      pathname: `/account/orders/${item._id}`,
                    }}
                  >
                    details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
