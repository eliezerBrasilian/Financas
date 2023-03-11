import {useEffect, useState} from 'react';
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
import {H1, P} from './style';
import {strings} from '../../assets/strings';
import {BtnFundo, BtnText} from '../../components/btn';

export default function OnLaunch() {
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

  function IrParaFazerLogin() {
    nav.navigate('Login');
  }

  return (
    <Background
      colors={[colors.gradiente_1, colors.gradiente_2]}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
          <Animated.Image
            source={require('../../assets/images/hold.png')}
            resizeMode="contain"
            style={{
              marginTop: 20,
              height: 300,
              width: '100%',
              transform: [{translateX: xValue}],
            }}
          />
          <View style={{width: '95%'}}>
            <H1>{strings.h1}</H1>
            <P>{strings.p}</P>
            <BtnFundo onPress={() => nav.navigate('Cadastro')}>
              <BtnText>{strings.criar_uma_conta}</BtnText>
            </BtnFundo>
            <TouchableOpacity
              onPress={IrParaFazerLogin}
              style={{
                marginTop: 25,
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <P>{strings.fazer_login}</P>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
