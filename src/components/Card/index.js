import {useMemo, useState} from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';

import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
export default function Card({valor, descricao, loadingBalanco}) {
  const [icone, setIcone] = useState(descricao);

  useMemo(() => {
    if (descricao === 'Saldo')
      setIcone(require('../../assets/images/expense_2.png'));
    else if (descricao === 'Gasto')
      setIcone(require('../../assets/images/reduce.png'));
    else if (descricao === 'Entrada')
      setIcone(require('../../assets/images/hold.png'));
  }, [icone]);
  return (
    <View style={s.container}>
      <View style={s.cima}>
        <Text style={s.texto_descricao}>{descricao}</Text>
        <Image source={icone} style={{height: 30, width: 30, marginLeft: 10}} />
      </View>
      <Text style={s.texto_em_baixo}>
        {loadingBalanco ? (
          <ActivityIndicator size={30} color={'#000'} />
        ) : (
          Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
          }).format(valor)
        )}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    minWidth: 170,
    height: 110,
    backgroundColor: colors.fundo_card,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cima: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  texto_descricao: {
    fontSize: 22,
    color: '#000',
    fontWeight: '800',
  },
  texto_em_baixo: {fontSize: 29, color: '#000', fontWeight: '800'},
});
