import {useEffect, useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Animated,
  Easing,
  TouchableOpacity,
  ScrollView,
  View,
} from 'react-native';
import {Background} from '../../components/Background';
import {colors} from '../../assets/colors';
import {P, InputContainer, Label, Input, EsqueceuSenha, Ou} from './style';
import {strings} from '../../assets/strings';
import {BtnFundo, BtnText} from '../../components/btn';
import HeaderAuth from '../../components/headerAuth';
import {
  BtnFundoGoogle,
  IconeBtnGoogle,
  BtnTextGoogle,
} from '../../components/btnEntrarComGoogle';
import {AuthContext} from '../../contexts/auth';

export default function Login() {
  const {signInWithGoogle} = useContext(AuthContext);
  const nav = useNavigation();
  const [xValue] = useState(new Animated.Value(-100));

  useEffect(() => {
    Animated.timing(xValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start();
  }, []);

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
            paddingBottom: 20,
          }}>
          <Animated.Image
            source={require('../../assets/images/finance.png')}
            resizeMode="contain"
            style={{
              marginTop: 20,
              height: 200,
              width: '100%',
              transform: [{translateX: xValue}],
            }}
          />
          <View style={{alignItems: 'center', width: '100%'}}>
            <P>{strings.login_paragrafo}</P>
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
            <InputContainer style={{marginTop: 12}}>
              <Label>{strings.senha}</Label>
              <Input
                placeholder={strings.placeholder_senha}
                autoCorrect={false}
                secureTextEntry={true}
                placeholderTextColor="gray"
                autoCapitalize="none"
              />
            </InputContainer>

            <View style={{width: '90%'}}>
              <BtnFundo>
                <BtnText>{strings.acessar}</BtnText>
              </BtnFundo>
              <TouchableOpacity style={{alignSelf: 'flex-end'}}>
                <EsqueceuSenha onPress={() => nav.navigate('ResetarSenha')}>
                  {strings.esqueceu_a_senha}
                </EsqueceuSenha>
              </TouchableOpacity>
            </View>

            <Ou>{strings.ou}</Ou>

            <BtnFundoGoogle onPress={() => signInWithGoogle()}>
              <IconeBtnGoogle
                source={require('../../assets/images/google.png')}
              />
              <BtnTextGoogle>{strings.entrar_com_google}</BtnTextGoogle>
            </BtnFundoGoogle>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
