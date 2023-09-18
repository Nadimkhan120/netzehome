import React, { useCallback, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { useMix, useSharedTransition } from "../animated";
import { execFunc } from "../common";
import { styles } from "./styles";
import { CheckboxProps } from "./type";
import { Image } from "expo-image";
import { icons } from "@/assets/icons";

const AnimatedCheck = Animated.createAnimatedComponent(Image);

export const CheckBox = ({
  value,
  style,
  outlineStyle: outlineStyleOverwrite,
  onToggle,
  disable = false,
  initialValue = false,
  fillStyle,
}: CheckboxProps) => {
  // state
  const [localValue, setLocalValue] = useState<boolean>(initialValue);
  const progress = useSharedTransition(value ?? localValue);
  const scale = useMix(progress, 0, 1);
  const opacity = useMix(progress, 0, 1);

  // function
  const onPress = useCallback(() => {
    if (typeof value === "boolean") {
      execFunc(onToggle, !value);
    } else {
      execFunc(onToggle, !localValue);
      setLocalValue((v) => !v);
    }
  }, [localValue, onToggle, value]);

  // reanimated style
  const styleAnimated = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  // render
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={disable}
      onPress={onPress}
      style={[styles.root, style]}
    >
      <>
        <View style={[styles.outline, outlineStyleOverwrite]}>
          <Animated.View style={[styles.fill, fillStyle, styleAnimated]}>
            <Image
              source={icons["check-white"]}
              style={{ height: 8, width: 12 }}
              contentFit="contain"
            />
          </Animated.View>
        </View>
        {/* <View style={[styles.outline, outlineStyleOverwrite]}>
          {value ? (
            <AnimatedCheck
              source={icons.check}
              contentFit="contain"
              style={[styles.fill, styleAnimated]}
            />
          ) : null}
        </View> */}
      </>
    </TouchableOpacity>
  );
};
