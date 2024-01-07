import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {colors} from '../../constants/colors';
import Text from './Text';

interface ButtonProps extends TouchableOpacityProps {
  variant: 'primary';
  label: string;
  onPress: () => void;
  textStyle?: TextStyle;
  disabled?: boolean;
  style?: ViewStyle;
  loading?: boolean;
}

const Button = (props: ButtonProps) => {
  const {style = {}, label = '', onPress, disabled, loading} = props || {};

  const primaryButtonStyling = {
    ...styles.primaryButton,
    backgroundColor: disabled ? colors.gray : colors.blue,
    ...style,
  };

  return (
    <TouchableOpacity {...props} onPress={onPress} style={primaryButtonStyling}>
      {loading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={styles.primaryButtonText}>{label || ''}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: colors.blue,
    borderRadius: 12,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: colors.white,
  },
});
