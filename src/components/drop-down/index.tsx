import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { scale } from 'react-native-size-matters';
import { palette } from '@/theme';
import { Text, View } from '@/ui';

const SelectionBox = ({ placeholder, label, onChange, data, error }: any) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <>
      {label && (
        <Text paddingVertical={'small'} variant="medium14" color={'black'}>
          {label}
        </Text>
      )}
      <View
        borderColor={error ? 'error' : 'inputBorder'}
        borderWidth={1}
        backgroundColor={'inputBg'}
        style={[styles.container]}
      >
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={{ color: palette.black }}
          data={data ?? []}
          maxHeight={300}
          labelField="label"
          valueField="value"
          dropdownPosition="auto"
          placeholder={!isFocus ? placeholder : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={(item) => {
            //@ts-ignore
            onChange?.(item);
            setValue(`${item?.value}`);
            setIsFocus(false);
          }}
        />
      </View>
    </>
  );
};

export default SelectionBox;

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: palette.inputBg,
    borderRadius: 24,
  },
  dropdown: {
    height: 56,
    padding: scale(14),
    borderRadius: 24,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#8C8C8C',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: palette.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
