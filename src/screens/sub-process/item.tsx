/* eslint-disable react-native/no-inline-styles */
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Pressable } from 'react-native';

import { Text, View } from '@/ui';

type ItemProps = {
  item: any;
};

const Item = ({ item }: ItemProps) => {
  const { navigate } = useNavigation();

  const navigateToHouses = useCallback(() => {
    navigate('Processes', { id: item?.id });
  }, [item?.id, navigate]);

  return (
    <Pressable onPress={navigateToHouses}>
      <View
        backgroundColor={'white'}
        borderRadius={14}
        alignItems={'center'}
        paddingHorizontal={'small'}
      >
        {/* <View
          height={44.34}
          width={44.34}
          borderRadius={12}
          alignItems={'center'}
          justifyContent={'center'}
          style={{
            backgroundColor: '#EAEAFF',
          }}
        >
          <Entypo name="check" size={24} color="#3D5CFF" />
        </View> */}

        {/* <View
          height={44.34}
          width={44.34}
          borderRadius={12}
          alignItems={'center'}
          marginLeft={'small'}
          justifyContent={'center'}
          style={{
            backgroundColor: '#FFEBF0',
          }}
        >
          <Entypo name="check" size={24} color="#FF6905" />
        </View> */}

        <View flex={1} paddingHorizontal={'large'}>
          <Text variant={'medium12'} color={'black'}>
            {item?.name}
          </Text>
          <Text variant={'regular10'} paddingTop={'xSmall'} color="grey300">
            Click Here For More Info{' '}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Item;
