/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import * as React from 'react';
import { Dimensions } from 'react-native';
import { Drawer } from 'react-native-drawer-layout';

import { icons } from '@/assets/icons';
import { useUserWithUserId } from '@/services/api/auth/login';
import { closeDrawer, openDrawer, toggleDrawer, useApp } from '@/store/app';
import { logOut } from '@/store/auth';
import { useUser } from '@/store/user';
import { Button, PressableScale, Screen, Text, View } from '@/ui';

import { Avatar } from '../avatar';

const { width } = Dimensions.get('screen');

type AppDrawer = {
  children: React.ReactNode;
};

// eslint-disable-next-line max-lines-per-function
export function AppDrawer({ children }: AppDrawer) {
  const { navigate } = useNavigation();

  const drawerStatus = useApp((state) => state.drawerStatus);
  const user = useUser((state) => state?.user);

  const { data } = useUserWithUserId({
    enabled: user?.UserID ? true : false,
    variables: {
      userId: user?.UserID,
    },
  });

  return (
    <Drawer
      open={drawerStatus}
      onOpen={openDrawer}
      onClose={closeDrawer}
      drawerStyle={{ width: width * 0.8 }}
      // eslint-disable-next-line max-lines-per-function
      renderDrawerContent={() => {
        return (
          <Screen>
            <View flex={1}>
              <View
                paddingHorizontal={'large'}
                flexDirection={'row'}
                paddingTop={'medium'}
                alignItems={'center'}
                borderBottomColor={'grey500'}
                paddingBottom={'medium'}
                borderBottomWidth={1}
              >
                <Avatar
                  source={{ uri: 'https://fakeimg.pl/400x400/cccccc/cccccc' }}
                  transition={1000}
                  placeholder={'https://fakeimg.pl/400x400/cccccc/cccccc'}
                  size="medium"
                />

                <View>
                  <Text
                    variant={'medium16'}
                    textTransform={'capitalize'}
                    paddingLeft={'medium'}
                    color={'black'}
                    numberOfLines={2}
                    maxWidth={200}
                  >
                    {data?.FirstName} {data?.LastName} 👋
                  </Text>
                </View>
              </View>

              <PressableScale
                onPress={() => {
                  navigate('ChangePassword');
                  toggleDrawer();
                }}
              >
                <View
                  flexDirection={'row'}
                  alignItems={'center'}
                  marginTop={'medium'}
                  paddingHorizontal={'large'}
                  borderBottomWidth={1}
                  borderBottomColor={'grey500'}
                  paddingBottom={'medium'}
                >
                  <View
                    height={41.12}
                    width={41.12}
                    borderRadius={12}
                    alignItems={'center'}
                    justifyContent={'center'}
                    style={{
                      backgroundColor: '#FFEBF0',
                    }}
                  >
                    <Image source={icons.lock2} style={{ height: 24, width: 24 }} />
                  </View>
                  <Text variant={'medium12'} fontSize={16} marginLeft={'medium'}>
                    Change Password
                  </Text>
                </View>
              </PressableScale>

              <PressableScale>
                <View
                  flexDirection={'row'}
                  alignItems={'center'}
                  marginTop={'medium'}
                  paddingHorizontal={'large'}
                  borderBottomWidth={1}
                  borderBottomColor={'grey500'}
                  paddingBottom={'medium'}
                >
                  <View
                    height={41.12}
                    width={41.12}
                    borderRadius={12}
                    alignItems={'center'}
                    justifyContent={'center'}
                    style={{
                      backgroundColor: '#EAEAFF',
                    }}
                  >
                    <Image
                      source={icons.moon}
                      contentFit="contain"
                      style={{ height: 24, width: 24 }}
                    />
                  </View>
                  <Text variant={'medium12'} fontSize={16} marginLeft={'medium'}>
                    Dark Mode
                  </Text>
                </View>
              </PressableScale>

              <View height={30} />

              <View flex={1} paddingBottom={'large'} justifyContent={'flex-end'}>
                <View paddingHorizontal={'large'}>
                  <Button
                    label="Logout"
                    onPress={() => {
                      logOut();
                      closeDrawer();
                    }}
                  />
                </View>
              </View>
            </View>
          </Screen>
        );
      }}
    >
      {children}
    </Drawer>
  );
}
