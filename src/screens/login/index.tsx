/* eslint-disable react-native/no-inline-styles */
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { icons } from '@/assets/icons';
import { ScreenHeader } from '@/components/screen-header';
// import SocialButton from '@/components/social-button';
import { useLogin } from '@/services/api/auth/login';
import { login } from '@/store/auth';
import { setUserData } from '@/store/user';
import type { Theme } from '@/theme';
import { Button, ControlledInput, PressableScale, Screen, Text, View } from '@/ui';
import { showErrorMessage } from '@/utils';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

// eslint-disable-next-line max-lines-per-function
export const Login = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const { mutate: loginApi, isLoading } = useLogin();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    loginApi(
      { Email: data?.email, Password: data?.password },
      {
        onSuccess: (data: any) => {
          console.log('data', JSON.stringify(data, null, 2));

          if (data?.token) {
            login(data?.token);
            setUserData(data);
          } else {
            showErrorMessage('Error while login');
          }
        },
        onError: (error) => {
          // @ts-ignore
          showErrorMessage(error?.response?.data?.message ?? '');
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title="Login" />
      <ScrollView style={{ paddingHorizontal: scale(15) }}>
        <View height={scale(72)} />

        <View paddingTop={'large'} gap={'large'}>
          <ControlledInput
            placeholder="Enter your mail"
            label="Email"
            control={control}
            name="email"
            leftIcon={
              <Image source={icons.sms} style={styles.icon} contentFit="contain" />
            }
          />

          <ControlledInput
            placeholder="Enter your password"
            label="Password"
            isSecure={true}
            control={control}
            name="password"
            leftIcon={
              <Image source={icons.lock} style={styles.icon} contentFit="contain" />
            }
          />
          <View alignSelf={'flex-end'}>
            <PressableScale onPress={() => navigate('ForgotPassword')}>
              <Text color={'primary'}>Forgot password?</Text>
            </PressableScale>
          </View>
        </View>

        <View height={scale(24)} />
        <Button label="Login" onPress={handleSubmit(onSubmit)} loading={isLoading} />

        <View paddingVertical={'2xl'} alignSelf={'center'}>
          <PressableScale onPress={() => navigate('RegisterOptions')}>
            <Text variant={'regular14'} color={'grey200'}>
              Haven’t an account?{' '}
              <Text variant={'semiBold14'} color={'primary'}>
                Sign Up
              </Text>
            </Text>
          </PressableScale>
        </View>

        {/* <Image
          source={icons.or}
          style={{ height: scale(24), width: '100%' }}
          contentFit="contain"
        /> */}

        {/* <View gap={'medium'} marginVertical={'large'}>
          <SocialButton label={'Sign in with Google'} icon={'google'} />
          <SocialButton label={'Sign in with Apple'} icon={'apple'} />
          <SocialButton label={'Sign in with Facebook'} icon={'facebook'} />
        </View> */}
      </ScrollView>
      <Image
        source={icons['bg-image']}
        style={{ height: 175, width: '100%' }}
        contentFit="contain"
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: scale(17),
    width: scale(98),
  },
  icon: { height: 24, width: 24 },
});
