import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import React from 'react';
import {StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {TransferMode} from './constants/types';
import Transfer from './screens/Transfer';

// @TODO: add navigation infra
const App = () => {
  // Default to transfer page with international transfer mode
  // Transfer screen is re-usuable for local transfers by switching transfer mode to local (TransferMode.LOCAL)
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Transfer mode={TransferMode.INTERNATIONAL} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
