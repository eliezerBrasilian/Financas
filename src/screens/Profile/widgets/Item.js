import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {colors} from '../../../assets/colors/colors';

export default function Item({title, image, onClick = () => {}}) {
  const nav = useNavigation();

  return (
    <TouchableOpacity onPress={onClick} style={s.item_row}>
      <View style={s.esquerda}>
        <View style={s.circle}>
          <Image source={image} style={s.icon} />
        </View>

        <Text style={s.title_text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  item_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.input_background,
    padding: 10,
  },
  esquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },

  circle: {
    backgroundColor: '#E8EDFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
  },
  title_text: {
    color: '#153B60',
    fontSize: 15,
    fontWeight: '500',
  },

  icon: {
    height: 22,
    width: 22,
  },
});
