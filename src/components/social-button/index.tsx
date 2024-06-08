import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { IconTypes, icons } from '@/assets/icons';
import { View, Text } from '@/ui';
import { Image } from 'expo-image';

type SocialButtonProps = {
  label: string;
  icon: IconTypes;
  onPress?: () => void;
};

const SocialButton = ({ label, icon, onPress }: SocialButtonProps) => {
  return (
    <Pressable onPress={onPress}>
      <View
        height={56}
        borderRadius={32}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        borderWidth={1}
        borderColor={'inputBorder'}
      >
        <Image source={icons[icon]} style={styles.icon} contentFit="contain" />
        <Text>{label}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 24,
    position: 'absolute',
    left: 16,
  },
});

export default SocialButton;
