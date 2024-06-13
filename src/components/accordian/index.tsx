/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type AccordianProps = {
  title: string;
  content: React.ReactElement;
  expanded: boolean;
  onPress: () => void;
  number: number;
};

// const AnimatedIcon = Animated.createAnimatedComponent(Icon);

// eslint-disable-next-line max-lines-per-function
const Accordian = ({ title, content, expanded, onPress, number }: AccordianProps) => {
  const shareValue = useSharedValue(0);
  const [bodySectionHeight, setBodySectionHeight] = useState(0);

  const bodyHeight = useAnimatedStyle(() => ({
    height: interpolate(shareValue.value, [0, 1], [0, bodySectionHeight]),
  }));

  const bgColor = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(shareValue.value, [0, 1], ['#CCCCCC', '#364685']),
  }));

  const textColor = useAnimatedStyle(() => ({
    color: interpolateColor(shareValue.value, [0, 1], ['#CCCCCC', '#364685']),
  }));

  //   const iconColor = useAnimatedStyle(() => ({
  //     color: interpolateColor(shareValue.value, [0, 1], ['#CCCCCC', '#000']),
  //   }));

  //   const iconStyle = useAnimatedStyle(() => {
  //     return {
  //       transform: [
  //         {
  //           rotate: ${interpolate(shareValue.value, [0, 1], [0, 180])}deg,
  //         },
  //       ],
  //     };
  //   });

  const toggleButton = () => {
    onPress();
  };

  useEffect(() => {
    if (expanded) {
      if (shareValue.value === 0) {
        shareValue.value = withTiming(1, {
          duration: 500,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        });
      } else {
        shareValue.value = withTiming(0, {
          duration: 500,
          easing: Easing.bezier(0.4, 0.0, 0.2, 1),
        });
      }
    } else {
      shareValue.value = withTiming(0, {
        duration: 500,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      });
    }
  }, [expanded, shareValue]);

  return (
    <View style={styles.subContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        // style={[styles.paymentInnerView, expanded && {borderBottomWidth: 1}]}
        style={[styles.paymentInnerView]}
        onPress={toggleButton}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 1,
            paddingHorizontal: 16,
            borderWidth: 1,
            borderColor: '#CCCCCC',
          }}
        >
          <View style={styles.numberView}>
            <Animated.View style={[styles.payment1View, bgColor]}>
              <Animated.Text style={[styles.payment1Text]}>{number}</Animated.Text>
            </Animated.View>
            <Animated.Text style={[styles.title, textColor]}>{title}</Animated.Text>
          </View>

          {/* <AnimatedIcon
            name={'chevron-down'}
            size={20}
            style={[iconColor, iconStyle]}
          /> */}
        </View>
      </TouchableOpacity>

      <Animated.View style={[styles.descStyle, bodyHeight]}>
        <View
          style={styles.bodyContainer}
          onLayout={(event) => {
            setBodySectionHeight(event.nativeEvent.layout.height);
          }}
        >
          {content}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  subContainer: {
    flex: 1,
  },
  svgStyle: {
    width: 20,
    height: 20,
  },
  descStyle: {
    overflow: 'hidden',
  },
  title: {
    color: '#364685',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },

  bodyContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderBottomColor: '#CCCCCC',
    borderLeftColor: '#CCCCCC',
    borderRightColor: '#CCCCCC',
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    width: '100%',
    // paddingBottom: 20,
  },
  paymentInnerView: {
    height: 55,
    // borderColor: '#CCCCCC',
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  numberView: {
    // width: '15%',
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  payment1View: {
    width: 35,
    backgroundColor: '#364685',
    height: 35,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  payment1Text: {
    color: '#fff',
    fontFamily: 'Open Sans',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Accordian;
