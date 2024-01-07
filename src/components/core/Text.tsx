import React, {ReactNode} from 'react';
import {Text as RNText, StyleSheet, TextStyle} from 'react-native';

type Props = {
  children?: ReactNode;
  style?: TextStyle;
};

const Text = (props: Props) => {
  const {children} = props;
  return (
    <RNText {...props} style={[styles.text, props?.style]}>
      {children}
    </RNText>
  );
};

export default Text;

const styles = StyleSheet.create({
  text: {},
});
