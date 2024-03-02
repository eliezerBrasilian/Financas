import {TouchableOpacity, View} from 'react-native';

import {colors} from '../assets/colors/colors';
import {tags} from '../enums/Tag';
import {TextContent} from './TextContent';

function ListViewBalances({onClick}) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        position: 'absolute',
        left: 20,
        top: 48,
        borderRadius: 13,
        padding: 10,
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        elevation: 15, // Para dispositivos Android
        paddingVertical: 20,
        paddingHorizontal: 20,
        rowGap: 20,
      }}>
      <ListItem
        color={colors.purple_for_selected_screen}
        title={'Reservas'}
        tag={tags.RESERVATION}
        onClick={onClick}
      />
      <ListItem
        color={colors.main_red}
        title={'Despesas'}
        tag={tags.EXPENSE}
        onClick={onClick}
      />
      <ListItem
        color={colors.main_green}
        title={'Receitas'}
        tag={tags.REVENUE}
        onClick={onClick}
      />
    </View>
  );
}

function ListItem({color, title, tag, onClick}) {
  return (
    <TouchableOpacity onPress={() => onClick(tag)}>
      <View style={{flexDirection: 'row', columnGap: 20}}>
        <Circle color={color} />
        <TextContent>{title}</TextContent>
      </View>
    </TouchableOpacity>
  );
}

function Circle({color}) {
  return (
    <View
      style={{
        height: 17,
        width: 17,
        borderRadius: 17 / 2,
        backgroundColor: color,
      }}
    />
  );
}

export {ListViewBalances};
