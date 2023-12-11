import {TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {useFirebase} from '../../../contexts/AuthContext';

export default function Header() {
  const {user} = useFirebase();
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
        <TouchableOpacity onPress={() => nav.navigate('Profile')}>
          <ProfileImage
            size={25}
            profilePhoto={require('../../../assets/images/menu.png')}
          />
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
