import {ScrollView, View} from 'react-native';

import {Masks} from 'react-native-mask-input';
import {strings} from '../../assets/strings/strings';
import {TextContent} from '../../components/TextContent';
import {Button} from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import InputForPassword from '../../components/inputs/InputForPassword';
import {useSignUp} from './SignUp.hook';
import {style} from './style';

export default function SignUp() {
  const {
    handleSignUp,
    isLoading,
    email,
    setEmail,
    name,
    setName,
    password,
    setPassword,
    phone,
    setPhone,
  } = useSignUp();

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={style.main_view}>
        <TextContent
          textAlign="left"
          fontSize={32}
          color={'#000'}
          fontWeight={'bold'}>
          {strings.create_account_description}
        </TextContent>

        <View style={{width: '60%', marginBottom: 30}}>
          <TextContent
            textAlign="left"
            fontSize={22}
            color={'#000'}
            fontWeight={'700'}>
            {strings.hi_user}
          </TextContent>
        </View>

        <Input
          label={strings.nome_completo_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.nome_completo_placeholder}
          backgroundColor="#F6F6F6"
          value={name}
          setValue={setName}
        />
        <Input
          label={strings.celular_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.celular_placeholder}
          backgroundColor="#F6F6F6"
          value={phone}
          setValue={setPhone}
          isMaskInput={true}
          mask={Masks.BRL_PHONE}
          keyboardType="numeric"
        />

        <Input
          label={strings.email_label}
          placeholderColor="#A0A0A0"
          placeholderText={strings.email_placeholder}
          backgroundColor="#F6F6F6"
          value={email}
          setValue={setEmail}
          keyboardType="email-address"
          allCaps="none"
        />
        <InputForPassword
          label={strings.digite_sua_senha}
          placeholderText={strings.senha_placeholder}
          backgroundColor="#F6F6F6"
          value={password}
          setValue={setPassword}
          isPassword={true}
          placeholderColor="#A0A0A0"
        />

        <Button
          title={strings.create_account}
          color="#fff"
          backgroundColor={'#2A3D45'}
          fontSize={16}
          width={'100%'}
          onClick={() => handleSignUp(name, email, phone, password)}
          hasIconLeft={true}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
}
