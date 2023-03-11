import {useState, useEffect, useContext, useCallback} from 'react';
import {View, Text, ScrollView, Alert, BackHandler} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Background} from '../../components/Background';
import {colors} from '../../assets/colors';
import {s, BtnFundo, BtnText} from '../Registro/style';
import {strings} from '../../assets/strings';
import styled from 'styled-components';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../contexts/auth';
import {format, getTime} from 'date-fns';
import HeaderGastoOuEntrada from './style';
export default function GastoOuReserva() {
  const nav = useNavigation();
  const {user, saldo_atual, gasto_atual, entrada_atual} =
    useContext(AuthContext);
  const route = useRoute();
  const [tag] = useState(route.params.tag);
  const [corBlock, setCorBlock] = useState('');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0);
  const [dataAtual] = useState(new Date());
  const [data_em_milisegundos] = useState(getTime(new Date(), dataAtual));
  useEffect(() => {
    function verificaTag() {
      if (tag === 'gasto') setCorBlock(colors.fundo_gasto);
      else if (tag === 'entrada') setCorBlock(colors.fundo_entrada);
    }

    const onBackPress = () => {
      console.log('cliquei em voltar');
      nav.navigate('Home');
      // Do Whatever you want to do on back button click
      // Return true to stop default back navigaton
      // Return false to keep default back navigaton
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    verificaTag();
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);

  async function registrar() {
    if (descricao === '' || valor <= 0 || isNaN(valor)) return;
    let valor_para_string = String(valor);

    let valor_ = valor_para_string.replace(',', '.');

    await firestore()
      .collection('Registros_' + user.user_id)
      .add({
        descricao: descricao.trim(),
        valor: String(valor_),
        tag: tag,
        created_at: format(dataAtual, 'dd/MM/yyyy'),
        timestamp: Number(data_em_milisegundos),
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
              saldo: String(Number(saldo_atual) - Number(valor_)),
              gasto: String(Number(Number(gasto_atual) + Number(valor_))),
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
              saldo: String(Number(saldo_atual) + Number(valor_)),
              entrada: String(Number(entrada_atual) + Number(valor_)),
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
      style={{flex: 1}}>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 20,
          }}>
          <HeaderGastoOuEntrada />
          <Text style={s.Label}>{strings.o_que_voce_quer_registrar}</Text>
          <ViewBlock corBlock={corBlock}>
            {tag === 'gasto' ? (
              <Text style={s.Titulo}>{strings.gasto}</Text>
            ) : (
              <Text style={s.Titulo}>{strings.entrada}</Text>
            )}
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
            {tag === 'gasto' ? (
              <InputText
                placeholder={strings.descricao_placeholder_gasto}
                placeholderTextColor="#000"
                multiline={true}
                numberOfLines={2}
                value={descricao}
                onChangeText={t => setDescricao(t)}
              />
            ) : (
              <InputText
                placeholder={strings.descricao_placeholder_entrada}
                placeholderTextColor="#000"
                multiline={true}
                numberOfLines={2}
                value={descricao}
                onChangeText={t => setDescricao(t)}
              />
            )}
          </InputView>
          <Text style={[s.Label, {marginTop: 20}]}>{strings.valor}</Text>
          <InputView>
            <InputText
              placeholder={strings.valor_placeholder}
              placeholderTextColor="#000"
              multiline={true}
              numberOfLines={2}
              onChangeText={t => setValor(t)}
              keyboardType="numeric"
            />
          </InputView>
          <BtnFundo onPress={registrar} style={{marginBottom: 20}}>
            <BtnText>{strings.registrar}</BtnText>
          </BtnFundo>
        </View>
      </ScrollView>
    </Background>
  );
}

const ViewBlock = styled.View`
  background-color: ${props => props.corBlock};
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
