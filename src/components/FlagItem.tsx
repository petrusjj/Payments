import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import Chevron from '../assets/chevron.svg';
import {Country, Currency} from '../constants/types';

type Props = {
  country: Country;
  onPress?: () => void;
  style?: ViewStyle;
  title?: string;
  selector?: boolean;
};

const ConditionalButton = ({
  children,
  onPress,
  style,
  selector,
}: {
  children: ReactNode;
  onPress: () => void;
  style?: ViewStyle;
  selector?: boolean;
}) => {
  if (selector)
    return (
      <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
        {children}
      </TouchableOpacity>
    );
  return <View style={[styles.button, style]}>{children}</View>;
};

const FlagItem = ({country, style, onPress, title, selector}: Props) => {
  if (!country) return null;
  return (
    <ConditionalButton
      style={style}
      selector={selector}
      onPress={() => (onPress ? onPress() : null)}>
      <View style={styles.inner}>
        {title && <Text style={styles.title}>{title}</Text>}
        <View style={styles.row}>
          <View style={styles.flag}>{country.flag()}</View>
          <Text style={styles.name}>{Currency[country.currency]}</Text>
          <View style={styles.selectorContainer}>
            {selector && <Chevron width={10} height={10} />}
          </View>
        </View>
      </View>
    </ConditionalButton>
  );
};

export default FlagItem;

const styles = StyleSheet.create({
  button: {
    alignItems: 'stretch',
    flexDirection: 'row',
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 10,
    color: 'white',
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  flag: {
    flex: 1,
  },
  name: {
    flex: 1,
    paddingLeft: 8,
    alignItems: 'stretch',
    color: 'white',
  },
  selectorContainer: {
    flexBasis: 20,
    alignItems: 'center',
  },
});
