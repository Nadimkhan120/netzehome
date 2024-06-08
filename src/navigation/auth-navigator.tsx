import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import {
  ForgotPassword,
  Login,
  Register,
  RegisterOptions,
  ResetPassword,
} from '@/screens';

import RegisterBuyer from '@/screens/register-buyer';
import RegisterContractor from '@/screens/register-contractor';
import RegisterManager from '@/screens/register-manager';

export type AuthStackParamList = {
  Login: undefined;
  RegisterOptions: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { email: string; token: string };
  RegisterBuyer: undefined;
  RegisterContractor: undefined;
  RegisterManager: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterOptions"
        component={RegisterOptions}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="RegisterBuyer"
        component={RegisterBuyer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterContractor"
        component={RegisterContractor}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegisterManager"
        component={RegisterManager}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
