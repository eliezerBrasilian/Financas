import React from 'react';
import {View} from 'react-native';
import {TextContent} from '../../../components/TextContent';
import {Utils} from '../../../utils/Utils';

export const Top = ({amount, title}) => {
  return (
    <View style={{alignItems: 'center', marginBottom: 20}}>
      <TextContent fontSize={19} color="#fff">
        Total de {title}s
      </TextContent>
      <TextContent fontSize={25} color="#fff" fontWeight="bold">
        {Utils.getBrazilianCurrency(amount)}
      </TextContent>
    </View>
  );
};
