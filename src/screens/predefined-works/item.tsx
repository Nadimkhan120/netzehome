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

const Item = ({ item, index }: ItemProps) => {
  const { navigate } = useNavigation();

  const navigateToHouses = useCallback(() => {
    navigate('Processes', { id: item?.WorkID });
  }, [item?.WorkID, navigate]);

  return (
    <Pressable onPress={navigateToHouses}>
      <View
        backgroundColor={'white'}
        borderColor={'cardGrey'}
        borderRadius={28}
        borderWidth={1}
        flexDirection={'row'}
        height={58}
        alignItems={'center'}
        paddingHorizontal={'small'}
      >
        <View
          height={44.34}
          width={44.34}
          borderRadius={24}
          backgroundColor={'cardGreyLight'}
          borderWidth={1}
          borderColor={'cardGrey'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Image
            source={icons[`work-${index + 1}`] ?? icons[`work-${1}`]}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ height: 22, width: 22, tintColor: 'black' }}
            contentFit="cover"
          />
        </View>

        <View flex={1} paddingHorizontal={'large'}>
          <Text variant={'medium12'} color={'black'}>
            {item?.Name}
          </Text>
          <Text variant={'regular10'} paddingTop={'xSmall'} color="grey300">
            Click Here For More Info{' '}
          </Text>
        </View>

        <Image
          source={icons['arrow-right']}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{ height: 22, width: 22 }}
          contentFit="cover"
        />
      </View>
    </Pressable>
  );
};

export default Item;
