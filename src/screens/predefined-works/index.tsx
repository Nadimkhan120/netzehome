/* eslint-disable react-native/no-inline-styles */

import { useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { icons } from '@/assets/icons';
import ActivityIndicator from '@/components/activity-indicator';
import { ScreenHeader } from '@/components/screen-header';
import { useProjectWithHouseId, useWorksWithProjectId } from '@/services/api/auth/login';
import { palette, type Theme } from '@/theme';
import { Screen, Text, View } from '@/ui';

import Item from './item';

// eslint-disable-next-line max-lines-per-function
const PredefinedWorks = () => {
  const { colors } = useTheme<Theme>();

  const { params } = useRoute<any>();

  const { isLoading, data, error } = useProjectWithHouseId({
    variables: {
      // @ts-ignore
      houseId: params?.id,
    },
  });

  const { isLoading: loading2, data: works } = useWorksWithProjectId({
    enabled: data && data[0] && data[0]?.ProjectID ? true : false,
    variables: {
      projectId: data && data[0] && data[0]?.ProjectID,
    },
  });

  const renderItem = useCallback(({ item, index }) => {
    return <Item item={item} index={index} />;
  }, []);

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

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title={params?.name} />
      <View flex={1}>
        {(isLoading || loading2) &&
        // @ts-ignore
        !error?.response?.data?.message ? (
          renderLoading()
        ) : (
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 44,
            }}
            // @ts-ignore
            data={error?.response?.data?.message ? [] : works}
            renderItem={renderItem}
            keyExtractor={(item, index) => index?.toString()}
            ItemSeparatorComponent={itemSeparatorComponent}
            ListEmptyComponent={
              <View height={300} alignItems={'center'} justifyContent={'center'}>
                <Text variant={'medium14'}> No Project Found</Text>
              </View>
            }
          />
        )}
      </View>
      <Image
        source={icons['bg-image']}
        style={{ height: 175, width: '100%', position: 'absolute', bottom: 0, zIndex: 0 }}
        contentFit="contain"
      />
    </Screen>
  );
};

export default PredefinedWorks;
