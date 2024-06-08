import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { icons } from '@/assets/icons';
import { ScreenHeader } from '@/components/screen-header';
import { useForgotPassword } from '@/services/api/auth/login';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, Text, View } from '@/ui';
import { showErrorMessage } from '@/utils';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({
      message: 'Invalid email',
    }),
});

export type ForgotPasswordFormType = z.infer<typeof schema>;

export const ForgotPassword = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const { mutate: forgotPasswordApi, isLoading } = useForgotPassword();

  const { handleSubmit, control } = useForm<ForgotPasswordFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (body: ForgotPasswordFormType) => {
    forgotPasswordApi(
      { Email: body?.email },
      {
        onSuccess: (data) => {
          console.log('data', data);

          if (data?.message === 'Recovery email sent') {
            showErrorMessage('Recovery email sent');
          } else {
            showErrorMessage(data?.message ?? 'Something went wrong');
          }
        },
        onError: (error) => {
          // An error happened!
          //@ts-ignore
          console.log(`error`, JSON.stringify(error?.response?.data?.message, null, 2));
          //@ts-ignore
          showErrorMessage(error?.response?.data?.message ?? 'Something went wrong');
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader />

      <View flex={1} paddingHorizontal={'large'}>
        <View height={scale(72)} />

        <View alignItems={'center'} justifyContent={'center'}>
          <View height={scale(16)} />
          <View paddingTop={'large'} alignItems={'center'} justifyContent={'center'}>
            <Text variant={'semiBold24'} textAlign={'center'} color={'black'}>
              Forgot Password
            </Text>
            <Text
              variant={'regular14'}
              paddingTop={'small'}
              textAlign={'center'}
              color={'grey100'}
            >
              Enter your email, we will send you a reset link to your email
            </Text>
          </View>
        </View>

        <View height={scale(32)} />

        <View paddingTop={'large'}>
          <ControlledInput
            placeholder="Enter email"
            label="Email"
            control={control}
            name="email"
          />
          <View height={scale(8)} />
        </View>
        <View height={scale(24)} />
        <Button label="Submit" onPress={handleSubmit(onSubmit)} loading={isLoading} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  logo: {
    height: scale(17),
    width: scale(98),
  },
});
