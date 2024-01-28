import {Image, TouchableOpacity, View} from 'react-native';

import {Navigation} from '../classes/Navigation';

function LeftTopIcon() {
  var nav = new Navigation();
  return (
    <View style={{marginLeft: -10}}>
      <TouchableOpacity onPress={() => nav.goBack()}>
        <Image
          source={require('../assets/images/seta_esquerda_azul.png')}
          style={{height: 20, width: 22}}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}

export {LeftTopIcon};
