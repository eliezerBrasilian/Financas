import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors/colors';
const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  onTop: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.separador_item,
    paddingBottom: 25,
    marginTop: 30,
  },
  iconLogin: {
    height: 40,
    width: 40,
  },
  entrarTxt: {
    color: colors.bg_splash,
    fontSize: 24,
    fontWeight: 600,
  },
  row: {
    flexDirection: 'row',
    columnGap: 20,
    alignItems: 'center',
  },
  itemTxt: {
    color: '#000',
    fontSize: 18,
  },
  itemIcon: {
    height: 30,
    width: 30,
  },
});

export {s};
