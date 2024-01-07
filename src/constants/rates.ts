import {Currency} from './types';

export default {
  [Currency.AED]: {
    [Currency.PHP]: {
      base: Currency.AED,
      baseSubunits: 2,
      baseMinimum: 100,
      counter: Currency.PHP,
      counterSubunits: 2,
      counterMinimum: 3022,
      rate: 15.11,
    },
    [Currency.EUR]: {
      base: Currency.AED,
      baseSubunits: 2,
      baseMinimum: 400,
      counter: Currency.EUR,
      counterSubunits: 2,
      counterMinimum: 100,
      rate: 0.25,
    },
    [Currency.PKR]: {
      base: Currency.AED,
      baseSubunits: 2,
      baseMinimum: 100,
      counter: Currency.PKR,
      counterSubunits: 2,
      counterMinimum: 7664,
      rate: 76.64,
    },
    [Currency.BHR]: {
      base: Currency.AED,
      baseSubunits: 2,
      baseMinimum: 100,
      counter: Currency.BHR,
      counterSubunits: 3,
      counterMinimum: 10,
      rate: 0.1,
    },
  },
};
