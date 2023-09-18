import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React from 'react';

import { ScreenHeader } from '@/components/screen-header';
import SettingsItem from '@/components/settings-item';
import type { Theme } from '@/theme';
import { Screen, View } from '@/ui';

export const MyAccount = () => {
  const { colors } = useTheme<Theme>();

  const { navigate } = useNavigation();

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title={'Payments'} showBorder={true} />

      <View flex={1}>
        <View paddingHorizontal={'large'} gap={'medium'} paddingTop={'large'}>
          <SettingsItem
            icon="credit-card"
            title="Personal Information"
            onPress={() => navigate('PersonalInformation')}
          />
          <SettingsItem
            icon="list"
            title="Login And Security"
            onPress={() => navigate('LoginAndSecurity')}
          />
          <SettingsItem
            icon="list"
            title="Change Password"
            onPress={() => navigate('ChangePassword')}
          />
        </View>
      </View>
    </Screen>
  );
};
