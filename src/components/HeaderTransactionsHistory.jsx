import {TouchableOpacity, View} from 'react-native';

import {CustomIcon} from './CustomIcon';

function HeaderTransactionsHistory({activateSortMenu}) {
  return (
    <View style={{alignSelf: 'flex-end', marginRight: 20, marginTop: 5}}>
      <TouchableOpacity onPress={activateSortMenu}>
        <CustomIcon path={require('../assets/images/filtro.png')} />
      </TouchableOpacity>
      {/* <TouchableOpacity>
      <CustomIcon path={require('../assets/images/download.png')} />
    </TouchableOpacity> */}
    </View>
  );
}

export {HeaderTransactionsHistory};
