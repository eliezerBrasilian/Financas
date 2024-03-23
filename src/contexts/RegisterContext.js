import React, {createContext, useContext, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import {Collections} from '../enums/Collections';
import {tags} from '../enums/Tag';
import {GoogleAdsService} from '../services/GoogleAdsService';
import {Utils} from '../utils/Utils';
import {useBalanceContext} from './BalanceContext';
import {useUserContext} from './UserContext';

const RegisterContext = createContext();

export const useRegister = () => {
  return useContext(RegisterContext);
};

export const RegisterProvider = ({children}) => {
  const [updated, setUpdated] = useState(false);
  const {doReload} = useBalanceContext();
  const [googleAds] = useState(new GoogleAdsService());

  const {isPremium} = useUserContext();

  var deleteRegister = registerItem => {
    const {amount, key, tag, createdBy} = registerItem;
    firestore()
      .collection(Collections.REGISTERS)
      .doc(key)
      .update({
        deleted: true,
      })
      .then(() => {
        updateBalance(amount, tag, createdBy);
      });
  };

  function updateBalance(amount, tag, createdBy) {
    const balancesRef = firestore()
      .collection(Collections.BALANCES)
      .doc(createdBy);
    if (tag == tags.REVENUE) {
      balancesRef
        .update({
          total: firestore.FieldValue.increment(-amount),
          revenues: firestore.FieldValue.increment(-amount),
        })
        .then(() => {
          deletedSuccessufully();
        });
    } else if (tag == tags.EXPENSE)
      balancesRef
        .update({
          total: firestore.FieldValue.increment(amount),
          expenses: firestore.FieldValue.increment(-amount),
        })
        .then(() => {
          deletedSuccessufully();
        });
    else if (tag == tags.RESERVATION)
      balancesRef
        .update({
          total: firestore.FieldValue.increment(amount),
          reservations: firestore.FieldValue.increment(-amount),
        })
        .then(() => {
          deletedSuccessufully();
        });
  }

  function deletedSuccessufully() {
    Utils.ShowToast('Registro excluido');
    setUpdated(!updated);
    doReload();
    if (!isPremium) googleAds.showAds();
  }
  return (
    <RegisterContext.Provider
      value={{
        deleteRegister,
        updated,
      }}>
      {children}
    </RegisterContext.Provider>
  );
};
