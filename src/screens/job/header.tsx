import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { Avatar } from '@/components/avatar';
import { Text, View } from '@/ui';

const Header = () => {
  return (
    <View>
      <Image
        source={require('src/assets/images/header.png')}
        style={styles.image}
        contentFit="contain"
      />
      <View
        alignSelf={'center'}
        style={{
          marginTop: -scale(30),
        }}
      >
        <Avatar source={icons['avatar-2']} size="large" />
      </View>

      <View
        justifyContent={'center'}
        paddingVertical={'large'}
        alignItems={'center'}
      >
        <Text variant={'medium20'} color={'black'}>
          Michael Kamleitner
        </Text>
        <Text variant={'regular13'} paddingVertical={'tiny'} color={'grey100'}>
          CEO at Walls.io, Founder at Swat.io
        </Text>
        <Text variant={'regular13'} color={'grey200'}>
          Lahore, Punjab, Pakistan
        </Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: scale(90),
  },
});
