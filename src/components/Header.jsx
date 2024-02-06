import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../assets/colors/colors';
import {useNavigation} from '@react-navigation/native';

export default function Header({
  title,
  onClick,
  numberOfLines = undefined,
  color = colors.blue_thirdy,
}) {
  const nav = useNavigation();

  function executeMethod() {
    if (onClick == undefined) nav.goBack();
    else onClick();
  }
  return (
    <View style={s.header}>
      <TouchableOpacity onPress={executeMethod}>
        <AntDesign name="arrowleft" color={color} size={25} />
      </TouchableOpacity>
      <Text numberOfLines={numberOfLines} style={[s.title, {color: color}]}>
        {title}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    columnGap: 40,
  },
  title: {
    fontSize: 19,
    fontWeight: '500',
  },
});
