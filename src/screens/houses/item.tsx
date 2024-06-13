/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';

type ItemProps = {
  item: any;
  index: any;
};

const Item = ({ item }: ItemProps) => {
  const { navigate } = useNavigation();

  const navigateToHouses = useCallback(() => {
    navigate('PredefinedWorks', {
      id: item?.HouseID,
      name: `${item?.HouseNumber} ${item?.StreetAddress}`,
    });
  }, [item, navigate]);

  const isEven = Math.random() < 0.5;

  return (
    <Pressable style={{ flex: 1, margin: 5 }} onPress={navigateToHouses}>
      <View
        backgroundColor={isEven ? 'cardLight' : 'cardGreyLight'}
        borderColor={isEven ? 'card' : 'cardGrey'}
        borderRadius={10}
        borderWidth={1}
        paddingHorizontal={'medium'}
        paddingVertical={'medium'}
      >
        <View>
          <Image
            source={icons['home-buyer']}
            style={{ height: 160, borderRadius: 10 }}
            contentFit="cover"
          />

          <Text variant={'medium16'} paddingVertical={'medium'} color={'black'}>
            {item?.HouseNumber} {item?.StreetAddress}
          </Text>

          <View flexDirection={'row'} alignItems={'center'}>
            <View flexDirection={'row'} alignItems={'center'}>
              <Image source={icons.star} style={{ height: 9, width: 9 }} />
              <Text marginLeft={'xSmall'} variant={'medium12'} color={'black'}>
                4,9
              </Text>
            </View>
            <View
              marginLeft={'small'}
              flex={1}
              flexDirection={'row'}
              alignItems={'center'}
            >
              <Image
                source={icons.pin}
                contentFit="contain"
                style={{ height: 9, width: 9 }}
              />
              <Text
                flexShrink={1}
                marginLeft={'xSmall'}
                variant={'regular10'}
                color={'black'}
              >
                {item?.City}, {item?.State}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Item;
