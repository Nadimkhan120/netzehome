import React from 'react';
import { View, Text, PressableScale } from '@/ui';
import { scale } from 'react-native-size-matters';
import { Image } from 'expo-image';
import { icons } from '@/assets/icons';
import { useNavigation } from '@react-navigation/native';
import { Pressable } from 'react-native';

type CompanyItemProps = {
  data: any;
  onFollow: (data: any) => void;
  onSavePress?: (data: any) => void;
  onMessage?: (data: any) => void;
};

const CompanyItem = ({ data, onFollow, onSavePress, onMessage }: CompanyItemProps) => {
  const { navigate } = useNavigation();

  return (
    <Pressable style={{ flex: 1 }} onPress={() => navigate('NewCompanyDetails', { id: data?.id })}>
      <View
        backgroundColor={'white'}
        borderRadius={scale(12)}
        flex={1}
        margin={'small'}
        padding={'medium'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <View position={'absolute'} top={scale(8)} right={scale(8)}>
          <PressableScale onPress={() => onSavePress?.(data)}>
            <Image
              source={data?.is_saved === 0 ? icons['star-grey'] : icons['star-fill']}
              style={{ height: scale(16), width: scale(16) }}
              contentFit="contain"
            />
          </PressableScale>
        </View>
        <PressableScale>
          <Image
            source={icons['company']}
            style={{
              height: scale(48),
              width: scale(48),
              borderRadius: scale(8),
              marginTop: scale(16),
            }}
            contentFit="contain"
          />
        </PressableScale>
        <Text variant={'semiBold14'} color={'black'} marginTop={'small'}>
          {data?.name}
        </Text>
        <Text
          variant={'regular12'}
          textTransform={'capitalize'}
          color={'grey300'}
          marginTop={'tiny'}
          textAlign={'center'}
        >
          {data?.city_name}, {data?.country_name}
        </Text>

        <View marginTop={'small'}>
          <PressableScale onPress={() => (data?.is_followed === 0 ? onFollow?.(data) : onMessage?.(data))}>
            <View
              borderRadius={scale(44)}
              height={scale(32)}
              width={scale(73)}
              justifyContent={'center'}
              alignItems={'center'}
              borderWidth={1}
              borderColor={'primary'}
              backgroundColor={data?.is_followed === 0 ? 'white' : 'primary'}
            >
              <Text variant={'medium13'} color={data?.is_followed === 0 ? 'primary' : 'white'}>
                {data?.is_followed === 0 ? 'Follow' : 'Message'}
              </Text>
            </View>
          </PressableScale>
        </View>
      </View>
    </Pressable>
  );
};

export default CompanyItem;
