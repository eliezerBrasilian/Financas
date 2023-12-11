import {Image} from 'react-native';

export default function ProfileImage({
  profilePhoto = null,
  size = 30,
  borderRadius = 0,
}) {
  return (
    <Image
      style={{
        height: size,
        width: size,
        borderRadius: borderRadius == 0 ? size / 2 : borderRadius,
      }}
      source={
        profilePhoto == null
          ? require('../assets/images/user_profile.png')
          : profilePhoto
      }
    />
  );
}
