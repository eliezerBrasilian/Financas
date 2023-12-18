import {Image} from 'react-native';

export default function DriveIcon({
  path = require('../assets/images/logo_ifinancas.png'),
  size = 200,
  width = 200,
  resizeMode = 'cover',
}) {
  return (
    <Image
      resizeMode={resizeMode}
      style={{height: size, width: width, alignSelf: 'center'}}
      source={path}
    />
  );
}
