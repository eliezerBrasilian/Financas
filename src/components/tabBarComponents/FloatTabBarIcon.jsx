import {Image, View} from 'react-native';

function FloatTabBarIcon({image}) {
  return (
    <View
      style={{
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 70 / 2,
      }}>
      <Image
        source={image}
        style={{height: 65, width: 65}}
        resizeMode="contain"
      />
    </View>
  );
}

export {FloatTabBarIcon};
