import React from 'react';
import {} from 'react-native';
import { scale } from 'react-native-size-matters';

import { AvatarGroup } from '@/components/avatar-group';
import { avatarGroup } from '@/constants/avatar-group';
import { Text, View } from '@/ui';

export const HomeSliderItem = () => {
  return (
    <View
      marginRight={'medium'}
      borderRadius={scale(8)}
      padding={'large'}
      backgroundColor={'white'}
      height={scale(119)}
      width={scale(256)}
    >
      <Text variant={'medium17'}>Jr. Front-End Designer</Text>
      <Text variant={'regular13'} color={'primary'} paddingTop={'small'}>
        25 new applicants
      </Text>

      <View paddingTop={'small'}>
        <AvatarGroup data={avatarGroup} />
      </View>
    </View>
  );
};
