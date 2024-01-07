import {
  convertToAmount,
  convertToSubunits,
  isValidTransferNumber,
  roundToSubunits,
} from '../src/helpers/amounts';

describe('test the subunit functions', () => {
  test('test converting to subunits (convertToSubunits)', () => {
    const raw = 5;
    const subunits = 2;
    const calculation = convertToSubunits(raw, subunits);
    const expected = 500;
    expect(calculation).toEqual(expected);
  });

  test('converting to an amount (convertToAmount)', () => {
    const raw = 500;
    const subunits = 2;
    const calculation = convertToAmount(raw, subunits);
    const expected = 5;
    expect(calculation).toEqual(expected);
  });

  test('rounding to the subunits (roundToSubunits)', () => {
    const raw = 500.88943902;
    const subunits = 2;
    const calculation = roundToSubunits(raw, subunits);
    const expected = '500.89';
    expect(calculation).toEqual(expected);
  });
});

describe('test checking for valid transfer number', () => {
  test('if text input -1 is valid transfer number (isValidTransferNumber)', () => {
    const raw = -1;
    const calculation = isValidTransferNumber(raw);
    const expected = false;
    expect(calculation).toEqual(expected);
  });

  test('if text input - is valid transfer number (isValidTransferNumber)', () => {
    const raw = '-';
    const calculation = isValidTransferNumber(raw);
    const expected = false;
    expect(calculation).toEqual(expected);
  });

  test('test if text input 0.0001 is valid transfer number (isValidTransferNumber)', () => {
    const raw = 0.01;
    const calculation = isValidTransferNumber(raw);
    const expected = true;
    expect(calculation).toEqual(expected);
  });

  test('test if text input 10.99999999999 is valid transfer number (isValidTransferNumber)', () => {
    const raw = 10.99999999999;
    const calculation = isValidTransferNumber(raw);
    const expected = true;
    expect(calculation).toEqual(expected);
  });
});
