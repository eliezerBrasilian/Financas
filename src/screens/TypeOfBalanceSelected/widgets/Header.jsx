import {Text, TouchableOpacity, View} from 'react-native';

import {CustomIcon} from '../../../components/CustomIcon';

function Header({title, onClick, dropdownListOfBalance}) {
  return (
    <Row>
      <Left title={title} dropdownListOfBalance={dropdownListOfBalance} />
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

function Left({title, dropdownListOfBalance}) {
  return (
    <TouchableOpacity onPress={dropdownListOfBalance}>
      <View style={{flexDirection: 'row', columnGap: 5, alignItems: 'center'}}>
        <Text
          numberOfLines={1}
          style={{
            color: '#fff',
            fontSize: 19,
            fontWeight: '500',
          }}>
          {title}
        </Text>
        <View style={{marginTop: 10}}>
          <CustomIcon
            path={require('../../../assets/images/seta_baixo_branco.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
function Right() {
  return (
    <View style={{flexDirection: 'row', columnGap: 30}}>
      <TouchableOpacity>
        <CustomIcon path={require('../../../assets/images/filtro.png')} />
      </TouchableOpacity>
      <TouchableOpacity>
        <CustomIcon path={require('../../../assets/images/download.png')} />
      </TouchableOpacity>
    </View>
  );
}
export {Header};
