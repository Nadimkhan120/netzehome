import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Pressable, TextInput } from 'react-native';
import { scale } from 'react-native-size-matters';
import type { IconTypes } from '@/assets/icons';
import { icons } from '@/assets/icons';
import { View } from '@/ui';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { AppFonts } from '@/constants/fonts';

type Header = {
  icon?: IconTypes;
  title?: string;
  rightElement?: React.ReactElement;
  onLeftPress?: () => void;
};

export const Header = ({}: Header) => {
  const { colors } = useTheme<Theme>();

  const { goBack } = useNavigation();

  return (
    <View
      height={scale(50)}
      flexDirection={'row'}
      alignItems={'center'}
      paddingHorizontal={'large'}
      justifyContent={'space-between'}
    >
      <Pressable onPress={goBack}>
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
          <Image source={icons['arrow-left']} style={styles.image} contentFit="contain" />
        </View>
      </Pressable>

      <View flex={1} paddingLeft={'medium'}>
        <TextInput
          placeholder="Search Address"
          placeholderTextColor={colors.black}
          style={[
            styles.input,
            { backgroundColor: colors.grey500, borderColor: colors.grey400 },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 24,
    width: 24,
  },
  input: {
    height: 41.66,
    borderRadius: 24,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 14,
    fontFamily: AppFonts.APP_FONT_REGULAR,
  },
});
