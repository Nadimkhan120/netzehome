import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import { icons } from '@/assets/icons';
import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { PressableScale, Screen, Text, View } from '@/ui';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import { Avatar } from '@/components/avatar';
import { useGetUserProfileDetails } from '@/services/api/home';
import { useRefreshOnFocus } from '@/hooks';
import { ExperienceItem } from './experience-item';

const InfoRow = ({ label, onPress, children }) => {
  return (
    <View borderBottomColor={'grey500'} paddingVertical={'medium'} borderBottomWidth={1}>
      <View
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        paddingHorizontal={'large'}
      >
        <Text variant={'regular14'} color={'grey200'}>
          {label}
        </Text>
        <PressableScale onPress={onPress}>
          <Image
            source={icons['plus2']}
            style={{ width: scale(24), height: scale(24) }}
            contentFit="contain"
          />
        </PressableScale>
      </View>
      {children}
    </View>
  );
};

export const Profile = () => {
  const { colors } = useTheme<Theme>();
  const { navigate } = useNavigation();
  const { width } = useWindowDimensions();

  const route = useRoute<any>();

  const { data, isLoading, refetch } = useGetUserProfileDetails({
    variables: {
      id: route?.params?.id,
    },
  });

  useRefreshOnFocus(refetch);

  const profileData = data?.response?.data;

  console.log('profileData', JSON.stringify(profileData, null, 2));

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader title={profileData?.full_name} showBorder={true} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View height={scale(119)}>
          <Image
            source={{ uri: profileData?.cover_pic }}
            style={{ height: scale(119), width: width }}
            transition={1000}
            placeholder={`https://fakeimg.pl/${width}x200/cccccc/cccccc`}
          />
          <View
            alignSelf={'flex-start'}
            position={'absolute'}
            // bottom={0}
            marginLeft={'large'}
            style={{
              bottom: -scale(28),
            }}
          >
            <Avatar
              source={{ uri: profileData?.profile_pic }}
              transition={1000}
              placeholder={'https://fakeimg.pl/400x400/cccccc/cccccc'}
              size="large"
            />
          </View>
        </View>

        <View height={scale(19)} />

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigate('EditProfile', {
              user: { unique_id: profileData?.unique_id, ...profileData },
            })
          }
        >
          <Image source={icons['pencl']} style={styles.editImage} contentFit="contain" />
        </TouchableOpacity>

        <View paddingHorizontal={'large'} paddingVertical={'large'}>
          <Text variant={'semiBold20'} textTransform={'capitalize'} color={'black'}>
            {profileData?.full_name}
          </Text>
          <Text variant={'regular13'} color={'grey200'}>
            {profileData?.job_title}
          </Text>
          <Text variant={'regular13'} color={'grey200'}>
            {profileData?.city_name}, {profileData?.country_name}
          </Text>
        </View>

        <View borderBottomColor={'grey400'} borderBottomWidth={1}></View>

        <View paddingHorizontal={'large'} paddingTop={'medium'}>
          <Text variant={'medium20'} color={'black'}>
            About
          </Text>

          <Text
            paddingTop={'small'}
            variant={'regular14'}
            color={'grey200'}
            lineHeight={21}
          >
            I’m a strategist who constantly strives to achieve success through in-depth
            research and constant learning. Creating an optimal flow from the beginning of
            the process to the end is critical to any campaign’s outcome regardless of
            what mediums it occupies. My work helps both the team and the client to keep
            the user’s motivations, goals, and roles top of mind.
          </Text>
        </View>

        <View height={scale(16)} />

        <View paddingTop={'large'}>
          <InfoRow
            label={'Experience'}
            onPress={() => {
              navigate('AddExperience', { id: route?.params?.id });
            }}
          >
            <View paddingTop={'medium'}>
              {profileData?.experience?.map((element, index) => {
                return <ExperienceItem key={index} data={element} />;
              })}
            </View>
          </InfoRow>

          {/* <InfoRow
            label={'Education'}
            onPress={() => {
              navigate('AddEducation', { id: route?.params?.id });
            }}
          ></InfoRow> */}
          <InfoRow
            label={'Skills'}
            onPress={() => {
              navigate('ChooseSkills', { id: route?.params?.id });
            }}
          >
            <View
              flexDirection={'row'}
              alignItems={'center'}
              flexWrap={'wrap'}
              gap={'small'}
              paddingHorizontal={'large'}
              paddingTop={'medium'}
            >
              {profileData?.skills?.length &&
                profileData?.skills?.map((element, index) => {
                  return (
                    <View
                      paddingHorizontal={'large'}
                      backgroundColor={'primary'}
                      paddingVertical={'small'}
                      key={index}
                      borderRadius={44}
                    >
                      <Text color={'white'}>{element?.name}</Text>
                    </View>
                  );
                })}
            </View>
          </InfoRow>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: scale(160),
  },
  editButton: {
    alignItems: 'flex-end',
    position: 'absolute',
    right: scale(16),
    top: scale(130),
  },
  editImage: {
    height: scale(24),
    width: scale(24),
  },
});
