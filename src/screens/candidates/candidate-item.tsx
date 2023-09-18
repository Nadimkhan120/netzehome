// CandidateItem.js

import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import { PressableScale, Text, View } from '@/ui';

export const CandidateItem = ({ item, onPress }) => {
  return (
    <PressableScale onPress={() => onPress(item)}>
      <View
        backgroundColor="white"
        marginTop={'tiny'}
        padding="medium"
        flexDirection={'row'}
      >
        <View
          backgroundColor={'grey400'}
          alignSelf={'center'}
          width={50}
          height={50}
          borderRadius={25}
        >
          <Image source={item.profileImage} style={candidateStyles.image} />
        </View>
        <View marginLeft={'medium'}>
          <Text variant="medium20" color="black">
            {item.name}
          </Text>
          <Text variant="medium14" color={'grey100'}>
            {item.title}
          </Text>
          <Text variant="medium13">{item.location}</Text>
        </View>
      </View>
    </PressableScale>
  );
};

const candidateStyles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginTop: 5,
  },
});
