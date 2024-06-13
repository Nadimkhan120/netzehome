/* eslint-disable react-native/no-inline-styles */
import { useTheme } from '@shopify/restyle';
import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import ActivityIndicator from '@/components/activity-indicator';
import { AppDrawer } from '@/components/app-drawer';
import { ScreenHeader2 } from '@/components/screen-header/header2';
import { useCommunities } from '@/services/api/auth/login';
import { type Theme, theme } from '@/theme';
import { Screen, View } from '@/ui';

import Item from './item';

const Dashboard = () => {
  const { colors } = useTheme<Theme>();

  const { data, isLoading } = useCommunities();

  const renderItem = useCallback(({ item }) => {
    return <Item item={item} />;
  }, []);

  const itemSeparatorComponent = useCallback(() => {
    return <View height={10} />;
  }, []);

  console.log('data', JSON.stringify(data, null, 2));

  return (
    <AppDrawer>
      <Screen backgroundColor={colors.white}>
        <ScreenHeader2 title="Dashboard" />
        <View flex={1}>
          {isLoading ? (
            <View flex={1} alignItems={'center'} justifyContent={'center'}>
              <ActivityIndicator size={'large'} color={theme.colors.primary} />
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{
                paddingHorizontal: 16,
                paddingTop: 16,
              }}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index?.toString()}
              ItemSeparatorComponent={itemSeparatorComponent}
            />
          )}
        </View>
      </Screen>
    </AppDrawer>
  );
};

export default Dashboard;
