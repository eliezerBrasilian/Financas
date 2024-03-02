import {Text, TouchableOpacity, View} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import {Navigation} from '../classes/Navigation';
import {CustomIcon} from './CustomIcon';

function HeaderTransactionsHistory({title, onClick}) {
  return (
    <Row>
      <Left title={title} />
      <Right />
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

function Left({title}) {
  const nav = new Navigation();
  return (
    <TouchableOpacity onPress={() => nav.goBack()}>
      <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
        <Icon name="arrowleft" color={'#fff'} size={30} />

        <Text
          numberOfLines={1}
          style={{
            color: '#fff',
            fontSize: 19,
            fontWeight: '500',
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
function Right() {
  return (
    <View style={{flexDirection: 'row', columnGap: 30}}>
      <TouchableOpacity>
        <CustomIcon path={require('../assets/images/filtro.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <CustomIcon path={require('../assets/images/download.png')} />
      </TouchableOpacity>
    </View>
  );
}
export {HeaderTransactionsHistory};
