import {TextInput, TouchableOpacity, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import React from 'react';
import DatePicker from 'react-native-date-picker';
import Button from '../../components/Button';
import {TextContent} from '../../components/TextContent';
import {useFirebase} from '../../contexts/AuthContext';
import {Utils} from '../../utils/Utils';
import {Top} from './widgets/Top';

export default Register = ({route}) => {
  const tag = route?.params?.tag;
  const {user} = useFirebase();
  const [amount, setAmount] = React.useState(null);
  const [description, setDescription] = React.useState('');
  const [date, setDate] = React.useState(new Date());
  const [dateVisible, setDateVisible] = React.useState(false);

  async function handleSendOfRegister() {
    await sendRegister();
    await updateBalance();
  }

  async function sendRegister() {
    if (amount === null || amount === 0 || description == '') return;
    await firestore()
      .collection('Registers')
      .add({
        tag: tag,
        category: null,
        deleted: false,
        amount: Number(amount),
        description: description.trim(),
        descriptionInLowerCaseForSearching: description
          .trim()
          .toLocaleLowerCase(),
        monthYear: Utils.getMonthAndYear(date),
        dayMonthYear: Utils.getDateFormated(date),
        createdAt: firestore.FieldValue.serverTimestamp(),
        createdBy: user.uid,
      })
      .then(() => Utils.ShowToast(`${tag} registrada`));
  }
  async function updateBalance() {
    if (amount === null || amount === 0 || description == '') return;

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

  const properties = React.useMemo(
    () => Utils.getAppropriateBackgroundColor(tag, true),
    [tag],
  );

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
        <TextInput
          placeholder={'Descrição da ' + tag + '...'}
          placeholderTextColor={'#000'}
          style={{
            color: '#000',
            fontSize: 18,
            borderBottomWidth: 0.6,
            borderBottomColor: 'green',
            borderRadius: 10,
            marginRight: 20,
          }}
          value={description}
          onChangeText={v => setDescription(v)}
        />
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
          backgroundColor={properties.backgroundColor}
          title={'Salvar'}
          borderRadius={20}
          padding={5}
        />
      </View>
    </View>
  );
};
