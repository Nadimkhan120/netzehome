import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import { icons } from '@/assets/icons';
import { ScreenHeader } from '@/components/screen-header';
import { useRefreshOnFocus, useSoftKeyboardEffect } from '@/hooks';
import { queryClient } from '@/services/api/api-provider';
import { setProfilePic, useUser } from '@/store/user';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, View, Text } from '@/ui';
import { DescriptionField } from '@/ui/description-field';
import { showErrorMessage, showSuccessMessage } from '@/utils';
import { Avatar } from '@/components/avatar';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import { useGetUserProfileDetails, useGetProfile } from '@/services/api/home';
import { useUpdatePicture } from '@/services/api/profile';
import * as mime from 'react-native-mime-types';
import Loader from '@/components/loader';

const schema = z.object({
  name: z.string({
    required_error: 'Profile name is required',
  }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  cover: z.string({
    required_error: 'Cover Letter is required',
  }),
  location: z.string().optional(),
  salary: z.string().optional(),
  languages: z.string().optional(),
});

export type EditProfileFormType = z.infer<typeof schema>;

export const EditProfile = () => {
  const { colors } = useTheme<Theme>();
  const { goBack } = useNavigation();
  const route = useRoute<any>();
  const { width } = useWindowDimensions();
  const user = useUser((state) => state.profile);

  useSoftKeyboardEffect();
  const { showActionSheetWithOptions } = useActionSheet();

  const [image, setImage] = useState(null);
  const [picTyp, setPicType] = useState(null);
  const [cameraPermissionStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [galleryPermission, requestGallaryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  const { data, isLoading, refetch } = useGetUserProfileDetails({
    variables: {
      id: route?.params?.user?.unique_id,
    },
  });

  useRefreshOnFocus(refetch);

  const profileData = data?.response?.data;

  const { handleSubmit, control, setValue } = useForm<EditProfileFormType>({
    resolver: zodResolver(schema),
    // defaultValues: {
    //   companyName: data?.name,
    //   email: data?.email,
    //   phone: data?.location?.phone,
    //   website: data?.location?.website,
    //   bio: data?.short_description,
    //   employees: data?.no_of_employees,
    //   wage: data?.average_wage,
    //   address: data?.location?.address_1,
    //   city: data?.location?.city_name,
    //   country: data?.location?.country_name,
    //   facebook: data?.facebook_link,
    //   instgram: data?.instagram_link,
    //   whatsapp: data?.twitter_link,
    // },
  });

  const { mutate: updateProfilePic, isLoading: savingPic } = useUpdatePicture();

  const onSubmit = (data: EditProfileFormType) => {
    return;
  };

  useEffect(() => {}, []);

  useEffect(() => {
    if (!cameraPermissionStatus?.granted) {
      requestCameraPermission();
    }
    if (!galleryPermission?.granted) {
      requestGallaryPermission();
    }
  }, []);

  const updateProfilePicApiCall = ({
    asset,
    picType,
  }: {
    asset: any;
    picType: 'pic' | 'cover';
  }) => {
    const data = new FormData();

    let fileName;
    if (asset.fileName === null) {
      const uriParts = asset.uri.split('/');
      fileName = uriParts[uriParts.length - 1];
    } else {
      fileName = asset.fileName;
    }

    data.append('file', {
      name: fileName,
      type: mime.lookup(asset?.uri?.replace('file://', '')),
      uri: Platform.OS === 'ios' ? asset?.uri?.replace('file://', '') : asset?.uri,
    });

    data?.append('id', route?.params?.user?.unique_id);
    data?.append('type', picType);

    updateProfilePic(data, {
      onSuccess: (response) => {
        if (response?.response?.status === 200) {
          queryClient.invalidateQueries(useGetProfile.getKey());
          if (user?.unique_id === route?.params?.user?.unique_id) {
            setProfilePic(response?.response?.path);
          }
          // goBack();
          showSuccessMessage('Experience Updated successfully');
        } else {
        }
      },
      onError: (error) => {
        // An error happened!
        // @ts-ignore
        console.log(`error`, error?.response?.data?.message);
      },
    });
  };

  const pickImage = async (picType) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: picType === 'cover' ? [4, 2] : [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPicType(picType);
      const asset = result?.assets[0];
      updateProfilePicApiCall({ asset, picType });
    }
  };

  const takeImage = async (picType) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setPicType(picType);
      const asset = result?.assets[0];
      updateProfilePicApiCall({ asset, picType });
    }
  };

  const takeProfilePic = ({ picType }: { picType: 'pic' | 'cover' }) => {
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

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title="Edit Profile" showBorder={true} icon="close" />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <View>
            <Image
              cachePolicy="memory-disk"
              source={picTyp === 'cover' ? image : profileData?.cover_pic}
              style={{ height: scale(119), width: width }}
              transition={1000}
              placeholder={`https://fakeimg.pl/${width}x400/cccccc/cccccc`}
            />

            <View position={'absolute'} right={16} top={16}>
              <TouchableOpacity onPress={() => takeProfilePic({ picType: 'cover' })}>
                <View
                  height={scale(24)}
                  justifyContent={'center'}
                  alignItems={'center'}
                  width={scale(24)}
                  backgroundColor={'white'}
                  borderRadius={scale(12)}
                >
                  <Image
                    source={icons['camera']}
                    style={{ height: scale(16), width: scale(16) }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View
            marginLeft={'large'}
            style={{
              marginTop: -28,
            }}
          >
            <View alignSelf={'baseline'}>
              <Avatar
                cachePolicy="none"
                source={picTyp === 'pic' ? image : profileData?.profile_pic}
                size="large"
                onPress={() => takeProfilePic({ picType: 'pic' })}
                transition={1000}
                placeholder={'https://fakeimg.pl/400x400/cccccc/cccccc'}
              />
              <View position={'absolute'} right={0} top={0}>
                <TouchableOpacity onPress={() => takeProfilePic({ picType: 'pic' })}>
                  <View
                    height={scale(24)}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={scale(24)}
                    backgroundColor={'white'}
                    borderRadius={scale(12)}
                  >
                    <Image
                      source={icons['camera']}
                      style={{ height: scale(16), width: scale(16) }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* <View height={scale(44)} /> */}

        <View paddingTop={'large'} paddingHorizontal={'large'} rowGap={'small'}>
          <ControlledInput
            placeholder="Enter  name"
            label="Profile Name"
            control={control}
            name="name"
          />

          <ControlledInput
            placeholder="Enter job tilte"
            label="Job Title"
            control={control}
            name="email"
          />

          <ControlledInput
            placeholder="Enter salary"
            label="Expected Salary"
            control={control}
            name="salary"
          />
          <ControlledInput
            placeholder="e.g Urdu, English"
            label="Languages"
            control={control}
            name="languages"
          />

          <ControlledInput
            placeholder="Enter email"
            label="Email"
            control={control}
            name="email"
          />

          <ControlledInput
            placeholder="Enter location."
            label="Location"
            control={control}
            name="location"
          />

          <DescriptionField
            placeholder="Write here"
            label="Cover Letter"
            control={control}
            name="cover"
          />
        </View>
        <View height={scale(24)} />
        <View flex={1} justifyContent={'flex-end'} paddingHorizontal={'large'}>
          <Button label="Update" onPress={handleSubmit(onSubmit)} loading={isLoading} />
        </View>
      </ScrollView>

      <Loader isVisible={savingPic} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: scale(160),
  },
});
