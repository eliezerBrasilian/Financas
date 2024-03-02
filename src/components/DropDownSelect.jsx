import {Text, TouchableOpacity, View} from 'react-native';

import {CustomIcon} from './CustomIcon';

function DropDownSelect({title, dropdownListOfBalance}) {
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
            path={require('../assets/images/seta_baixo_branco.png')}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

export {DropDownSelect};
