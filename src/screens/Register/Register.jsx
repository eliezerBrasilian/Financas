import React, {useState} from 'react';
import {StatusBar, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {BackgroundColor} from '../../classes/BackgroundColor';
import {DateTime} from '../../classes/DateTime';
import {useBalanceContext} from '../../contexts/BalanceContext';
import {useUserContext} from '../../contexts/UserContext';
import {Collections} from '../../enums/Collections';
import {Dia} from '../../enums/Dia';
import {GoogleAdsService} from '../../services/GoogleAdsService';
import {Utils} from '../../utils/Utils';
import {Overview} from './widgets/OverView';
import {Top} from './widgets/Top';

export default Register = ({route}) => {
  const tag = route?.params?.tag;
  const {user, isPremium} = useUserContext();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [daySelected, setDaySelected] = useState(Dia.TODAY);
  const [localDateTime, setLocalDatetime] = useState(new Date());
  const [pickerVisible, setPickerVisible] = useState(false);
  const [categoryWasNotProvided, setCategoryNotProvided] = useState(false);
  const [descriptionWasNotProvided, setDescriptionNotProvided] =
    useState(false);
  const [amountWasInvalid, setAmountWasInvalid] = useState(false);

  const {doReload} = useBalanceContext();
  const googleAds = new GoogleAdsService();

  var bgColor = BackgroundColor.getBackgrouncColor(tag);

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

  async function handleSendOfRegister() {
    if (
      category !== '' &&
      !(amount === 0) &&
      !(amount === '') &&
      !(description == '')
    ) {
      await sendRegister();
    }
    if (category == '') setCategoryNotProvided(true);
    if (category != '') setCategoryNotProvided(false);
    if (description == '') setDescriptionNotProvided(true);
    if (description != '') setDescriptionNotProvided(false);
    if (amount === 0 || amount === '') {
      setAmountWasInvalid(true);
    }
  }

  async function sendRegister() {
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
        resetFields();
        if (!isPremium) googleAds.showAds();
        doReload();
      });
  }

  function resetFields() {
    setAmount('');
    setDescription('');
  }

  return (
    <View style={{backgroundColor: bgColor, flex: 1}}>
      <StatusBar backgroundColor={bgColor} barStyle={'light-content'} />
      <Top
        title={tag}
        value={amount}
        setValue={setAmount}
        amountWasInvalid={amountWasInvalid}
      />

      <Overview
        tag={tag}
        description={description}
        categoryWasNotProvided={categoryWasNotProvided}
        descriptionWasNotProvided={descriptionWasNotProvided}
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
