import {View} from 'react-native';
import {colors} from '../assets/colors/colors';

export function Line({borderWidth = 0.5, borderColor = colors.gray_line}) {
  return (
    <View
      style={{
        borderBottomColor: borderColor,
        borderWidth: borderWidth,
      }}
    />
  );
}
