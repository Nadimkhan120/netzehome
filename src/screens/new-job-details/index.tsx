import React, { useCallback, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';
import { TabBar } from 'react-native-tab-view';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import type { Route } from '@showtime-xyz/tab-view';
import { TabScrollView, TabView } from '@showtime-xyz/tab-view';
import ActivityIndicator from '@/components/activity-indicator';
import { ScreenHeader } from '@/components/screen-header';
import { useCandidateDetail } from '@/services/api/candidate';
import type { Theme } from '@/theme';
import OverView from './overview';
import Company from './company';
import Details from './details';
import Stats from './stats';
import { Image } from 'expo-image';
import { icons } from '@/assets/icons';
import { Text, View, Screen } from '@/ui';
import Header from './header';
import { useJobDetail } from '@/services/api/vacancies';

const OverViewTab = ({ route, data }: any) => {
  return (
    <>
      <TabScrollView index={route?.index}>
        <OverView data={data} />
      </TabScrollView>
    </>
  );
};

const CompanyTab = ({ route, data }: any) => {
  return (
    <TabScrollView index={route?.index}>
      <Company companyData={data} />
    </TabScrollView>
  );
};

const DetailsTab = ({ route, data }: any) => {
  return (
    <TabScrollView index={route?.index}>
      <Details data={data} />
    </TabScrollView>
  );
};

const StatsTab = ({ route, data }: any) => {
  return (
    <TabScrollView index={route?.index}>
      <Stats data={data} />
    </TabScrollView>
  );
};

const renderLabel = ({ focused, route }: { focused: boolean; route: { title: string } }) => {
  return (
    <Text color={focused ? 'primary' : 'black'} variant="medium14" numberOfLines={1}>
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

export function NewJobDetails() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { colors } = useTheme<Theme>();
  const { width } = useWindowDimensions();

  const route = useRoute();

  const [routes] = useState<Route[]>([
    { key: 'Overview', title: 'Overview', index: 0 },
    { key: 'Company', title: 'Company', index: 1 },
    { key: 'Details', title: 'Details', index: 2 },
    { key: 'Stats', title: 'Stats', index: 3 },
  ]);

  const [index, setIndex] = useState(0);
  const animationHeaderPosition = useSharedValue(0);
  const animationHeaderHeight = useSharedValue(0);

  const { data: jobDetailsData, isLoading } = useJobDetail({
    variables: {
      // @ts-ignore
      id: route?.params?.id,
    },
  });

  console.log('jobDetailsData', JSON.stringify(jobDetailsData, null, 2));

  const renderScene = useCallback(
    ({ route }: any) => {
      switch (route.key) {
        case 'Overview':
          return <OverViewTab route={route} index={0} data={jobDetailsData?.response?.data?.long_description} />;
        case 'Company':
          return <CompanyTab route={route} index={1} data={jobDetailsData?.response?.data?.company_id} />;
        case 'Details':
          return <DetailsTab route={route} index={2} data={jobDetailsData?.response?.data} />;
        case 'Stats':
          return <StatsTab route={route} index={2} data={jobDetailsData?.response?.data} />;

        default:
          return null;
      }
    },
    [jobDetailsData]
  );

  const onStartRefresh = async () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 300);
  };

  const renderHeader = () => {
    return (
      <View>
        <Header data={jobDetailsData?.response?.data} />
        <View height={scale(10)} backgroundColor={'grey500'} />
      </View>
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader showBorder={true} icon="close" />
      {isLoading ? (
        <View flex={1} height={scale(300)} justifyContent={'center'} alignItems={'center'}>
          <ActivityIndicator size={'large'} />
        </View>
      ) : (
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
      )}
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
