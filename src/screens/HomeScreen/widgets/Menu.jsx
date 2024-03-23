import {Linking, TouchableOpacity, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../assets/colors/colors';
import {Navigation} from '../../../classes/Navigation';
import ProfileImage from '../../../components/ProfileImage';
import {Spacer} from '../../../components/Spacer';
import {TextContent} from '../../../components/TextContent';

function Menu({setMenuOpen}) {
  const nav = new Navigation();
  return (
    <View
      style={{
        backgroundColor: '#fff',
        position: 'absolute',
        right: 20,
        top: 65,
        borderRadius: 13,
        padding: 10,
        zIndex: 2,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },

        elevation: 15, // Para dispositivos Android
        paddingVertical: 20,
      }}>
      <Title setMenuOpen={setMenuOpen} />
      <Spacer />
      <View style={{rowGap: 10}}>
        <Item
          title={'Perfil'}
          iconImage={require('../../../assets/images/perfil.png')}
          onClick={() => {
            setMenuOpen(false);
            nav.navigateTo(nav.screens.PROFILE);
          }}
        />
        <Item
          title={'iFinanças Premium'}
          iconImage={require('../../../assets/images/coroa_premiun.png')}
          onClick={() => {
            setMenuOpen(false);
            nav.navigateTo(nav.tabs.PREMIUM);
          }}
        />
        <Item
          title={'Avalie o aplicativo'}
          iconImage={require('../../../assets/images/estrela.png')}
          onClick={() => {
            setMenuOpen(false);
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.ifinancas',
            );
          }}
        />
        {/* <Item
          title={'Amigos'}
          iconImage={require('../../../assets/images/compartilhar_amigos.png')}
        /> */}
      </View>
    </View>
  );
}

function Title({setMenuOpen}) {
  return (
    <TouchableOpacity onPress={() => setMenuOpen(false)}>
      <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
        <AntDesign name={'close'} color={colors.main_purple} size={28} />

        <TextContent fontSize={25} fontWeight="bold" color={colors.main_purple}>
          Menu
        </TextContent>
      </View>
    </TouchableOpacity>
  );
}

function Item({title, iconImage, onClick}) {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
        <ProfileImage profilePhoto={iconImage} size={23} />
        <TextContent fontSize={20} color={colors.main_purple}>
          {title}
        </TextContent>
      </View>
    </TouchableOpacity>
  );
}
export {Menu};
