import {ActivityIndicator, View} from 'react-native';

import {colors} from '../assets/colors/colors';

export function Loading({color = colors.main_blue, size = 40}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}
