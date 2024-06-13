import { useActionSheet } from '@expo/react-native-action-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Platform, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import * as mime from 'react-native-mime-types';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { icons } from '@/assets/icons';
import SelectionBox from '@/components/drop-down';
import { ScreenHeader } from '@/components/screen-header';
import { useContractorTypes, useRegisterContractor } from '@/services/api/auth/login';
import type { Theme } from '@/theme';
import { Button, ControlledInput, PressableScale, Screen, Text, View } from '@/ui';
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

  phone: z.string({
    required_error: 'Phone number is required',
  }),

  ein: z.string({
    required_error: 'Ein is required',
  }),

  businessName: z.string({
    required_error: 'Business name is required',
  }),

  businessAddress: z.string({
    required_error: 'Business address is required',
  }),

  businessInsurance: z.string({
    required_error: 'Business insurance is required',
  }),

  type: z.string({
    required_error: 'Contractor type is required',
  }),

  W9Url: z.string({
    required_error: 'W9Url is required',
  }),

  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(6, 'Password must be at least 6 characters'),
});

export type FormType = z.infer<typeof schema>;

// Function to generate filename
function generateFileName(metadata) {
  const { width, height, fileSize } = metadata;
  return `Image_${width}x${height}_${fileSize}.jpg`;
}

// eslint-disable-next-line max-lines-per-function
const RegisterContractor = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();

  const [insuranceImage, setInsuranceImage] = useState(null);
  const [w9url, setW9Url] = useState(null);

  const { data } = useContractorTypes();
  const { mutate: registerContractor, isLoading } = useRegisterContractor();

  const { showActionSheetWithOptions } = useActionSheet();

  const [cameraPermissionStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [galleryPermission, requestGallaryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!cameraPermissionStatus?.granted) {
      requestCameraPermission();
    }
    if (!galleryPermission?.granted) {
      requestGallaryPermission();
    }
  }, []);

  const onSubmit = (data: FormType) => {
    const imageData = new FormData();

    let businessUriFileName;
    let w9urlFileName;

    // Ensure insuranceImage and its URI are defined

    const uriParts = insuranceImage.uri.split('/');
    businessUriFileName = uriParts[uriParts.length - 1];

    const uriParts2 = w9url.uri.split('/');
    w9urlFileName = uriParts2[uriParts2.length - 1];

    // Append other form data fields if they are defined
    imageData.append('FirstName', data.name);
    imageData.append('LastName', data.lastName);
    imageData.append('Email', data.email);
    imageData.append('Password', data.password);
    imageData.append('PhoneNumber', data.phone);
    imageData.append('UserTypeID', 2);

    // Append additionalInfo fields
    imageData.append('additionalInfo[BusinessName]', data.businessName);
    imageData.append('additionalInfo[BusinessAddress]', data.businessAddress);
    imageData.append('additionalInfo[EIN]', data.ein);
    imageData.append('additionalInfo[ContractorTypeID]', parseInt(data?.type));

    // Append W9Url file
    imageData.append('W9', {
      name: w9urlFileName,
      type: mime.lookup(w9url.uri.replace('file://', '')),
      uri: Platform.OS === 'ios' ? w9url.uri.replace('file://', '') : w9url.uri,
    });

    // Append BusinessInsuranceUrl file
    imageData.append('BusinessInsurance', {
      name: businessUriFileName,
      type: mime.lookup(insuranceImage.uri.replace('file://', '')),
      uri:
        Platform.OS === 'ios'
          ? insuranceImage.uri.replace('file://', '')
          : insuranceImage.uri,
    });

    //@ts-ignore
    registerContractor(imageData, {
      onSuccess: (response) => {
        // console.log('data', JSON.stringify(response, null, 2));
        if (response?.UserID) {
          showSuccessMessage('Account created successfully, Please login now');
          navigate('Login');
        } else {
          showErrorMessage('Error while adding contractor');
        }
      },
      onError: (error: any) => {
        console.log('error', error?.response?.data);
        showErrorMessage(error?.response?.data?.message ?? 'Error while adding buyer');
      },
    });
  };

  const showImageOptions = ({ picType }: { picType: 'insurance' | 'w9url' }) => {
    const options = ['Gallery', 'Camera', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case 0:
            // Save
            pickImage(picType);
            break;
          case 1:
            // Save
            takeImage(picType);
            break;
          case destructiveButtonIndex:
            // Delete
            break;

          case cancelButtonIndex:
          // Canceled
        }
      }
    );
  };

  const pickImage = async (picType) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: picType === 'cover' ? [4, 2] : [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const fileName = generateFileName(result.assets[0]);

      if (picType === 'insurance') {
        setValue('businessInsurance', fileName);
        trigger('businessInsurance');

        setInsuranceImage(result.assets[0]);
      }

      if (picType === 'w9url') {
        setValue('W9Url', fileName);
        trigger('W9Url');
        setW9Url(result.assets[0]);
      }
    }
  };

  const takeImage = async (picType) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const fileName = generateFileName(result.assets[0]);

      if (picType === 'insurance') {
        setValue('businessInsurance', fileName);
        trigger('businessInsurance');
        setInsuranceImage(result.assets[0]);
      }

      if (picType === 'w9url') {
        setValue('W9Url', fileName);
        trigger('W9Url');
        setW9Url(result.assets[0]);
      }
    }
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title="Contractor Sign Up" />
      <KeyboardAwareScrollView bottomOffset={50}>
        <View paddingTop={'large'} gap={'large'} paddingHorizontal={'large'}>
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

          <View>
            <SelectionBox
              placeholder="Contractor Type"
              data={data?.map((item) => {
                return {
                  value: `${item?.ContractorTypeID}`,
                  label: item?.ContractorTypeName,
                };
              })}
              onChange={(data) => {
                setValue('type', data?.value);
                trigger('type');
              }}
              error={errors?.type?.message ? true : false}
            />
            {errors?.type?.message && (
              <Text paddingTop={'small'} variant="regular14" color={'error'}>
                {errors?.type?.message}
              </Text>
            )}
          </View>

          <ControlledInput
            placeholder="EIN"
            control={control}
            name="ein"
            leftIcon={
              <Image source={icons['ein']} style={styles.icon} contentFit="contain" />
            }
          />

          <ControlledInput
            placeholder="Business Name"
            control={control}
            name="businessName"
            leftIcon={
              <Image source={icons['case']} style={styles.icon} contentFit="contain" />
            }
          />

          <ControlledInput
            placeholder="Business address"
            control={control}
            name="businessAddress"
            leftIcon={
              <Image source={icons['pin']} style={styles.icon} contentFit="contain" />
            }
          />

          <ControlledInput
            placeholder="Business insurance"
            control={control}
            name="businessInsurance"
            editable={false}
            leftIcon={
              <Image source={icons['case']} style={styles.icon} contentFit="contain" />
            }
            icon={
              <PressableScale onPress={() => showImageOptions({ picType: 'insurance' })}>
                <View
                  width={82}
                  height={62}
                  backgroundColor={'primary'}
                  borderRadius={24}
                  alignItems={'center'}
                  justifyContent={'center'}
                  style={{ marginRight: -16 }}
                >
                  <Image
                    source={icons.gallary}
                    style={styles.icon}
                    contentFit="contain"
                  />
                </View>
              </PressableScale>
            }
          />

          <ControlledInput
            placeholder="W9Url"
            control={control}
            name="W9Url"
            leftIcon={
              <Image source={icons['case']} style={styles.icon} contentFit="contain" />
            }
            icon={
              <PressableScale onPress={() => showImageOptions({ picType: 'w9url' })}>
                <View
                  width={82}
                  height={62}
                  backgroundColor={'primary'}
                  borderRadius={24}
                  alignItems={'center'}
                  justifyContent={'center'}
                  style={{ marginRight: -16 }}
                >
                  <Image
                    source={icons.gallary}
                    style={styles.icon}
                    contentFit="contain"
                  />
                </View>
              </PressableScale>
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
        <View paddingHorizontal={'large'}>
          <Button label="Submit" onPress={handleSubmit(onSubmit)} loading={isLoading} />
        </View>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default RegisterContractor;

const styles = StyleSheet.create({
  logo: {
    height: scale(17),
    width: scale(98),
  },
  icon: { height: 24, width: 24 },
});
