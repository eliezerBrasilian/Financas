import {useEffect, useState, useContext} from 'react';
import {Animated, Easing, ScrollView, View} from 'react-native';
import {Background} from '../../components/Background';
import {colors} from '../../assets/colors';
import {P, InputContainer, Label, Input, Ou} from '../Login/style';
import {strings} from '../../assets/strings';
import {BtnFundo, BtnText} from '../../components/btn';
import HeaderAuth from '../../components/headerAuth';
import {
  BtnFundoGoogle,
  IconeBtnGoogle,
  BtnTextGoogle,
} from '../../components/btnEntrarComGoogle';
import {AuthContext} from '../../contexts/auth';
export default function Cadastro() {
  const {signInWithGoogle} = useContext(AuthContext);
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
            <P>{strings.cadastro_paragrafo}</P>
            <InputContainer>
              <Label>{strings.nome}</Label>
              <Input
                placeholder={strings.placeholder_nome}
                autoCorrect={false}
                placeholderTextColor="gray"
              />
            </InputContainer>
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
                secureTextEntry={true}
                placeholder={strings.placeholder_criar_senha}
                autoCorrect={false}
                placeholderTextColor="gray"
                autoCapitalize="none"
              />
            </InputContainer>

            <View style={{width: '90%'}}>
              <BtnFundo>
                <BtnText>{strings.cadastrar}</BtnText>
              </BtnFundo>
            </View>

            <Ou>{strings.ou}</Ou>

            <BtnFundoGoogle onPress={() => signInWithGoogle()}>
              <IconeBtnGoogle
                source={require('../../assets/images/google.png')}
              />
              <BtnTextGoogle>{strings.cadastrar_com_google}</BtnTextGoogle>
            </BtnFundoGoogle>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
