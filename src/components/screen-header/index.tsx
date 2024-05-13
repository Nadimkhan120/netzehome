import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';
import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';
import { Text, View } from '@/ui';

type ScreenHeaderProps = {
  icon?: IconTypes;
  title?: string;
  showBorder?: boolean;
  rightElement?: React.ReactElement;
};

export const ScreenHeader = ({
  icon,
  title,
  showBorder,
  rightElement,
}: ScreenHeaderProps) => {
  const { goBack } = useNavigation();

  return (
    <View
      height={scale(50)}
      flexDirection={'row'}
      alignItems={'center'}
      paddingHorizontal={'large'}
      borderBottomColor={'grey500'}
      borderBottomWidth={showBorder ? 1 : 0}
      justifyContent={'space-between'}
    >
      <View flexDirection={'row'} flex={1} alignItems={'center'}>
        <Pressable style={{ position: 'absolute' }} onPress={goBack}>
          <Image
            source={icons[icon] ?? icons['arrow-left']}
            style={styles.image}
            contentFit="contain"
          />
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
    height: scale(24),
    width: scale(24),
  },
});
