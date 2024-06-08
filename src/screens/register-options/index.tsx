import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import { MotiView } from 'moti';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { Screen, Text, View, Button } from '@/ui';

// eslint-disable-next-line max-lines-per-function
export const RegisterOptions = () => {
  const { colors } = useTheme<Theme>();

  const { navigate } = useNavigation();

  const [selectedType, setSelectedType] = useState('');

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title="Are you a" />
      <View flex={1} paddingHorizontal={'large'}>
        <View flexDirection={'row'} paddingTop={'large'} columnGap={'medium'}>
          <Pressable
            style={[styles.button, { flex: 1, backgroundColor: '#EFF7FF' }]}
            onPress={() => setSelectedType('buyer')}
          >
            <View>
              <View paddingTop={'small'} alignItems={'center'}>
                <Image
                  source={icons['home-buyer']}
                  style={{ height: 160, width: 160 }}
                  contentFit="contain"
                />
                <MotiView
                  style={styles.buyer}
                  animate={{
                    backgroundColor: selectedType === 'buyer' ? '#199A8E' : 'white',
                  }}
                >
                  <Image
                    source={icons.check}
                    style={{ height: 10, width: 10 }}
                    contentFit="contain"
                  />
                </MotiView>
              </View>
              <Text
                variant={'medium14'}
                color={'black'}
                textAlign={'center'}
                marginTop={'medium'}
              >
                Home Buyer
              </Text>
            </View>
          </Pressable>
          <Pressable
            style={[styles.button, { flex: 1, backgroundColor: '#E2FFF6' }]}
            onPress={() => setSelectedType('contractor')}
          >
            <View>
              <View paddingTop={'small'}>
                <Image
                  source={icons['contractor']}
                  style={{ height: 160, width: '100%' }}
                  contentFit="contain"
                />
                <MotiView
                  style={styles.contractor}
                  animate={{
                    backgroundColor: selectedType === 'contractor' ? '#199A8E' : 'white',
                  }}
                >
                  <Image
                    source={icons.check}
                    style={{ height: 10, width: 10 }}
                    contentFit="contain"
                  />
                </MotiView>
              </View>

              <Text
                textAlign={'center'}
                variant={'medium14'}
                color={'black'}
                marginTop={'medium'}
              >
                Contractor
              </Text>
            </View>
          </Pressable>
        </View>

        <View height={10} />

        <Pressable
          style={[styles.button, { backgroundColor: '#EFF7FF' }]}
          onPress={() => setSelectedType('manager')}
        >
          <View>
            <View paddingTop={'small'}>
              <Image
                source={icons['project-manager']}
                style={{ height: 160, width: '100%' }}
                contentFit="contain"
              />
              <MotiView
                style={styles.manager}
                animate={{
                  backgroundColor: selectedType === 'manager' ? '#199A8E' : 'white',
                }}
              >
                <Image
                  source={icons.check}
                  style={{ height: 10, width: 10 }}
                  contentFit="contain"
                />
              </MotiView>
            </View>
            <Text
              textAlign={'center'}
              variant={'medium14'}
              color={'black'}
              marginTop={'medium'}
            >
              Project Manager
            </Text>
          </View>
        </Pressable>
      </View>

      <View paddingHorizontal={'large'}>
        <Button
          label="Continue"
          onPress={() => {
            if (selectedType === '') {
              Alert.alert('Error', 'Please select registration type');
              return;
            }

            if (selectedType === 'buyer') {
              navigate('RegisterBuyer');
            }

            if (selectedType === 'manager') {
              navigate('RegisterManager');
            }
            if (selectedType === 'contractor') {
              navigate('RegisterContractor');
            }
          }}
          loading={false}
        />
      </View>

      <View justifyContent={'flex-end'}>
        <Image
          source={icons['bg-image']}
          style={{ height: 175, width: '100%' }}
          contentFit="contain"
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: scale(17),
    width: scale(98),
  },
  button: {
    height: 212,
    // minWidth: 160,
    borderRadius: scale(8),
  },
  buyer: {
    position: 'absolute',
    top: 24,
    left: 32,
    height: 25,
    width: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contractor: {
    position: 'absolute',
    top: 24,
    left: 32,
    height: 25,
    width: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  manager: {
    position: 'absolute',
    top: 24,
    left: 52,
    height: 25,
    width: 25,
    borderRadius: 12.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
