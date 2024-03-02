import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {TextContent} from './TextContent';
import {colors} from '../assets/colors/colors';
import {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';

export default function ListItem({data, spaceUsed, amount, title}) {
  const nav = useNavigation();
  //console.log('spaceUsed: ' + spaceUsed);

  const quantity = useMemo(() => {
    if (amount == 1 && title == 'Imagens') return 'Imagem';
    else if (amount == 1 && title == 'Documentos') return 'Documento';
    else if (amount == 1 && title == 'Videos') return 'Video';
    else return title;
  }, [amount]);
  const size = useMemo(() => {
    if (spaceUsed < 1024) {
      return spaceUsed + ' bytes';
    } else if (spaceUsed < 1024 * 1024) {
      return (spaceUsed / 1024).toFixed(2) + ' KB';
    } else if (spaceUsed < 1024 * 1024 * 1024) {
      return (spaceUsed / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (spaceUsed / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
  }, [spaceUsed]);

  return (
    <View activeOpacity={0.7} style={style.container}>
      <View style={style.left}>
        <View style={style.circle} />
        <View>
          <TextContent fontWeight="bold">{title}</TextContent>
          <TextContent fontSize={15}>{amount + ' ' + quantity}</TextContent>
        </View>
      </View>
      <View style={style.right}>
        <View style={[style.total_width, {width: spaceUsed / 1000000}]} />
        <TextContent title={size} />
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 7,
    width: '100%',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    columnGap: 15,
    rowGap: 5,
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    backgroundColor: colors.main_blue,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  right: {
    rowGap: 5,
    flex: 1,
    alignItems: 'flex-end',
  },
  total_width: {
    backgroundColor: colors.main_green,
    width: 100 / 3,
    height: 20,
  },
});
