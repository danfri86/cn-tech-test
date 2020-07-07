import React, { useEffect, useState } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { Saloon } from '../../@types/Saloons';
import { PageHeader, Icon, Filters, SaloonListItem } from '@components';
import { useSaloonDispatch, useSaloonState } from '@context/saloonsContext';

type Props = {
  saloons: Saloon[];
};

const Saloons: NextPage<Props> = ({ saloons }) => {
  const saloonDispatch = useSaloonDispatch();
  const { filters, filtersOpen } = useSaloonState();
  const filtersStr = JSON.stringify(filters);
  const [filteredSaloons, setFilteredSaloons] = useState([...saloons]);

  useEffect(() => {
    saloonDispatch({ type: 'setSaloons', saloons });
  }, []);

  // Listen to changes on filters
  useEffect(() => {
    // filter saloons by filters
    const newSaloons = saloons.filter((saloon) => {
      if (filters.priceMin && saloon.priceSek < filters.priceMin) {
        return false;
      }
      if (filters.priceMax && saloon.priceSek > filters.priceMax) {
        return false;
      }

      return true;
    });

    setFilteredSaloons(newSaloons);
  }, [filtersStr]);

  const onToggleFilters = () => {
    saloonDispatch({ type: 'toggleFiltersOpen', status: !filtersOpen });
  };

  return (
    <div>
      <PageHeader
        title="Hår"
        leftSlot={
          <button className="icon-btn">
            <Icon
              icon="chevron-left"
              size={20}
              color="var(--color-highlight)"
            />
          </button>
        }
        rightSlot={
          <button className="icon-btn" onClick={onToggleFilters}>
            <Icon icon="sliders-v" size={20} color="var(--color-highlight)" />
          </button>
        }
      />

      <Filters
        saloons={saloons}
        filteredSaloons={filteredSaloons}
        filters={filters}
      />

      <div>
        {filteredSaloons.map((saloon) => (
          <SaloonListItem key={saloon.id} saloon={saloon} />
        ))}
      </div>
    </div>
  );
};

export default Saloons;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const saloons = await import('../../data.json');

  return {
    props: {
      saloons: saloons.default,
    },
  };
};
