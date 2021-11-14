import React, { useState } from 'react';
import { addNewColor } from '../../js/productOperations';

export default function AddNewColor({ product }) {
  const [imageCover, setImageCover] = useState('');
  const [imageDetail, setImageDetail] = useState('');
  const [img_1, setImg_1] = useState('');
  const [img_2, setImg_2] = useState('');
  const [img_3, setImg_3] = useState('');

  const handlePhoto = (img) => (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (img === 'cover') setImageCover(e.target.result);
        if (img === 'detail') setImageDetail(e.target.result);
        if (img === 'img_1') setImg_1(e.target.result);
        if (img === 'img_2') setImg_2(e.target.result);
        if (img === 'img_3') setImg_3(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddColorSubmit = (e) => {
    e.preventDefault();
    addNewColor(e, product);
  };

  return (
    <div className='addnewcolor--container'>
      <form onSubmit={handleAddColorSubmit}>
        <div className='account--body__product__form__color'>
          <div className='account--body__product__form__group'>
            <label htmlFor='color'>color name</label>
            <input type='text' placeholder='color' required name='color' />
          </div>
          <div className='account--body__product__form__group'>
            <label htmlFor='colorHex'>color hex</label>
            <input
              type='color'
              required
              placeholder='color hex'
              name='colorHex'
              id='account--body__product__form__color__inp'
            />
          </div>
        </div>
        <div className='account--body__product__form__imgs'>
          <h3 className='account--body__product__form__sizes__h3'>images :</h3>
          <div className='account--group__product__form__imgs--container'>
            <div className='account--body__product__form__group'>
              <label htmlFor='imageCover'> first image</label>
              <img
                src={imageCover}
                alt=''
                className='account--body__product__form__group__imgcover'
              />
              <label className='account--body__product__form__group__fileinput'>
                <input
                  type='file'
                  accept='image/*'
                  name='imageCover'
                  onChange={handlePhoto('cover')}
                  required
                />
                choose new image
              </label>
            </div>
            <div className='account--body__product__form__group'>
              <label htmlFor='imageDetail'> second image</label>
              <img
                src={imageDetail}
                alt=''
                className='account--body__product__form__group__imgcover'
              />
              <label className='account--body__product__form__group__fileinput'>
                <input
                  type='file'
                  accept='image/*'
                  name='imageDetail'
                  onChange={handlePhoto('detail')}
                  required
                />
                choose new image
              </label>
            </div>
            <div className='account--body__product__form__group'>
              <label htmlFor='img_1'>third image</label>
              <img
                src={img_1}
                alt=''
                className='account--body__product__form__group__imgcover'
              />
              <label className='account--body__product__form__group__fileinput'>
                <input
                  type='file'
                  accept='image/*'
                  name='img_1'
                  onChange={handlePhoto('img_1')}
                />
                choose new image
              </label>
            </div>
            <div className='account--body__product__form__group'>
              <label htmlFor='img_2'>forth image</label>
              <img
                src={img_2}
                alt=''
                className='account--body__product__form__group__imgcover'
              />
              <label className='account--body__product__form__group__fileinput'>
                <input
                  type='file'
                  accept='image/*'
                  name='img_2'
                  onChange={handlePhoto('img_2')}
                />
                choose new image
              </label>
            </div>
            <div className='account--body__product__form__group'>
              <label htmlFor='img_3'>fifth image</label>
              <img
                src={img_3}
                alt=''
                className='account--body__product__form__group__imgcover'
              />
              <label className='account--body__product__form__group__fileinput'>
                <input
                  type='file'
                  accept='image/*'
                  name='img_3'
                  onChange={handlePhoto('img_3')}
                />
                choose new image
              </label>
            </div>
          </div>
        </div>
        <div className='account--body__product__form__sizes'>
          <h3 className='account--body__product__form__sizes__h3'>sizes :</h3>
          <div className='account--body__product__form__sizes--container'>
            <div className='account--body__product__form__group'>
              <label htmlFor='small'>small amount</label>
              <input type='number' min='0' name='small' defaultValue='0' />
            </div>
            <div className='account--body__product__form__group'>
              <label htmlFor='medium'>medium amount</label>
              <input type='number' name='medium' min='0' defaultValue='0' />
            </div>
            <div className='account--body__product__form__group'>
              <label htmlFor='large'>large amount</label>
              <input type='number' min='0' name='large' defaultValue='0' />
            </div>
            <div className='account--body__product__form__group'>
              <label htmlFor='xLarge'>x-large amount</label>
              <input type='number' min='0' name='xLarge' defaultValue='0' />
            </div>
            <div className='account--body__product__form__group'>
              <label htmlFor='xxLarge'>xx-large amount</label>
              <input type='number' min='0' name='xxLarge' defaultValue='0' />
            </div>
          </div>
        </div>
        <div className='err--div' id='add__newcolor--err'></div>
        <div className='success--div' id='add__newcolor--success'></div>
        <button
          type='submit'
          className='account--body__product__addnewcolor__form__btn'
        >
          add new color
        </button>
      </form>
    </div>
  );
}
