import React, {useCallback} from 'react';
import {StyleSheet, TextInput, ViewStyle} from 'react-native';
import countries, {countryList} from '../constants/countries';
import {colors} from '../constants/colors';
import {Country, Currency, Rate} from '../constants/types';
import {default as Flag, default as FlagItem} from './FlagItem';
import View from './core/View';

type IAmount = {
  selectedRate: Rate | null;
  selectedCurrency: Currency | undefined;
  value: string;
  setValue: ({currency, value}: {currency: Currency; value: string}) => void;
  openBottomSheet: () => void;
  style?: ViewStyle;
};

const Amount = (props: IAmount) => {
  const {
    selectedRate,
    selectedCurrency = Currency.PHP,
    value,
    setValue,
    openBottomSheet,
  } = props;

  const {counter, baseSubunits, counterSubunits} = selectedRate || {};

  const isConversion = counter === selectedCurrency;

  const subunits = isConversion ? counterSubunits : baseSubunits;

  const onFocus = useCallback(() => {
    setValue({currency: selectedCurrency, value: '0'}); // update with 0 value first so button will be disabled
    setValue({currency: selectedCurrency, value: ''}); // clear selected input
  }, [selectedCurrency, setValue]);

  const onBlur = useCallback(() => {
    const amount = parseFloat(value);

    const updated = String(amount.toFixed(subunits));

    setValue({currency: selectedCurrency, value: updated});
  }, [selectedCurrency, setValue, subunits, value]);

  const onChangeText = useCallback(
    (text: string) => {
      setValue({currency: selectedCurrency, value: text});
    },
    [setValue, selectedCurrency],
  );

  const renderCountry = useCallback(() => {
    if (!isConversion) {
      const c = countries.AED;
      if (!c) return null;
      return <Flag country={c} title="You send exactly" />;
    }
    const find = countryList?.find(
      (c: Country) => c.currency === selectedRate?.counter,
    );
    if (!find) return null;
    return (
      <FlagItem
        country={find}
        onPress={() => openBottomSheet()}
        title="Recipient gets"
        selector={true}
      />
    );
  }, [isConversion, openBottomSheet, selectedRate?.counter]);

  return (
    <View style={styles.container}>
      <View style={styles.currency}>{selectedRate && renderCountry()}</View>
      <TextInput
        {...props}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        inputMode="decimal"
        returnKeyType="done"
        style={[props.style, styles.amount]}
      />
    </View>
  );
};

export default Amount;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  currency: {
    flexBasis: 115,
    height: 70,
    borderRadius: 12,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  amount: {
    height: 70,
    flex: 1,
    textAlign: 'right',
    paddingRight: 24,
    fontSize: 22,
    fontWeight: '500',
  },
});
