import React from 'react';
import AE from '../assets/flags/ae.svg';
import BH from '../assets/flags/bh.svg';
import EU from '../assets/flags/eu.svg';
import PH from '../assets/flags/ph.svg';
import PK from '../assets/flags/pk.svg';

import {Currency} from './types';

const AED = {
  name: 'United Arab Emirates',
  short: 'AE',
  currency: Currency.AED,
  flag: () => <AE width={30} height={20} />,
};

const PHP = {
  name: 'Philippines',
  short: 'PH',
  currency: Currency.PHP,
  flag: () => <PH width={30} height={20} />,
};

const EUR = {
  name: 'Europe',
  short: 'EU',
  currency: Currency.EUR,
  flag: () => <EU width={30} height={20} />,
};

const PKR = {
  name: 'Pakistan',
  short: 'PK',
  currency: Currency.PKR,
  flag: () => <PK width={30} height={20} />,
};

const BHR = {
  name: 'Bahrain',
  short: 'BH',
  currency: Currency.BHR,
  flag: () => <BH width={30} height={20} />,
};

const countries = {
  AED,
  PHP,
  EUR,
  PKR,
  BHR,
};

export const countryList = [AED, PHP, EUR, PKR, BHR];

export default countries;
