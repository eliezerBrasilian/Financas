import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';

import {BackgroundColor} from '../../classes/BackgroundColor';
import {Collections} from '../../enums/Collections';
import {DateTime} from '../../classes/DateTime';
import {Dia} from '../../enums/Dia';
import {Overview} from './widgets/OverView';
import {Top} from './widgets/Top';
import {Utils} from '../../utils/Utils';
import firestore from '@react-native-firebase/firestore';
import {useBalanceContext} from '../../contexts/BalanceContext';
import {useUserContext} from '../../contexts/UserContext';

export default Register = ({route}) => {
  const tag = route?.params?.tag;
  const {user} = useUserContext();
  const [amount, setAmount] = useState(5);
  const [description, setDescription] = useState('teste');
  const [category, setCategory] = useState('');
  const [daySelected, setDaySelected] = useState(Dia.TODAY);
  const [localDateTime, setLocalDatetime] = useState(new Date());
  const [pickerVisible, setPickerVisible] = useState(false);

  const {doReload} = useBalanceContext();

  var bgColor = BackgroundColor.getBackgrouncColor(tag);

  async function handleSendOfRegister() {
    await sendRegister();
  }

  var handleDescriptionChange = text => {
    setDescription(text);
  };

  var handleCategoryChange = text => {
    setCategory(text);
  };

  var handleSelectDayChange = day => {
    setDaySelected(day);

    if (day == Dia.TODAY) {
      setLocalDatetime(new Date());
    }
    if (day == Dia.YESTARDAY) {
      setLocalDatetime(DateTime.getYesterday());
    }
  };

  async function sendRegister() {
    if (amount === null || amount === 0 || description == '' || category == '')
      return;
    await firestore()
      .collection(Collections.REGISTERS)
      .add({
        tag: tag,
        category: category,
        deleted: false,
        amount: Number(amount),
        description: description.trim(),
        descriptionInLowerCaseForSearching: description
          .trim()
          .toLocaleLowerCase(),
        monthYear: Utils.getMonthAndYear(localDateTime),
        dayMonthYear: Utils.getDateFormated(localDateTime),
        createdAt: firestore.FieldValue.serverTimestamp(),
        createdBy: user.uid,
      })
      .then(() => {
        Utils.ShowToast(`${tag} registrada`);
        doReload();
      });
  }
  // async function updateBalance() {
  //   if (amount === null || amount === 0 || description == '') {
  //     Utils.ShowToast('Preencha todos os campos');
  //     return;
  //   }

  //   let fieldsToUpdate;
  //   if (tag == 'receita') {
  //     fieldsToUpdate = {
  //       revenues: firestore.FieldValue.increment(Number(amount)),
  //       total: firestore.FieldValue.increment(Number(amount)),
  //     };
  //   } else if (tag == 'reserva') {
  //     fieldsToUpdate = {
  //       reservations: firestore.FieldValue.increment(Number(amount)),
  //       total: firestore.FieldValue.increment(-Number(amount)),
  //     };
  //   } else {
  //     fieldsToUpdate = {
  //       expenses: firestore.FieldValue.increment(Number(amount)),
  //       total: firestore.FieldValue.increment(-Number(amount)),
  //     };
  //   }

  //   await firestore()
  //     .collection(Collections.BALANCES)
  //     .doc(user.uid)
  //     .update(fieldsToUpdate)
  //     .then(() => {
  //       setAmount(0);
  //       setDescription('');
  //     });
  // }

  return (
    <View style={{backgroundColor: bgColor, flex: 1}}>
      <StatusBar backgroundColor={bgColor} barStyle={'light-content'} />
      <Top title={tag} value={amount} setValue={setAmount} />

      <Overview
        tag={tag}
        description={description}
        handleDescriptionChange={handleDescriptionChange}
        pickerVisible={pickerVisible}
        currentDate={localDateTime}
        daySelected={daySelected}
        handleSendOfRegister={handleSendOfRegister}
        handleCategoryChange={handleCategoryChange}
        handleSelectDayChange={handleSelectDayChange}
      />
    </View>
  );
};
