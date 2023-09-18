import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { Tag } from '@/components/tag';
import { PressableScale, Text, View } from '@/ui';

import { Avatar } from '../avatar';

export const PersonItem = ({
  title,
  avatar,
  tags,
  appliedFor,
  appliedOn,
}: any) => {
  return (
    <View flexDirection={'row'} marginBottom={'large'}>
      <View>
        <Avatar source={icons[avatar]} />
      </View>
      <View flex={1} paddingHorizontal={'medium'}>
        <Text variant={'semiBold14'} color={'black'}>
          {title}
        </Text>
        <View flexDirection={'row'} marginTop={'tiny'} alignItems={'center'}>
          <Text variant={'regular13'} color={'grey300'}>
            Applied For:{' '}
          </Text>
          <Text variant={'regular13'} color={'grey100'}>
            {appliedFor}
          </Text>
        </View>

        <View flexDirection={'row'} marginTop={'tiny'} alignItems={'center'}>
          <Text variant={'regular13'} color={'grey300'}>
            Applied on:{' '}
          </Text>
          <Text variant={'regular13'} color={'grey100'}>
            {appliedOn}
          </Text>
        </View>
        <View
          flexDirection={'row'}
          gap={'medium'}
          alignItems={'center'}
          paddingTop={'small'}
        >
          {tags.map((item, index) => {
            return <Tag key={index} name={item} icon="cv" />;
          })}
        </View>
      </View>

      <PressableScale>
        <Image
          source={icons['more-horizontal']}
          contentFit="contain"
          style={styles.image}
        />
      </PressableScale>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: scale(24),
    width: scale(24),
  },
});
