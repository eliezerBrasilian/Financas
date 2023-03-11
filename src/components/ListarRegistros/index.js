import {useRef, useState, useMemo, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';

import styled from 'styled-components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import {AuthContext} from '../../contexts/auth';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
export default function ListarRegistros({dados}) {
  const nav = useNavigation();
  const [fundo, setFundo] = useState('');
  const [iconeEsquerda, setIconeEsquerda] = useState('');
  const [reservaExiste, setReservaExiste] = useState(false);
  const [corDescricao, setCorDescricao] = useState('');
  const [registro_key] = useState(dados.key);
  const [habilitarEdicao, sethabilitarEdicao] = useState(false);

  const {user, saldo_atual, gasto_atual, entrada_atual, setCarregaSaldo} =
    useContext(AuthContext);
  const [valor] = useState(dados.valor);
  useMemo(() => {
    if (dados.tag === 'gasto') {
      setFundo(colors.fundo_gasto);
      setIconeEsquerda(require('../../assets/images/reduce.png'));
      setCorDescricao(colors.cor_texto_gasto);
    } else if (dados.tag === 'entrada') {
      setFundo(colors.fundo_entrada);
      setIconeEsquerda(require('../../assets/images/hold.png'));
      setCorDescricao(colors.cor_texto_entrada);
    } else if (dados.tag === 'reserva') {
      setFundo(colors.fundo_reserva);
      setIconeEsquerda(require('../../assets/images/reserva.png'));
      setReservaExiste(true);
      setCorDescricao(colors.cor_texto_reserva);
    }
  }, [dados.tag]);

  function handleEdicao() {
    sethabilitarEdicao(true);
    inputref.current.focus();
  }
  async function excluirRegistro() {
    await firestore()
      .collection('Registros_' + user.user_id)
      .doc(registro_key)
      .delete()
      .then(() => {
        console.log('Registro deletado');
        //atualizar no balanco
        //se for gasto, eu subtraio do gasto e aumento no saldo
        if (dados.tag === 'gasto') {
          firestore()
            .collection('Balancos')
            .doc(user.user_id)
            .update({
              saldo: Number(saldo_atual) + Number(valor),
              gasto: Number(Number(gasto_atual) - Number(valor)),
            })
            .then(() => {
              console.log('Campos atualizados com sucesso em Balancos');
              Alert.alert('Gasto excluido com sucesso!');
              setCarregaSaldo(true);
            })
            .catch(e => {
              console.log(
                'Nao foi possivel atualizar os campos em Balancos: ' + e,
              );
            });
        }
        //atualizar no balanco
        //se for entrada, eu subtraio da entrada e subtraio no saldo
        if (dados.tag === 'entrada') {
          firestore()
            .collection('Balancos')
            .doc(user.user_id)
            .update({
              saldo: Number(saldo_atual) - Number(valor),
              entrada: Number(Number(entrada_atual) - Number(valor)),
            })
            .then(() => {
              console.log('Campos atualizados com sucesso em Balancos');
              Alert.alert('Entrada excluida com sucesso!');
              setCarregaSaldo(true);
            })
            .catch(e => {
              console.log(
                'Nao foi possivel atualizar os campos em Balancos: ' + e,
              );
            });
        }
      })
      .catch(e => {
        console.log('Erro ao excluir: ' + e);
      });
  }

  function handleExlusao() {
    console.log(dados.key);
    Alert.alert('Atenção', 'Você quer mesmo excluir esse registro?', [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Continuar', onPress: excluirRegistro},
    ]);
  }
  return (
    <Container onLongPress={handleExlusao}>
      <Dentro fundo={fundo}>
        <Descricao
          corDescricao={corDescricao}
          onTouchEnd={() => sethabilitarEdicao(false)}>
          {dados.descricao}
        </Descricao>

        <View style={s.subView}>
          <Image source={iconeEsquerda} style={{height: 25, width: 25}} />
          <Text style={s.preco}>
            {Intl.NumberFormat('pt-br', {
              style: 'currency',
              currency: 'BRL',
            }).format(valor)}
          </Text>
        </View>
      </Dentro>
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  min-height: 70px;
  flex-direction: row;
  justify-content: center;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Descricao = styled.Text`
  font-size: 18px;
  margin-left: 20px;
  font-weight: 700;
  color: ${props => props.corDescricao};
`;

const Dentro = styled.View`
  background-color: ${props => props.fundo};
  border-radius: 6px;
  width: 100%;
  justify-content: space-around;
`;

const s = StyleSheet.create({
  preco: {
    color: '#000',
    fontSize: 20,
    fontWeight: 700,
  },

  subView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
  },
});
