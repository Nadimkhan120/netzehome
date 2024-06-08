import React, { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';
import { icons } from '@/assets/icons';
import { useRegisterManager } from '@/services/api/auth/login';

import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, View } from '@/ui';
import { showErrorMessage, showSuccessMessage } from '@/utils';

import { ScreenHeader } from '@/components/screen-header';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),

  name: z.string({
    required_error: 'Name is required',
  }),

  lastName: z.string({
    required_error: 'Last name is required',
  }),

  phone: z.string({
    required_error: 'Phone number is required',
  }),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

const RegisterManager = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const { mutate: registerManger, isLoading } = useRegisterManager();

  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    registerManger(
      {
        Email: data?.email,
        Password: data?.password,
        FirstName: data?.name,
        LastName: data?.lastName,
        PhoneNumber: data?.phone,
        UserTypeID: 3,
      },
      {
        onSuccess: (data) => {
          console.log('data', JSON.stringify(data, null, 2));

          if (data?.UserID) {
            showSuccessMessage('Account created successfully, Please login now');
            navigate('Login');
          } else {
            showErrorMessage('Error while adding buyer');
          }
        },
        onError: (error) => {
          console.log('error', error?.response);

          // An error happened!
          console.log(`error`, error?.response?.data);
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title="Manager Sign Up" />
      <ScrollView style={{ paddingHorizontal: scale(15) }}>
        <View paddingTop={'large'} gap={'large'}>
          <ControlledInput
            placeholder="Enter your first name"
            label="First Name"
            control={control}
            name="name"
            leftIcon={
              <Image
                source={icons['user-new']}
                style={styles.icon}
                contentFit="contain"
              />
            }
          />

          <ControlledInput
            placeholder="Enter your last name"
            label="Last Name"
            control={control}
            name="lastName"
            leftIcon={
              <Image
                source={icons['user-new']}
                style={styles.icon}
                contentFit="contain"
              />
            }
          />

          <ControlledInput
            placeholder="Enter your mail"
            label="Email"
            control={control}
            name="email"
            leftIcon={
              <Image source={icons['sms']} style={styles.icon} contentFit="contain" />
            }
          />

          <ControlledInput
            placeholder="Enter your phone number"
            label="phone"
            control={control}
            name="phone"
            leftIcon={
              <Image
                source={icons['phone-plus']}
                style={styles.icon}
                contentFit="contain"
              />
            }
          />

          <ControlledInput
            placeholder="Enter your password"
            label="Password"
            isSecure={true}
            control={control}
            name="password"
            leftIcon={
              <Image source={icons['lock']} style={styles.icon} contentFit="contain" />
            }
          />
        </View>

        <View height={scale(24)} />
        <Button label="Submit" onPress={handleSubmit(onSubmit)} loading={isLoading} />
      </ScrollView>
    </Screen>
  );
};

export default RegisterManager;

const styles = StyleSheet.create({
  logo: {
    height: scale(17),
    width: scale(98),
  },
  icon: { height: 24, width: 24 },
});
