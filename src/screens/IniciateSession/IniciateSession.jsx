import {Image, TouchableOpacity, View} from 'react-native';

import {colors} from '../../assets/colors/colors';
import {Navigation} from '../../classes/Navigation';
import {LeftTopIcon} from '../../components/LeftTopIcon';
import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';

function IniciateSession({route}) {
  var nav = new Navigation();
  var cameFromSignUpClickEvent = route.params?.cameFromSignUpClickEvent;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        paddingVertical: 20,
        paddingHorizontal: 34,
      }}>
      <LeftTopIcon />

      <View style={{alignItems: 'center', marginTop: 50}}>
        {!cameFromSignUpClickEvent && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 10,
            }}>
            <Image
              source={require('../../assets/images/mao_iniciar.png')}
              style={{height: 37, width: 37}}
              resizeMode="contain"
            />
            <TextContent fontSize={19} fontWeight="bold">
              Bem-vindo de volta!
            </TextContent>
          </View>
        )}

        <Spacer marginTop={70} />
        <Image
          source={
            cameFromSignUpClickEvent
              ? require('../../assets/images/rocket.png')
              : require('../../assets/images/boas_vindas_pessoas.png')
          }
          style={{height: 220}}
          resizeMode="contain"
        />

        {cameFromSignUpClickEvent && (
          <View style={{alignItems: 'center', marginTop: 30}}>
            <TextContent fontSize={20} fontWeight="bold">
              Olá, Financeiro, vamos começar!
            </TextContent>
            <Spacer marginTop={20} />
            <TextContent fontSize={16} fontWeight="normal">
              Crie a sua conta e comece a transformar
            </TextContent>

            <TextContent fontSize={16} fontWeight="normal">
              suas finanças
            </TextContent>
          </View>
        )}

        {!cameFromSignUpClickEvent && (
          <View>
            <TextContent fontSize={16} fontWeight="normal">
              É bom vê-lo aqui novamente, continue
            </TextContent>
            <TextContent fontSize={16} fontWeight="normal">
              alcançando seu sucesso
            </TextContent>
          </View>
        )}

        <Spacer marginTop={90} />
        <TouchableOpacity
          onPress={() => {
            if (cameFromSignUpClickEvent) nav.navigateTo(nav.screens.SIGN_UP);
            else nav.navigateTo(nav.screens.LOGIN);
          }}
          style={{
            backgroundColor: colors.main_purple,
            paddingVertical: 19,
            borderRadius: 10,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
            <Image
              source={require('../../assets/images/email_branco.png')}
              style={{height: 20, width: 40}}
              resizeMode="contain"
            />
            <TextContent color="#fff" fontWeight="400">
              Continuar com email
            </TextContent>
          </View>
        </TouchableOpacity>
        <Spacer marginTop={25} />

        <TextContent
          clickable={true}
          onClick={() => {
            if (cameFromSignUpClickEvent) nav.navigateTo(nav.screens.LOGIN);
            else nav.navigateTo(nav.screens.FORGOT_PASSWORD);
          }}
          fontSize={14}
          fontWeight="700"
          color={colors.main_purple}>
          {cameFromSignUpClickEvent
            ? 'Já Sou Cadastrado'
            : 'Não consigo fazer login'}
        </TextContent>
      </View>
    </View>
  );
}

export {IniciateSession};
