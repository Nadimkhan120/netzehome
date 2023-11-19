import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import { icons } from '@/assets/icons';
import { PressableScale, Text, View } from '@/ui';

type PersonItemProps = {
  data?: any;
  onStartPress?: (data: any) => void;
};

export const PersonItem = ({ data, onStartPress }: PersonItemProps) => {
  const navigation = useNavigation();

  return (
    <PressableScale
      onPress={() => {
        navigation?.navigate('NewJobDetails', { id: data?.id });
      }}
    >
      <View flexDirection={'row'} marginBottom={'large'} paddingHorizontal={'large'}>
        <View>
          <Image
            source={{ uri: 'https://fakeimg.pl/400x400/cccccc/cccccc' }}
            placeholder={{ uri: 'https://fakeimg.pl/400x400/cccccc/cccccc' }}
            transition={1000}
            style={{
              height: scale(72),
              width: scale(72),
              borderRadius: 8,
            }}
          />
        </View>
        <View flex={1} paddingHorizontal={'medium'}>
          <Text variant={'medium16'} color={'black'}>
            {data?.job_titles}
          </Text>
          <View flexDirection={'row'} alignItems={'center'}>
            <Text variant={'medium12'} color={'grey100'}>
              {data?.company_name},
            </Text>
            <Text variant={'regular12'} color={'grey300'}>
              in {data?.country_name}
            </Text>
          </View>

          {/* <View
            flexDirection={'row'}
            gap={'medium'}
            alignItems={'center'}
            paddingTop={'small'}
            flexWrap={'wrap'}
          >
            {data?.skillls[0] && data?.skillls[0]?.skill?.includes('[')
              ? null
              : data?.skillls?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      backgroundColor={'grey500'}
                      borderRadius={scale(4)}
                      height={scale(31)}
                      paddingHorizontal={'medium'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      flexDirection={'row'}
                    >
                      <Text variant={'regular13'} color={'grey100'}>
                        {item?.skill}
                      </Text>
                    </View>
                  );
                })}
          </View> */}
        </View>

        <PressableScale onPress={() => onStartPress?.(data)}>
          <Image
            source={data?.isSaved === 0 ? icons['star'] : icons['star-fill']}
            contentFit="contain"
            style={styles.image}
          />
        </PressableScale>
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
