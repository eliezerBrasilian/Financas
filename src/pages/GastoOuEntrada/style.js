import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function HeaderGastoOuEntrada() {
  const nav = useNavigation();
  return (
    <TouchableOpacity onPress={() => nav.navigate('Home')} style={s.container}>
      <FontAwesome name="chevron-left" color="#fff" size={40} />
      <Text style={s.titulo}>Voltar</Text>
    </TouchableOpacity>
  );
}
const s = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 30,
    marginTop: 15,
  },
  titulo: {
    fontSize: 25,
    fontWeight: 600,
    color: '#fff',
    marginLeft: 3,
  },
});
export default HeaderGastoOuEntrada;
