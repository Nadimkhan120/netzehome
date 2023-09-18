import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { ScrollView } from 'react-native';
import { scale } from 'react-native-size-matters';

import { ScreenHeader } from '@/components/screen-header';
import { data } from '@/constants/applicant-list';
import type { Theme } from '@/theme';
import { PressableScale, Screen, Text, View } from '@/ui';

import ApplicantList from '../applicants/applicants-list';
import Footer from './footer-chart';
import OverviewJob from './overview-job';
import VacanciesStatus from './vacancy-status';

const JobDetail = () => {
  const { colors } = useTheme<Theme>();

  const { navigate } = useNavigation();

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader icon="close" showBorder={true} />

      <View flex={1}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingBottom: scale(60),
          }}
        >
          <OverviewJob />
          <View height={scale(10)} backgroundColor={'grey500'} />
          <VacanciesStatus />

          <View
            flexDirection={'row'}
            paddingHorizontal={'large'}
            alignItems={'center'}
            justifyContent={'space-between'}
            backgroundColor={'grey500'}
            paddingVertical={'large'}
            style={{
              marginTop: -scale(16),
            }}
          >
            <Text variant={'medium16'} color={'black'}>
              High Matches
            </Text>
            <PressableScale onPress={() => navigate('Applicants')}>
              <Text
                color={'primary'}
                variant={'regular13'}
                textDecorationLine={'underline'}
              >
                See All
              </Text>
            </PressableScale>
          </View>

          <View>
            {data?.map((item, index) => {
              return (
                <ApplicantList
                  key={index}
                  data={item}
                  onPress={() => navigate('Job')}
                  onOptionPress={() => null}
                />
              );
            })}
          </View>
          <View height={scale(16)} backgroundColor={'grey500'} />
          <Footer />
        </ScrollView>
      </View>
    </Screen>
  );
};

export default JobDetail;
