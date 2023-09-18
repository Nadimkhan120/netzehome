import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import SelectionBox from '@/components/drop-down';
import StepIndicator from '@/components/indicator-2';
import { ScreenHeader } from '@/components/screen-header';
import { useSoftKeyboardEffect } from '@/hooks';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, View } from '@/ui';
import { DescriptionField } from '@/ui/description-field';

const labels = ['Job Detail', 'Post Detail', 'Preview', 'Payment'];

const schema = z.object({
  jobTitle: z.string({
    required_error: 'Job title is required',
  }),
  description: z
    .string({
      required_error: 'Job description is required',
    })
    .max(500, 'Details must be max 500 characters'),
});

export type PostJobFormType = z.infer<typeof schema>;

export const Postjob = () => {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  useSoftKeyboardEffect();

  const { handleSubmit, control } = useForm<PostJobFormType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: PostJobFormType) => {
    console.log('data', data);

    navigation.navigate('PostJobDetail');
  };

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader />

      <View
        paddingHorizontal={'large'}
        backgroundColor={'grey500'}
        paddingBottom={'medium'}
      >
        <StepIndicator stepCount={4} currentPosition={0} labels={labels} />
      </View>

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View paddingTop={'large'} paddingHorizontal={'large'}>
          <ControlledInput
            placeholder="Enter job title"
            label="Job Title"
            control={control}
            name="jobTitle"
          />
          <View height={scale(8)} />
          <DescriptionField
            placeholder="Your Job Description"
            label="Job Description"
            control={control}
            name="description"
          />

          <View height={scale(8)} />

          <SelectionBox label="Job Type" placeholder="Select job type" />
          <SelectionBox label="Education" placeholder="Select education" />
          <SelectionBox
            label="Experience level"
            placeholder="Select experience"
          />
        </View>

        <View height={scale(20)} />

        <View
          paddingVertical={'large'}
          borderTopWidth={1}
          borderTopColor={'grey400'}
        >
          <Button
            label="Show Results"
            marginHorizontal={'large'}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: scale(100),
  },
});
