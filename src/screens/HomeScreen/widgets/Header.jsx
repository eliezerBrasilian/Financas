import {View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';

export default function Header() {
  return (
    <View style={{height: 210, paddingTop: 30}}>
      <Top />
      <Total />
    </View>
  );
}

function Top() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'flex-start',
      }}>
      <View style={{height: 45, marginTop: -10}}>
        <ProfileImage size={40} />
      </View>
      <Month />
      <Right />
    </View>
  );
}

function Total() {
  return (
    <View style={{marginLeft: 20, marginTop: 28}}>
      <TextContent color="#fff" fontWeight="400">
        Saldo em contas
      </TextContent>
      <View
        style={{
          flexDirection: 'row',
          columnGap: 10,
          alignItems: 'center',
        }}>
        <TextContent color="#fff" fontWeight="bold" fontSize={32}>
          R$ 100,00
        </TextContent>
        {/* <ProfileImage
        profilePhoto={require('../../../assets/images/olho.png')}
      /> */}
        <Feather name="eye" color="#fff" size={20} />
      </View>
    </View>
  );
}

function Month() {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 5,
        marginLeft: 27,
        marginTop: 25,
      }}>
      <TextContent fontWeight="bold" fontSize={22} color="#fff">
        Janeiro
      </TextContent>
      <ProfileImage
        size={15}
        profilePhoto={require('../../../assets/images/seta_baixo_branco.png')}
      />
    </View>
  );
}

function Right() {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 35}}>
      <ProfileImage
        size={20}
        profilePhoto={require('../../../assets/images/editar.png')}
      />

      <ProfileImage
        size={20}
        profilePhoto={require('../../../assets/images/menu.png')}
        resizeMode="contain"
      />
    </View>
  );
}
