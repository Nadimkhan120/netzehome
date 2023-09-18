import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetFooter, BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@shopify/restyle';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import { BottomModal } from '@/components/bottom-modal';
import SelectionBox from '@/components/drop-down';
import { ScreenHeader } from '@/components/screen-header';
import { ScrollMenu } from '@/components/scroll-menu';
import { SearchField } from '@/components/search-field';
import { data } from '@/constants/applicant-list';
import type { Theme } from '@/theme';
import { Button, Screen, Text, View } from '@/ui';

import { UserItem } from './user-item';

const menu = ['All', 'Recent', 'Step1', 'Step2', 'Hired'];

export const Users = () => {
  const { colors } = useTheme<Theme>();

  const { bottom } = useSafeAreaInsets();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['85%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  console.log('handlePresentModalPress', handlePresentModalPress);

  // callbacks
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('index', index);
  }, []);

  const renderItem = ({ item }: any) => (
    <UserItem
      onPress={() => null}
      showStatus={true}
      data={item}
      onOptionPress={() => null}
    />
  );

  // renders
  const renderFooter = useCallback(
    (props) => (
      <BottomSheetFooter {...props} bottomInset={bottom}>
        <View
          paddingVertical={'large'}
          borderTopWidth={1}
          borderTopColor={'grey400'}
        >
          <Button
            marginHorizontal={'large'}
            label="Show Results"
            onPress={handleDismissModalPress}
          />
        </View>
      </BottomSheetFooter>
    ),
    []
  );

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader />

      <View
        backgroundColor={'grey500'}
        paddingVertical={'large'}
        flexDirection={'row'}
        alignItems={'center'}
        paddingHorizontal={'large'}
        columnGap={'medium'}
      >
        <SearchField placeholder="Search by name" showBorder={true} />
      </View>

      <ScrollMenu
        selectedIndex={selectedIndex}
        data={menu}
        onChangeMenu={(index) => {
          setSelectedIndex(index);
        }}
      />

      <View height={scale(10)} backgroundColor={'grey500'} />
      <View flex={1} backgroundColor={'grey500'}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>

      <BottomModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: 'rgb(250,250,253)' }}
        footerComponent={renderFooter}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View alignSelf={'center'} paddingVertical={'large'}>
            <Text variant={'medium17'} color={'black'}>
              Set Filters
            </Text>
          </View>

          <SelectionBox label="Industry" placeholder="Select industry" />
          <SelectionBox label="Categories" placeholder="Select categories" />
          <SelectionBox
            label="Applied on last job"
            placeholder="Select last job"
          />
          <SelectionBox label="Last job status" placeholder="Select status" />
        </BottomSheetView>
      </BottomModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});
