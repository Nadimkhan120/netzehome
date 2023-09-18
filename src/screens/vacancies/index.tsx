import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useTheme } from '@shopify/restyle';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import { BottomModal } from '@/components/bottom-modal';
import SelectionBox from '@/components/drop-down';
import { ScrollMenu } from '@/components/scroll-menu';
import { SearchWithFilter } from '@/components/search-with-filter';
import { SelectModalItem } from '@/components/select-modal-item';
import { VacanciesData } from '@/constants/vacancies-data';
import type { Theme } from '@/theme';
import { Button, Screen, Text, View } from '@/ui';

import Header from './header';
import VecanciesList from './vacancies-list';

const data = ['All', 'Drafts', 'Closed', 'Published', 'Expiring'];

const data2 = [
  {
    icon: 'eye',
    title: 'View Details',
  },
  {
    icon: 'pencl',
    title: 'Edit Job',
  },
  {
    icon: 'delete',
    title: 'Delete Job',
  },
  {
    icon: 'person',
    title: 'Applicants',
  },
];

export const Vacancies = () => {
  const { colors } = useTheme<Theme>();
  const { bottom } = useSafeAreaInsets();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const bottomSheetOptionsModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['85%'], []);
  const snapPoints2 = useMemo(() => ['35%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // callbacks
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  // callbacks
  const handlePresentOptionsModalPress = useCallback(() => {
    bottomSheetOptionsModalRef.current?.present();
  }, []);

  // callbacks
  const handleDismissOptionsModalPress = useCallback(() => {
    bottomSheetOptionsModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('index', index);
  }, []);

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

  const renderItem = useCallback(({ item }: any) => {
    return (
      <SelectModalItem
        title={item?.title}
        icon={item?.icon}
        onPress={(data) => {
          console.log('data', data);
          handleDismissOptionsModalPress();
        }}
      />
    );
  }, []);

  const renderVacancyItem = ({ item }: any) => (
    <VecanciesList data={item} onOptionPress={handlePresentOptionsModalPress} />
  );

  return (
    <Screen edges={['top']} backgroundColor={colors.white}>
      <Header />

      <SearchWithFilter onFilter={handlePresentModalPress} />

      <ScrollMenu
        selectedIndex={selectedIndex}
        data={data}
        onChangeMenu={(index) => {
          setSelectedIndex(index);
        }}
      />

      <View height={scale(10)} backgroundColor={'grey500'} />

      <View flex={1} backgroundColor={'grey500'}>
        <FlatList
          data={VacanciesData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderVacancyItem}
        />
      </View>

      <BottomModal
        ref={bottomSheetOptionsModalRef}
        index={0}
        snapPoints={snapPoints2}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          data={data2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </BottomModal>

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

          <SelectionBox label="Vacancy Tye" placeholder="Select vacancy type" />
          <SelectionBox label="Categories" placeholder="Select categories" />
          <SelectionBox
            label="Applied on last job"
            placeholder="Select last job"
          />
          <SelectionBox label="Job status" placeholder="Select status" />
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
