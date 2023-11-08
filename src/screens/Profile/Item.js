import {Text, TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {useNavigation} from '@react-navigation/native';
import {ShowToast} from '../../components/Toast';
export default function Item({title, image, goTo}) {
  const nav = useNavigation();
  function execute() {
    if (title == 'Sobre-nós' || title == 'Suporte') {
      ShowToast('...em breve');
    } else nav.navigate(goTo);
  }
  return (
    <TouchableOpacity onPress={execute} style={s.item_row}>
      <View style={s.esquerda}>
        <View style={s.circle}>
          <Image source={image} style={s.icon} />
        </View>

        <Text style={s.title_text}>{title}</Text>
      </View>

      <View style={s.direita}>
        <Image
          source={require('../../assets/images/seta_direita.png')}
          style={s.icon}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  item_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  esquerda: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
  direita: {
    justifyContent: 'flex-end',
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
    fontSize: 16,
    fontWeight: '700',
  },

  icon: {
    height: 22,
    width: 22,
  },
  btn: {
    marginTop: 17,
    backgroundColor: colors.buttonAddCreditBgColor,
    paddingHorizontal: 20,
    paddingVertical: 19,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
