import {Image, ScrollView, View} from 'react-native';

import React from 'react';
import {Masks} from 'react-native-mask-input';
import {colors} from '../../assets/colors/colors';
import {LeftTopIcon} from '../../components/LeftTopIcon';
import {PageCount} from '../../components/PageCount';
import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';
import {Button} from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import InputForPassword from '../../components/inputs/InputForPassword';
import {useSignUp} from './SignUp.hook';

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

  const [countPage, setCountPage] = React.useState(1);

  function incrementPageCounter() {
    setCountPage(it => {
      return it + 1;
    });
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.background}}>
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 34,
        }}>
        <LeftTopIcon />
        <View style={{alignSelf: 'flex-end'}}>
          <PageCount currentPage={countPage} />
        </View>
        <View style={{alignItems: 'center', marginTop: 20, rowGap: 20}}>
          <Image
            source={require('../../assets/images/mao_iniciar.png')}
            style={{height: 50, width: 50}}
            resizeMode="contain"
          />
          <TextContent
            textAlign="left"
            fontSize={20}
            color={'#000'}
            fontWeight={'500'}>
            Bem-vindo, vamos começar!
          </TextContent>

          {countPage == 1 && (
            <View style={{width: '100%', rowGap: 20}}>
              <Input
                placeholderText={'NOME COMPLETO'}
                value={name}
                setValue={setName}
              />

              <Input
                placeholderText={'EMAIL'}
                value={email}
                setValue={setEmail}
                keyboardType="email-address"
                allCaps="none"
              />
            </View>
          )}
          {countPage == 2 && (
            <View style={{width: '100%', rowGap: 20}}>
              <Input
                placeholderText={'NÚMERO DE CELULAR'}
                value={phone}
                setValue={setPhone}
                isMaskInput={true}
                mask={Masks.BRL_PHONE}
                keyboardType="numeric"
              />

              <InputForPassword
                placeholderText={'CRIE UMA SENHA'}
                backgroundColor="#F6F6F6"
                value={password}
                setValue={setPassword}
                isPassword={true}
                placeholderColor="#A0A0A0"
              />
            </View>
          )}
        </View>
        <Spacer marginTop={100} />
        <View style={{alignItems: 'center'}}>
          <TextContent fontSize={14}>
            Ao continuar você declara estar ciente da
          </TextContent>
          <TextContent>
            nossa{' '}
            <TextContent fontSize={14} color={colors.main_purple}>
              Política de Privacidade
            </TextContent>
          </TextContent>
        </View>

        <Spacer marginTop={80} />
        <Button
          title={'CONTINUAR'}
          fontWeight="normal"
          color="#fff"
          backgroundColor={colors.main_purple}
          fontSize={16}
          width={'100%'}
          onClick={() => {
            if (countPage == 2) {
              handleSignUp(name, email, phone, password);
            } else {
              incrementPageCounter();
            }
          }}
          hasIconLeft={true}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
}
