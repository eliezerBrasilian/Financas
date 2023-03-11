import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function HeaderAuth() {
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => nav.goBack()}
      style={{
        width: '100%',
        alignItems: 'flex-start',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
      }}>
      <FontAwesome name="chevron-left" color="black" size={40} />
    </TouchableOpacity>
  );
}
