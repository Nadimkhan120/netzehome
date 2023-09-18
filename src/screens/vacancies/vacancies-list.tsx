import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { PressableScale, Text, View } from '@/ui';

type VecanciesListProps = {
  data: {
    title: string;
    company: string;
    address: string;
    work: string;
    applicant: string;
    status: string;
    postedTime: string;
    expiryDate: string;
    color: string;
  };
  onOptionPress: () => void;
};

const VecanciesList = ({ data, onOptionPress }: VecanciesListProps) => {
  const navigation = useNavigation();

  const goToJobDetail = () => {
    navigation.navigate('jobDetail');
  };

  return (
    <PressableScale onPress={goToJobDetail}>
      <View
        backgroundColor={'white'}
        paddingHorizontal={'large'}
        borderBottomColor={'grey500'}
        borderBottomWidth={1}
        paddingVertical={'large'}
      >
        <View
          flexDirection={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text variant={'medium14'} color={'black'}>
            {data?.title}
          </Text>
          <PressableScale onPress={() => onOptionPress?.()}>
            <Image
              source={icons['more-horizontal']}
              style={{ height: scale(24), width: scale(24) }}
            />
          </PressableScale>
        </View>
        <View flexDirection={'row'} paddingTop={'tiny'} alignItems={'center'}>
          <Text variant={'medium12'} color={'grey200'}>
            {data?.company}.
          </Text>
          <Text variant={'regular12'} marginLeft={'tiny'} color={'grey200'}>
            {data?.address}
          </Text>
          <Text variant={'regular12'} marginLeft={'tiny'} color={'grey200'}>
            {data?.work}
          </Text>
        </View>

        <View paddingTop={'small'}>
          <Text variant={'medium12'} color={'grey200'}>
            2 Applicants
          </Text>
        </View>

        <View flexDirection={'row'} paddingTop={'small'} alignItems={'center'}>
          <Text variant={'semiBold12'} color={'primary'}>
            {data?.status}.{' '}
          </Text>
          <Text variant={'regular12'} marginLeft={'tiny'} color={'grey200'}>
            Posted on <Text>{data?.postedTime}</Text>{' '}
          </Text>
          <Text variant={'regular12'} marginLeft={'tiny'} color={'grey200'}>
            Expire on <Text>{data?.expiryDate}</Text>
          </Text>
        </View>
      </View>
    </PressableScale>
  );
};

export default VecanciesList;
