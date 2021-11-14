import React from 'react';
import Comparison from './Comparison';

export default function ComparisonPage() {
  return (
    <section className='overview__cuts--comparison'>
      <div className='overview__cuts--comparison__header'>
        <h3 className='overview__cuts--comparison__h3'>cuts comparison</h3>
        <h4 className='overview__cuts--comparison__h4'>
          Define your look with every Cut. Here’s how each shape can elevate
          your style.
        </h4>
      </div>
      <div className='overview__cuts--comparison__imgs'>
        <Comparison
          img='curve-hem.webp'
          nb={1}
          name='classic curve hem'
          info={[
            'Elevated regular bottom cut',
            'Curved hem to eliminate bunching around the waist',
            'Traditional fitting body',
          ]}
          link='classic'
        />
        <Comparison
          img='split-hem.webp'
          nb={2}
          name='split-hem'
          info={[
            'Dynamic functionality lends to a casual yet distinctive look',
            'Split-Hem provides more room throughout the body',
          ]}
          link='split'
        />
        <Comparison
          img='elongated-hem.webp'
          nb={3}
          name='elongated-hem'
          info={[
            'Crafted with the modern man in mind',
            'Longer torso: 1.5” longer than the Curve-Hem',
            'Extended curve demonstrates true class with urban feel',
          ]}
          link='elongated'
        />
      </div>
    </section>
  );
}
