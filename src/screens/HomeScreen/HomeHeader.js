import {View} from 'react-native';
import ProfileImage from '../../components/ProfileImage';
import {TextContent} from '../../components/TextContent';
export default function HomeHeader() {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        columnGap: 15,
        marginLeft: 20,
      }}>
      <ProfileImage size={30} />
      <TextContent fontWeight="bold" fontSize={24}>
        Matias
      </TextContent>
    </View>
  );
}
