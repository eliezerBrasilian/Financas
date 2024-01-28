import {Image, TouchableOpacity, View} from 'react-native';

import {colors} from '../../assets/colors/colors';
import {Navigation} from '../../classes/Navigation';
import {LeftTopIcon} from '../../components/LeftTopIcon';
import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';

function IniciateSession() {
  var nav = new Navigation();

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
        <Spacer marginTop={70} />
        <Image
          source={require('../../assets/images/boas_vindas_pessoas.png')}
          style={{height: 220}}
          resizeMode="contain"
        />
        <TextContent fontSize={16} fontWeight="normal">
          É bom vê-lo aqui novamente, continue
        </TextContent>
        <TextContent fontSize={16} fontWeight="normal">
          alcançando seu sucesso
        </TextContent>

        <Spacer marginTop={90} />
        <TouchableOpacity
          onPress={() => nav.navigateTo(nav.screens.LOGIN)}
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

        <TextContent fontSize={14} fontWeight="700" color={colors.main_purple}>
          Não consigo fazer login
        </TextContent>
      </View>
    </View>
  );
}

export {IniciateSession};
