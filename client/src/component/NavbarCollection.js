import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbarcollection.css';

export default function NavbarCollection({
  name,
  slug,
  img,
  setCollections,
  setShop,
  setSidebar,
}) {
  const host = '';

  const hideDropNavbar = () => {
    const dropcollections = document.getElementById(
      'navbar__drop__collections'
    );
    const dropshop = document.getElementById('navbar__drop__shop');
    if (dropshop) {
      dropshop.style.display = 'none';
    }
    if (dropcollections) {
      dropcollections.style.display = 'none';
    }
  };

  const hidesidebar = () => {
    const sidebar = document.getElementById('sidebar--container');

    if (sidebar) {
      setSidebar(false);
      setShop(false);
      setCollections(false);
    } else return;
  };

  return (
    <Link
      onClick={() => {
        hideDropNavbar();
        // document.getElementById('navbar__drop__collections').style.display =
        //   'none';
        // document.getElementById('navbar__drop__shop').style.display = 'none';
        hidesidebar();
      }}
      className='link navbar--collection'
      to={{
        pathname: `/collections/${slug}`,
      }}
    >
      <img
        src={`${host}/api/v1/images/${img}`}
        alt=''
        className='navbar--collection__img'
      />
      <h4 className='navbar--collection__h4'>{name}</h4>
    </Link>
  );
}
