import {TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../assets/colors/colors';
import {useFabButtonContext} from '../contexts/FabButtonContext';
import * as Animatable from 'react-native-animatable';
import {View} from 'react-native';
export default function FabButton({onClick}) {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 40,
        right: 20,
      }}>
      <Animatable.View animation={'bounce'} duration={1000}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onClick}
          style={{
            height: 70,
            width: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <AntDesign name="pluscircle" color={colors.main_blue} size={60} />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}
