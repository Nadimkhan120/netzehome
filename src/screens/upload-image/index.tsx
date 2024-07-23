/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, TextInput } from 'react-native';
import * as mime from 'react-native-mime-types';

import { icons } from '@/assets/icons';
import { ScreenHeader } from '@/components/screen-header';
import { queryClient } from '@/services/api/api-provider';
import { useUploadWorkImages, useWorksWithWorkId } from '@/services/api/auth/login';
import { useUser } from '@/store/user';
import { type Theme } from '@/theme';
import { Button, PressableScale, Screen, View } from '@/ui';
import { showErrorMessage, showSuccessMessage } from '@/utils';

const UploadImages = () => {
  const [localImage, setLocalImage] = useState(null);
  const [description, setDescription] = useState('');

  const { colors } = useTheme<Theme>();

  const route = useRoute<any>();

  const { showActionSheetWithOptions } = useActionSheet();

  const user = useUser((state) => state?.user);

  const { mutate: uploadImageApi, isLoading: uploadingImage } = useUploadWorkImages();

  const [cameraPermissionStatus, requestCameraPermission] =
    ImagePicker.useCameraPermissions();
  const [galleryPermission, requestGalleryPermission] =
    ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    if (!cameraPermissionStatus?.granted) {
      requestCameraPermission();
    }
    if (!galleryPermission?.granted) {
      requestGalleryPermission();
    }
  }, [cameraPermissionStatus, galleryPermission]);

  const showImageOptions = () => {
    const options = ['Gallery', 'Camera', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case 0:
            pickImage();
            break;
          case 1:
            takeImage();
            break;
          case cancelButtonIndex:
            // Canceled
            break;
        }
      }
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setLocalImage(result.assets[0]);
    }
  };

  const takeImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setLocalImage(result.assets[0]);
    }
  };

  const uploadImage = () => {
    if (localImage === null) {
      Alert.alert('Error', 'Please select image first');
      return;
    }

    if (description === '') {
      Alert.alert('Error', 'Please enter description');
      return;
    }

    const data = new FormData();

    let fileName;

    const uriParts = localImage.uri.split('/');
    fileName = uriParts[uriParts.length - 1];

    // Append other form data fields if they are defined
    data.append('description', description);
    data.append('contractorID', user?.UserTypeInfo?.ContractorID);

    // Append W9Url file
    data.append('photos', {
      name: fileName,
      type: mime.lookup(localImage.uri.replace('file://', '')),
      uri: Platform.OS === 'ios' ? localImage.uri.replace('file://', '') : localImage.uri,
    });

    uploadImageApi(
      {
        workIdItemId: route?.params?.id,
        formData: data,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onSuccess: (data: any) => {
          console.log('data', JSON.stringify(data, null, 2));

          if (data) {
            queryClient.invalidateQueries(useWorksWithWorkId.getKey());
            showSuccessMessage('Image uploaded successfully');
          }
        },
        onError: (error) => {
          console.log('error', error?.response?.data);

          // @ts-ignore
          showErrorMessage(error?.response?.data?.message ?? 'Internal server error');
        },
      }
    );
  };

  return (
    <Screen backgroundColor={colors.white}>
      <ScreenHeader title="Upload Image" />
      <View flex={1} backgroundColor={'newGrey'} margin={'medium'} borderRadius={14}>
        <View
          backgroundColor={'white'}
          borderRadius={14}
          padding={'large'}
          margin={'small'}
        >
          {localImage ? (
            <PressableScale onPress={showImageOptions}>
              <View height={200} borderRadius={10} style={styles.imageContainer}>
                <Image
                  source={{ uri: localImage?.uri }}
                  style={styles.image2}
                  contentFit="cover"
                />
              </View>
            </PressableScale>
          ) : (
            <PressableScale onPress={showImageOptions}>
              <View height={200} borderRadius={10} style={styles.imageContainer2}>
                <Image
                  source={icons['placeholder-image']}
                  style={styles.image}
                  transition={500}
                  placeholder={'https://fakeimg.pl/400x400/cccccc/cccccc'}
                  contentFit="cover"
                />
              </View>
            </PressableScale>
          )}

          <View marginVertical={'large'} backgroundColor={'newGrey'} borderRadius={10}>
            <TextInput
              style={{
                height: 109,
                borderRadius: 14,
                paddingHorizontal: 16,
                paddingVertical: 16,
                marginTop: 16,
              }}
              placeholder="Enter Description"
              textAlignVertical="top"
              multiline={true}
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <Button label="Submit" onPress={uploadImage} loading={uploadingImage} />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    // backgroundColor: '#E6A9A6',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  imageContainer2: {
    backgroundColor: '#E6A9A6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: 120, height: 72, tintColor: 'white' },
  image2: { height: 200, borderRadius: 10 },
});

export default UploadImages;
