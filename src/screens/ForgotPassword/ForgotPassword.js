import {
  View,
  StyleSheet,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useState, useMemo} from 'react';
import {TextContent} from '../../components/TextContent';
import Button from '../../components/Button';
import {useFirebase} from '../../contexts/AuthContext';
import Header from '../../components/Header';
import Input from '../../components/Input';
import {strings} from '../../assets/strings/strings';
import {colors} from '../../assets/colors/colors';
export default function ForgotPassword() {
  const {forgotPassword, isSendingResetLink} = useFirebase();
  const [emailInput, setEmaiInput] = useState('');
  const [bottomWidthColor, setBottomWidthColor] = useState(
    colors.placeholder_input,
  );

  async function handleResetLink() {
    if (emailInput.trim() == '') {
      ToastAndroid.show(strings.type_your_email, ToastAndroid.CENTER);
      return;
    }
    let error_message = '';
    const response = await forgotPassword(emailInput);
    console.log(response);
    1;
    if (response == 'auth/invalid-email')
      error_message = 'Digite um email válido';
    else if (response == 'success')
      error_message = 'O link foi enviado com sucesso para seu email';

    Alert.alert('Erro :(', error_message);
  }
  useMemo(() => {
    if (emailInput.trim().length > 0) {
      setBottomWidthColor('blue');
    } else setBottomWidthColor(colors.placeholder_input);
  }, [emailInput]);
  return (
    <View style={style.main_view}>
      <Header title={'Redefenir senha'} />
      <View style={{marginTop: 60}}>
        <TextContent fontSize={18}>{strings.forgot_password_title}</TextContent>
      </View>

      <View style={style.body}>
        <Input
          placeholderText={'Email'}
          placeholderColor={colors.placeholder_input}
          onlyBorder={true}
          borderBottomWidth={2}
          fontWeight="400"
          value={emailInput}
          setValue={setEmaiInput}
          borderColor={bottomWidthColor}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button
            onClick={handleResetLink}
            title={strings.send_reset_link}
            backgroundColor={colors.main_blue}
            width={'80%'}
            fontSize={19}
            isLoading={isSendingResetLink}
          />
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  main_view: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
  },
  body: {
    flex: 1,
    rowGap: 20,
    marginTop: 50,
  },
});
