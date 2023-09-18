import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useCallback, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { BottomModal } from '@/components/bottom-modal';
import StepIndicator from '@/components/indicator-2';
import { ScreenHeader } from '@/components/screen-header';
import { SelectModalItem } from '@/components/select-modal-item';
import { SelectOptionButton } from '@/components/select-option-button';
import { useSoftKeyboardEffect } from '@/hooks';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, View } from '@/ui';

const labels = ['Job Detail', 'Post Detail', 'Preview', 'Payment'];

const data2 = [
  {
    icon: 'company',
    title: 'Job fair',
  },
  {
    icon: 'company',
    title: 'Skymind',
  },
];

const schema = z.object({
  company: z.string({
    required_error: 'Company is required',
  }),
  location: z.string({
    required_error: 'Job location is required',
  }),
  workSpace: z.string({
    required_error: 'Workspace type is required',
  }),
  date: z.string({
    required_error: 'Date  is required',
  }),
});

export type PostJobDetailFormType = z.infer<typeof schema>;

export const PostJobDetail = () => {
  const { colors } = useTheme<Theme>();
  const navigation = useNavigation();

  useSoftKeyboardEffect();

  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PostJobDetailFormType>({
    resolver: zodResolver(schema),
  });

  const watchCompany = watch('company');
  const watchDate = watch('date');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['35%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  // callbacks
  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('index', index);
  }, []);

  // @ts-ignore
  const onSubmit = (data: PostJobDetailFormType) => {
    console.log('data', data);

    //navigation.navigate("PostJobDetail");
  };

  console.log('onSubmit', onSubmit);

  const renderItem = useCallback(({ item }: any) => {
    return (
      <SelectModalItem
        title={item?.title}
        icon={item?.icon}
        onPress={(data) => {
          setValue('company', data);
          handleDismissModalPress();
        }}
      />
    );
  }, []);

  return (
    <Screen backgroundColor={colors.white} edges={['top']}>
      <ScreenHeader />
      <View
        paddingHorizontal={'large'}
        backgroundColor={'grey500'}
        paddingBottom={'medium'}
      >
        <StepIndicator stepCount={4} currentPosition={1} labels={labels} />
      </View>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View paddingTop={'large'} paddingHorizontal={'large'}>
          <SelectOptionButton
            label="Company"
            isSelected={watchCompany ? true : false}
            selectedText={watchCompany ?? 'Select company'}
            icon="arrow-ios-down"
            onPress={handlePresentModalPress}
            error={errors?.company?.message}
          />
          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter workspace"
            label="Workspace Type"
            control={control}
            name="workSpace"
          />

          <View height={scale(8)} />
          <ControlledInput
            placeholder="Enter location"
            label="Job Location"
            control={control}
            name="location"
          />

          <SelectOptionButton
            label="Deadline Date"
            isSelected={watchDate ? true : false}
            selectedText={watchDate ?? 'Select date'}
            icon="calendar"
            onPress={() => null}
          />
          <View height={scale(8)} />
        </View>

        <View height={scale(72)} />

        <View
          paddingVertical={'large'}
          borderTopWidth={1}
          borderTopColor={'grey400'}
        >
          <Button
            label="Next"
            marginHorizontal={'large'}
            onPress={() => {
              navigation.navigate('PostJobPreview');
            }}
          />
        </View>
      </ScrollView>

      <BottomModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: 'rgb(250,250,253)' }}
      >
        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          data={data2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </BottomModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: scale(100),
  },
  contentContainer: {
    paddingHorizontal: scale(16),
  },
});
