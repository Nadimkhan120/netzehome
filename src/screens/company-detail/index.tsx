import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { CompanyButton } from '@/components/company-button';
import { ScreenHeader } from '@/components/screen-header';
import type { Theme } from '@/theme';
import { Screen, Text, View } from '@/ui';

const InfoRow = ({ label, value, isGrey = true }) => {
  return (
    <View
      flexDirection={'row'}
      paddingVertical={'medium'}
      alignItems={'center'}
      justifyContent={'space-between'}
      paddingHorizontal={'large'}
      borderBottomColor={'grey500'}
      borderBottomWidth={1}
    >
      <Text variant={'regular14'} color={'grey200'}>
        {label}
      </Text>
      <Text variant={'medium14'} color={isGrey ? 'grey100' : 'info'}>
        {value}
      </Text>
    </View>
  );
};

export const CompanyDetail = () => {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

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

        <View padding={'large'}>
          <View position={'absolute'} right={scale(16)} bottom={0}>
            <CompanyButton
              icon="pencl"
              onPress={() => navigation.navigate('EditCompany')}
              size={scale(24)}
              imageSize={scale(24)}
            />
          </View>
        </View>
        <View height={scale(19)} />
        <View paddingHorizontal={'large'} paddingVertical={'large'}>
          <Text variant={'semiBold20'} color={'black'}>
            vFairs
          </Text>
          <Text variant={'regular13'} color={'grey200'}>
            Lahore-Islamabad Motorway, Punjab, Pakistan
          </Text>
        </View>

        <View paddingHorizontal={'large'} paddingTop={'medium'}>
          <Text variant={'medium20'} color={'black'}>
            About Company
          </Text>

          <Text
            paddingTop={'small'}
            variant={'regular14'}
            color={'grey200'}
            lineHeight={21}
          >
            A well-established company that is helping organizations across a
            wide range of sectors to pay, manage, and recruit workers around the
            world, is looking for a Senior Designer. The selected candidate will
            be reporting to the CTO and CPO while leading the website design
            team and navigating through complex networks of touchpoints while
            promoting a problem-first strategy. The U.S.-based company provides
            enterprises with the technology, local insight, and services they
            need to adapt to a constantly changing global market. This is a
            great opportunity for candidates to prove themselves while working
            to build world-class products.
          </Text>
        </View>

        <View height={scale(16)} />

        <View paddingTop={'large'}>
          <Text
            paddingHorizontal={'large'}
            variant={'medium20'}
            color={'black'}
          >
            Company Detail
          </Text>

          <InfoRow label={'Email'} value={'Nadeem@gmail.com'} isGrey={false} />
          <InfoRow
            label={'Phone Number'}
            value={'+923450221988'}
            isGrey={false}
          />
          <InfoRow label={'Website'} value={'Jubulus.com'} isGrey={false} />
          <InfoRow
            label={'Employees'}
            value={'Nadeem@gmail.com'}
            isGrey={true}
          />
          <InfoRow
            label={'Category'}
            value={'Nadeem@gmail.com'}
            isGrey={true}
          />
          <InfoRow
            label={'Industry'}
            value={'Nadeem@gmail.com'}
            isGrey={true}
          />
          <InfoRow
            label={'Work Time'}
            value={'Nadeem@gmail.com'}
            isGrey={true}
          />
          <InfoRow
            label={'Average Wage'}
            value={'Nadeem@gmail.com'}
            isGrey={true}
          />
        </View>

        <View paddingTop={'large'}>
          <Text
            paddingHorizontal={'large'}
            variant={'medium20'}
            color={'black'}
          >
            Social Links
          </Text>

          <InfoRow
            label={'Facebook'}
            value={'Nadeem@gmail.com'}
            isGrey={true}
          />
          <InfoRow
            label={'Instagram'}
            value={'Nadeem@gmail.com'}
            isGrey={true}
          />
          <InfoRow
            label={'Linkenin'}
            value={'Nadeem@gmail.com'}
            isGrey={true}
          />
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
