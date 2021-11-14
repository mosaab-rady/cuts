import React, { useEffect, useState } from 'react';
import '../css/navbardropcollections.css';
import { request } from '../js/axios';
import NavbarCollection from './NavbarCollection';

export default function NavbarDropCollections({
  setCollections,
  setSidebar,
  setShop,
}) {
  const [main, setMain] = useState('');
  const [first, setFirst] = useState('');

  useEffect(() => {
    const getData = async () => {
      let res;

      res = await request('GET', `/api/v1/collections/display?mode=main`);
      if (res) {
        if (res.data.status === 'success') {
          setMain(res.data.data.collection[0]);
        }
      }

      res = await request('GET', `/api/v1/collections/display?mode=first`);
      if (res) {
        if (res.data.status === 'success') {
          setFirst(res.data.data.collection[0]);
        }
      }
    };
    getData();

    return () => {
      setFirst();
      setMain();
    };
  }, []);

  return (
    <div className='navbar__drop__collections--container'>
      {main ? (
        <NavbarCollection
          name={main.name}
          slug={main.slug}
          img={main.imageDetail}
          setCollections={setCollections}
          setSidebar={setSidebar}
          setShop={setShop}
        />
      ) : (
        ''
      )}
      {first ? (
        <NavbarCollection
          name={first.name}
          slug={first.slug}
          img={first.imageDetail}
          setCollections={setCollections}
          setShop={setShop}
          setSidebar={setSidebar}
        />
      ) : (
        ''
      )}
      <NavbarCollection
        name='new releases'
        slug='new-releases'
        img='image/new-releases/imageDetail'
        setCollections={setCollections}
        setShop={setShop}
        setSidebar={setSidebar}
      />
      <NavbarCollection
        name='best sellers'
        slug='best-sellers'
        img='image/best-sellers/imageDetail'
        setCollections={setCollections}
        setShop={setShop}
        setSidebar={setSidebar}
      />
    </div>
  );
}
