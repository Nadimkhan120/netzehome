import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from '@shopify/restyle';
import React, { useCallback, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import * as z from 'zod';

import { BottomModal } from '@/components/bottom-modal';
import StepIndicator from '@/components/indicator-2';
import { ScreenHeader } from '@/components/screen-header';
import { SelectModalItem } from '@/components/select-modal-item';
import { SelectOptionButton } from '@/components/select-option-button';
import { JobMenu } from '@/constants/job-menu';
import type { Theme } from '@/theme';
import { Button, ControlledInput, Screen, Text, View } from '@/ui';

const labels = ['Registration', 'Information', 'Invite'];

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email('Invalid email format'),
  role: z.string({
    required_error: 'Role required',
  }),
});

export type CompanyInformationFormType2 = z.infer<typeof schema>;

export const SendInvite = () => {
  const { colors } = useTheme<Theme>();
  //const { navigate } = useNavigation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,

    watch,
  } = useForm<CompanyInformationFormType2>({
    resolver: zodResolver(schema),
  });

  const watchRole = watch('role');

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['35%'], []);

  const onSubmit = (data: CompanyInformationFormType2) => {
    console.log('data', data);

    //navigate("SendInvite");
  };

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

  const selectRole = (data) => {
    setValue('role', data);
    handleDismissModalPress();
  };

  const renderItem = useCallback(({ item }: any) => {
    return <SelectModalItem title={item?.title} onPress={selectRole} />;
  }, []);

  return (
    <Screen backgroundColor={colors.white} edges={['top', 'bottom']}>
      <ScreenHeader />

      <View
        paddingHorizontal={'large'}
        backgroundColor={'grey500'}
        paddingBottom={'medium'}
      >
        <StepIndicator stepCount={3} currentPosition={2} labels={labels} />
      </View>

      <View flex={1} paddingHorizontal={'large'}>
        <View height={scale(12)} />

        <View paddingTop={'large'}>
          <Text variant={'semiBold24'} color={'black'}>
            Invite Colleague
          </Text>
          <Text variant={'regular14'} paddingTop={'small'} color={'grey100'}>
            Complete your profile by adding further information
          </Text>
        </View>

        <View paddingTop={'large'} flexDirection={'row'}>
          <View flex={0.7} marginRight={'medium'}>
            <ControlledInput
              placeholder="Enter email"
              label="Email"
              control={control}
              name="email"
            />
          </View>

          <View flex={0.3}>
            <SelectOptionButton
              label="Role"
              isSelected={watchRole ? true : false}
              selectedText={watchRole ?? 'Role'}
              icon="arrow-ios-down"
              onPress={handlePresentModalPress}
              error={errors?.role?.message}
            />
          </View>
        </View>

        <View flex={1} justifyContent={'flex-end'} paddingBottom={'large'}>
          <View
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <View width={scale(100)}>
              <Button
                backgroundColor={'black'}
                label="Finish"
                onPress={handleSubmit(onSubmit)}
              />
            </View>
            <View width={scale(100)}>
              <Button
                label="Skip"
                onPress={handleSubmit(onSubmit)}
                backgroundColor={'grey300'}
              />
            </View>
          </View>
        </View>
      </View>

      <BottomModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: colors.background }}
      >
        <BottomSheetFlatList
          contentContainerStyle={styles.contentContainer}
          data={JobMenu}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </BottomModal>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: scale(24),
    paddingHorizontal: scale(16),
  },
});
