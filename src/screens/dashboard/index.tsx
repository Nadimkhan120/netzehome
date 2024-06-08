import React, { useCallback } from 'react';

import { View, Screen } from '@/ui';
import { ScreenHeader2 } from '@/components/screen-header/header2';
import type { Theme } from '@/theme';
import { useTheme } from '@shopify/restyle';
import { AppDrawer } from '@/components/app-drawer';
import { FlatList } from 'react-native';
import Item from './item';

const Dashboard = () => {
  const { colors } = useTheme<Theme>();

  const renderItem = useCallback(({ item }) => {
    return <Item item={item} />;
  }, []);

  const itemSeparatorComponent = useCallback(() => {
    return <View height={10}></View>;
  }, []);

  return (
    <AppDrawer>
      <Screen backgroundColor={colors.white}>
        <ScreenHeader2 title="Dashboard" />
        <View flex={1}>
          <FlatList
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
            }}
            data={[0, 1, 2, 3, 4]}
            renderItem={renderItem}
            keyExtractor={(item, index) => index?.toString()}
            ItemSeparatorComponent={itemSeparatorComponent}
          />
        </View>
      </Screen>
    </AppDrawer>
  );
};

export default Dashboard;
