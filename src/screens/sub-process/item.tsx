/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/exhaustive-deps */
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet } from 'react-native';
import * as mime from 'react-native-mime-types';

import { icons } from '@/assets/icons';
import { queryClient } from '@/services/api/api-provider';
import {
  useRejectStatus,
  useStartStatus,
  useUploadWorkImages,
  useWorkDone,
  useWorksWithWorkId,
} from '@/services/api/auth/login';
import { useUser } from '@/store/user';
import { PressableScale, Text, View } from '@/ui';
import { showErrorMessage } from '@/utils';

type ItemProps = {
  item: any;
  workId?: any;
};

const Item = ({ item }: ItemProps) => {
  const [localImage, setLocalImage] = useState(null);

  const { navigate } = useNavigation();

  const { showActionSheetWithOptions } = useActionSheet();

  const user = useUser((state) => state?.user);

  const { mutate: startWorkApi, isLoading } = useStartStatus();
  const { mutate: uploadImageApi, isLoading: uploadingImage } = useUploadWorkImages();

  const { mutate: markAsDoneApi, isLoading: isMarking } = useWorkDone();
  const { mutate: rejectStatusApi, isLoading: rejecting } = useRejectStatus();

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

  const getImageSource = () => {
    if (item?.ContractorPhotoFilePath) {
      return { uri: item.ContractorPhotoFilePath, api: true };
    } else if (localImage) {
      return { uri: localImage.uri, api: false };
    } else {
      return { icon: icons['placeholder-image'], api: false };
    }
  };

  const startWork = () => {
    startWorkApi(
      {
        ProjectManagerId: user?.UserTypeInfo?.ProjectManagerID,
        workId: item?.WorkItemID,
      },
      {
        onSuccess: (data: any) => {
          console.log('data', JSON.stringify(data, null, 2));

          if (data) {
            queryClient.invalidateQueries(useWorksWithWorkId.getKey());
          }
        },
        onError: (error) => {
          console.log('error', error?.response);

          // @ts-ignore
          showErrorMessage(error?.response?.data?.message ?? '');
        },
      }
    );
  };

  const markAsDone = () => {
    markAsDoneApi(
      {
        workIdItemId: item?.WorkItemID,
      },
      {
        onSuccess: (data: any) => {
          console.log('data', JSON.stringify(data, null, 2));

          if (data) {
            queryClient.invalidateQueries(useWorksWithWorkId.getKey());
          }
        },
        onError: (error) => {
          console.log('error', error?.response);

          // @ts-ignore
          showErrorMessage(error?.response?.data?.message ?? '');
        },
      }
    );
  };

  const rejectStatus = () => {
    rejectStatusApi(
      {
        workIdItemId: item?.WorkItemID,
      },
      {
        onSuccess: (data: any) => {
          console.log('data', JSON.stringify(data, null, 2));

          if (data) {
            queryClient.invalidateQueries(useWorksWithWorkId.getKey());
          }
        },
        onError: (error) => {
          console.log('error', error?.response);

          // @ts-ignore
          showErrorMessage(error?.response?.data?.message ?? '');
        },
      }
    );
  };

  const uploadImage = () => {
    if (localImage === null) {
      Alert.alert('Error', 'Please select image first');
      return;
    }

    const data = new FormData();

    let fileName;

    const uriParts = localImage.uri.split('/');
    fileName = uriParts[uriParts.length - 1];

    // Append other form data fields if they are defined
    data.append('description', '');
    data.append('contractorID', user?.UserTypeInfo?.ContractorID);

    // Append W9Url file
    data.append('photos', {
      name: fileName,
      type: mime.lookup(localImage.uri.replace('file://', '')),
      uri: Platform.OS === 'ios' ? localImage.uri.replace('file://', '') : localImage.uri,
    });

    uploadImageApi(
      {
        workIdItemId: item?.WorkItemID,
        formData: data,
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onSuccess: (data: any) => {
          console.log('data', JSON.stringify(data, null, 2));

          if (data) {
            queryClient.invalidateQueries(useWorksWithWorkId.getKey());
          }
        },
        onError: (error) => {
          console.log('error', error?.response?.data);

          // @ts-ignore
          showErrorMessage(error?.response?.data?.message ?? '');
        },
      }
    );
  };

  const goToUploadImags = () => {
    navigate('UploadImages', { id: item?.WorkItemID });
  };

  // console.log('item', JSON.stringify(item, null, 2));
  // console.log('user', JSON.stringify(user, null, 2));

  return (
    <View
      backgroundColor={item?.Status === 'done' ? 'primary' : 'white'}
      borderRadius={14}
      padding={'large'}
    >
      {getImageSource().api ? (
        <View height={200} borderRadius={10}>
          <Image
            source={getImageSource()}
            style={styles.image2}
            contentFit="cover"
            transition={500}
            placeholder={'https://fakeimg.pl/400x400/cccccc/cccccc'}
          />
        </View>
      ) : getImageSource()?.icon ? (
        <PressableScale
          disabled={item?.Status === 'Pending' || user?.UserTypeID !== 2}
          onPress={goToUploadImags}
        >
          <View height={200} borderRadius={10} style={styles.imageContainer}>
            <Image
              source={getImageSource().icon}
              style={styles.image}
              contentFit="contain"
            />
          </View>
        </PressableScale>
      ) : (
        <PressableScale onPress={showImageOptions}>
          <View height={200} borderRadius={10}>
            <Image
              source={getImageSource()}
              style={styles.image2}
              transition={500}
              placeholder={'https://fakeimg.pl/400x400/cccccc/cccccc'}
              contentFit="cover"
            />
          </View>
        </PressableScale>
      )}

      <View flex={1}>
        <Text
          variant={'semiBold14'}
          paddingTop={'small'}
          color={item?.Status === 'done' ? 'white' : 'black'}
        >
          {item?.Name}
        </Text>
        <Text
          variant={'regular14'}
          paddingTop={'xSmall'}
          color={item?.Status === 'done' ? 'white' : 'grey100'}
        >
          {item?.ContractorPhotoDescription ?? item?.Description}
        </Text>

        {item?.Status !== 'done' ? (
          <View
            alignSelf={'flex-end'}
            paddingTop={'medium'}
            flexDirection={'row'}
            alignItems={'center'}
          >
            <Text variant={'semiBold14'}>Current Status:</Text>
            <View
              width={124}
              height={32}
              marginLeft={'medium'}
              borderRadius={24}
              backgroundColor={'primary'}
              alignSelf={'flex-end'}
              alignItems={'center'}
              justifyContent={'center'}
              style={{
                backgroundColor: '#E6A9A6',
              }}
            >
              <Text variant={'medium14'} color={'white'}>
                {item?.Status}
              </Text>
            </View>
          </View>
        ) : null}

        {item?.Status === 'rejected' &&
        user?.UserTypeID === 2 &&
        item?.ContractorPhotoFilePath === null ? (
          <View alignSelf={'center'}>
            <PressableScale onPress={goToUploadImags}>
              <View
                marginTop={'large'}
                width={124}
                height={32}
                borderRadius={24}
                backgroundColor={'primary'}
                alignSelf={'flex-end'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Text variant={'medium14'} color={'white'}>
                  Re-submit
                </Text>
              </View>
            </PressableScale>
          </View>
        ) : null}
      </View>

      {item?.Status === 'done' ? (
        <View paddingTop={'medium'} alignSelf={'center'}>
          <Text variant={'medium14'} color={'white'}>
            Approved
          </Text>
        </View>
      ) : null}

      {item?.Status === 'Pending' && user?.UserTypeID === 3 ? (
        <View alignSelf={'center'} paddingTop={'medium'}>
          <PressableScale onPress={startWork}>
            <View
              backgroundColor={'primary'}
              width={124}
              height={32}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={32}
            >
              <Text variant={'medium14'} color={'white'}>
                {isLoading ? 'Starting' : 'Start'}
              </Text>
            </View>
          </PressableScale>
        </View>
      ) : null}

      {item?.Status === 'started' &&
      user?.UserTypeID === 3 &&
      item?.ContractorPhotoFilePath ? (
        <View
          paddingTop={'medium'}
          justifyContent={'space-around'}
          flexDirection={'row'}
          alignItems={'center'}
        >
          <PressableScale onPress={rejectStatus}>
            <View
              backgroundColor={'primary'}
              width={124}
              height={32}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={32}
              style={{
                backgroundColor: '#0C1844',
              }}
            >
              <Text variant={'medium14'} color={'white'}>
                {rejecting ? 'Rejecting' : 'Reject'}
              </Text>
            </View>
          </PressableScale>
          <PressableScale onPress={markAsDone}>
            <View
              backgroundColor={'primary'}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={32}
              width={124}
              height={32}
            >
              <Text variant={'medium14'} color={'white'}>
                {isMarking ? 'Accepting' : 'Accept'}
              </Text>
            </View>
          </PressableScale>
        </View>
      ) : null}

      {item?.Status === 'started' &&
      user?.UserTypeID === 2 &&
      item?.ContractorPhotoFilePath === null ? (
        <View alignSelf={'center'} paddingTop={'medium'}>
          <PressableScale
            //onPress={uploadImage}
            onPress={goToUploadImags}
          >
            <View
              backgroundColor={'primary'}
              width={124}
              height={32}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={32}
            >
              <Text variant={'medium14'} color={'white'}>
                {uploadingImage ? 'Adding' : 'Add'}
              </Text>
            </View>
          </PressableScale>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#E6A9A6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer2: {
    backgroundColor: '#E6A9A6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: 120, height: 72, tintColor: 'white' },
  image2: { height: 200, borderRadius: 10 },
});

export default Item;
