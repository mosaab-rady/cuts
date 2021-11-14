import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { request } from '../../js/axios';
import { updateDefault } from '../../js/collectionOperations';

export default function AdminDefaultCollectionDetail() {
  const host = 'http://localhost:5000';

  const location = useLocation();
  const [doc, setDoc] = useState('');

  const [imageHero, setImageHero] = useState('');
  const [imageCover, setImageCover] = useState('');
  const [image, setImage] = useState('');
  const [imageDetail, setImageDetail] = useState('');
  const [imageOverview, setImageOverview] = useState('');

  useEffect(() => {
    document.getElementById('App').scrollTo({
      top: 0,
      behavior: 'auto',
    });

    const getData = async () => {
      const res = await request(
        'GET',
        `api/v1/collections/${location.pathname}`
      );
      if (res) {
        if (res.data.status === 'success') {
          setDoc(res.data.data.collection);
          setImageHero(
            `${host}/api/v1/images/${res.data.data.collection.imageHero}`
          );
          setImageCover(
            `${host}/api/v1/images/${res.data.data.collection.imageCover}`
          );
          setImage(`${host}/api/v1/images/${res.data.data.collection.image}`);
          setImageDetail(
            `${host}/api/v1/images/${res.data.data.collection.imageDetail}`
          );
          setImageOverview(
            `${host}/api/v1/images/${res.data.data.collection.imageOverview}`
          );
        }
        // if not found create one
      }
    };
    getData();
  }, [location]);

  const handlePhoto = (img) => (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (img === 'hero') setImageHero(e.target.result);
        if (img === 'cover') setImageCover(e.target.result);
        if (img === 'image') setImage(e.target.result);
        if (img === 'detail') setImageDetail(e.target.result);
        if (img === 'overview') setImageOverview(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const updateDefaultCollection = (e) => {
    e.preventDefault();
    updateDefault(e, doc._id);
  };

  return (
    <div className='account--body'>
      <form
        className='account--body__collection__form'
        onSubmit={updateDefaultCollection}
      >
        <div className='account--body__collection__form__group account--body__collection__form__name__group'>
          <label
            htmlFor='name'
            className='account--body__collection__form__group__label'
          >
            name
          </label>
          <input type='text' name='name' defaultValue={doc.name} readOnly />
        </div>

        <div className='account--body__collection__form__group account--body__collection__form__imagehero__group'>
          <label
            htmlFor='imageHero'
            className='account--body__collection__form__group__label'
          >
            the hero image
          </label>
          <h4 className='account--body__collection__form__group__detail'>
            the main image that appears in the overview page "not required"
          </h4>
          <img
            src={imageHero}
            alt=''
            className='account--body__collection__form__group__imghero'
          />
          <label className='account--body__collection__form__group__fileinput'>
            <input
              type='file'
              accept='image/*'
              name='imageHero'
              onChange={handlePhoto('hero')}
            />
            choose new hero image
          </label>
        </div>

        <div className='account--body__collection__form__group account--body__collection__form__imageCover__group'>
          <label
            htmlFor='imageCover'
            className='account--body__collection__form__group__label'
          >
            the cover image
          </label>
          <h4 className='account--body__collection__form__group__detail'>
            the image that appears in the collection page "required"
          </h4>
          <img
            src={imageCover}
            alt=''
            className='account--body__collection__form__group__imgcover'
          />
          <label className='account--body__collection__form__group__fileinput'>
            <input
              type='file'
              accept='image/*'
              name='imageCover'
              onChange={handlePhoto('cover')}
            />
            choose new cover image
          </label>
        </div>

        <div className='account--body__collection__form__group account--body__collection__form__image__group'>
          <label
            htmlFor='image'
            className='account--body__collection__form__group__label'
          >
            the image
          </label>
          <h4 className='account--body__collection__form__group__detail'>
            the image that appears in the overview section "not required"
          </h4>
          <img
            src={image}
            alt=''
            className='account--body__collection__form__group__img'
          />
          <label className='account--body__collection__form__group__fileinput'>
            <input
              type='file'
              accept='image/*'
              name='image'
              onChange={handlePhoto('image')}
            />
            choose new image
          </label>
        </div>

        <div className='account--body__collection__form__group account--body__collection__form__imagedetail__group'>
          <label
            htmlFor='imageDetail'
            className='account--body__collection__form__group__label'
          >
            the image detail
          </label>
          <h4 className='account--body__collection__form__group__detail'>
            the image that appears in navbar "not required"
          </h4>
          <img
            src={imageDetail}
            alt=''
            className='account--body__collection__form__group__imgdetail'
          />
          <label className='account--body__collection__form__group__fileinput'>
            <input
              type='file'
              accept='image/*'
              name='imageDetail'
              onChange={handlePhoto('detail')}
            />
            choose new image detail
          </label>
        </div>

        <div className='account--body__collection__form__group account--body__collection__form__imageoverview__group'>
          <label
            htmlFor='imageOverview'
            className='account--body__collection__form__group__label'
          >
            the image overview
          </label>
          <h4 className='account--body__collection__form__group__detail'>
            the image that appears in shop "not required"
          </h4>
          <img
            src={imageOverview}
            alt=''
            className='account--body__collection__form__group__imgoverview'
          />
          <label className='account--body__collection__form__group__fileinput'>
            <input
              type='file'
              accept='image/*'
              name='imageOverview'
              onChange={handlePhoto('overview')}
            />
            choose new image overview
          </label>
        </div>

        <div className='err--div' id='update__default__collection--err'></div>
        <div
          className='success--div'
          id='update__default__collection--success'
        ></div>
        <div className='account--body__collection__form__group__btns'>
          <button type='submit'>update</button>
        </div>
      </form>
    </div>
  );
}
