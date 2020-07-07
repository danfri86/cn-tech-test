import React from 'react';
import s from './PageHero.module.css';

const PageHero: React.FC = ({ children }) => {
  return (
    <div className={s.wrapper}>
      <div className={s['image-wrapper']}>
        <img src="/saloon-image.jpg" className={s.image} />
      </div>

      <div className={s.content}>{children}</div>
    </div>
  );
};

export default PageHero;
