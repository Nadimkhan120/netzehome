/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@shopify/restyle';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScreenHeader } from '@/components/screen-header';
import { Theme } from '@/theme';
import { Screen, View } from '@/ui';

import Item from './item';

const numColumns = 2;

const data = [
  { name: 'Subprocesses', id: 1 },
  { name: 'Subcontractors', id: 2 },
  { name: '3rd party Inspections', id: 3 },
  { name: 'City inspections', id: 4 },
  { name: 'Internal Inspections', id: 5 },
  { name: 'Drawing', id: 6 },
  { name: 'Materials', id: 7 },
  { name: 'Equipment', id: 8 },
];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const Processes = () => {
  const { colors } = useTheme<Theme>();

  const renderItem = useCallback(({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return <Item item={item} index={index} />;
  }, []);

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title="Processes" />
      <View flex={1}>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 44,
            paddingTop: 16,
          }}
          data={formatData(data, numColumns)}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index?.toString()}
        />
      </View>
    </Screen>
  );
};

export default Processes;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
});
