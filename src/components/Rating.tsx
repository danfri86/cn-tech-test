import React from 'react';
import Icon from './Icon';
import s from './Rating.module.css';

type Props = {
  rating: number;
  numberOfVotes: number;
};

const Rating = ({
  rating,
  numberOfVotes,
  className,
  ...props
}: Props & React.HTMLAttributes<HTMLDivElement>) => {
  const maxRating = 5;

  return (
    <div className={`${s.wrapper} ${className || ''}`} {...props}>
      <div className={s.stars}>
        {Array.from({ length: maxRating }).map((_, i) => (
          <Icon
            key={i}
            icon={i < rating ? 'star-solid' : 'star'}
            color="var(--color-highlight)"
            size="0.8125em"
            className={s.icon}
          />
        ))}
      </div>

      <p className={s.count}>({numberOfVotes})</p>
    </div>
  );
};

export default Rating;
