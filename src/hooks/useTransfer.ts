import {useCallback, useState} from 'react';
import {Keyboard} from 'react-native';
import sleep from '../helpers/sleep';

type IUseTransfer = {
  initiateTransfer: (baseAmount: string, counterAmount: string) => void;
  transfering: boolean;
};

const useTransfer = (): IUseTransfer => {
  const [transfering, setTransfering] = useState<boolean>(false);

  const initiateTransfer = useCallback(
    async (baseAmount: string, counterAmount: string) => {
      setTransfering(true);
      Keyboard.dismiss();
      console.log('initiate transfer', baseAmount, counterAmount);
      await sleep(1000);
      setTransfering(false);
    },
    [],
  );

  return {initiateTransfer, transfering};
};

export default useTransfer;
