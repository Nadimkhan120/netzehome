import React, { useCallback } from 'react';
import { View, Screen, Text } from '@/ui';
import { Header } from './header';
import type { Theme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { FlatList, StyleSheet, Dimensions } from 'react-native';
import Item from './item';

const numColumns = 2;

const data = [
  { key: 'Item 1' },
  { key: 'Item 2' },
  { key: 'Item 3' },
  { key: 'Item 4' },
  { key: 'Item 5' },
  { key: 'Item 6' },
  { key: 'Item 6' },
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

const Houses = () => {
  const { colors } = useTheme<Theme>();

  const renderItem = useCallback(({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return <Item item={item} index={index} />;
  }, []);

  const itemSeparatorComponent = useCallback(() => {
    return <View height={10}></View>;
  }, []);

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <Header title="Houses" />
      <View flex={1}>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
          }}
          data={formatData(data, numColumns)}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index?.toString()}
          ListHeaderComponent={
            <View paddingBottom={'medium'} flexDirection={'row'}>
              <Text variant={'medium17'}>Found</Text>
              <Text variant={'semiBold17'} marginLeft={'small'}>
                128
              </Text>
            </View>
          }
        />
      </View>
    </Screen>
  );
};

export default Houses;

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
