import React, { useContext } from 'react';
import { myContext } from '../Context';
import { request } from '../js/axios';

export default function Addresses() {
  const { currentUser } = useContext(myContext);

  const addAddress = async (e) => {
    e.preventDefault();
    const name = e.target.firstname.value + ' ' + e.target.lastname.value;
    const address_1 = e.target.address1.value;
    const address_2 = e.target.address2.value;
    const city = e.target.city.value;
    const country = e.target.country.value;
    const zip = e.target.zip.value;

    const res = await request('PATCH', `/api/v1/users/${currentUser._id}`, {
      address: { name, address_1, address_2, city, country, zip },
    });
    if (res) {
      if (res.data.status === 'success') {
        console.log(res);
      }
    }
  };

  return (
    <div className='account--body addresses'>
      <h2 className='account--body__header'>address book</h2>
      <div className='account--body__addresses'>
        <h2 className='account--body__addresses__header'>add address</h2>
        <form className='form' onSubmit={(e) => addAddress(e)}>
          <div className='addresses__form'>
            <div className='form__group'>
              <label htmlFor='firstname' className='form__group__label'>
                first name
              </label>
              <input
                type='text'
                className='form__group__in'
                placeholder='first name'
                name='firstname'
                required
              />
            </div>
            <div className='form__group'>
              <label htmlFor='lastname' className='form__group__label'>
                last name
              </label>
              <input
                type='text'
                className='form__group__in'
                placeholder='last name'
                required
                name='lastname'
              />
            </div>
            <div className='form__group'>
              <label htmlFor='address1' className='form__group__label'>
                address 1
              </label>
              <input
                type='text'
                className='form__group__in'
                placeholder='address 1'
                required
                name='address1'
              />
            </div>
            <div className='form__group'>
              <label htmlFor='address2' className='form__group__label'>
                address 2
              </label>
              <input
                type='text'
                className='form__group__in'
                placeholder='address 2'
                name='address2'
              />
            </div>
            <div className='form__group'>
              <label htmlFor='city' className='form__group__label'>
                city
              </label>
              <input
                type='text'
                className='form__group__in'
                placeholder='city'
                required
                name='city'
              />
            </div>
            <div className='form__group'>
              <label htmlFor='country' className='form__group__label'>
                country
              </label>
              <input
                type='country'
                className='form__group__in'
                name='country'
                required
                placeholder='country'
              />
            </div>
            <div className='form__group'>
              <label htmlFor='zip' className='form__group__label'>
                zip
              </label>
              <input
                type='text'
                className='form__group__in'
                name='zip'
                required
                placeholder='zip'
              />
            </div>
          </div>
          <button className='address__btn'>save</button>
        </form>
      </div>
    </div>
  );
}
