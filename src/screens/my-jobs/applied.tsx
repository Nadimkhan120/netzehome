import React, { useCallback } from 'react';
import { FlashList } from '@shopify/flash-list';
import { View, Text } from '@/ui';
import { StyleSheet } from 'react-native';
import JobItem from './job-item';
import { useNavigation } from '@react-navigation/native';
import { useAppliedJobs } from '@/services/api/home';
import { useUser } from '@/store/user';
import ActivityIndicator from '@/components/activity-indicator';
import { scale } from 'react-native-size-matters';

const Applied = () => {
  const { navigate } = useNavigation();

  const user = useUser((state) => state?.user);
  const profile = useUser((state) => state?.profile);

  const { data, isLoading } = useAppliedJobs({
    variables: {
      person_id: user?.id,
      unique_id: profile?.unique_id,
    },
  });

  const renderItem = useCallback(
    ({ item }) => {
      return (
        <JobItem
          data={item}
          onPress={() => navigate('MyJobDetail', { data: item })}
          onOptionPress={function (): void {}}
        />
      );
    },
    [user]
  );

  if (isLoading) {
    return (
      <View flex={1} justifyContent={'center'} alignItems={'center'}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  // console.log('applied jobs', JSON.stringify(data?.response?.data, null, 2));

  return (
    <View flex={1} backgroundColor={'grey500'}>
      <FlashList
        data={data?.response?.data}
        estimatedItemSize={100}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListEmptyComponent={
          <View height={scale(300)} justifyContent={'center'} alignItems={'center'}>
            <Text>No Job Found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 100,
    paddingHorizontal: 12,
  },
});

export default Applied;
