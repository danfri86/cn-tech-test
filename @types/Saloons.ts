import { Filter } from './Filter';

export type SaloonsContext = {
  saloons: Saloon[];
  saloonDetail: Saloon | null;
  filters: Filter;
  filtersOpen: boolean;
};

export type Saloon = {
  id: number;
  name: string;
  priceSek: number;
  durationMin: number;
  score: number;
  reviewCount: number;
  adress: Adress;
  openingHours: OpeningHours;
  website: string;
  phone: string;
  presentation: string;
};

export const Weekdays = {
  mon: 'mån',
  tue: 'tis',
  wed: 'ons',
  thu: 'tor',
  fri: 'fre',
  sat: 'lör',
  sun: 'sön',
} as const;

interface OpeningHours {
  (key: keyof typeof Weekdays): string | null;
}

interface Adress {
  street: string;
  zip: string;
  city: string;
}
