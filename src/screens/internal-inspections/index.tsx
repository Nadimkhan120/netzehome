/* eslint-disable react-native/no-inline-styles */
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useCallback } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ActivityIndicator from '@/components/activity-indicator';
import { ScreenHeader } from '@/components/screen-header';
import { useWorksWithWorkId } from '@/services/api/auth/login';
import { palette, type Theme } from '@/theme';
import { Screen, View } from '@/ui';

import Item from './item';

const InternalInspections = () => {
  const { colors } = useTheme<Theme>();

  const route = useRoute<any>();

  const { data, isLoading } = useWorksWithWorkId({
    variables: {
      workId: route?.params?.id,
    },
  });

  const renderItem = useCallback(
    ({ item }) => {
      return <Item item={item} workId={route?.params?.id} />;
    },
    [route?.params?.id]
  );

  const itemSeparatorComponent = useCallback(() => {
    return <View height={16} />;
  }, []);

  const renderLoading = () => {
    return (
      <View flex={1} alignItems={'center'} justifyContent={'center'}>
        <ActivityIndicator size={'large'} color={palette.primary} />
      </View>
    );
  };

  console.log('data', JSON.stringify(data, null, 2));

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title="Inspections" />
      <View flex={1}>
        {isLoading ? (
          renderLoading()
        ) : (
          <FlatList
            contentContainerStyle={styles.container}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index?.toString()}
            ItemSeparatorComponent={itemSeparatorComponent}
          />
        )}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    // backgroundColor: '#F5F5F7',
    marginHorizontal: 16,
    marginVertical: 24,
    borderRadius: 16,
  },
});

export default InternalInspections;
