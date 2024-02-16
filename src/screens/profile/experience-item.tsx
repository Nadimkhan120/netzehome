import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { PressableScale, Text, View } from '@/ui';

type ExperienceItemProps = {
  data?: any;
  onStartPress?: (data: any) => void;
};

export const ExperienceItem = ({ data, onStartPress }: ExperienceItemProps) => {
  const navigation = useNavigation();

  console.log('ExperienceItem', JSON.stringify(data, null, 2));

  return (
    <PressableScale
      onPress={() => {
        navigation?.navigate('NewJobDetails', { id: data?.id });
      }}
    >
      <View flexDirection={'row'} marginBottom={'large'} paddingHorizontal={'large'}>
        <View>
          <Image
            source={{
              uri: data?.images?.pic
                ? data?.images?.pic
                : 'https://fakeimg.pl/400x400/cccccc/cccccc',
            }}
            placeholder={'https://fakeimg.pl/400x400/cccccc/cccccc'}
            transition={1000}
            style={{
              height: scale(72),
              width: scale(72),
              borderRadius: 8,
            }}
          />
        </View>
        <View flex={1} paddingHorizontal={'medium'}>
          <Text textTransform={'capitalize'} variant={'medium16'} color={'black'}>
            {data?.job_title}
          </Text>
          <View paddingTop={'xSmall'} flexDirection={'row'} alignItems={'center'}>
            <Text textTransform={'capitalize'} variant={'medium12'} color={'grey100'}>
              {data?.location}
            </Text>
          </View>
          <View paddingTop={'xSmall'} flexDirection={'row'} alignItems={'center'}>
            <Text textTransform={'capitalize'} variant={'medium12'} color={'grey100'}>
              {data?.from_date}- {data?.is_current === '1' ? 'Present' : data?.to_date}
            </Text>
          </View>
          {/* <View>
            <Text
              paddingTop={'xSmall'}
              textTransform={'capitalize'}
              variant={'medium12'}
              color={'grey100'}
            >
              {data?.company_description}
            </Text>
          </View> */}
        </View>
      </View>
    </PressableScale>
  );
};

const styles = StyleSheet.create({
  image: {
    height: scale(24),
    width: scale(24),
  },
});
