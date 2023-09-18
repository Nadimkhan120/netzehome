import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { AvatarGroup } from '@/components/avatar-group';
import { avatarGroup } from '@/constants/avatar-group';
import { PressableScale, Text, View } from '@/ui';

const OverviewJob = () => {
  return (
    <PressableScale>
      <View paddingHorizontal={'large'} paddingVertical={'large'}>
        <View
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text>Jr. Front-End Designer</Text>
          <View
            width={scale(30)}
            height={scale(30)}
            backgroundColor={'primary'}
            alignItems={'center'}
            borderRadius={30}
            justifyContent={'center'}
          >
            <Image source={icons.pencil} style={style.image} />
          </View>
        </View>

        <View flexDirection={'row'} paddingTop={'tiny'} alignItems={'center'}>
          <Text variant={'medium12'} color={'grey200'}>
            Brandzmate.
          </Text>
          <Text variant={'regular12'} marginLeft={'tiny'} color={'grey200'}>
            Lahore,punjab pakistan
          </Text>
          <Text variant={'regular12'} marginLeft={'tiny'} color={'grey200'}>
            {`(remote)`}
          </Text>
        </View>

        <View paddingTop={'small'}>
          <PressableScale>
            <Text variant={'regular13'} color={'primary'}>
              2 Applicants
            </Text>
          </PressableScale>
        </View>

        <View paddingTop={'small'}>
          <AvatarGroup data={avatarGroup} />
        </View>
      </View>
    </PressableScale>
  );
};

const style = StyleSheet.create({
  container: {},
  image: {
    width: scale(20),
    height: scale(20),
  },
});
export default OverviewJob;
