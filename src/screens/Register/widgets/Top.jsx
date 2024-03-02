import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import CurrencyInput from 'react-native-currency-input';
import {BackgroundColor} from '../../../classes/BackgroundColor';
import Icon from '../../../components/Icon';
import {TextContent} from '../../../components/TextContent';
import {tags} from '../../../enums/Tag';

export function Top({title, value, setValue}) {
  const nav = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [subtitulo, setSubTitulo] = useState('');

  useEffect(() => {
    setTitulo(getTitle);
    setSubTitulo(getSubTitle);
  }, []);

  function getTitle() {
    if (title == tags.REVENUE) return 'Nova Receita';
    else if (title == tags.RESERVATION) return 'Nova Reserva';
    else return 'Nova Despesa';
  }
  function getSubTitle() {
    if (title == tags.REVENUE) return 'Receita';
    else if (title == tags.RESERVATION) return 'Reserva';
    else return 'Despesa';
  }

  return (
    <View
      style={{
        backgroundColor: BackgroundColor.getBackgrouncColor(title),
        minHeight: 150,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}>
      <Header titulo={titulo} nav={nav} />

      <View style={{marginTop: 20, width: '100%', alignItems: 'center'}}>
        <TextContent
          fontSize={20}
          color="#fff"
          textAlign="left"
          fontWeight="400">
          Valor da {subtitulo}
        </TextContent>

        <CurrencyInput
          value={value}
          onChangeValue={value => setValue(value)}
          placeholder="R$ 0,00"
          placeholderTextColor={'#fff'}
          style={{fontSize: 30, fontWeight: 'bold', color: '#fff'}}
          keyboardType="decimal-pad"
          prefix="R$ "
        />
      </View>
    </View>
  );
}

function Header({titulo, nav}) {
  return (
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
        {titulo}
      </TextContent>
    </TouchableOpacity>
  );
}
