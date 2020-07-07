import React, { useState, useEffect } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Saloon, Weekdays } from '../../@types/Saloons';
import { slugify } from '@utils';
import { PageHeader, Icon, PageHero, Rating, Tabs } from '@components';
import Link from 'next/link';
import s from './[name].module.css';
import { useSaloonDispatch } from '@context/saloonsContext';

type Props = {
  saloon: Saloon;
};

type Tab = 'Info' | 'Schema';

const SaloonPage: NextPage<Props> = ({ saloon }) => {
  const saloonDispatch = useSaloonDispatch();
  const tabs: Tab[] = ['Info', 'Schema'];
  const [activeTab, setActiveTab] = useState<Tab>('Info');
  const [displayOpeningHours, setDisplayOpeningHours] = useState(false);

  const onToggleTab = (tab: Tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    saloonDispatch({ type: 'setSaloonDetail', saloon });
  }, []);

  if (!saloon) return null;

  // Sunday is 0, set sunday to 7
  const dayOfWeekReal = new Date().getDay();
  const currentDayOfWeek = dayOfWeekReal === 0 ? 7 : dayOfWeekReal;

  // Get current day closing time
  const closingTimesArr = Object.entries(saloon.openingHours);
  let closingTime: string | null = null;

  if (closingTimesArr[currentDayOfWeek]) {
    const currentDayOpeningHoursArr = closingTimesArr[
      currentDayOfWeek
    ][1].split('-');
    closingTime = currentDayOpeningHoursArr[1];
  }

  return (
    <div>
      <PageHeader
        className={s['page-header']}
        title=""
        leftSlot={
          <Link href="/saloons" passHref>
            <a>
              <Icon icon="chevron-left" color="var(--color-white)" />
            </a>
          </Link>
        }
        rightSlot={<Icon icon="heart" color="var(--color-white" />}
      />

      <PageHero>
        <h1 className={s.title}>{saloon.name}</h1>

        <Rating
          rating={saloon.score}
          numberOfVotes={saloon.reviewCount}
          className={s.rating}
        />
      </PageHero>

      <Tabs<Tab> tabs={tabs} activeTab={activeTab} onTabChange={onToggleTab} />

      <div className={s.content}>
        {activeTab === 'Info' ? (
          <div className={s.list}>
            <div className={s['list-item']}>
              <Icon
                color="var(--color-gray-500)"
                icon="map-marker-alt"
                size={16}
                className={s['item-icon']}
              />
              {saloon.adress.street}, {saloon.adress.zip} {saloon.adress.city}
            </div>

            <div className={s['list-item']}>
              <Icon
                color="var(--color-gray-500)"
                icon="clock"
                size={16}
                className={s['item-icon']}
              />
              {closingTime ? (
                <p>Öppet till {closingTime} idag</p>
              ) : (
                <p>Stäng idag</p>
              )}

              <button
                className={`icon-btn ${s['opening-hours-toggle-btn']}`}
                onClick={() => setDisplayOpeningHours(!displayOpeningHours)}
              >
                <Icon
                  icon={displayOpeningHours ? 'chevron-up' : 'chevron-down'}
                  size={16}
                  color="var(--color-highlight)"
                />
              </button>

              {displayOpeningHours && (
                <div className={s['opening-hours']}>
                  {Object.entries(saloon.openingHours).map(([day, time]) => {
                    return (
                      <p key={day} className={s['opening-hour']}>
                        <span>{Weekdays[day as keyof typeof Weekdays]}: </span>
                        {time || 'Stängt'}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>

            <div className={s['list-item']}>
              <Icon
                color="var(--color-gray-500)"
                icon="phone-alt"
                size={16}
                className={s['item-icon']}
              />
              <p>{saloon.phone}</p>
            </div>

            <div className={s['list-item']}>
              <Icon
                color="var(--color-gray-500)"
                icon="globe"
                size={16}
                className={s['item-icon']}
              />
              <p>{saloon.website}</p>
            </div>

            <div className={s['list-item']}>{saloon.presentation}</div>
          </div>
        ) : (
          <div>Schema</div>
        )}
      </div>
    </div>
  );
};

export default SaloonPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const saloons = await import('../../data.json');
  const paths = saloons.default.map(
    (saloon) => `/saloons/${slugify(saloon.name)}`
  );

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const saloons = await import('../../data.json');
  const saloon = saloons.default.find(
    (s) => slugify(s.name) === params?.name || ''
  );

  return {
    props: {
      saloon: saloon || null,
    },
  };
};
