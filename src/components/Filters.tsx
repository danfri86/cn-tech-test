import React, { useState, useEffect, useMemo } from 'react';
import Icon from './Icon';
import { Range } from 'rc-slider';

import s from './Filters.module.css';
import { useSaloonState, useSaloonDispatch } from '@context/saloonsContext';
import { Filter } from '../../@types/Filter';
import { Saloon } from '../../@types/Saloons';

type Props = {
  saloons: Saloon[];
  filteredSaloons: Saloon[];
  filters: Filter;
};

const Filters = ({ saloons, filteredSaloons, filters, ...props }: Props) => {
  const saloonDispatch = useSaloonDispatch();
  const { filtersOpen } = useSaloonState();
  const saloonsStr = JSON.stringify(saloons);
  const maxPriceRange = useMemo(() => {
    return !saloons.length
      ? 0
      : Math.max(...saloons.map((saloon) => saloon.priceSek + 100), 0);
  }, [saloonsStr]);
  const [priceRange, setPriceRange] = useState([0, maxPriceRange]);

  useEffect(() => {
    // Saloons are not immediately available. Update default priceRange when the are
    setPriceRange([0, maxPriceRange]);
  }, [saloonsStr]);

  const onToggleOpen = () => {
    saloonDispatch({ type: 'toggleFiltersOpen', status: !filtersOpen });
  };

  const onRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const onAfterRangeChange = () => {
    saloonDispatch({
      type: 'setFilters',
      filters: {
        ...filters,
        priceMin: priceRange[0],
        priceMax: priceRange[1],
      },
    });
  };

  const onRangeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const min = name === 'min' ? parseInt(value) : priceRange[0];
    const max = name === 'max' ? parseInt(value) : priceRange[1];

    setPriceRange([min, max]);
    saloonDispatch({
      type: 'setFilters',
      filters: {
        ...filters,
        priceMin: min,
        priceMax: max,
      },
    });
  };

  if (!Object.keys(filters).length && !filtersOpen) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      {Object.keys(filters).length > 0 && (
        <div className={s['active-filters-wrapper']}>
          <div className={s['active-filters-content']}>
            {filters.priceMin !== undefined &&
              filters.priceMax !== undefined &&
              `Pris ${filters.priceMin} – ${filters.priceMax} kr`}
          </div>

          <button className="icon-btn" onClick={onToggleOpen}>
            <Icon
              icon={filtersOpen ? 'chevron-up' : 'chevron-down'}
              color="var(--color-highlight)"
              size={16}
            />
          </button>
        </div>
      )}

      {filtersOpen && (
        <div className={s['options-wrapper']}>
          <div>Pris-intervall</div>

          <div className={s['price-inputs-wrapper']}>
            <input
              className={s['price-input']}
              type="number"
              name="min"
              step={10}
              value={priceRange[0]}
              onChange={onRangeInputChange}
            />
            <input
              className={s['price-input']}
              type="number"
              name="max"
              step={10}
              value={priceRange[1]}
              onChange={onRangeInputChange}
            />
          </div>

          <Range
            min={0}
            max={maxPriceRange}
            defaultValue={priceRange}
            value={priceRange}
            step={10}
            onChange={onRangeChange}
            onAfterChange={onAfterRangeChange}
            railStyle={{
              backgroundColor: 'var(--color-gray-200)',
            }}
            trackStyle={[
              {
                backgroundColor: 'var(--color-highlight)',
              },
            ]}
            handleStyle={[
              {
                borderColor: 'var(--color-highlight)',
              },
              {
                borderColor: 'var(--color-highlight)',
              },
            ]}
          />

          <button type="button" className={s.cta} onClick={onToggleOpen}>
            Visa produkter ({filteredSaloons.length} st)
          </button>
        </div>
      )}
    </div>
  );
};

export default Filters;
