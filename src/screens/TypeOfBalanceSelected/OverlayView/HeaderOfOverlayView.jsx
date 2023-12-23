import {TouchableOpacity, View} from 'react-native';

import React from 'react';
import Icon from '../../../components/Icon';
import {TextContent} from '../../../components/TextContent';
import {Utils} from '../../../utils/Utils';

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
        <TouchableOpacity onPress={decrementMonth}>
          <Icon color="#000" size={20} />
        </TouchableOpacity>

        <TextContent fontSize={22}>{Utils.getMonth(date)}</TextContent>
        <TouchableOpacity onPress={incrementMonth}>
          <Icon color="#000" name="right" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
