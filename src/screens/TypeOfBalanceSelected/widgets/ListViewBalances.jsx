import {TouchableOpacity, View} from 'react-native';

import {colors} from '../../../assets/colors/colors';
import {Navigation} from '../../../classes/Navigation';
import {TextContent} from '../../../components/TextContent';
import {tags} from '../../../enums/Tag';

function ListViewBalances({hideListEvent}) {
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
        hideListEvent={hideListEvent}
      />
      <ListItem
        color={colors.main_red}
        title={'Despesas'}
        tag={tags.EXPENSE}
        hideListEvent={hideListEvent}
      />
      <ListItem
        color={colors.main_green}
        title={'Receitas'}
        tag={tags.REVENUE}
        hideListEvent={hideListEvent}
      />
    </View>
  );
}

function ListItem({color, title, tag, hideListEvent}) {
  var nav = new Navigation();
  return (
    <TouchableOpacity
      onPress={() => {
        hideListEvent();
        nav.navigateToDestinationScreenUsingParams(
          nav.screens.TYPE_OF_BALANCE_SELECTED,
          {
            tag: tag,
          },
        );
      }}>
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
