import React from 'react';
import '../css/cut.css';
export default function Cut({ top, name, img }) {
  return (
    <div className='cut'>
      {top ? <h5 className='cut__h5'>{name}</h5> : ''}
      <img
        className={top ? 'cut__img' : 'cut__img--top'}
        src={`../img/${img}`}
        alt=''
      />
      {top ? '' : <h5 className='cut__h5'>{name}</h5>}
    </div>
  );
}
