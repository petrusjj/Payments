import {ReactNode} from 'react';

export enum Currency {
  AED,
  PHP,
  EUR,
  PKR,
  BHR,
}

export enum TransferMode {
  INTERNATIONAL,
  LOCAL,
}

export type Country = {
  name: string;
  short: string;
  currency: Currency;
  flag: () => ReactNode;
};

export type Rate = {
  base: Currency;
  baseMinimum: number;
  baseSubunits: number;
  counter: Currency;
  counterMinimum: number;
  counterSubunits: number;
  rate: number;
};
