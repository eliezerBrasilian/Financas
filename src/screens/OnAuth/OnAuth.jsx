import {Image, StatusBar, TouchableOpacity, View} from 'react-native';

import {colors} from '../../assets/colors/colors';
import {Navigation} from '../../classes/Navigation';
import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';
import {Button} from '../../components/buttons/Button';

export default function OnAuth() {
  const nav = new Navigation();

  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        paddingHorizontal: 34,
        backgroundColor: colors.background,
        alignItems: 'center',
      }}>
      <StatusBar backgroundColor={colors.background} />
      <Spacer marginTop={50} />
      <Image
        source={require('../../assets/images/logo_iniciar.png')}
        resizeMode="contain"
        style={{height: 28}}
      />

      <Spacer marginTop={80} />
      <Image
        source={require('../../assets/images/mulher_laptop.png')}
        resizeMode="contain"
        style={{height: 250}}
      />

      <View style={{alignSelf: 'flex-start', marginTop: 25}}>
        <TextContent fontSize={18} color={'#000'} fontWeight="bold">
          Entre ou cadastre-se
        </TextContent>

        <TextContent fontSize={15} color={'#000'}>
          Gerencie seus gastos de forma rápida e prática
        </TextContent>
      </View>

      <Spacer marginTop={90} />
      <Button
        padding={5}
        title={'CADASTRAR'}
        color="#fff"
        backgroundColor={colors.main_purple}
        fontSize={16}
        width={'100%'}
        hasIconLeft={true}
        icon={'sss'}
        fontWeight="400"
        onClick={() =>
          nav.navigateToDestinationScreenUsingParams(
            nav.screens.INICIATE_SESSION,
            {cameFromSignUpClickEvent: true},
          )
        }
      />
      <Spacer />

      <TouchableOpacity
        onPress={() =>
          nav.navigateToDestinationScreenUsingParams(
            nav.screens.INICIATE_SESSION,
            {cameFromSignUpClickEvent: false},
          )
        }
        style={{
          borderColor: colors.main_purple,
          borderRadius: 10,
          borderWidth: 1,
          paddingVertical: 16,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextContent color={colors.main_purple} fontWeight="400">
          JÁ SOU CADASTRADO
        </TextContent>
      </TouchableOpacity>
    </View>
  );
}
