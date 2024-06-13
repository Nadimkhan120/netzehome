/* eslint-disable react-native/no-inline-styles */
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useCallback, useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { useHouses } from '@/services/api/auth/login';
import type { Theme } from '@/theme';
import { Screen, Text, View } from '@/ui';

import { Header } from './header';
import Item from './item';

const numColumns = 2;

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
  const { params } = useRoute();
  const { data: houses } = useHouses();

  const renderItem = useCallback(({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }

    return <Item item={item} index={index} />;
  }, []);

  // @ts-ignore
  const communityId = params?.id;

  const filteredHouses = useMemo(() => {
    let newHouses =
      houses?.filter((element) => element?.CommunityID === communityId) ?? [];

    return newHouses;
  }, [communityId, houses]);

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <Header title="Houses" />
      <View flex={1}>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 44,
          }}
          data={formatData(filteredHouses, numColumns)}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={(item, index) => index?.toString()}
          ListEmptyComponent={
            <View height={300} alignItems={'center'} justifyContent={'center'}>
              <Text variant={'medium17'}> No Houses Found</Text>
            </View>
          }
          ListHeaderComponent={
            filteredHouses?.length ? (
              <View paddingBottom={'medium'} flexDirection={'row'}>
                <Text variant={'medium17'}>Found</Text>
                <Text variant={'semiBold17'} marginLeft={'small'}>
                  {filteredHouses?.length}
                </Text>
              </View>
            ) : null
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
