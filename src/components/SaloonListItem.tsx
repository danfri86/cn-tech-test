import React from 'react';
import { Saloon } from '../../@types/Saloons';
import Link from 'next/link';
import { slugify } from '@utils';
import s from './SaloonListItem.module.css';
import Icon from './Icon';
import Rating from './Rating';

type Props = {
  saloon: Saloon;
};

const SaloonListItem = ({ saloon }: Props) => {
  return (
    <div className={s.wrapper}>
      <div className={s['inner-wrapper']}>
        <div className={s['time-wrapper']}>
          <p>12.00</p>
        </div>

        <div>
          <h2 className={s.title}>{saloon.name}</h2>

          <Rating
            rating={saloon.score}
            numberOfVotes={saloon.reviewCount}
            className={s.rating}
          />

          <p className={s.address}>{saloon.adress.street}</p>
        </div>

        <div className={s.meta}>
          <p className={s.price}>{saloon.priceSek} kr</p>
          <p className={s.duration}>{saloon.durationMin} min</p>
        </div>

        <div className={s['link-icon-wrapper']}>
          <Icon icon="chevron-right" color="var(--color-highlight)" size={16} />
        </div>

        <Link href="/saloons/[name]" as={`/saloons/${slugify(saloon.name)}`}>
          <a className={s.link} />
        </Link>
      </div>
    </div>
  );
};

export default SaloonListItem;
