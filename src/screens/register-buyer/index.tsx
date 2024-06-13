import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { icons } from '@/assets/icons';
import SelectionBox from '@/components/drop-down';
import { ScreenHeader } from '@/components/screen-header';
import { useCommunities, useHouses, useRegisterBuyer } from '@/services/api/auth/login';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, Text, View } from '@/ui';
import { showErrorMessage, showSuccessMessage } from '@/utils';

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

  // address: z.string({
  //   required_error: 'Address is required',
  // }),

  phone: z.string({
    required_error: 'Phone number is required',
  }),

  community: z.string({
    required_error: 'Please select community',
  }),

  house: z.string({
    required_error: 'Please select house',
  }),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;
// eslint-disable-next-line max-lines-per-function
const RegisterBuyer = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const { data: communities } = useCommunities();
  const { data: houses } = useHouses();

  const { mutate: registerBuyer, isLoading } = useRegisterBuyer();

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormType) => {
    const imageData = new FormData();

    // Append other form data fields if they are defined
    imageData.append('FirstName', data.name);
    imageData.append('LastName', data.lastName);
    imageData.append('Email', data.email);
    imageData.append('Password', data.password);
    imageData.append('PhoneNumber', data.phone);
    imageData.append('UserTypeID', 1);

    imageData.append('additionalInfo[HouseID]', parseInt(data?.house));

    registerBuyer(
      //@ts-ignore
      imageData,
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

  const communityId = watch('community');

  const filteredHouses = useMemo(() => {
    let newHouses =
      houses?.filter((element) => element?.CommunityID === parseInt(communityId)) ?? [];

    return newHouses;
  }, [communityId, houses]);

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title="Home Buyer Sign Up" />
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

          <View>
            <SelectionBox
              placeholder="Select Community"
              data={communities?.map((item) => {
                return {
                  value: `${item?.CommunityID}`,
                  label: item?.CommunityName,
                };
              })}
              onChange={(data) => {
                setValue('community', data?.value);
                trigger('community');
              }}
              error={errors?.community?.message ? true : false}
            />
            {errors?.community?.message && (
              <Text paddingTop={'small'} variant="regular14" color={'error'}>
                {errors?.community?.message}
              </Text>
            )}
          </View>

          <View>
            <SelectionBox
              placeholder="Select House"
              data={filteredHouses?.map((item) => {
                return {
                  value: `${item?.HouseID}`,
                  label: `${item?.HouseNumber},${item?.StreetAddress},${item?.ZipCode},${item?.City}, ${item?.State}`,
                };
              })}
              onChange={(data) => {
                setValue('house', data?.value);
                trigger('house');
              }}
              error={errors?.house?.message ? true : false}
            />
            {errors?.house?.message && (
              <Text paddingTop={'small'} variant="regular14" color={'error'}>
                {errors?.community?.message}
              </Text>
            )}
          </View>

          {/* <ControlledInput
            placeholder="Enter your address"
            label="address"
            control={control}
            name="address"
            leftIcon={
              <Image source={icons['pin']} style={styles.icon} contentFit="contain" />
            }
          /> */}

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
              <Image source={icons.lock} style={styles.icon} contentFit="contain" />
            }
          />
        </View>

        <View height={scale(24)} />
        <Button label="Submit" onPress={handleSubmit(onSubmit)} loading={isLoading} />
      </ScrollView>
    </Screen>
  );
};

export default RegisterBuyer;

const styles = StyleSheet.create({
  logo: {
    height: scale(17),
    width: scale(98),
  },
  icon: { height: 24, width: 24 },
});
