// import React from "react";
// import { StyleSheet } from "react-native";
// import { scale } from "react-native-size-matters";
// import PlusButton from "@/components/plusbutton";
import React from 'react';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import PlusButton from '@/components/plusbutton';
import { Text, View } from '@/ui';
const Header = () => {
  return (
    <View
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      backgroundColor={'white'}
      paddingHorizontal={'large'}
      style={style.container}
      borderBottomColor={'grey500'}
      borderBottomWidth={1}
    >
      <View flexDirection={'column'}>
        <Text variant={'medium17'} fontWeight={'500'}>
          Vacancies
        </Text>
      </View>
      <View flexDirection={'column'}>
        <PlusButton />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: scale(48),
    // shadowColor: "#171717",
    // shadowOffset: { width: 2, height: 0.5 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    // elevation: 3,
  },
});

export default Header;
