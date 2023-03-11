import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function Header(props) {
  const nav = useNavigation();

  const s = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: 15,
    },
    titulo: {
      fontSize: 25,
      fontWeight: 600,
      color: props.cor,
      marginLeft: 3,
    },
  });

  return (
    <TouchableOpacity onPress={() => nav.goBack()} style={s.container}>
      <FontAwesome name="chevron-left" color={props.cor} size={40} />
      <Text style={s.titulo}>Voltar</Text>
    </TouchableOpacity>
  );
}

export default Header;
