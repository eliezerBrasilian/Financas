import {Image, ScrollView, View} from 'react-native';

import {colors} from '../../assets/colors/colors';
import {strings} from '../../assets/strings/strings';
import {Navigation} from '../../classes/Navigation';
import {LeftTopIcon} from '../../components/LeftTopIcon';
import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';
import {Button} from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import InputForPassword from '../../components/inputs/InputForPassword';

//import {useLogin} from './Login.hook';

export default function Login() {
  // const {isLoading, handleLogin, email, password, setEmail, setPassword} =
  //   useLogin();

  const nav = new Navigation();

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
      <View
        style={{
          flex: 1,
          padding: 15,
          alignItems: 'center',
          paddingHorizontal: 34,
        }}>
        <View style={{alignSelf: 'flex-start'}}>
          <LeftTopIcon />
        </View>

        <Spacer marginTop={60} />
        <Image
          source={require('../../assets/images/foguete.png')}
          style={{height: 66, width: 66}}
        />
        <Spacer marginTop={20} />
        <TextContent fontSize={20} fontWeight="bold">
          Iniciar Sessão
        </TextContent>

        <Spacer marginTop={20} />

        <Input
          label={strings.email_label}
          placeholderColor="#A0A0A0"
          placeholderText={'EMAIL'}
          backgroundColor="#F6F6F6"
          // value={email}
          // setValue={setEmail}
          keyboardType="email-address"
          allCaps="none"
        />
        <InputForPassword
          label={strings.digite_sua_senha}
          placeholderText={'SENHA'}
          backgroundColor="#F6F6F6"
          // value={password}
          // setValue={setPassword}
          isPassword={true}
          placeholderColor="#A0A0A0"
        />

        <Button
          title={strings.login_in}
          fontWeight={'bold'}
          onClick={() => handleLogin(email, password)}
          backgroundColor="#2A3D45"
          color="#fff"
          marginTop={30}
          // isLoading={isLoading}
          fontSize={16}
        />
        <Button
          title={strings.forgot_password}
          fontWeight={'bold'}
          onClick={() => nav.navigateTo(nav.screens.FORGOT_PASSWORD)}
          color={colors.forgot_password}
          marginTop={10}
          fontSize={16}
          // isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
}
