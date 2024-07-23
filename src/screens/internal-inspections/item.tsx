import { format } from 'date-fns';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '@/ui';

type ItemProps = {
  item: any;
  workId?: any;
};

const Item = ({ item }: ItemProps) => {
  const startDate = new Date(item?.START_TIME);
  const formatteStartDate = format(startDate, 'MMMM dd, yyyy, hh:mm a');

  const endDate = new Date(item?.END_TIME);
  const formatteEndDate = format(endDate, 'MMMM dd, yyyy, hh:mm a');

  return (
    <View backgroundColor={'newGrey'} borderRadius={14} padding={'large'}>
      <View paddingBottom={'medium'}>
        <Text>{item?.Name}</Text>
      </View>
      <View height={200} borderRadius={10}>
        <Image
          source={item?.ContractorPhotoFilePath}
          style={styles.image2}
          contentFit="cover"
          transition={500}
          placeholder={'https://fakeimg.pl/400x400/cccccc/cccccc'}
        />
      </View>

      <View flex={1}>
        <View>
          <Text variant={'semiBold14'} paddingTop={'small'} color={'black'}>
            Contactor Name: {}
          </Text>
          <Text variant={'semiBold14'} paddingTop={'small'} color={'black'}>
            PM Name: {}
          </Text>
          <Text variant={'semiBold14'} paddingTop={'small'} color={'black'}>
            Start Date: {formatteStartDate}
          </Text>
          <Text variant={'semiBold14'} paddingTop={'small'} color={'black'}>
            End Date: {formatteEndDate}
          </Text>

          <Text variant={'regular14'} paddingTop={'small'} color={'black'}>
            {item?.ContractorPhotoDescription}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#E6A9A6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer2: {
    backgroundColor: '#E6A9A6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: 120, height: 72, tintColor: 'white' },
  image2: { height: 200, borderRadius: 10 },
});

export default Item;
