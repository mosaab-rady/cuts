import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/collectionBar.css';

export default function CollectionBar({ products, setProductscopy }) {
  const [classic, setClassic] = useState(false);
  const [elongated, setElongated] = useState(false);
  const [split, setSplit] = useState(false);
  const [crew, setCrew] = useState(false);
  const [hoodie, setHoodie] = useState(false);
  const [henley, setHenley] = useState(false);
  const [hooded, setHooded] = useState(false);
  const [polo, setPolo] = useState(false);
  const [vneck, setVneck] = useState(false);
  const [cut, setCut] = useState('');
  const [collar, setCollar] = useState('');
  const [displayCuts, setDisplayCuts] = useState(true);
  const [displayCollar, setDisplayCollar] = useState(true);

  useEffect(() => {
    let found;
    found = products.some((item) => item.cut === 'classic');
    if (found) {
      setClassic(true);
    } else setClassic(false);

    found = products.some((item) => item.cut === 'elongated');
    if (found) {
      setElongated(true);
    } else setElongated(false);

    found = products.some((item) => item.cut === 'split');
    if (found) {
      setSplit(true);
    } else setSplit(false);

    found = products.some((item) => item.collar === 'crew');
    if (found) {
      setCrew(true);
    } else setCrew(false);

    found = products.some((item) => item.collar === 'hoodie');
    if (found) {
      setHoodie(true);
    } else setHoodie(false);

    found = products.some((item) => item.collar === 'henley');
    if (found) {
      setHenley(true);
    } else setHenley(false);

    found = products.some((item) => item.collar === 'hooded');
    if (found) {
      setHooded(true);
    } else setHooded(false);

    found = products.some((item) => item.collar === 'v-neck');
    if (found) {
      setVneck(true);
    }

    found = products.some((item) => item.collar === 'polo');
    if (found) {
      setPolo(true);
    } else setPolo(false);

    if (window.innerWidth <= 1000) {
      setDisplayCollar(false);
      setDisplayCuts(false);
    }
  }, [products]);

  const displaycutsfn = () => {
    if (window.innerWidth > 1000) {
      if (displayCuts === false) setDisplayCuts(true);
      if (displayCuts === true) setDisplayCuts(false);
    } else {
      if (displayCuts === false) {
        setDisplayCuts(true);
        setDisplayCollar(false);
      }
      if (displayCuts === true) {
        setDisplayCuts(false);
      }
    }
  };

  const displaycollarfn = () => {
    if (window.innerWidth > 1000) {
      if (displayCollar === false) setDisplayCollar(true);
      if (displayCollar === true) setDisplayCollar(false);
    } else {
      if (displayCollar === false) {
        setDisplayCollar(true);
        setDisplayCuts(false);
      }
      if (displayCollar === true) {
        setDisplayCollar(false);
      }
    }
  };

  // const display = (e) => {
  //   if (e.target.tagName === 'DIV') {
  //     if (e.target.lastChild.className.animVal === 'up') {
  //       e.target.lastChild.setAttribute('class', 'down');
  //       e.target.parentElement.lastChild.className =
  //         'collection__sidebar__filters__filter__hideItems';
  //     } else if (e.target.lastChild.className.animVal === 'down') {
  //       e.target.lastChild.setAttribute('class', 'up');
  //       e.target.parentElement.lastChild.className =
  //         'collection__sidebar__filters__filter__items';
  //     }
  //   }
  // };

  const filterProducts = (cut, collar) => {
    let newProducts;
    if (!cut && !collar) {
      setProductscopy(products);
      document.getElementById('close').style.display = 'none';
      return;
    }
    if (!cut) {
      newProducts = products.filter((item) => item.collar === collar);
      setProductscopy(newProducts);
      document.getElementById('close').style.display = 'block';
      return;
    }
    if (!collar) {
      newProducts = products.filter((item) => item.cut === cut);
      setProductscopy(newProducts);
      document.getElementById('close').style.display = 'block';
      return;
    }
    newProducts = products.filter(
      (item) => item.cut === cut && item.collar === collar
    );
    setProductscopy(newProducts);
    document.getElementById('close').style.display = 'block';
  };

  const changeCut = (name) => {
    if (cut === name) {
      setCut('');
      filterProducts('', collar);
    } else {
      setCut(name);
      filterProducts(name, collar);
    }
  };

  const changeCollar = (name) => {
    if (collar === name) {
      setCollar('');
      filterProducts(cut, '');
    } else {
      setCollar(name);
      filterProducts(cut, name);
    }
  };

  return (
    <div className='collection__sidebar'>
      <div className='collection__sidebar__collections'>
        <h4 className='collection__sidebar__header__h4'>collections</h4>
        <div className='collection__sidebar__collections__names'>
          <Link
            className='link'
            to={{
              pathname: '/collections/all-products',
            }}
          >
            <h4>all products</h4>
          </Link>
          <Link
            className='link'
            to={{
              pathname: '/collections/best-sellers',
            }}
          >
            <h4>best sellers</h4>
          </Link>
          <Link
            className='link'
            to={{
              pathname: '/collections/new-releases',
            }}
          >
            <h4>new releases</h4>
          </Link>
        </div>
      </div>
      <div className='collection__sidebar__filters'>
        <div className='collection__sidebar__header'>
          <h4 className='collection__sidebar__header__h4'>filter</h4>
          <h5
            className='collection__sidebar__header__close'
            id='close'
            onClick={() => {
              setProductscopy(products);
              setCut('');
              setCollar('');
              document.getElementById('close').style.display = 'none';
            }}
          >
            <span>x</span> close all
          </h5>
        </div>
        {classic || elongated || split ? (
          <div className='collection__sidebar__filters__filter'>
            <div className='collection__sidebar__filters__filter__header'>
              <h4
                className='collection__sidebar__filters__filter__h4'
                onClick={displaycutsfn}
              >
                cuts
              </h4>
              <svg
                onClick={displaycutsfn}
                className={displayCuts ? 'up' : 'down'}
                width='20'
                height='5'
                viewBox='0 0 101 55'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1.5 53.5L53 2.5L99.5 53.5'
                  stroke='black'
                  strokeWidth='20'
                />
              </svg>
            </div>
            {displayCuts ? (
              <div className='collection__sidebar__filters__filter__items'>
                {classic ? (
                  <div
                    className={
                      cut === 'classic'
                        ? 'collection__sidebar__filters__filter__items__item active--filter'
                        : 'collection__sidebar__filters__filter__items__item'
                    }
                    onClick={() => {
                      changeCut('classic');
                    }}
                  >
                    <svg
                      width='100%'
                      viewBox='0 0 26 26'
                      aria-hidden='true'
                      data-acsb-hidden='true'
                      data-acsb-force-hidden='true'
                    >
                      <g
                        fill='none'
                        fillRule='evenodd'
                        stroke='#000'
                        strokeWidth='.5'
                        transform='translate(1 1)'
                      >
                        <circle cx='12' cy='12' r='12'></circle>
                        <path
                          className='icon__path'
                          d='M0,0.0373842556 C0,2.16467761 0,4.28614881 0,6.40179785 C0,9.74301911 0.487935612,12.0843997 0.487935612,14.0973645 C1.40759127,14.584506 4.32583303,14.7711529 9.2426609,14.6573053 C10.1591136,14.6360851 12.8145498,14.1076323 17.2089695,13.0719469 C17.2089695,13.4992223 17.2089695,12.5580054 17.2089695,10.248296 C17.2089695,7.93858663 17.3104842,4.69836878 17.5135135,0.527642449'
                          transform='translate(3.46 3.517)'
                        ></path>
                      </g>
                    </svg>
                    <h4>classic</h4>
                  </div>
                ) : (
                  ''
                )}
                {elongated ? (
                  <div
                    className={
                      cut === 'elongated'
                        ? 'collection__sidebar__filters__filter__items__item active--filter'
                        : 'collection__sidebar__filters__filter__items__item'
                    }
                    onClick={() => {
                      changeCut('elongated');
                    }}
                  >
                    <svg
                      width='100%'
                      viewBox='0 0 26 26'
                      aria-hidden='true'
                      data-acsb-hidden='true'
                      data-acsb-force-hidden='true'
                    >
                      <g
                        fill='none'
                        fillRule='evenodd'
                        stroke='#201E20'
                        strokeWidth='.5'
                        transform='translate(1 1)'
                      >
                        <circle cx='12' cy='12' r='12'></circle>
                        <path
                          className='icon__path'
                          d='M3.22375388,3.69525727 C3.55592736,7.77021913 3.72201409,10.8919512 3.72201409,13.0604534 C3.72201409,16.4851451 3.10344828,16.4851451 3.10344828,18.5483979 C4.74673082,18.6665001 6.07797526,18.5309925 7.09718159,18.141875 C8.6259911,17.5581987 10.6111024,13.0604534 13.1169431,13.0604534 C15.6984878,13.0604534 18.319456,17.9566347 19.3168873,18.5483979 C19.4793533,18.6447869 19.730046,18.6447869 20.0689655,18.5483979 C19.8722889,17.9016775 19.7739506,16.2209283 19.7739506,13.5061504 C19.7739506,10.7913724 19.826751,7.26088582 19.9323518,2.91469053'
                        ></path>
                      </g>
                    </svg>
                    <h4>elongated</h4>
                  </div>
                ) : (
                  ''
                )}
                {split ? (
                  <div
                    className={
                      cut === 'split'
                        ? 'collection__sidebar__filters__filter__items__item active--filter'
                        : 'collection__sidebar__filters__filter__items__item'
                    }
                    onClick={() => {
                      changeCut('split');
                    }}
                  >
                    <svg
                      width='100%'
                      viewBox='0 0 26 26'
                      aria-hidden='true'
                      data-acsb-hidden='true'
                      data-acsb-force-hidden='true'
                    >
                      <g
                        fill='none'
                        fillRule='evenodd'
                        stroke='#000'
                        strokeWidth='.5'
                        transform='translate(1 1)'
                      >
                        <circle cx='12' cy='12' r='12'></circle>
                        <path
                          className='icon__path'
                          d='M0.713125297,0.0188760669 C0.713125297,1.41392861 0.713125297,3.16894786 0.713125297,5.28393384 C0.713125297,8.62410794 0,12.5795015 0,14.5918355 C6.24618349,15.878754 9.39204832,16.3622814 9.43759449,16.0424176 C9.68548318,14.301533 9.99502509,12.5368443 10.5669387,10.2827993 C10.7863941,9.41787409 11.9943945,14.301533 11.9943945,14.301533 C13.0148097,14.301533 14.9695913,13.9019414 17.8587393,13.1027582 C17.6642188,11.3438678 17.5669586,9.14053244 17.5669586,6.49275224 C17.5669586,3.84497204 17.7333464,1.82348518 18.066122,0.428291666'
                          transform='translate(2.81 3.517)'
                        ></path>
                      </g>
                    </svg>
                    <h4>split</h4>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
        {crew || henley || vneck || polo || hoodie || hooded ? (
          <div className='collection__sidebar__filters__filter'>
            <div className='collection__sidebar__filters__filter__header'>
              <h4
                className='collection__sidebar__filters__filter__h4'
                onClick={displaycollarfn}
              >
                collar
              </h4>
              <svg
                onClick={displaycollarfn}
                className={displayCollar ? 'up' : 'down'}
                width='20'
                height='5'
                viewBox='0 0 101 55'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M1.5 53.5L53 2.5L99.5 53.5'
                  stroke='black'
                  strokeWidth='20'
                />
              </svg>
            </div>
            {displayCollar ? (
              <div className='collection__sidebar__filters__filter__items'>
                {crew ? (
                  <div
                    className={
                      collar === 'crew'
                        ? 'collection__sidebar__filters__filter__items__item active--filter'
                        : 'collection__sidebar__filters__filter__items__item'
                    }
                    onClick={() => {
                      changeCollar('crew');
                    }}
                  >
                    <svg
                      width='100%'
                      viewBox='0 0 26 26'
                      aria-hidden='true'
                      data-acsb-hidden='true'
                      data-acsb-force-hidden='true'
                    >
                      <defs>
                        <circle
                          id='crew-icon-a'
                          cx='12'
                          cy='12'
                          r='12'
                        ></circle>
                        <circle
                          id='crew-icon-c'
                          cx='12'
                          cy='12'
                          r='12'
                        ></circle>
                        <circle
                          id='crew-icon-e'
                          cx='12'
                          cy='12'
                          r='12'
                        ></circle>
                        <circle
                          id='crew-icon-g'
                          cx='12'
                          cy='12'
                          r='12'
                        ></circle>
                      </defs>
                      <g
                        fill='none'
                        fillRule='evenodd'
                        transform='translate(1 1)'
                      >
                        <circle
                          cx='12'
                          cy='12'
                          r='12'
                          stroke='#201E20'
                          strokeWidth='.5'
                        ></circle>
                        <mask id='crew-icon-b' fill='#fff'>
                          <use xlinkHref='#crew-icon-a'></use>
                        </mask>
                        <path
                          className='icon__path'
                          stroke='#201E20'
                          strokeWidth='.5'
                          d='M12.1679082,10.4366504 C13.2665468,10.4366504 14.8131378,9.98479398 16.8076812,9.08108108 L26.0151101,12.4240859 L37.2324324,19.0035543 L31.6983898,28.4143373 L28.4789273,26.2630835 L27.8864804,39.7606473 L-3.27324722,39.7606473 L-4.61974515,25.9695776 L-7.83207961,28.6004868 L-12.7567568,20.2585949 L-2.52546931,13.3119476 L6.91469802,9.26314909 C8.00579656,9.75287007 8.79413614,10.0593222 9.27971675,10.1825053 C10.4557919,10.4808547 11.4894528,10.4366504 12.1679082,10.4366504 Z'
                          mask='url(#crew-icon-b)'
                        ></path>
                        <mask id='crew-icon-d' fill='#fff'>
                          <use xlinkHref='#crew-icon-c'></use>
                        </mask>
                        <path
                          className='icon__path'
                          stroke='#201E20'
                          strokeWidth='.5'
                          d='M16.8076812,9.08108108 C16.8746235,10.4962315 16.4823588,11.9561331 15.6308873,13.4607859 C14.3536799,15.7177651 9.93963555,15.3950468 8.56850444,13.4607859 C7.65441703,12.1712786 7.10158489,10.7782809 6.91000801,9.28179279'
                          mask='url(#crew-icon-d)'
                        ></path>
                        <g>
                          <mask id='crew-icon-f' fill='#fff'>
                            <use xlinkHref='#crew-icon-e'></use>
                          </mask>
                          <path
                            className='icon__path'
                            stroke='#201E20'
                            strokeWidth='.5'
                            d='M17.4092577,9.33055449 C17.4092577,11.1488197 16.950638,12.7398711 16.0333986,14.1037085 C14.6575394,16.1494646 9.87211557,16.1494646 8.26773855,14.1037085 C7.19815386,12.7398711 6.53359102,11.2118469 6.27405003,9.51963593'
                            mask='url(#crew-icon-f)'
                          ></path>
                        </g>
                        <g>
                          <mask id='crew-icon-h' fill='#fff'>
                            <use xlinkHref='#crew-icon-g'></use>
                          </mask>
                          <path
                            stroke='#201E20'
                            strokeWidth='.5'
                            d='M7.02463069,9.93144903 C8.48491714,10.7084938 10.1288952,11.0574658 11.9565648,10.9783649 C13.7842345,10.8992639 15.4037129,10.4692132 16.8150003,9.68821267'
                            mask='url(#crew-icon-h)'
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <h4>crew</h4>
                  </div>
                ) : (
                  ''
                )}
                {hoodie ? (
                  <div
                    className={
                      collar === 'hoodie'
                        ? 'collection__sidebar__filters__filter__items__item active--filter'
                        : 'collection__sidebar__filters__filter__items__item'
                    }
                    onClick={() => {
                      changeCollar('hoodie');
                    }}
                  >
                    <svg
                      viewBox='0 0 200 200'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        className='icon__path'
                        d='M114.289 126C107.015 159.341 104.103 145.083 116.382 169.605'
                        stroke='black'
                        strokeWidth='4'
                      />
                      <path
                        className='icon__path'
                        d='M90.2892 126C83.0151 159.341 80.1032 145.083 92.3816 169.605'
                        stroke='black'
                        strokeWidth='4'
                      />
                      <path
                        className='icon__path'
                        d='M135.802 72.9623C138.365 97.3449 130.598 114.857 112.5 125.5'
                        stroke='black'
                        strokeWidth='4'
                      />
                      <path
                        className='icon__path'
                        d='M60.547 72C57.7892 95.1021 65.4593 111.974 83.5571 122.617'
                        stroke='black'
                        strokeWidth='4'
                      />
                      <path
                        className='icon__path'
                        d='M42.395 84C38.9091 100.57 58.4976 115.76 101.16 129.571'
                        stroke='black'
                        strokeWidth='4'
                      />
                      <path
                        className='icon__path'
                        d='M157.961 84C161.393 101.428 143.072 116.618 103 129.571'
                        stroke='black'
                        strokeWidth='4'
                      />
                      <path
                        className='icon__path'
                        d='M42 88.6667C57.9211 71.4845 71.5732 62 97.8692 62C124.165 62 145.117 71.4845 157.556 88.6667'
                        stroke='black'
                        strokeWidth='4'
                      />
                      <path
                        className='icon__path'
                        d='M42 89C42 65.0141 57.7278 23 100 23C142.272 23 158 65.0141 158 89'
                        stroke='black'
                        strokeWidth='4'
                      />
                      <circle
                        cx='100'
                        cy='100'
                        r='99.5'
                        stroke='black'
                        strokeWidth='4'
                      />
                      <path
                        d='M68 117.5L13.5 149'
                        stroke='black'
                        strokeWidth='4'
                        className='icon__path'
                      />
                      <path
                        d='M137 116.5L187 148'
                        stroke='black'
                        strokeWidth='4'
                        className='icon__path'
                      />
                    </svg>
                    <h4>hoodie</h4>
                  </div>
                ) : (
                  ''
                )}
                {henley ? (
                  <div
                    className={
                      collar === 'henley'
                        ? 'collection__sidebar__filters__filter__items__item active--filter'
                        : 'collection__sidebar__filters__filter__items__item'
                    }
                    onClick={() => {
                      changeCollar('henley');
                    }}
                  >
                    <svg
                      width='100%'
                      viewBox='0 0 26 26'
                      aria-hidden='true'
                      data-acsb-hidden='true'
                      data-acsb-force-hidden='true'
                    >
                      <defs>
                        <circle
                          id='henley-icon-a'
                          cx='12'
                          cy='12'
                          r='12'
                        ></circle>
                      </defs>
                      <g
                        fill='none'
                        fillRule='evenodd'
                        transform='translate(1 1)'
                      >
                        <mask id='henley-icon-b' fill='#fff'>
                          <use xlinkHref='#henley-icon-a'></use>
                        </mask>
                        <use
                          stroke='#201E20'
                          strokeWidth='.5'
                          xlinkHref='#henley-icon-a'
                        ></use>
                        <path
                          className='icon__path'
                          stroke='#201E20'
                          strokeWidth='.5'
                          d='M12.1679082,10.4366504 C13.2665468,10.4366504 14.8131378,9.98479398 16.8076812,9.08108108 L26.0151101,12.4240859 L37.2324324,19.0035543 L31.6983898,28.4143373 L28.4789273,26.2630835 L27.8864804,39.7606473 L-3.27324722,39.7606473 L-4.61974515,25.9695776 L-7.83207961,28.6004868 L-12.7567568,20.2585949 L-2.52546931,13.3119476 L6.91469802,9.26314909 C8.00579656,9.75287007 8.79413614,10.0593222 9.27971675,10.1825053 C10.4557919,10.4808547 11.4894528,10.4366504 12.1679082,10.4366504 Z'
                          mask='url(#henley-icon-b)'
                        ></path>
                        <path
                          className='icon__path'
                          stroke='#201E20'
                          strokeWidth='.5'
                          d='M16.8076812,9.08108108 C16.8430683,10.1341416 16.6127673,11.1988174 16.1167783,12.2751085 C15.4627121,13.6944254 14.1985608,14.5756955 12.3243243,14.9189189'
                          mask='url(#henley-icon-b)'
                        ></path>
                        <path
                          className='icon__path'
                          stroke='#201E20'
                          strokeWidth='.5'
                          d='M17.6948571,9.38917317 C17.532996,10.9039795 17.1690502,12.1536485 16.6030198,13.1381804 C15.5316982,15.0015966 12.7932892,15.7837838 12.3243243,15.7837838'
                          mask='url(#henley-icon-b)'
                        ></path>
                        <path
                          className='icon__path'
                          stroke='#201E20'
                          strokeWidth='.5'
                          d='M11.1838921,9.26314909 C11.3724713,10.402411 11.1116643,11.5101874 10.4014712,12.5864785 C9.46493176,14.0057953 8.28289031,14.7832755 6.85534688,14.9189189'
                          mask='url(#henley-icon-b)'
                          transform='matrix(-1 0 0 1 18.099 0)'
                        ></path>
                        <path
                          className='icon__path'
                          stroke='#201E20'
                          strokeWidth='.5'
                          d='M11.2417308,9.57441206 C11.2708949,11.1401649 10.878289,12.4153073 10.0639132,13.3998392 C8.52255003,15.2632553 6.94646352,15.7837838 6.13588714,15.7837838'
                          mask='url(#henley-icon-b)'
                          transform='matrix(-1 0 0 1 17.38 0)'
                        ></path>
                        <path
                          className='icon__path'
                          stroke='#201E20'
                          strokeWidth='.5'
                          d='M6.85534688,9.83997945 C8.4284892,10.678004 10.1288952,11.0574658 11.9565648,10.9783649 C13.7842345,10.8992639 15.4037129,10.4692132 16.8150003,9.68821267'
                          mask='url(#henley-icon-b)'
                        ></path>
                        <circle
                          className='icon__path'
                          cx='11.784'
                          cy='22.378'
                          r='1'
                          stroke='#201E20'
                          strokeWidth='.5'
                          mask='url(#henley-icon-b)'
                        ></circle>
                        <circle
                          className='icon__path'
                          cx='11.784'
                          cy='19.135'
                          r='1'
                          stroke='#201E20'
                          strokeWidth='.5'
                          mask='url(#henley-icon-b)'
                        ></circle>
                        <circle
                          className='icon__path'
                          cx='11.784'
                          cy='15.676'
                          r='1'
                          stroke='#201E20'
                          strokeWidth='.5'
                          mask='url(#henley-icon-b)'
                        ></circle>
                        <polygon
                          className='icon__path'
                          stroke='#201E20'
                          strokeWidth='.5'
                          points='11.243 24 12.324 24 12.324 14.919 11.243 14.919'
                          mask='url(#henley-icon-b)'
                        ></polygon>
                      </g>
                    </svg>
                    <h4>henley</h4>
                  </div>
                ) : (
                  ''
                )}
                {hooded ? (
                  <div
                    className={
                      collar === 'hooded'
                        ? 'collection__sidebar__filters__filter__items__item active--filter'
                        : 'collection__sidebar__filters__filter__items__item'
                    }
                    onClick={() => {
                      changeCollar('hooded');
                    }}
                  >
                    <svg
                      viewBox='0 0 47 47'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M23.5 46C35.9264 46 46 35.9264 46 23.5C46 11.0736 35.9264 1 23.5 1C11.0736 1 1 11.0736 1 23.5C1 35.9264 11.0736 46 23.5 46Z'
                        stroke='#333333'
                      />
                      <path
                        d='M36.5 21C36.5 15.5948 32.9748 6.12695 23.5 6.12695C14.0252 6.12695 10.5 15.5948 10.5 21'
                        stroke='#333333'
                        className='icon__path'
                      />
                      <path
                        d='M36.5 21C32.9178 17.134 29.846 15 23.9294 15C18.0128 15 13.2988 17.134 10.5 21'
                        className='icon__path'
                        stroke='#333333'
                      />
                      <path
                        d='M15 17.5C14.4233 22.9861 16.171 26.9264 20.2431 29.321'
                        className='icon__path'
                        stroke='#333333'
                      />
                      <path
                        d='M10.6046 20C9.83242 23.9212 13.9545 27.3391 22.9708 30.2535'
                        className='icon__path'
                        stroke='#333333'
                      />
                      <path
                        d='M36.4017 20C37.1861 23.7282 32.7786 27.1461 23.1795 30.2535'
                        className='icon__path'
                        stroke='#333333'
                      />
                      <path
                        d='M32.2546 17.5C32.8751 22.698 31.1493 26.4942 27.0773 28.8888'
                        className='icon__path'
                        stroke='#333333'
                      />
                      <path
                        d='M33 26L43.5 34'
                        stroke='black'
                        className='icon__path'
                      />
                      <path
                        d='M14.5 26.5L4 35'
                        stroke='black'
                        className='icon__path'
                      />
                    </svg>
                    <h4>hooded</h4>
                  </div>
                ) : (
                  ''
                )}
                {polo ? (
                  <div
                    className={
                      collar === 'polo'
                        ? 'collection__sidebar__filters__filter__items__item active--filter'
                        : 'collection__sidebar__filters__filter__items__item'
                    }
                    onClick={() => {
                      changeCollar('polo');
                    }}
                  >
                    <svg
                      viewBox='0 0 35 35'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M17.5 34.2553C26.7537 34.2553 34.2553 26.7537 34.2553 17.4999C34.2553 8.24624 26.7537 0.744629 17.5 0.744629C8.2463 0.744629 0.74469 8.24624 0.74469 17.4999C0.74469 26.7537 8.2463 34.2553 17.5 34.2553Z'
                        stroke='#333333'
                        strokeWidth='0.893617'
                      />
                      <path
                        d='M24.2129 12.5186C24.7965 14.219 24.4939 16.1196 23.305 18.2205C22.1161 20.3214 20.2593 22.3591 17.7344 24.3336C15.3999 22.641 13.5945 20.8945 12.3181 19.094C11.0418 17.2934 10.4037 15.2058 10.4037 12.8311'
                        stroke='#333333'
                        strokeWidth='0.893617'
                        className='icon__path'
                      />
                      <path
                        d='M21.0294 23.0639C20.6863 23.3999 19.7542 24.1788 18.233 25.4005L18.233 25.4005C17.9607 25.6191 17.5731 25.6192 17.3007 25.4007C15.8697 24.2525 14.9989 23.5401 14.6884 23.2633'
                        stroke='#333333'
                        strokeWidth='0.893617'
                        className='icon__path'
                      />
                      <path
                        d='M17.7667 25.7719C18.178 25.7719 18.5114 25.4385 18.5114 25.0272C18.5114 24.616 18.178 24.2826 17.7667 24.2826C17.3554 24.2826 17.022 24.616 17.022 25.0272C17.022 25.4385 17.3554 25.7719 17.7667 25.7719Z'
                        fill='white'
                        stroke='#333333'
                        strokeWidth='0.893617'
                        className='icon__path'
                      />
                      <path
                        d='M14.9741 23.5379C15.3854 23.5379 15.7188 23.2045 15.7188 22.7932C15.7188 22.3819 15.3854 22.0485 14.9741 22.0485C14.5629 22.0485 14.2295 22.3819 14.2295 22.7932C14.2295 23.2045 14.5629 23.5379 14.9741 23.5379Z'
                        fill='white'
                        stroke='#333333'
                        strokeWidth='0.893617'
                        className='icon__path'
                      />
                      <path
                        d='M16.9787 25.1329V28.8563H18.4681V25.1329'
                        stroke='#333333'
                        strokeWidth='0.893617'
                        className='icon__path'
                      />
                      <path
                        d='M10.4037 13.6504C12.5422 14.7724 14.8874 15.2782 17.4393 15.1678C19.9913 15.0573 22.3077 14.4364 24.3886 13.3051'
                        stroke='#333333'
                        strokeWidth='0.893617'
                        className='icon__path'
                      />
                      <path
                        d='M20.8163 23.1128L24.5012 24.9468C27.7089 19.9804 29.1584 16.4128 28.8497 14.2439'
                        stroke='#333333'
                        strokeWidth='0.893617'
                        className='icon__path'
                      />
                      <path
                        d='M14.5359 23.1913L11.0914 24.9468C7.88365 19.9804 6.43412 16.4128 6.74276 14.2439'
                        stroke='#333333'
                        strokeWidth='0.893617'
                        className='icon__path'
                      />
                      <path
                        d='M34.5 16.5L24.5 12.5'
                        stroke='#333333'
                        className='icon__path'
                      />
                      <path
                        d='M0.5 17L10.5 13'
                        stroke='#333333'
                        className='icon__path'
                      />
                      <path
                        d='M10.5 13C12.8333 14.1667 18.9 15.7 24.5 12.5'
                        stroke='#333333'
                        className='icon__path'
                      />
                    </svg>
                    <h4>polo</h4>
                  </div>
                ) : (
                  ''
                )}
                {vneck ? (
                  <div
                    className={
                      collar === 'v-neck'
                        ? 'collection__sidebar__filters__filter__items__item active--filter'
                        : 'collection__sidebar__filters__filter__items__item'
                    }
                    onClick={() => {
                      changeCollar('v-neck');
                    }}
                  >
                    <svg
                      viewBox='0 0 26 26'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z'
                        stroke='black'
                        strokeWidth='0.5'
                      />
                      <mask
                        id='mask0'
                        mask-type='alpha'
                        maskUnits='userSpaceOnUse'
                        x='1'
                        y='1'
                        width='24'
                        height='24'
                      >
                        <path
                          d='M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z'
                          fill='white'
                          className='icon__path'
                        />
                      </mask>
                      <g mask='url(#mask0)'></g>
                      <mask
                        id='mask1'
                        mask-type='alpha'
                        maskUnits='userSpaceOnUse'
                        x='1'
                        y='1'
                        width='24'
                        height='24'
                      >
                        <path
                          d='M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z'
                          fill='white'
                          className='icon__path'
                        />
                      </mask>
                      <g mask='url(#mask1)'>
                        <path
                          d='M17.8077 9.43243C18.2257 10.6502 18.009 12.0114 17.1575 13.5161C16.306 15.0207 14.9762 16.4801 13.1679 17.8942C11.4959 16.682 10.2029 15.4311 9.28879 14.1416C8.37471 12.8521 7.91766 11.357 7.91766 9.65619'
                          stroke='black'
                          strokeWidth='0.5'
                          className='icon__path'
                        />
                        <mask
                          id='mask2'
                          mask-type='alpha'
                          maskUnits='userSpaceOnUse'
                          x='1'
                          y='1'
                          width='24'
                          height='24'
                        >
                          <path
                            d='M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z'
                            fill='white'
                          />
                        </mask>
                        <g mask='url(#mask2)'>
                          <path
                            d='M18.8466 9.82129C18.9785 11.6016 18.5139 13.2423 17.4529 14.7435C16.3919 16.2448 14.964 17.6554 13.1692 18.9753C11.1221 17.3165 9.58964 15.9059 8.57164 14.7435C7.55364 13.5812 7.04465 11.988 7.04465 9.96383'
                            stroke='black'
                            strokeWidth='0.5'
                            className='icon__path'
                          />
                        </g>
                        <mask
                          id='mask3'
                          mask-type='alpha'
                          maskUnits='userSpaceOnUse'
                          x='1'
                          y='1'
                          width='24'
                          height='24'
                        >
                          <path
                            d='M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z'
                            fill='white'
                            className='icon__path'
                          />
                        </mask>
                        <g mask='url(#mask3)'>
                          <path
                            d='M7.91766 10.243C9.44926 11.0466 11.1289 11.4088 12.9566 11.3297C14.7842 11.2506 16.4432 10.806 17.9335 9.99573'
                            stroke='black'
                            strokeWidth='0.5'
                            className='icon__path'
                          />
                        </g>
                      </g>
                      <path
                        d='M25 12L18 9.5C16.1667 10.3333 11.6 11.5 8 9.5C7.6 9.5 3.16667 11.5 1 12.5'
                        stroke='black'
                        strokeWidth='0.5'
                        className='icon__path'
                      />
                    </svg>
                    <h4>v-neck</h4>
                  </div>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
