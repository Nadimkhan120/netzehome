import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import StepIndicator from '@/components/indicator-2';
import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { Button, Screen, Text, View } from '@/ui';

const labels = ['Job Detail', 'Post Detail', 'Preview', 'Payment'];

export const PostJobPreview = () => {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  const { bottom } = useSafeAreaInsets();

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader />
      <View
        paddingHorizontal={'large'}
        backgroundColor={'grey500'}
        paddingBottom={'medium'}
      >
        <StepIndicator stepCount={4} currentPosition={2} labels={labels} />
      </View>

      <View paddingTop={'large'} flex={1} paddingHorizontal={'large'}>
        <Text variant={'regular13'} color={'grey200'}>
          This is a preview of what your job post will look like to job seekers.
        </Text>

        <View
          flex={1}
          borderWidth={1}
          borderColor={'grey300'}
          marginVertical={'medium'}
          borderRadius={scale(8)}
        >
          <View
            padding={'medium'}
            flexDirection={'row'}
            borderBottomColor={'grey300'}
            borderBottomWidth={1}
          >
            <Image
              source={icons.company}
              style={{ height: scale(72), width: scale(72) }}
              contentFit="contain"
            />
            <View paddingHorizontal={'small'}>
              <Text variant={'medium14'} color={'black'}>
                Jr. Front-End Designer
              </Text>
              <Text paddingTop={'tiny'} variant={'medium12'} color={'grey100'}>
                Kickstarter,{'  '}
                <Text variant={'regular12'} color={'grey200'}>
                  in Manchester
                </Text>
              </Text>

              <View
                paddingTop={'small'}
                columnGap={'small'}
                flexDirection={'row'}
                alignItems={'center'}
              >
                <View
                  columnGap={'small'}
                  flexDirection={'row'}
                  alignItems={'center'}
                >
                  {['React', 'MongoDb'].map((item, index) => {
                    return (
                      <View
                        backgroundColor={'secondary'}
                        paddingHorizontal={'small'}
                        paddingVertical={'tiny'}
                        key={index}
                      >
                        <Text variant={'medium10'}>{item}</Text>
                      </View>
                    );
                  })}
                </View>
                <Text variant={'regular10'} color={'grey300'}>
                  Posted 6 hours ago
                </Text>
              </View>
            </View>
          </View>

          <View padding={'medium'}>
            <Text variant={'medium14'} color={'black'}>
              Job Description
            </Text>
            <Text variant={'medium12'} paddingTop={'small'} color={'grey200'}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel
              tincidunt risus. Vestibulum commodo tincidunt interdum. Quisque
              porta odio eu urna maximus dapibus. Praesent ut fringilla arcu.
              Nam sed imperdiet diam.
            </Text>
            <Text variant={'medium14'} paddingTop={'small'} color={'black'}>
              Requirements
            </Text>
            <Text variant={'medium12'} paddingTop={'small'} color={'grey200'}>
              Suspendisse dignissim neque sed lorem mattis tristique. Cras
              viverra elit quis dolor sagittis, sed bibendum nisl consectetur.
              Pellentesque at imperdiet ante. Phasellus id felis eget leo
              scelerisque posuere quis sed est. Nam maximus dui vel quam
              vehicula, eget scelerisque velit lacinia. Quisque sodales eleifend
              urna. Fusce eu efficitur lectus, et fermentum dui.
            </Text>
          </View>
        </View>
      </View>

      <View
        paddingVertical={'large'}
        paddingBottom={'large'}
        borderTopWidth={1}
        borderTopColor={'grey400'}
      >
        <Button
          label="Next"
          marginHorizontal={'large'}
          onPress={() => {
            navigation.navigate('PostJobPayment');
          }}
        />
        <View height={bottom} />
      </View>
    </Screen>
  );
};
