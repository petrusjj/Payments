import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/colors';
import {Currency, Rate, TransferMode} from '../constants/types';

type Props = {
  selectedRate: Rate | null;
  mode: TransferMode;
};

// @TODO: calculate fees based on briefing
const ConversionLabel = (props: Props) => {
  const {selectedRate, mode} = props || {};

  return (
    <View style={styles.container}>
      {selectedRate && (
        <View style={styles.row}>
          {mode === TransferMode.INTERNATIONAL && (
            <View style={styles.dots}>
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          )}
          <View style={styles.fee}>
            <View style={styles.amount}>
              <Text>{`1 ${Currency[selectedRate?.base]} = ${
                Currency[selectedRate?.counter] + ' ' + selectedRate?.rate
              }`}</Text>
            </View>
            <View style={styles.expand}>
              {/* <TouchableOpacity>
                <Text>Fees</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ConversionLabel;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dots: {},
  dot: {
    marginRight: 8,
    marginVertical: 2,
    borderRadius: 50,
    width: 5,
    height: 5,
    backgroundColor: colors.gray,
  },
  fee: {
    borderRadius: 8,
    height: 40,
    backgroundColor: colors.light,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 12,
  },
  amount: {
    flex: 1,
  },
  expand: {
    paddingRight: 20,
  },
});
