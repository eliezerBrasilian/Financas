import {Image} from 'react-native';

export default function ProfileImage({profilePhoto = null, size = 30}) {
  return (
    <Image
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
      }}
      source={
        profilePhoto == null
          ? require('../assets/images/user_profile.png')
          : {uri: profilePhoto}
      }
    />
  );
}
