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

const COLORS = [
  '#EFF7FF',
  '#E2FFF6',
  '#F0FFCE',
  '#FEF2D7',
  '#F8E9FF',
  '#EAFCD7',
  '#FFEFEF',
  '#F2E1D5',
];

const BORDERS_COLORS = [
  '#9DC0F0',
  '#47D5BF',
  '#C3DF86',
  '#DB9B30',
  '#D271FF',
  '#47D5BF',
  '#FF8989',
  '#DB9B30',
];

const ICON_COLORS = [
  '#B3D0F8',
  '#47D5BF',
  '#C3DF86',
  '#FEBC4E',
  '#EDC6FF',
  '#AACB70',
  '#FFBBBB',
  '#EEC6AA',
];

const Item = ({ item, index }: ItemProps) => {
  const { navigate } = useNavigation();

  const navigateToHouses = useCallback(() => {
    // navigate('SubProcesses', { id: });

    if (item?.id) {
      navigate('SubProcesses', { id: 1 });
    }
  }, [navigate, item]);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <Pressable style={{ flex: 1, margin: 10 }} onPress={navigateToHouses}>
      <View
        borderRadius={10}
        borderStyle={'dashed'}
        borderWidth={1}
        alignItems={'center'}
        justifyContent={'center'}
        height={163}
        style={{
          backgroundColor: COLORS[index] ?? COLORS[7],
          borderColor: BORDERS_COLORS[index] ?? COLORS[7],
        }}
      >
        <View
          height={60}
          width={60}
          borderRadius={30}
          alignItems={'center'}
          justifyContent={'center'}
          style={{
            backgroundColor: ICON_COLORS[index] ?? ICON_COLORS[7],
          }}
        >
          <Image
            source={icons['home-buyer']}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ height: 34, width: 34 }}
            contentFit="contain"
          />
        </View>

        <Text
          textAlign={'center'}
          variant={'medium14'}
          paddingVertical={'medium'}
          color={'black'}
          paddingHorizontal={'large'}
        >
          {item?.name}
        </Text>
      </View>
    </Pressable>
  );
};

export default Item;
