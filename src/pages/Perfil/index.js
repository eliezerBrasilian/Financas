import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {useContext} from 'react';
import {AuthContext} from '../../contexts/auth';
import Header from '../../components/HeaderGeral';
import {colors} from '../../assets/colors';
import {strings} from '../../assets/strings';
import PieChart from 'react-native-pie-chart';

export default function Perfil() {
  const {user, gasto_atual, entrada_atual, signOutFromGoogle} =
    useContext(AuthContext);
  const widthAndHeight = 250;
  const series = [Number(gasto_atual), Number(entrada_atual)];
  const sliceColor = [colors.fatia_gasto, colors.fatia_entrada];

  function RenderizaGraficoEAfins() {
    if (series[0] !== 0 || series[1] !== 0)
      return (
        <View>
          <PieChart
            widthAndHeight={widthAndHeight}
            series={series}
            sliceColor={sliceColor}
          />

          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 15,
              width: '90%',
            }}>
            <View style={[s.quadrado, {backgroundColor: colors.fatia_gasto}]} />
            <Text style={[s.label, s.linha]}>- {strings.gasto}</Text>
          </View>
          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 15,
              width: '90%',
            }}>
            <View
              style={[s.quadrado, {backgroundColor: colors.fatia_entrada}]}
            />
            <Text style={[s.label, s.linha]}>- {strings.entrada}</Text>
          </View>
        </View>
      );
    else return null;
  }
  return (
    <View style={{flex: 1, paddingHorizontal: 20, backgroundColor: '#172A3A'}}>
      <Header cor="#fff" />
      <ScrollView>
        <View style={{width: '100%', alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              width: '90%',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <Text style={s.titulo}>{strings.perfil}</Text>
            <Image
              source={{uri: user.foto}}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                borderColor: '#fff',
                borderWidth: 1,
              }}
            />
          </View>
          <View style={[s.linha, {width: '100%', borderBottomWidth: 1}]}></View>
          <Text style={s.titulo}>{strings.grafico}</Text>
          <RenderizaGraficoEAfins />
          <View style={[s.linha, {width: '100%', borderBottomWidth: 1}]}></View>
          <TouchableOpacity style={s.btn} onPress={() => signOutFromGoogle()}>
            <Text style={s.btn_text}>{strings.sair_da_conta}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  titulo: {
    fontSize: 29,
    color: '#fff',
    fontWeight: 700,
    marginBottom: 30,
  },
  quadrado: {
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 22,
    fontWeight: 500,
    color: '#fff',
  },
  linha: {
    padding: 4,
    borderBottomColor: '#fff',
    borderBottomWidth: 4,
  },
  btn: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0022',
    padding: 15,
    borderRadius: 7,
    marginBottom: 5,
  },
  btn_text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});
