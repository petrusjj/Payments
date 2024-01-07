import {useCallback, useState} from 'react';
import rates from '../constants/rates';
import {Currency, Rate} from '../constants/types';
import sleep from '../helpers/sleep';

type IUseRates = {
  getActiveRate: () => void;
  selectedRate: Rate | null;
  setSelectedRate: (rate: Rate) => void;
};

const useRates = (): IUseRates => {
  const [selectedRate, setSelectedRate] = useState<Rate | null>(null);

  const getActiveRate = useCallback(async () => {
    await sleep(500);
    const rate = rates[Currency.AED][Currency.PHP];
    setSelectedRate(rate);
  }, []);

  return {getActiveRate, selectedRate, setSelectedRate};
};

export default useRates;
