import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';
import { toggleDrawer } from '@/store/app';

type ScreenHeaderProps = {
  icon?: IconTypes;
  title?: string;

  rightElement?: React.ReactElement;
  onLeftPress?: () => void;
};

export const ScreenHeader2 = ({
  title,
  rightElement,
  onLeftPress,
}: ScreenHeaderProps) => {
  return (
    <View
      height={scale(50)}
      flexDirection={'row'}
      alignItems={'center'}
      paddingHorizontal={'large'}
      justifyContent={'space-between'}
    >
      <View flexDirection={'row'} flex={1} alignItems={'center'}>
        <Pressable style={{ position: 'absolute', zIndex: 99 }} onPress={toggleDrawer}>
          <View
            height={44}
            width={44}
            borderWidth={1}
            backgroundColor={'white'}
            style={{ borderColor: '#F5F5F7' }}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={22}
          >
            <Image source={icons['menu']} style={styles.image} contentFit="contain" />
          </View>
        </Pressable>

        <Text flex={1} variant={'medium17'} textAlign={'center'} color={'grey100'}>
          {title}
        </Text>
      </View>

      {rightElement}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 24,
    width: 24,
  },
});
