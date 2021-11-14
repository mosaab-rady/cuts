import React from 'react';
import { Link } from 'react-router-dom';
import '../css/comparison.css';
export default function Comparison({ img, nb, name, info, link }) {
  return (
    <div className='comparison'>
      <img className={`comparison__img${nb}`} src={`../img/${img}`} alt='' />
      <div className='comparison__info'>
        <h3 className='comparison__info__h3'>
          <span>{nb}</span> {name}
        </h3>
        <ul className='comparison__info__ul'>
          {info.map((item, i) => {
            return (
              <li key={i} className='comparison__info__li'>
                {item}
              </li>
            );
          })}
        </ul>
        <Link
          className='link'
          to={{
            pathname: `/collections/${link}`,
          }}
        >
          <h4 className='comparison__link'>shop {name}</h4>
        </Link>
      </div>
    </div>
  );
}
