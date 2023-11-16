import {View, TouchableOpacity} from 'react-native';
import Button from '../../components/Button';
import React from 'react';
import {Utils} from '../../utils/Utils';
import {TextContent} from '../../components/TextContent';
import MaskInput, {Masks} from 'react-native-mask-input';
import {useNavigation} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore';
import {useFirebase} from '../../contexts/AuthContext';
export default Register = ({route}) => {
  const tag = route?.params?.tag;
  const {user} = useFirebase();
  const [amount, setAmount] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [dateVisible, setDateVisible] = React.useState(false);

  async function handleSendOfRegister() {
    await sendRegister();
    await updateBalance();
  }

  async function sendRegister() {
    await firestore()
      .collection('Registers')
      .add({
        tag: tag,
        amount: Number(amount.trim()),
        createdAt: firestore.FieldValue.serverTimestamp(),
        createdBy: user.uid,
      })
      .then(() => Utils.ShowToast(`${tag} registrada`));
  }
  async function updateBalance() {
    let fieldsToUpdate;
    if (tag == 'receita') {
      fieldsToUpdate = {
        revenues: firestore.FieldValue.increment(Number(amount)),
        total: firestore.FieldValue.increment(Number(amount)),
      };
    } else if (tag == 'reserva') {
      fieldsToUpdate = {
        reservations: firestore.FieldValue.increment(Number(amount)),
        total: firestore.FieldValue.increment(-Number(amount)),
      };
    } else {
      fieldsToUpdate = {
        expenses: firestore.FieldValue.increment(Number(amount)),
        total: firestore.FieldValue.increment(-Number(amount)),
      };
    }

    await firestore()
      .collection('Balances')
      .doc(user.uid)
      .update(fieldsToUpdate);
  }

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Top title={tag} value={amount} setValue={setAmount} />
      <View
        style={{overflow: 'hidden', marginTop: 20, marginLeft: 20, rowGap: 15}}>
        <TextContent fontSize={19} fontWeight="bold">
          Escolher a data
        </TextContent>
        <TouchableOpacity
          onPress={() => setDateVisible(true)}
          style={{
            flexDirection: 'row',
            columnGap: 20,
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <Utils.calendarIcon />
          <TextContent fontSize={18} fontWeight="500">
            {Utils.getDateFormated(date)}
          </TextContent>
        </TouchableOpacity>
      </View>
      <DatePicker
        modal={true}
        open={dateVisible}
        date={date}
        onCancel={() => setDateVisible(false)}
        onConfirm={newDate => {
          setDateVisible(false);
          setDate(newDate);
        }}
        locale="pt"
        title={'Selecione a data'}
        cancelText="Cancelar"
        confirmText="Confirmar"
        theme="light"
        androidVariant="iosClone"
        mode="date"
      />
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 70,
        }}>
        <Button
          onClick={handleSendOfRegister}
          backgroundColor="green"
          title={'Salvar'}
          borderRadius={20}
          padding={5}
        />
      </View>
    </View>
  );
};

function Top({title, value, setValue}) {
  const nav = useNavigation();

  const properties = React.useMemo(() => {
    if (title == 'receita') return {backgroundColor: 'green', title: 'Receita'};
    else if (title == 'gasto')
      return {backgroundColor: 'red', title: 'Despesa'};
    else return {backgroundColor: 'blue', title: 'Reserva'};
  }, [title]);
  return (
    <View
      style={{
        backgroundColor: properties.backgroundColor,
        minHeight: 150,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
      }}>
      <TouchableOpacity
        onPress={() => nav.goBack()}
        style={{
          flexDirection: 'row',
          columnGap: 10,
          alignItems: 'center',
          padding: 10,
          overflow: 'hidden',
        }}>
        <Utils.leftIcon />
        <TextContent color="#fff" fontSize={18} fontWeight="400">
          {properties.title}
        </TextContent>
      </TouchableOpacity>

      <View style={{marginLeft: 15, marginTop: 20}}>
        <TextContent
          fontSize={20}
          color="#fff"
          textAlign="left"
          fontWeight="400">
          Valor da {properties.title}
        </TextContent>
        <MaskInput
          value={value}
          onChangeText={(masked, unmasked) => setValue(unmasked)}
          mask={Masks.BRL_CURRENCY}
          placeholder="R$ 0,00"
          placeholderTextColor={'#fff'}
          style={{fontSize: 30, fontWeight: 'bold', color: '#fff'}}
        />
      </View>
    </View>
  );
}
