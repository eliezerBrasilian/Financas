import {ActivityIndicator, View} from 'react-native';

import {colors} from '../assets/colors/colors';

export function Loading({
  color = colors.main_blue,
  size = 40,
  isFlex = true,
  backgroundColor = '#fff',
}) {
  return (
    <View
      style={{
        flex: isFlex ? 1 : undefined,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
      }}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}
