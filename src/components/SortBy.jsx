import {TouchableOpacity, View} from 'react-native';

import {useBalanceContext} from '../contexts/BalanceContext';
import {sort} from '../enums/Sort';
import {Spacer} from './Spacer';
import {TextContent} from './TextContent';

function SortBy({setMenuOpen, tag, isFromTransactionHistory = false}) {
  const {
    changeWayRegistersAreSort,
    changeWayRegistersAreSortOnTransactionHistory,
  } = useBalanceContext();

  var handleOnClick = sortType => {
    if (isFromTransactionHistory) {
      changeWayRegistersAreSortOnTransactionHistory(sortType);
    } else {
      changeWayRegistersAreSort(sortType, tag);
    }
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        position: 'absolute',
        right: 30,
        top: 60,
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
        width: 270,
      }}>
      <Title setMenuOpen={setMenuOpen} />
      <Spacer />
      <View style={{rowGap: 20}}>
        <Item
          title={'Data (padrão) 📅'}
          sortBy={sort.DEFAULT}
          onClick={handleOnClick}
        />
        <Item
          title={'Título ( de A a Z) ⬆️'}
          sortBy={sort.DESCRIPTION_ASC}
          onClick={handleOnClick}
        />
        <Item
          title={'Título ( de Z a A) ⬇️'}
          sortBy={sort.DESCRIPTION_DESC}
          onClick={handleOnClick}
        />
      </View>
    </View>
  );
}

function Title({setMenuOpen}) {
  return (
    <TouchableOpacity onPress={() => setMenuOpen(false)}>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TextContent fontSize={22} fontWeight="bold" color={'#000'}>
          Ordenar por:
        </TextContent>
      </View>
    </TouchableOpacity>
  );
}

function Item({title, sortBy, onClick}) {
  return (
    <TouchableOpacity
      onPress={() => onClick(sortBy)}
      style={{height: 30, justifyContent: 'center'}}>
      <TextContent fontSize={17}>{title}</TextContent>
    </TouchableOpacity>
  );
}
export {SortBy};
