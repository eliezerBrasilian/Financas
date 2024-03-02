import {TouchableOpacity, View} from 'react-native';

import React from 'react';
import {Utils} from '../utils/Utils';
import Icon from './Icon';
import {TextContent} from './TextContent';

export const HeaderOfOverlayView = ({date, incrementMonth, decrementMonth}) => {
  return (
    <View style={{alignItems: 'center', padding: 20}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '70%',
        }}>
        <TouchableOpacity
          style={{
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={decrementMonth}>
          <Icon color="#000000" size={20} />
        </TouchableOpacity>

        <TextContent fontSize={18}>{Utils.getMonth(date)}</TextContent>
        <TouchableOpacity
          style={{
            height: 35,
            width: 35,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={incrementMonth}>
          <Icon color="#000" name="right" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
