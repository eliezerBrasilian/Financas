import {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Background} from '../../components/Background';
import {colors} from '../../assets/colors';
import Header from '../../components/HeaderGeral';
import {s, BtnFundo, BtnText} from './style';
import {strings} from '../../assets/strings';

export default function Registro() {
  const nav = useNavigation();
  const [opcaoEscolhida, setOpcaoEscolhida] = useState(null);
  const [modalAtivo, setModalAtivo] = useState(true);

  function Opcao({tag, bg, titulo}) {
    // if(data.label === 'Gasto')
    return (
      <View>
        <TouchableOpacity
          onPress={() => nav.navigate('GastoOuEntrada', {tag: tag})}
          style={{
            marginVertical: 10,
            padding: 10,
            backgroundColor: bg,
          }}>
          <Text style={{color: '#000', fontWeight: 500, fontSize: 20}}>
            {titulo}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function controlaProximaTela() {
    if (opcaoEscolhida === 'Gasto') {
      nav.navigate('GastoOuEntrada', {tag: 'gasto'});
    } else if (opcaoEscolhida === 'Entrada') {
      nav.navigate('GastoOuEntrada', {tag: 'entrada'});
    }
  }
  return (
    <Background
      colors={[colors.gradiente_1, colors.gradiente_2]}
      style={{flex: 1, alignItems: 'center', paddingHorizontal: 20}}>
      <Modal
        transparent={true}
        visible={modalAtivo}
        onRequestClose={() => nav.goBack()}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            paddingHorizontal: 10,
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',

              borderRadius: 10,
              padding: 10,
            }}>
            <Text
              style={{
                color: '#000',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500',
              }}>
              {strings.o_que_voce_quer_registrar}
            </Text>
            <Opcao tag="gasto" bg={colors.fundo_gasto} titulo={strings.gasto} />
            <Opcao
              tag="entrada"
              bg={colors.fundo_entrada}
              titulo={strings.entrada}
            />
          </View>
        </View>
      </Modal>
    </Background>
  );
}
