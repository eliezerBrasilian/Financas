import {TouchableOpacity, View} from 'react-native';

import {Navigation} from '../../../classes/Navigation';
import {Line} from '../../../components/Line';
import ProfileImage from '../../../components/ProfileImage';
import {Spacer} from '../../../components/Spacer';
import {TextContent} from '../../../components/TextContent';
import {useOverlay} from './OverlayView.hook';

export function OverlayView() {
  const {signOut} = useOverlay();
  const nav = new Navigation();

  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
      }}>
      <Item
        title={'i Finanças Premium'}
        icon={require('../../../assets/images/crown_list.png')}
        onClick={() => nav.navigateTo(nav.tabs.PREMIUM)}
      />
      <Spacer />
      <Line />
      <Spacer />
      <Item
        title={'Encerrar Sessão'}
        icon={require('../../../assets/images/logout.png')}
        onClick={() => signOut()}
      />
      <Spacer />
      <Line />
    </View>
  );
}

const Item = ({title, icon, onClick = () => {}}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
      <Icon icon={icon} />
      <TextContent>{title}</TextContent>
    </TouchableOpacity>
  );
};

const Icon = ({icon}) => {
  return (
    <View
      style={{
        backgroundColor: '#E8EDFF',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: 45,
        borderRadius: 45 / 2,
      }}>
      <ProfileImage profilePhoto={icon} size={22} borderRadius={0} />
    </View>
  );
};
