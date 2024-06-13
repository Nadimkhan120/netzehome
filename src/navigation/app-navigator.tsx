import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { ChangePassword } from '@/screens/change-password';
import Dashboard from '@/screens/dashboard';
import Houses from '@/screens/houses';
import PredefinedWorks from '@/screens/predefined-works';
import Processes from '@/screens/process';
import SubProcesses from '@/screens/sub-process';
import UploadImages from '@/screens/upload-image';

export type AppStackParamList = {
  Dashboard: undefined;
  ChangePassword: undefined;
  Houses: { id: number };
  PredefinedWorks: { id: number; name: any };
  Processes: { id: number };
  UploadImages: { id: number };
  SubProcesses: { id: number };
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
        <Stack.Screen name="SubProcesses" component={SubProcesses} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
