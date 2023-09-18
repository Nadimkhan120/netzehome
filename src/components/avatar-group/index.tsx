import React from 'react';

import { icons } from '@/assets/icons';
import type { AvatarProps } from '@/components/avatar';
import { Avatar } from '@/components/avatar';
import { View } from '@/ui';

export type AvatarGroupProps = {
  data: any[];
} & AvatarProps;

export const AvatarGroup = ({ data, ...rest }) => {
  return (
    <View flexDirection={'row'} alignItems={'center'}>
      {data?.map((item, index) => {
        return (
          <View
            key={index}
            style={{
              marginLeft: index === 0 ? 0 : -20,
              zIndex: index,
            }}
          >
            <Avatar source={icons[item.icon]} size="small" {...rest} />
          </View>
        );
      })}
    </View>
  );
};
