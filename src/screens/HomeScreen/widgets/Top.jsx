import React from 'react';
import {TouchableOpacity} from 'react-native';
import {TextContent} from '../../../components/TextContent';
import {Utils} from '../../../utils/Utils';

export function Top({onClick}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'center',
      }}>
      <Utils.calendarIcon />
      <TextContent>Selecionar Período</TextContent>
    </TouchableOpacity>
  );
}
