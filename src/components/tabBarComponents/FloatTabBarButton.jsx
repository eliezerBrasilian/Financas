import {TouchableOpacity, View} from 'react-native';

import {Navigation} from '../../classes/Navigation';
import {usePlusButtonContext} from '../../contexts/PlusButtonContext';

function FloatTabBarButton({children, onPress}) {
  const nav = new Navigation();

  const {handleClickOnPlusButton} = usePlusButtonContext();

  const size = 70;
  return (
    <TouchableOpacity
      style={{
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
        height: size,
        width: size,
      }}
      onPress={handleClickOnPlusButton}>
      <View>{children}</View>
    </TouchableOpacity>
  );
}

export {FloatTabBarButton};
