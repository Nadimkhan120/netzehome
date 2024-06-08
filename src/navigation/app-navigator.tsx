import * as React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Houses from '@/screens/houses';
import Dashboard from '@/screens/dashboard';
import PredefinedWorks from '@/screens/predefined-works';
import Processes from '@/screens/process';
import UploadImages from '@/screens/upload-image';
import { ChangePassword } from '@/screens/change-password';

export type AppStackParamList = {
  Dashboard: undefined;
  ChangePassword: undefined;
  Houses: { id: number };
  PredefinedWorks: { id: number };
  Processes: { id: number };
  UploadImages: { id: number };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Houses" component={Houses} />
        <Stack.Screen name="PredefinedWorks" component={PredefinedWorks} />
        <Stack.Screen name="Processes" component={Processes} />
        <Stack.Screen name="UploadImages" component={UploadImages} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
