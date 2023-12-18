import * as Animatable from 'react-native-animatable';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {colors} from '../../assets/colors/colors';
import {useFabButtonContext} from '../../contexts/FabButtonContext';

export default function FabButton({onClick}) {
  const {fabButtonVisible} = useFabButtonContext();

  return !fabButtonVisible ? null : (
    <Animatable.View animation={'bounce'} duration={1000}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onClick}
        style={{
          height: 70,
          width: 70,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 40,
          right: 20,
        }}>
        <AntDesign name="pluscircle" color={colors.main_blue} size={60} />
      </TouchableOpacity>
    </Animatable.View>
  );
}
