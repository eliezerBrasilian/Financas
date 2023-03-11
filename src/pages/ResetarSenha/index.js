import {Background} from '../../components/Background';
import {colors} from '../../assets/colors';
import HeaderAuth from '../../components/headerAuth';
import {ScrollView, View, Image} from 'react-native';
import {P, InputContainer, Label, Input} from '../Login/style';
import {strings} from '../../assets/strings';
import {BtnFundo, BtnText} from '../../components/btn';
export default function ResetarSenha() {
  return (
    <Background
      colors={[colors.gradiente_1, colors.gradiente_2]}
      style={{flex: 1}}>
      <HeaderAuth />
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <Image
            resizeMode="contain"
            source={require('../../assets/images/password.png')}
            style={{height: 200, marginTop: 40}}
          />
          <P>{strings.p_resetar_senha}</P>
          <InputContainer>
            <Label>{strings.email}</Label>
            <Input
              placeholder={strings.placeholder_email}
              autoCorrect={false}
              inputmode="email"
              keyboardType="email-address"
              placeholderTextColor="gray"
              autoCapitalize="none"
            />
          </InputContainer>
          <View style={{width: '90%'}}>
            <BtnFundo>
              <BtnText>{strings.resetar}</BtnText>
            </BtnFundo>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
