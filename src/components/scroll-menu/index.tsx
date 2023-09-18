import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { PressableScale, Text, View } from '@/ui';

type ScrollMenuProps = {
  data: string[];
  selectedIndex: number;
  onChangeMenu: (index: number) => void;
};

export const ScrollMenu = ({
  data,
  selectedIndex,
  onChangeMenu,
}: ScrollMenuProps) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {data?.map((element, index) => {
          const isSelected = selectedIndex === index;

          return (
            <PressableScale key={index} onPress={() => onChangeMenu?.(index)}>
              <View
                paddingHorizontal={'medium'}
                height={scale(37)}
                borderWidth={2}
                borderColor={isSelected ? 'primary' : 'grey300'}
                borderRadius={scale(24)}
                justifyContent={'center'}
                alignItems={'center'}
                marginRight={'small'}
                backgroundColor={isSelected ? 'primary' : 'white'}
              >
                <Text
                  variant={'medium14'}
                  color={isSelected ? 'white' : 'grey300'}
                >
                  {element}
                </Text>
              </View>
            </PressableScale>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: scale(16),
    paddingLeft: scale(16),
  },
});
