import { useTheme } from '@shopify/restyle';
import type { Route } from '@showtime-xyz/tab-view';
import { TabScrollView, TabView } from '@showtime-xyz/tab-view';
import React, { useCallback, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';
import { TabBar } from 'react-native-tab-view';

import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { Screen, Text, View } from '@/ui';

import Education from './education';
import Experience from './experience';
import Header from './header';
import History from './history';
import OverView from './overview';

const OverViewTab = ({ route }: any) => {
  return (
    <TabScrollView index={route?.index}>
      <OverView />
    </TabScrollView>
  );
};

const EducationTab = ({ route }: any) => {
  return (
    <TabScrollView index={route?.index}>
      <Education />
    </TabScrollView>
  );
};

const ExperienceTab = ({ route }: any) => {
  return (
    <TabScrollView index={route?.index}>
      <Experience />
    </TabScrollView>
  );
};

const HistoryTab = ({ route }: any) => {
  return (
    <TabScrollView index={route?.index}>
      <History />
    </TabScrollView>
  );
};

const renderLabel = ({
  focused,
  route,
}: {
  focused: boolean;
  route: { title: string };
}) => {
  return (
    <Text
      color={focused ? 'primary' : 'black'}
      variant="medium14"
      numberOfLines={1}
    >
      {route.title}
    </Text>
  );
};

const renderTabBar = (props: any) => {
  return (
    <View>
      <TabBar
        {...props}
        style={styles.tabBar}
        inactiveColor={'black'}
        indicatorStyle={[styles.indicatorStyle]}
        scrollEnabled={true}
        renderLabel={renderLabel}
        tabStyle={{ width: 120 }}
      />
      <View height={scale(4)} backgroundColor={'grey500'} />
    </View>
  );
};

export function Job() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { colors } = useTheme<Theme>();
  const { width } = useWindowDimensions();

  const [routes] = useState<Route[]>([
    { key: 'Overview', title: 'Overview', index: 0 },
    { key: 'Experience', title: 'Experience', index: 1 },
    { key: 'Education & Skills', title: 'Education & Skills', index: 2 },
    { key: 'History', title: 'History', index: 3 },
  ]);

  const [index, setIndex] = useState(0);
  const animationHeaderPosition = useSharedValue(0);
  const animationHeaderHeight = useSharedValue(0);

  const renderScene = useCallback(({ route }: any) => {
    switch (route.key) {
      case 'Overview':
        return <OverViewTab route={route} index={0} />;
      case 'Experience':
        return <ExperienceTab route={route} index={1} />;
      case 'Education & Skills':
        return <EducationTab route={route} index={2} />;
      case 'History':
        return <HistoryTab route={route} index={2} />;

      default:
        return null;
    }
  }, []);

  const onStartRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      console.log('onStartRefresh');
      setIsRefreshing(false);
    }, 300);
  };

  const renderHeader = () => {
    return (
      <View>
        <Header />
        <View height={scale(10)} backgroundColor={'grey500'} />
      </View>
    );
  };

  return (
    <Screen edges={['top']} backgroundColor={colors.white}>
      <ScreenHeader showBorder={true} icon="close" />
      <TabView
        onStartRefresh={onStartRefresh}
        isRefreshing={isRefreshing}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        lazy
        renderScrollHeader={renderHeader}
        minHeaderHeight={0}
        animationHeaderPosition={animationHeaderPosition}
        animationHeaderHeight={animationHeaderHeight}
        enableGestureRunOnJS={false}
        scrollEnabled={true}
        style={{ width: width }}
        renderTabBar={renderTabBar}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    height: scale(40),
  },
  indicatorStyle: {
    height: scale(3),
    backgroundColor: '#01C96C',
  },
});
