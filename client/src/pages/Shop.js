import React, { useEffect } from 'react';
import ShopHeader from '../component/ShopHeader';
import ShopSection from '../component/ShopSection';
import '../css/shop.css';

export default function Shop() {
  useEffect(() => {
    document.getElementById('App').scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, []);
  return (
    <div className='shop'>
      <ShopHeader />
      <ShopSection type='t-shirt' />
      <ShopSection type='sweat-shirt' />
      <ShopSection type='long-sleeve' />
      <ShopSection type='polo' />
    </div>
  );
}
