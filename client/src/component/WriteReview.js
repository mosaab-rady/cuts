import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';

import '../css/writereview.css';
import { writereview } from '../js/writereview';

export default function WriteReview({ id }) {
  const [score, setScore] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    let form = {};
    form.title = e.target.title.value;
    form.review = e.target.review.value;
    form.score = score;
    form.fit = e.target.fit.value;
    form.bodyType = e.target.bodyType.value;
    form.size = e.target.size.value;
    form.tall = e.target.tall.value;
    writereview({ id, form });
  };

  return (
    <div className='write__review'>
      <h3 className='write__review__h3'>write a review</h3>
      <h4 className='write__review__indicate'>
        <span className='write__review__important'>*</span> Indicates a required
        field
      </h4>
      <form className='write__review__form' onSubmit={handleSubmit}>
        <div className='form__group'>
          <label htmlFor=''>
            <span className='write__review__important'>*</span> Score:
          </label>
          <StarRatings
            rating={score}
            starDimension='20px'
            starRatedColor='black'
            starEmptyColor='#dadada'
            starHoverColor='black'
            starSpacing='1px'
            changeRating={(rating) => setScore(rating)}
          />
        </div>
        <div className='form__group'>
          <label htmlFor='title'>
            <span className='write__review__important'>*</span> Title:
          </label>
          <input
            type='text'
            required
            name='title'
            placeholder='title:'
            className='write__review__group__text'
          />
        </div>
        <div className='form__group'>
          <label htmlFor='review'>
            <span className='write__review__important'>*</span> Review:
          </label>
          <textarea
            name='review'
            required
            placeholder='review:'
            className='write__review__group__textarea'
          ></textarea>
        </div>
        <div className='form__group '>
          <label>how did your shirt fit?</label>
          <div className='form__group__radio form__group__fit '>
            <input type='radio' value='small' id='small' name='fit' />
            <label htmlFor='small'>small</label>
            <div className='review__body__fit__bars'>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar'></div>
              <div className='review__body__fit__bar'></div>
              <div className='review__body__fit__bar'></div>
              <div className='review__body__fit__bar'></div>
            </div>
          </div>
          <div className='form__group__radio form__group__fit'>
            <input type='radio' value='trim' id='trim' name='fit' />
            <label htmlFor='trim'>trim</label>
            <div className='review__body__fit__bars'>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar'></div>
              <div className='review__body__fit__bar'></div>
              <div className='review__body__fit__bar'></div>
            </div>
          </div>
          <div className='form__group__radio form__group__fit'>
            <input type='radio' value='perfect' id='perfect' name='fit' />
            <label htmlFor='perfect'>perfect</label>
            <div className='review__body__fit__bars'>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar'></div>
              <div className='review__body__fit__bar'></div>
            </div>
          </div>
          <div className='form__group__radio form__group__fit'>
            <input type='radio' value='loose' id='loose' name='fit' />
            <label htmlFor='loose'>loose</label>
            <div className='review__body__fit__bars'>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar'></div>
            </div>
          </div>
          <div className='form__group__radio form__group__fit'>
            <input type='radio' value='large' id='large' name='fit' />
            <label htmlFor='large'>large</label>
            <div className='review__body__fit__bars'>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar__full'></div>
              <div className='review__body__fit__bar__full'></div>
            </div>
          </div>
        </div>
        <div className='form__group'>
          <label>how would you describe your body type?</label>
          <div className='form__group__radio'>
            <input type='radio' value='slim' id='slim' name='bodyType' />
            <label htmlFor='slim'>slim</label>
          </div>
          <div className='form__group__radio'>
            <input
              type='radio'
              value='athletic'
              id='athletic'
              name='bodyType'
            />
            <label htmlFor='athletic'>athletic</label>
          </div>
          <div className='form__group__radio'>
            <input
              type='radio'
              value='muscular'
              id='muscular'
              name='bodyType'
            />
            <label htmlFor='muscular'>muscular</label>
          </div>
          <div className='form__group__radio'>
            <input type='radio' value='curvy' id='curvy' name='bodyType' />
            <label htmlFor='curvy'>curvy</label>
          </div>
        </div>
        <div className='form__group'>
          <label>what size did you order?</label>
          <div className='form__group__radio'>
            <input type='radio' value='s' id='s' name='size' />
            <label htmlFor='s'>s</label>
          </div>
          <div className='form__group__radio'>
            <input type='radio' value='m' id='m' name='size' />
            <label htmlFor='m'>m</label>
          </div>
          <div className='form__group__radio'>
            <input type='radio' value='l' id='l' name='size' />
            <label htmlFor='l'>l</label>
          </div>
          <div className='form__group__radio'>
            <input type='radio' value='xl' id='xl' name='size' />
            <label htmlFor='xl'>xl</label>
          </div>
          <div className='form__group__radio'>
            <input type='radio' value='xxl' id='xxl' name='size' />
            <label htmlFor='xxl'>xxl</label>
          </div>
        </div>
        <div className='form__group'>
          <label>how tall are you?</label>
          <div className='form__group__radio'>
            <input type='radio' value='<5ft 10in' id='<5ft 10in' name='tall' />
            <label htmlFor='<5ft 10in'>{'<5ft 10in'}</label>
          </div>
          <div className='form__group__radio'>
            <input
              type='radio'
              value='5ft 10in - 6ft 0in'
              id='5ft 10in - 6ft 0in'
              name='tall'
            />
            <label htmlFor='5ft 10in - 6ft 0in'>5ft 10in - 6ft 0in</label>
          </div>
          <div className='form__group__radio'>
            <input
              type='radio'
              value='6ft 1in - 6ft 3in'
              id='6ft 1in - 6ft 3in'
              name='tall'
            />
            <label htmlFor='6ft 1in - 6ft 3in'>6ft 1in - 6ft 3in</label>
          </div>
          <div className='form__group__radio'>
            <input type='radio' value='>6ft 3in' id='>6ft 3in' name='tall' />
            <label htmlFor='>6ft 3in'>{'>6ft 3in'}</label>
          </div>
        </div>
        <div className='write__review__btn--container'>
          <div className='err--div' id='write__review__err'></div>
          <button className='write__review__btn'>post</button>
        </div>
      </form>
    </div>
  );
}
