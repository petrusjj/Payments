import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {countryList} from '../constants/countries';
import {Country, Currency, Rate} from '../constants/types';
import CountryItem from './CountryItem';
import View from './core/View';

type IBottomSheetHandle = Partial<BottomSheetMethods>;

type IBottomSheetProps = {
  chooseCurrency: (currency: Currency) => void;
  selectedRate: Rate | null;
};

type IBottomSheet = ForwardRefRenderFunction<
  IBottomSheetHandle,
  IBottomSheetProps
>;

const BottomSheet: IBottomSheet = (properties, ref) => {
  const {chooseCurrency, selectedRate} = properties;
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        present() {
          bottomSheetModalRef?.current?.present();
        },
        close() {
          bottomSheetModalRef?.current?.close();
        },
      };
    },
    [],
  );

  const snapPoints = useMemo(() => ['40%'], []);

  const hideBottomSheet = useCallback(() => {
    bottomSheetModalRef?.current?.close();
  }, []);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes &
        React.JSX.IntrinsicClassAttributes<TouchableWithoutFeedback> &
        Readonly<TouchableWithoutFeedbackProps>,
    ) => {
      return (
        <TouchableWithoutFeedback {...props} onPress={hideBottomSheet}>
          <View style={styles.background}>{props?.children}</View>
        </TouchableWithoutFeedback>
      );
    },
    [hideBottomSheet],
  );

  const renderCountries = useCallback(() => {
    return countryList?.map((c: Country, index: number) => {
      if (c?.currency === Currency.AED || c?.currency === selectedRate?.counter)
        return null;

      return (
        <CountryItem
          country={c}
          key={`flag-${index}`}
          onPress={() => chooseCurrency(c.currency)}
        />
      );
    });
  }, [chooseCurrency, selectedRate]);

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}>
      <View style={styles.contentContainer}>{renderCountries()}</View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(72, 72, 72, 0.8)',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 48,
  },
});

export default forwardRef(BottomSheet);
