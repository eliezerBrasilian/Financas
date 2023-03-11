import {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Background} from '../../components/Background';
import {colors} from '../../assets/colors';
import Header from '../../components/HeaderGeral';
import {s, BtnFundo, BtnText} from '../Registro/style';
import {strings} from '../../assets/strings';
import styled from 'styled-components';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';
import {format} from 'date-fns';

export default function Reserva() {
  const nav = useNavigation();
  const {user, saldo_atual, reserva_atual} = useContext(AuthContext);
  const route = useRoute();
  const [tag] = useState(route.params.tag);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [metaFinal, setMetaFinal] = useState(0);
  const [dataAtual] = useState(new Date());

  async function registrar() {
    if (descricao === '' || valor === 0 || metaFinal === 0) return;
    await firestore()
      .collection('Registros_' + user.user_id)
      .add({
        descricao: descricao.trim(),
        valor: Number(valor),
        tag: tag,
        created_at: format(dataAtual, 'dd/MM/yyyy'),
      })
      .then(() => {
        console.log('Registro criado');
        //atualizando o saldo no balanco
        //subtrair do saldo
        //incrementar o gasto
        if (tag === 'gasto') {
          firestore()
            .collection('Balancos')
            .doc(user.user_id)
            .update({
              saldo: saldo_atual - valor,
              gasto: Number(Number(gasto_atual) + Number(valor)),
            })
            .then(() => {
              console.log('Campos atualizados com sucesso em Balancos');
              Alert.alert('Gasto registrado com sucesso!');
              nav.navigate('Home');
            })
            .catch(e => {
              console.log(
                'Nao foi possivel atualizar os campos em Balancos: ' + e,
              );
            });
        }
        //atualizando o saldo no balanco
        //incrementar o saldo
        //incrementar a entrada
        if (tag === 'entrada') {
          firestore()
            .collection('Balancos')
            .doc(user.user_id)
            .update({
              saldo: Number(Number(saldo_atual) + Number(valor)),
              entrada: Number(Number(entrada_atual) + Number(valor)),
            })
            .then(() => {
              console.log('Campos atualizados com sucesso em Balancos');
              Alert.alert('Entrada registrada com sucesso!');
              nav.navigate('Home');
            })
            .catch(e => {
              console.log(
                'Nao foi possivel atualizar os campos em Balancos: ' + e,
              );
            });
        }
      });
  }
  return (
    <Background
      colors={[colors.gradiente_1, colors.gradiente_2]}
      style={{flex: 1, alignItems: 'center', paddingHorizontal: 20}}>
      <ScrollView>
        <Header />

        <View style={s.Container}>
          <Text style={s.Label}>{strings.o_que_voce_quer_registrar}</Text>
          <ViewBlock>
            <Text style={s.Titulo}>{strings.gasto}</Text>
            <MaterialCommunityIcons
              name="block-helper"
              size={30}
              color="#000"
            />
          </ViewBlock>

          <Text style={[s.Label, {marginTop: 20}]}>
            {strings.descricao_label}
          </Text>
          <InputView>
            <InputText
              placeholder={strings.descricao_placeholder_reserva}
              placeholderTextColor="#000"
              multiline={true}
              numberOfLines={2}
              value={descricao}
              onChangeText={t => setDescricao(t)}
            />
          </InputView>
          <Text style={[s.Label, {marginTop: 20}]}>{strings.valor}</Text>
          <InputView>
            <InputText
              placeholder={strings.valor_a_guardar_agora_placeholder}
              placeholderTextColor="#000"
              multiline={true}
              numberOfLines={2}
              onChangeText={t => setValor(t)}
              keyboardType="numeric"
            />
          </InputView>
          <Text style={[s.Label, {marginTop: 20}]}>{strings.meta_final}</Text>
          <InputView>
            <InputText
              placeholder={strings.valor_a_guardar_agora_placeholder}
              placeholderTextColor="#000"
              multiline={true}
              numberOfLines={2}
              onChangeText={t => setValor(t)}
              keyboardType="numeric"
            />
          </InputView>
        </View>
      </ScrollView>
      <BtnFundo onPress={registrar} style={{marginBottom: 20}}>
        <BtnText>{strings.registrar}</BtnText>
      </BtnFundo>
    </Background>
  );
}

const ViewBlock = styled.View`
  background-color: ${colors.fundo_reserva};
  height: 70px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
`;
const InputView = styled.View`
  background-color: #fff;
  min-height: 70px;
  padding: 10px;
  border-radius: 6px;
`;
const InputText = styled.TextInput`
  color: #000;
  font-size: 20px;
  font-weight: 400;
`;
