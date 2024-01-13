import {TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Menu from 'react-native-vector-icons/Ionicons';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';

export default function Header() {
  const nav = useNavigation();
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          columnGap: 15,
          marginHorizontal: 20,
        }}>
        <Left name={'I finanças'} />
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => nav.navigate('Profile')}>
          <Menu name="menu" color={'black'} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

var Left = ({name}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
      <ProfileImage
        size={30}
        profilePhoto={require('../../../assets/images/logo_ifinancas.png')}
      />

      <TextContent fontWeight="bold" fontSize={18} numberOfLines={1}>
        {name}
      </TextContent>
    </View>
  );
};
