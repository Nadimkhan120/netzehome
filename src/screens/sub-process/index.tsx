/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { Button, Screen, View } from '@/ui';

import Item from './item';

const data = [
  { name: 'Super Substruction', id: 4 },
  { name: 'Mechanical, electrical & plumbing', id: 5 },
  { name: 'Exterior Finishes', id: 1 },
  { name: 'Interior Finishes', id: 2 },
  { name: 'External Developments', id: 3 },
];

const PredefinedWorks = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const renderItem = useCallback(({ item }) => {
    return <Item item={item} />;
  }, []);

  const itemSeparatorComponent = useCallback(() => {
    return <View height={16} />;
  }, []);

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title="Processes" />
      <View flex={1}>
        <FlatList
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 20,
            backgroundColor: '#F5F5F7',
            marginHorizontal: 16,
            marginVertical: 24,
            borderRadius: 16,
          }}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index?.toString()}
          ItemSeparatorComponent={itemSeparatorComponent}
        />

        <View paddingHorizontal={'4xl'} paddingVertical={'large'}>
          <Button
            label="Done"
            onPress={() => {
              navigate('UploadImages', { id: 2 });
            }}
          />
        </View>
      </View>
    </Screen>
  );
};

export default PredefinedWorks;
