import React from 'react';
import StarRatings from 'react-star-ratings';

export default function Review({ review }) {
  let fit;
  if (review.fit === 'small') {
    fit = 1;
  } else if (review.fit === 'trim') {
    fit = 2;
  } else if (review.fit === 'perfect') {
    fit = 3;
  } else if (review.fit === 'loose') {
    fit = 4;
  } else if (review.fit === 'large') {
    fit = 5;
  }

  return (
    <div className='review'>
      <div className='review__svg'>
        <svg viewBox='0 0 62 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <circle cx='30' cy='30' r='30' fill='black' />
          <circle
            cx='29.75'
            cy='29.75'
            r='24.75'
            fill='black'
            stroke='white'
            strokeWidth='1.5'
            strokeLinecap='round'
            strokeDasharray='40 10'
          />
          <path
            d='M46 16L18.9439 44.4084C16.4698 45.348 15.4101 45.4865 16.3256 42.4068L46 16Z'
            fill='white'
          />
          <path
            d='M16 16L43.0561 44.4084C45.5302 45.348 46.5899 45.4865 45.6744 42.4068L16 16Z'
            fill='white'
          />
          <rect
            width='2.88618'
            height='2.56777'
            transform='translate(30.3914 32.3938) rotate(-46.5187)'
            fill='black'
          />
          <ellipse cx='49.5' cy='46.5' rx='12.5' ry='11.5' fill='#01B55E' />
          <path d='M43.5 42L46.5 50L59 42' stroke='white' strokeWidth='2' />
        </svg>
      </div>

      <div className='review__body'>
        <div className='review__body__header'>
          <h3 className='review__body__header__name'>
            <span> {review.user.name.split(' ')[0]}</span> verified buyer
          </h3>
          <h3 className='review__body__header__date'>
            {review.createdAt.split('T')[0].replace(/-/g, '/')}
          </h3>
        </div>
        <div className='review__body__stars'>
          <StarRatings
            rating={review.score}
            starDimension='17px'
            starRatedColor='black'
            starEmptyColor='#dadada'
            starSpacing='1px'
          />
        </div>
        <div className='review__body__user--info'>
          <h4 className='review__body__user--info__h4'>
            <span>body type:</span> {review.bodyType}
          </h4>
          <h4 className='review__body__user--info__h4'>
            <span>size:</span> {review.size}
          </h4>
          <h4 className='review__body__user--info__h4'>
            <span>height:</span> {review.tall}
          </h4>
        </div>
        <div className='review__body__fit'>
          <h4 className='review__body__fit__h4'>fit</h4>
          <div className='review__body__fit__bars'>
            <div
              className={
                fit >= 1
                  ? 'review__body__fit__bar__full'
                  : 'review__body__fit__bar'
              }
            ></div>
            <div
              className={
                fit >= 2
                  ? 'review__body__fit__bar__full'
                  : 'review__body__fit__bar'
              }
            ></div>
            <div
              className={
                fit >= 3
                  ? 'review__body__fit__bar__full'
                  : 'review__body__fit__bar'
              }
            ></div>
            <div
              className={
                fit >= 4
                  ? 'review__body__fit__bar__full'
                  : 'review__body__fit__bar'
              }
            ></div>
            <div
              className={
                fit >= 5
                  ? 'review__body__fit__bar__full'
                  : 'review__body__fit__bar'
              }
            ></div>
          </div>
        </div>
        <div className='review__body__review'>
          <h3 className='review__body__review__title'>{review.title}</h3>
          <h4 className='review__body__review__reveiw'>{review.review}</h4>
        </div>
      </div>
    </div>
  );
}
