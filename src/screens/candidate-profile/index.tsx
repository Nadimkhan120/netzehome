import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import { TinderCard } from 'rn-tinder-card';

import { icons } from '@/assets/icons';
import { ImageButton } from '@/components';
import { Avatar } from '@/components/avatar';
import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { Button, Screen, Text, View } from '@/ui';

const skills = [
  { name: 'MongoDB' },
  { name: 'ReactJs' },
  { name: 'PHP' },
  { name: 'My SQL' },
];

const CandidateProfile = () => {
  const { colors } = useTheme<Theme>();

  const { height, width } = useWindowDimensions();

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader icon="close" title="" />
      <View flex={1} backgroundColor={'grey500'}>
        {[0, 1, 2, 3, 4].map((item, index) => {
          return (
            <View
              style={styles.cardContainer}
              pointerEvents="box-none"
              key={index}
            >
              <TinderCard
                cardWidth={width * 0.85}
                cardHeight={height * 0.7}
                cardStyle={styles.card}
                onSwipedRight={() => {
                  console.log('item', item);
                  //Alert.alert('Swiped right');
                }}
                onSwipedTop={() => {
                  // Alert.alert('Swiped Top');
                }}
                onSwipedLeft={() => {
                  // Alert.alert("Swiped left");
                }}
              >
                <View backgroundColor={'white'} flex={1} borderRadius={20}>
                  <View>
                    <Image
                      source={require('src/assets/images/header.png')}
                      style={styles.image}
                    />
                    <View
                      alignSelf={'center'}
                      style={{
                        marginTop: -scale(30),
                      }}
                    >
                      <Avatar source={icons['avatar-2']} size="large" />
                    </View>
                  </View>

                  <View
                    justifyContent={'center'}
                    paddingVertical={'large'}
                    alignItems={'center'}
                  >
                    <Text variant={'medium20'} color={'black'}>
                      Michael Kamleitner
                    </Text>
                    <Text
                      variant={'regular13'}
                      paddingVertical={'tiny'}
                      color={'grey100'}
                    >
                      CEO at Walls.io, Founder at Swat.io
                    </Text>
                    <Text variant={'regular13'} color={'grey200'}>
                      Lahore, Punjab, Pakistan
                    </Text>
                  </View>

                  <View
                    flexDirection={'row'}
                    justifyContent={'center'}
                    columnGap={'small'}
                    alignItems={'center'}
                  >
                    {skills?.map((item, index) => {
                      return (
                        <View
                          key={index}
                          backgroundColor={'tertiary'}
                          borderRadius={scale(8)}
                          paddingVertical={'small'}
                          paddingHorizontal={'medium'}
                        >
                          <Text variant={'regular12'}>{item.name}</Text>
                        </View>
                      );
                    })}
                  </View>

                  <View
                    height={1}
                    marginVertical="large"
                    backgroundColor={'grey500'}
                  />

                  <View>
                    <Text
                      variant={'regular14'}
                      color={'grey200'}
                      lineHeight={21}
                      textAlign={'center'}
                      paddingHorizontal={'large'}
                    >
                      I live and breathe SaaS! 💕I'm a two-times founder &
                      bootstrapper in SaaS / marketing technology / social media
                      marketing. Angel investor 😇 connecting and sharing
                      knowledge & war stories with fellow entrepreneurs (SaaS &
                      beyond) worldwide. 🌍
                    </Text>
                  </View>
                  <View flex={1} justifyContent={'flex-end'}>
                    <View
                      flexDirection={'row'}
                      paddingHorizontal={'large'}
                      marginBottom={'large'}
                      gap={'medium'}
                    >
                      <View flex={1}>
                        <Button
                          label="Schedule Interview"
                          variant={'outline'}
                          onPress={() => null}
                        />
                      </View>

                      <ImageButton
                        icon="message"
                        backgroundColor={'black'}
                        size={scale(44)}
                        onPress={() => null}
                      />
                    </View>
                  </View>
                </View>
              </TinderCard>
            </View>
          );
        })}
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  cardContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    marginTop: scale(24),
  },
  card: {
    borderRadius: 48,
  },
  image: {
    width: '100%',
    height: scale(110),
    borderTopLeftRadius: scale(28),
    borderTopRightRadius: scale(28),
  },
});

export default CandidateProfile;
