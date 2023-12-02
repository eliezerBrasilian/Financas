import {TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import CurrencyInput from 'react-native-currency-input';
import Icon from '../../../components/Icon';
import {TextContent} from '../../../components/TextContent';
import {Utils} from '../../../utils/Utils';

export function Top({title, value, setValue}) {
  const nav = useNavigation();

  const properties = React.useMemo(
    () => Utils.getAppropriateBackgroundColor(title, true),
    [title],
  );

  return (
    <View
      style={{
        backgroundColor: properties.backgroundColor,
        minHeight: 150,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}>
      <TouchableOpacity
        onPress={() => nav.goBack()}
        style={{
          flexDirection: 'row',
          columnGap: 10,
          alignItems: 'center',
          padding: 10,
          overflow: 'hidden',
        }}>
        <Icon />
        <TextContent color="#fff" fontSize={18} fontWeight="400">
          {properties.title}
        </TextContent>
      </TouchableOpacity>

      <View style={{marginLeft: 15, marginTop: 20}}>
        <TextContent
          fontSize={20}
          color="#fff"
          textAlign="left"
          fontWeight="400">
          Valor da {properties.title}
        </TextContent>

        <CurrencyInput
          value={value}
          onChangeValue={value => setValue(value)}
          placeholder="R$ 0,00"
          placeholderTextColor={'#fff'}
          style={{fontSize: 30, fontWeight: 'bold', color: '#fff'}}
          keyboardType="decimal-pad"
        />
      </View>
    </View>
  );
}
