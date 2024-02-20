import {Image} from 'react-native';

function CustomIcon({path, height = 20, width = 20}) {
  return (
    <Image
      source={path}
      style={{height: height, width: width}}
      resizeMode="contain"
    />
  );
}

export {CustomIcon};
