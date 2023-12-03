import {TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';

export default function Header() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        columnGap: 15,
        marginHorizontal: 20,
      }}>
      <Left />
      <ProfileImage
        profilePhoto={require('../../../assets/images/crown.png')}
      />
    </View>
  );
}

var Left = () => {
  const nav = useNavigation();
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
      <TouchableOpacity onPress={() => nav.navigate('Profile')}>
        <ProfileImage size={30} />
      </TouchableOpacity>

      <TextContent fontWeight="bold" fontSize={24}>
        Matias
      </TextContent>
    </View>
  );
};
