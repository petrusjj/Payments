import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../constants/colors';
import {Country} from '../constants/types';

type Props = {
  country: Country;
  onPress: () => void;
  style?: ViewStyle;
};

const CountryItem = (props: Props) => {
  const {country, style, onPress} = props;
  if (!country) return null;
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.flag}>{country.flag()}</View>
        <Text style={styles.name}>{country.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CountryItem;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: colors.light,
    marginVertical: 12,
    borderRadius: 12,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flag: {},
  name: {
    paddingLeft: 8,
    alignItems: 'stretch',
  },
  selectorContainer: {
    flexBasis: 20,
    alignItems: 'center',
  },
});
