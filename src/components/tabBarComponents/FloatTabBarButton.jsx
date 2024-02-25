import {TouchableOpacity, View} from 'react-native';

function FloatTabBarButton({children, onPress}) {
  return (
    <TouchableOpacity
      style={{
        top: -25,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'red',
        height: 80,
        width: 80,
      }}
      onPress={onPress}>
      <View>{children}</View>
    </TouchableOpacity>
  );
}

export {FloatTabBarButton};
