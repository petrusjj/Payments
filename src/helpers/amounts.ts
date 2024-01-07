export const convertToSubunits = (number: number, zerosCount: number) => {
  let multiplier = Math.pow(10, zerosCount);
  return number * multiplier;
};

export const convertToAmount = (number: number, zerosCount: number) => {
  let divisor = Math.pow(10, zerosCount);
  return number / divisor;
};

export const roundToSubunits = (value: number, subunits: number) => {
  return value.toFixed(subunits);
};

export const isValidTransferNumber = (value: any) => {
  const invalid = typeof value !== 'number' || value < 0 || isNaN(value);
  return !invalid;
};
