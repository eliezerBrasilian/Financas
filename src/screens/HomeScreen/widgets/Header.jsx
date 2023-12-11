import {TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {useFirebase} from '../../../contexts/AuthContext';

export default function Header() {
  const {user} = useFirebase();
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
        <ProfileImage
          profilePhoto={require('../../../assets/images/crown.png')}
        />
      </View>
    </View>
  );
}

var Left = ({name}) => {
  const nav = useNavigation();
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 15}}>
      <TouchableOpacity onPress={() => nav.navigate('Profile')}>
        <ProfileImage size={30} />
      </TouchableOpacity>

      <TextContent fontWeight="bold" fontSize={18} numberOfLines={1}>
        {name}
      </TextContent>
    </View>
  );
};
