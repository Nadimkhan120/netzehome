import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { Pressable } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';

import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';

type ItemProps = {
  item: any;
};

const Item = ({ item }: ItemProps) => {
  const { navigate } = useNavigation();

  const navigateToHouses = useCallback(() => {
    navigate('Houses', { id: item?.CommunityID });
  }, [item, navigate]);

  return (
    <Pressable onPress={navigateToHouses}>
      <View
        backgroundColor={'cardLight'}
        borderColor={'card'}
        borderRadius={10}
        borderWidth={1}
        paddingHorizontal={'medium'}
        paddingVertical={'large'}
        flexDirection={'row'}
        alignItems={'center'}
      >
        <View flex={1} gap={'tiny'}>
          <Text variant={'medium16'} color={'black'}>
            {item?.CommunityName}
          </Text>
          <Text variant={'medium16'} fontSize={32} color={'black'}>
            0
          </Text>
          <View flexDirection={'row'} alignItems={'center'}>
            <Image
              source={icons.star}
              style={{ height: 19.52, width: 19.52, marginRight: 5 }}
            />
            <Text variant={'medium12'} color={'black'}>
              4,9 (510 Reviews)
            </Text>
          </View>
        </View>

        <View paddingHorizontal={'medium'}>
          <CircularProgress
            radius={44}
            duration={2000}
            maxValue={100}
            titleColor={'black'}
            value={0}
            inActiveStrokeColor={'#2ecc71'}
            inActiveStrokeOpacity={0.2}
            progressValueColor={'black'}
            valueSuffix={'%'}
          />
        </View>

        <View>
          <Text variant={'medium16'} fontSize={32} color={'black'}>
            100
          </Text>
          <Text variant={'medium14'} color={'grey300'}>
            Task
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Item;
