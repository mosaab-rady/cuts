import React from 'react';
import '../css/slider.css';

export default function Slider({ product }) {
  const host = 'http://localhost:5000';

  let slideIndex = 1;
  showDivs(slideIndex);

  function plusDivs(n) {
    showDivs((slideIndex += n));
  }

  function showDivs(n) {
    let i;
    let x = document.getElementsByClassName('product__imgs__main--img');
    if (x.length > 0) {
      if (n > x.length) {
        slideIndex = 1;
      }
      if (n < 1) {
        slideIndex = x.length;
      }
      for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
      }
      x[slideIndex - 1].style.display = 'block';
    }
  }

  return (
    <div className='product__imgs__container'>
      <img
        src={`${host}/api/v1/images/${product.imageCover}`}
        alt=''
        className='product__imgs__main--img'
      />

      <img
        src={`${host}/api/v1/images/${product.imageDetail}`}
        alt=''
        className='product__imgs__main--img'
      />

      {product.images
        ? product.images.map((img, i) => {
            return (
              <img
                key={i}
                className='product__imgs__main--img'
                src={`${host}/api/v1/images/${img}`}
                alt=''
              />
            );
          })
        : ''}
      <button className='product__imgs__btn left' onClick={() => plusDivs(-1)}>
        &#10094;
      </button>
      <button className='product__imgs__btn right' onClick={() => plusDivs(+1)}>
        &#10095;
      </button>
    </div>
  );
}
