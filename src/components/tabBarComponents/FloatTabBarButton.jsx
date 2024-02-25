import {TouchableOpacity, View} from 'react-native';

function FloatTabBarButton({children, onPress}) {
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
      onPress={onPress}>
      <View>{children}</View>
    </TouchableOpacity>
  );
}

export {FloatTabBarButton};
