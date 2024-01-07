import React, {ReactNode} from 'react';
import {View as RNView, StyleSheet, ViewStyle} from 'react-native';

type Props = {
  children?: ReactNode;
  style?: ViewStyle;
};

const View = (props: Props) => {
  const {children} = props;
  return (
    <RNView {...props} style={[styles.view, props?.style]}>
      {children}
    </RNView>
  );
};

export default View;

const styles = StyleSheet.create({
  view: {},
});
