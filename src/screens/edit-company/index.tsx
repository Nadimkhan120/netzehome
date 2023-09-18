import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { useForm } from 'react-hook-form';
//import { useNavigation } from "@react-navigation/native";
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { icons } from '@/assets/icons';
import { CompanyButton } from '@/components/company-button';
import { ScreenHeader } from '@/components/screen-header';
import { useSoftKeyboardEffect } from '@/hooks';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, View } from '@/ui';
import { DescriptionField } from '@/ui/description-field';

const schema = z.object({
  companyName: z.string({
    required_error: 'Company name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  phone: z.string({
    required_error: 'phone is required',
  }),
});

export type EditCompanyFormType = z.infer<typeof schema>;

export const EditCompany = () => {
  const { colors } = useTheme<Theme>();
  //const navigation = useNavigation();

  const { width } = useWindowDimensions();

  useSoftKeyboardEffect();

  const { handleSubmit, control } = useForm<EditCompanyFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: EditCompanyFormType) => {
    console.log('data', data);
  };

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title="vFairs" showBorder={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View height={scale(119)}>
          <Image
            source={icons['back-cover']}
            style={{ height: scale(119), width: width }}
          />
          <View
            alignSelf={'flex-start'}
            position={'absolute'}
            // bottom={0}
            marginLeft={'large'}
            style={{
              bottom: -scale(43),
            }}
          >
            <CompanyButton
              icon="company"
              onPress={() => null}
              size={scale(86)}
              imageSize={scale(86)}
            />
          </View>
        </View>

        <View height={scale(44)} />

        <View paddingTop={'large'} paddingHorizontal={'large'} rowGap={'small'}>
          <ControlledInput
            placeholder="Enter company name"
            label="Company Name"
            control={control}
            name="companyName"
          />

          <ControlledInput
            placeholder="Enter company email"
            label="Company Email"
            control={control}
            name="email"
          />

          <ControlledInput
            placeholder="Enter email address"
            label="Email"
            control={control}
            name="email"
          />

          <ControlledInput
            placeholder="Enter contact number"
            label="Contact Number"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter website"
            label="Website"
            control={control}
            name="phone"
          />
          <DescriptionField
            placeholder="Enter bio"
            label="Bio"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter how many employees you have."
            label="Number Employess"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter average wage"
            label="Average"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter address"
            label="Address"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter city"
            label="City"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter country"
            label="Country"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter postal code"
            label="Postal code"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter location."
            label="Location"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter facebook"
            label="Facebook"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter instagram"
            label="Instgram"
            control={control}
            name="phone"
          />
          <ControlledInput
            placeholder="Enter whatsapp."
            label="Whatsapp"
            control={control}
            name="phone"
          />
        </View>
        <View height={scale(24)} />
        <View flex={1} justifyContent={'flex-end'} paddingHorizontal={'large'}>
          <Button label="Update" onPress={handleSubmit(onSubmit)} />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: scale(160),
  },
});
