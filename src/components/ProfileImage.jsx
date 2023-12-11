import {Image} from 'react-native';

export default function ProfileImage({
  profilePhoto = null,
  size = 30,
  hasBorderRadius = false,
}) {
  return (
    <Image
      style={{
        height: size,
        width: size,
        borderRadius: hasBorderRadius ? size / 2 : 0,
      }}
      source={
        profilePhoto == null
          ? require('../assets/images/user_profile.png')
          : profilePhoto
      }
    />
  );
}
