import {Image, View} from 'react-native';

function FloatTabBarIcon({image}) {
  const sizeContainer = 66;
  const sizeIcon = 55;

  return (
    <View
      style={{
        width: sizeContainer,
        height: sizeContainer,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sizeContainer / 2,
      }}>
      <Image
        source={image}
        style={{
          height: sizeIcon,
          width: sizeIcon,
        }}
        resizeMode="contain"
      />
    </View>
  );
}

export {FloatTabBarIcon};
