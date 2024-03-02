import {TouchableOpacity, View} from 'react-native';

import {CustomIcon} from './CustomIcon';
import {DropDownSelect} from './DropDownSelect';

function HeaderBalanceSelected({
  title,
  onClick,
  dropdownListOfBalance,
  activateSortMenu,
}) {
  return (
    <Row>
      <DropDownSelect
        title={title}
        dropdownListOfBalance={dropdownListOfBalance}
      />
      <Right activateSortMenu={activateSortMenu} />
    </Row>
  );
}

function Row({children}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}>
      {children}
    </View>
  );
}

function Right({activateSortMenu}) {
  return (
    <View style={{flexDirection: 'row', columnGap: 30}}>
      <TouchableOpacity onPress={activateSortMenu}>
        <CustomIcon path={require('../assets/images/filtro.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <CustomIcon path={require('../assets/images/download.png')} />
      </TouchableOpacity>
    </View>
  );
}
export {HeaderBalanceSelected};
