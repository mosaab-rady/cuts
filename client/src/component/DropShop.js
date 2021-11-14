import React from 'react';
import { Link } from 'react-router-dom';
import '../css/dropshop.css';
import Cut from '../component/Cut';
import NavbarCollection from './NavbarCollection';

export default function DropShop({ setShop, setCollections, setSidebar }) {
  // const [display, setDisplay] = useState('shirts');

  // const hideShop = () => {
  //   const shop = document.getElementById('navbar__drop__shop');
  //   shop.style.display = 'none';
  // };

  const toggle = (name) => {
    if (window.innerWidth > 1000) {
      const shirts = document.getElementById('navbar__shop__shirts');
      const collections = document.getElementById('navbar__shop__collections');
      if (name === 'shirts') {
        shirts.style.display = 'block';
        collections.style.display = 'none';
      } else if (name === 'collections') {
        shirts.style.display = 'none';
        collections.style.display = 'block';
      }
    } else return;
  };

  const hideNavbarShop = () => {
    const navbarShop = document.getElementById('navbar__drop__shop');
    if (navbarShop) {
      navbarShop.style.display = 'none';
    } else return;
  };

  const hideSidebar = () => {
    const sidebar = document.getElementById('sidebar--container');
    if (sidebar) {
      setSidebar(false);
      setShop(false);
    } else return;
  };

  return (
    <section className='drop--shop'>
      {/* <div className='drop--shop__shirts--container'> */}
      <div
        className='drop--shop__shirts__names'
        onMouseEnter={() => toggle('shirts')}
      >
        <h3 className='drop--shop__names__h3'>shop shirts</h3>
        <Link
          onClick={() => {
            hideSidebar();
            hideNavbarShop();
          }}
          className='link'
          to={{
            pathname: '/collections/t-shirt',
          }}
        >
          <h4 className='drop--shop__names__h4'>t-shirts</h4>
        </Link>
        <Link
          onClick={() => {
            hideSidebar();
            hideNavbarShop();
          }}
          className='link'
          to={{
            pathname: '/collections/polo',
          }}
        >
          <h4 className='drop--shop__names__h4'>polos</h4>
        </Link>
        <Link
          onClick={() => {
            hideSidebar();
            hideNavbarShop();
          }}
          className='link'
          to={{
            pathname: '/collections/long-sleeve',
          }}
        >
          <h4 className='drop--shop__names__h4'>long sleeves</h4>
        </Link>
      </div>
      <div className='drop--shop__shirts--container' id='navbar__shop__shirts'>
        <div className='drop--shop__shirts'>
          <Link
            onClick={() => {
              hideSidebar();
              hideNavbarShop();
            }}
            className='link'
            to={{
              pathname: '/collections/crew-neck',
            }}
          >
            <Cut top={true} name='crew' img='crew.webp' />
          </Link>
          <Link
            onClick={() => {
              hideSidebar();
              hideNavbarShop();
            }}
            className='link'
            to={{
              pathname: '/collections/v-neck',
            }}
          >
            <Cut top={true} name='v-neck' img='v-neck.webp' />
          </Link>
          <Link
            onClick={() => {
              hideSidebar();
              hideNavbarShop();
            }}
            className='link'
            to={{
              pathname: '/collections/henley',
            }}
          >
            <Cut top={true} name='henley' img='hanly.webp' />
          </Link>
          <Link
            onClick={() => {
              hideSidebar();
              hideNavbarShop();
            }}
            className='link'
            to={{
              pathname: '/collections/classic',
            }}
          >
            <Cut top={false} name='classic' img='classic.webp' />
          </Link>
          <Link
            onClick={() => {
              hideSidebar();
              hideNavbarShop();
            }}
            className='link'
            to={{
              pathname: '/collections/split',
            }}
          >
            <Cut top={false} name='split' img='split.webp' />
          </Link>
          <Link
            onClick={() => {
              hideSidebar();
              hideNavbarShop();
            }}
            className='link'
            to={{
              pathname: '/collections/elongated',
            }}
          >
            <Cut top={false} name='elongated' img='elongated.webp' />
          </Link>
        </div>
      </div>
      {/* </div> */}
      {/* <div className='drop--shop__collections--container'> */}
      <div
        className='drop--shop__collections__names'
        onMouseEnter={() => toggle('collections')}
      >
        <h3 className='drop--shop__names__h3'>shop layers</h3>
        <Link
          onClick={() => {
            hideSidebar();
            hideNavbarShop();
          }}
          className='link'
          to={{
            pathname: '/collections/sweat-shirt',
          }}
        >
          <h4 className='drop--shop__names__h4'>sweatshirts</h4>
        </Link>

        <Link
          onClick={() => {
            hideSidebar();
            hideNavbarShop();
          }}
          className='link'
          to={{
            pathname: '/collections/hooded-shirt',
          }}
        >
          <h4 className='drop--shop__names__h4'>hooded shirts</h4>
        </Link>
      </div>
      <div
        className='drop--shop__collections--container'
        id='navbar__shop__collections'
      >
        <div className='drop--shop__collections'>
          <NavbarCollection
            name='sweatshirts'
            slug='sweat-shirt'
            img='image/sweat-shirt/imageDetail'
            setCollections={setCollections}
            setShop={setShop}
            setSidebar={setSidebar}
          />
          <NavbarCollection
            name='hooded shirts'
            slug='hooded-shirt'
            img='image/hooded-shirt/imageDetail'
            setCollections={setCollections}
            setShop={setShop}
            setSidebar={setSidebar}
          />
        </div>
      </div>

      {/* </div> */}
      {/* <div className='drop--shop__sidebar'>
        <div
          className='drop--shop__sidebar__group'
          onMouseEnter={() => {
            setDisplay('shirts');
          }}
        >
          <Link
            onClick={hideShop}
            className='link'
            to={{
              pathname: '/collections/all-products',
            }}
          >
            <h3
              className={
                display === 'shirts'
                  ? 'drop--shop__sidebar__group__h3 active'
                  : 'drop--shop__sidebar__group__h3'
              }
            >
              shop shirts
            </h3>
          </Link>
          <Link
            onClick={hideShop}
            className='link'
            to={{
              pathname: '/collections/t-shirt',
            }}
          >
            <h4 className='drop--shop__sidebar__group__h4'>t-shirts</h4>
          </Link>
          <Link
            onClick={hideShop}
            className='link'
            to={{
              pathname: '/collections/polo',
            }}
          >
            <h4 className='drop--shop__sidebar__group__h4'>polos</h4>
          </Link>
          <Link
            onClick={hideShop}
            className='link'
            to={{
              pathname: '/collections/long-sleeve',
            }}
          >
            <h4 className='drop--shop__sidebar__group__h4'>long sleeves</h4>
          </Link>
        </div>
        <div
          className='drop--shop__sidebar__group'
          onMouseEnter={() => setDisplay('layers')}
        >
          <Link
            onClick={hideShop}
            className='link'
            to={{
              pathname: '/collections/sweat-shirt',
            }}
          >
            <h3
              className={
                display === 'layers'
                  ? 'drop--shop__sidebar__group__h3 active'
                  : 'drop--shop__sidebar__group__h3'
              }
            >
              shop layers
            </h3>
          </Link>
          <Link
            onClick={hideShop}
            className='link'
            to={{
              pathname: '/collections/sweat-shirt',
            }}
          >
            <h4 className='drop--shop__sidebar__group__h4'>sweatshirts</h4>
          </Link>
          <Link
            onClick={hideShop}
            className='link'
            to={{
              pathname: '/collections/hooded-shirt',
            }}
          >
            <h4 className='drop--shop__sidebar__group__h4'>hooded shirts</h4>
          </Link>
        </div>
      </div>
      <section className='drop--shop__overview'>
        {display === 'shirts' ? (
          <div className='drop--shop__shirts--imgs'>
            <Link
              onClick={hideShop}
              className='link'
              to={{
                pathname: '/collections/crew-neck',
              }}
            >
              <Cut top={true} name='crew' img='crew.webp' />
            </Link>
            <Link
              onClick={hideShop}
              className='link'
              to={{
                pathname: '/collections/v-neck',
              }}
            >
              <Cut top={true} name='v-neck' img='v-neck.webp' />
            </Link>
            <Link
              onClick={hideShop}
              className='link'
              to={{
                pathname: '/collections/henley',
              }}
            >
              <Cut top={true} name='henley' img='hanly.webp' />
            </Link>
            <Link
              onClick={hideShop}
              className='link'
              to={{
                pathname: '/collections/classic',
              }}
            >
              <Cut top={false} name='classic' img='classic.webp' />
            </Link>
            <Link
              onClick={hideShop}
              className='link'
              to={{
                pathname: '/collections/split',
              }}
            >
              <Cut top={false} name='split' img='split.webp' />
            </Link>
            <Link
              onClick={hideShop}
              className='link'
              to={{
                pathname: '/collections/elongated',
              }}
            >
              <Cut top={false} name='elongated' img='elongated.webp' />
            </Link>
          </div>
        ) : (
          ''
        )}
        {display === 'layers' ? (
          <div className='drop--shop__collections'>
            <NavbarCollection
              name='sweatshirts'
              slug='sweat-shirt'
              img='image/sweat-shirt/imageDetail'
            />
            <NavbarCollection
              name='hooded shirts'
              slug='hooded-shirt'
              img='image/hooded-shirt/imageDetail'
            />
          </div>
        ) : (
          ''
        )}
      </section> */}
    </section>
  );
}
