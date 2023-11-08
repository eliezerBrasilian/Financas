import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../assets/colors/colors';
export default function Header({title, onClick, numberOfLines = undefined}) {
  const nav = useNavigation();

  function executeMethod() {
    if (onClick == undefined) nav.goBack();
    else onClick();
  }
  return (
    <View style={s.header}>
      <TouchableOpacity style={{zIndex: 2}} onPress={executeMethod}>
        <AntDesign name="left" color={colors.blue_thirdy} size={25} />
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          zIndex: 1,
          marginLeft: -10,
        }}>
        <Text numberOfLines={numberOfLines} style={s.title}>
          {title}
        </Text>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: colors.blue_thirdy,
    fontWeight: '700',
    marginRight: 30,
  },
});
