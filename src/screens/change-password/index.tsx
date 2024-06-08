import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useForm } from 'react-hook-form';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';
import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, View } from '@/ui';
import { showErrorMessage, showSuccessMessage } from '@/utils';
import { useChangePassword } from '@/services/api/auth/login';
import { useNavigation } from '@react-navigation/native';

const schema = z
  .object({
    password: z.string({
      required_error: 'Password is required',
    }),
    confirmPassword: z.string({
      required_error: 'Confirm New Password is required',
    }),
    newPassword: z.string({
      required_error: 'New Password is required',
    }),
  })
  .refine((data) => data.confirmPassword === data.newPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ChangePasswordFormType = z.infer<typeof schema>;

export const ChangePassword = () => {
  const { colors } = useTheme<Theme>();
  const { goBack } = useNavigation();

  const { handleSubmit, control } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(schema),
  });

  const { mutate: updatePasswordApi, isLoading } = useChangePassword();

  const onSubmit = (data) => {
    updatePasswordApi(
      {
        currentPassword: data?.password,
        newPassword: data?.newPassword,
      },
      {
        onSuccess: (responseData) => {
          console.log('responseData ', responseData);
          if (responseData?.message) {
            showSuccessMessage(responseData?.message);
            goBack();
          }
        },
        onError: (error) => {
          //@ts-ignore
          showErrorMessage(error?.response?.data?.message);
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader showBorder={true} title="Change Password" />

      <View flex={1} paddingHorizontal={'large'}>
        <View paddingTop={'large'}>
          <ControlledInput
            placeholder="Enter Current password"
            control={control}
            name="password"
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter New  password"
            control={control}
            name="newPassword"
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Cofirm New  Password"
            label="Cofirm Password"
            control={control}
            name="confirmPassword"
          />
          <View height={scale(8)} />
        </View>
        <View height={scale(20)} />
        <View flex={1} justifyContent={'flex-end'} style={{ bottom: scale(5) }}>
          <Button label="Update" loading={isLoading} onPress={handleSubmit(onSubmit)} />
        </View>
      </View>
    </Screen>
  );
};
