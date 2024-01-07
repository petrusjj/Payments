import {BottomSheetModal} from '@gorhom/bottom-sheet';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import Charge from '../assets/charge.svg';
import Amount from '../components/Amount';
import BottomSheet from '../components/BottomSheet';
import ConversionLabel from '../components/ConversionLabel';
import Button from '../components/core/Button';
import Text from '../components/core/Text';
import View from '../components/core/View';
import rates from '../constants/rates';
import {colors} from '../constants/colors';
import {Currency, TransferMode} from '../constants/types';
import {
  convertToAmount,
  convertToSubunits,
  isValidTransferNumber,
  roundToSubunits,
} from '../helpers/amounts';
import useRates from '../hooks/useRates';
import useTransfer from '../hooks/useTransfer';

type ITransfer = {
  mode: TransferMode;
};

const Transfer = (props: ITransfer) => {
  const {mode} = props;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const {getActiveRate, selectedRate, setSelectedRate} = useRates();
  const {initiateTransfer, transfering} = useTransfer();

  const [baseAmount, setBaseAmount] = useState<string>('');
  const [counterAmount, setCounterAmount] = useState<string>('');

  const {baseMinimum, baseSubunits, counter, counterSubunits, rate} =
    selectedRate || {};

  useEffect(() => {
    if (selectedRate && baseMinimum && baseSubunits) {
      const minimum = convertToAmount(baseMinimum, baseSubunits);
      const formatted = roundToSubunits(minimum, baseSubunits);
      setBaseAmount(formatted);
      if (rate && mode === TransferMode.INTERNATIONAL && counterSubunits) {
        const value = roundToSubunits(minimum * rate, counterSubunits);
        setCounterAmount(value);
      }
    } else {
      getActiveRate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRate]);

  const amountChange = useCallback(
    ({currency, value}: {currency: Currency; value: string}) => {
      const isConversion = currency === counter;
      const amount = isConversion ? counterAmount : baseAmount;
      if (value === amount) return;
      const number = parseFloat(value);
      const valid = isValidTransferNumber(number);
      const setFocusedInput = isConversion ? setCounterAmount : setBaseAmount;
      if (!valid) return setFocusedInput('');
      setFocusedInput(value);
      if (!rate || mode !== TransferMode.INTERNATIONAL) return;
      const setOtherInput = isConversion ? setBaseAmount : setCounterAmount;
      const subunits = (
        isConversion ? baseSubunits : counterSubunits
      ) as number;
      const updated = isConversion ? number / rate : number * rate;
      const formatted = roundToSubunits(updated, subunits);
      setOtherInput(formatted);
    },
    [
      counter,
      counterAmount,
      baseAmount,
      rate,
      mode,
      counterSubunits,
      baseSubunits,
    ],
  );

  const openBottomSheet = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef?.current?.present();
  }, [bottomSheetModalRef]);

  const chooseCurrency = useCallback(
    (c: Currency) => {
      if (c === Currency.AED) return;
      const obj = rates[Currency.AED];
      const update = obj[c];
      if (!update) return;
      setSelectedRate(update);
      bottomSheetModalRef?.current?.close();
    },
    [setSelectedRate],
  );

  const buttonPress = useCallback(() => {
    initiateTransfer(baseAmount, counterAmount);
  }, [baseAmount, counterAmount, initiateTransfer]);

  const buttonDisabled = useMemo(() => {
    if (!baseAmount || !baseMinimum || !baseSubunits || transfering)
      return true;
    return (
      baseMinimum > convertToSubunits(parseFloat(baseAmount), baseSubunits)
    );
  }, [baseAmount, baseMinimum, baseSubunits, transfering]);

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.wrapper}
        keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <SafeAreaView style={styles.inner}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                  <View style={styles.spacer} />
                  <View style={styles.centered}>
                    <Amount
                      selectedRate={selectedRate}
                      selectedCurrency={selectedRate?.base}
                      value={baseAmount}
                      setValue={amountChange}
                      openBottomSheet={openBottomSheet}
                    />
                    {mode === TransferMode.INTERNATIONAL && (
                      <>
                        <ConversionLabel
                          selectedRate={selectedRate}
                          mode={mode}
                        />
                        <Amount
                          selectedRate={selectedRate}
                          selectedCurrency={selectedRate?.counter}
                          value={counterAmount}
                          setValue={amountChange}
                          openBottomSheet={openBottomSheet}
                        />
                      </>
                    )}
                  </View>
                  <View style={styles.disclaimer}>
                    <View style={styles.disclaimerTitleContainer}>
                      <Charge width={10} height={15} />
                      <Text style={styles.disclaimerTitle}>
                        Processing time - 1 Hour
                      </Text>
                    </View>
                    <Text style={styles.disclaimerDescription}>
                      *Normal working hours & public holidays apply
                    </Text>
                  </View>
                  <Button
                    onPress={buttonPress}
                    disabled={buttonDisabled}
                    variant="primary"
                    label="Start transfer"
                    style={styles.button}
                    loading={transfering}
                  />
                </>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
      <BottomSheet
        selectedRate={selectedRate}
        chooseCurrency={chooseCurrency}
        ref={bottomSheetModalRef}
      />
    </>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  button: {
    marginBottom: 20,
  },
  inner: {
    flex: 1,
    marginHorizontal: 12,
    alignItems: 'stretch',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
  },
  disclaimer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  disclaimerTitleContainer: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '500',
    paddingBottom: 8,
    paddingLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disclaimerDescription: {
    color: colors.dark,
    fontSize: 12,
  },
});
