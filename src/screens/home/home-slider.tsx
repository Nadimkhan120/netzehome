import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { PressableScale, Text, View } from '@/ui';

import { HomeSliderItem } from './slider-item';

export const HomeSliderContainer = ({}) => {
  return (
    <View backgroundColor={'secondary'} paddingTop={'large'}>
      <View
        flexDirection={'row'}
        paddingHorizontal={'xLarge'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Text variant={'medium16'} color={'black'}>
          Recent Jobs
        </Text>
        <PressableScale>
          <Text
            color={'primary'}
            variant={'regular13'}
            textDecorationLine={'underline'}
          >
            See All
          </Text>
        </PressableScale>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {[0, 1, 2, 3, 4, 5].map((element, index) => {
          return <HomeSliderItem key={index} />;
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingTop: scale(8),
    paddingBottom: scale(16),
  },
});
