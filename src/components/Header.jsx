import {Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../assets/colors/colors';

export default function Header({title, onClick, color = colors.blue_thirdy}) {
  const nav = useNavigation();

  function executeMethod() {
    if (onClick == undefined) nav.goBack();
    else onClick();
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        columnGap: 40,
      }}>
      <TouchableOpacity onPress={executeMethod}>
        <AntDesign name="arrowleft" color={color} size={25} />
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        style={{
          color: color,
          fontSize: 19,
          fontWeight: '500',
        }}>
        {title}
      </Text>
    </View>
  );
}
