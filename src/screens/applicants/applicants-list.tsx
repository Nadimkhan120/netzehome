import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { Avatar } from '@/components/avatar';
import { PressableScale, Text, View } from '@/ui';

type ApplicantListProps = {
  data: {
    title: string;
    detail: string;
    address: string;
    status: string;
    time: string;
    color: string;
  };
  showStatus?: boolean;
  onPress: () => void;
  onOptionPress: () => void;
};

const ApplicantList = ({
  data,
  showStatus,
  onPress,
  onOptionPress,
}: ApplicantListProps) => {
  return (
    <PressableScale onPress={onPress}>
      <View
        flexDirection={'row'}
        paddingHorizontal={'large'}
        borderBottomColor={'grey400'}
        borderBottomWidth={StyleSheet.hairlineWidth}
        backgroundColor={'white'}
        paddingVertical={'medium'}
      >
        <View>
          <Avatar source={icons.avatar} />
        </View>

        <View flex={1} paddingLeft={'medium'}>
          <View
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Text variant={'semiBold14'} color={'black'}>
              {data?.title}
            </Text>
            <PressableScale onPress={() => onOptionPress?.()}>
              <Image
                source={icons['more-horizontal']}
                style={style.dot}
                contentFit="contain"
              />
            </PressableScale>
          </View>

          <Text variant={'regular13'} marginVertical={'tiny'} color={'grey100'}>
            {data?.detail}
          </Text>
          <Text variant={'regular12'} marginVertical={'tiny'} color={'black'}>
            {data?.address}
          </Text>

          {showStatus ? (
            <View flexDirection={'row'} marginVertical={'tiny'}>
              <View>
                <Text variant={'semiBold12'} style={{ color: data?.color }}>
                  {data?.status}.{' '}
                </Text>
              </View>
              <View>
                <Text variant={'regular12'} color={'grey200'}>
                  {data?.time}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </PressableScale>
  );
};

const style = StyleSheet.create({
  dot: {
    width: scale(24),
    height: scale(24),
  },
});
export default ApplicantList;
