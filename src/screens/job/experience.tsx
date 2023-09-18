import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { PressableScale, Text, View } from '@/ui';

import { experienceData } from '../candidates/data';

const Experience = () => {
  return (
    <>
      {experienceData?.map((item, index) => {
        return (
          <PressableScale key={index} onPress={() => null}>
            <View
              backgroundColor="white"
              flexDirection={'row'}
              paddingVertical={'2xl'}
              paddingHorizontal={'large'}
              borderBottomColor={'grey500'}
              borderBottomWidth={1}
            >
              <Image source={item.profileImage} style={styles.image} />
              <View paddingHorizontal={'medium'} flex={1}>
                <Text variant="medium14" color="black">
                  {item.name}
                </Text>
                <Text
                  variant="medium12"
                  paddingVertical={'tiny'}
                  marginLeft={'tiny'}
                  color={'grey100'}
                >
                  {item.location}
                </Text>
                <Text
                  paddingVertical={'tiny'}
                  variant="regular12"
                  color={'grey200'}
                  marginLeft={'tiny'}
                >
                  {item.time}
                </Text>
                <View maxWidth={300} paddingVertical={'tiny'}>
                  <Text
                    textAlign={'justify'}
                    paddingVertical={'tiny'}
                    variant="regular10"
                    color={'grey100'}
                  >
                    {item.point1}
                  </Text>
                  <Text
                    variant="regular10"
                    paddingVertical={'tiny'}
                    color={'grey100'}
                    textAlign={'justify'}
                  >
                    {item.point2}
                  </Text>
                </View>
              </View>
            </View>
          </PressableScale>
        );
      })}
    </>
  );
};

export default Experience;

const styles = StyleSheet.create({
  image: {
    width: scale(72),
    height: scale(72),
  },
});
