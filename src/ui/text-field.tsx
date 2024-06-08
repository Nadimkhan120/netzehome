import { useTheme } from '@shopify/restyle';
import { Image } from 'expo-image';
import * as React from 'react';
import type { TextInput, TextInputProps } from 'react-native';
import { StyleSheet, TextInput as NTextInput } from 'react-native';
import { scale } from 'react-native-size-matters';

import { icons } from '@/assets/icons';
import { palette, type Theme } from '@/theme';
import { PressableScale, Text, View } from '@/ui';

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  isSecure?: boolean;
  icon?: React.ReactElement;
  leftIcon?: React.ReactElement;
}

export const TextField = React.forwardRef<TextInput, NInputProps>((props, ref) => {
  const { label, error, isSecure, icon, leftIcon, ...inputProps } = props;

  const theme = useTheme<Theme>();

  const [isFocussed, setIsFocussed] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(isSecure);

  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocus = React.useCallback(() => setIsFocussed(true), []);

  const togglePassword = React.useCallback(
    () => setShowPassword(!showPassword),
    [showPassword]
  );

  return (
    <View>
      <View
        flexDirection={'row'}
        alignItems={'center'}
        borderRadius={24}
        height={56}
        paddingHorizontal={'medium'}
        borderColor={error ? 'error' : isFocussed ? 'black' : 'inputBorder'}
        borderWidth={1}
        backgroundColor={'inputBg'}
      >
        <View>{leftIcon && leftIcon}</View>
        <NTextInput
          testID="STextInput"
          ref={ref}
          placeholderTextColor={theme.colors.grey300}
          onBlur={onBlur}
          onFocus={onFocus}
          {...inputProps}
          style={styles.input}
          secureTextEntry={showPassword}
        />
        {isSecure ? (
          <PressableScale onPress={togglePassword}>
            <Image
              source={showPassword ? icons['eye-slash'] : icons.eye}
              style={styles.icon}
              contentFit="contain"
            />
          </PressableScale>
        ) : null}
        {icon && icon}
      </View>
      {error && (
        <Text paddingTop={'small'} variant="regular14" color={'error'}>
          {error}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    height: 56,
    flex: 1,
    borderRadius: 24,
    paddingHorizontal: scale(8),
    color: palette.black,
  },
  icon: { height: 24, width: 24 },
});
