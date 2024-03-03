import React, {createContext, useContext, useState} from 'react';

import firestore from '@react-native-firebase/firestore';
import {GoogleAdsService} from '../services/GoogleAdsService';
import {Utils} from '../utils/Utils';
import {useBalanceContext} from './BalanceContext';

const RegisterContext = createContext();

export const useRegister = () => {
  return useContext(RegisterContext);
};

export const RegisterProvider = ({children}) => {
  const [updated, setUpdated] = useState(false);
  const {doReload} = useBalanceContext();
  var googleAds = new GoogleAdsService();

  var deleteRegister = registerItem => {
    const {amount, key, tag, createdBy} = registerItem;
    firestore()
      .collection('Registers')
      .doc(key)
      .update({
        deleted: true,
      })
      .then(() => {
        updateBalance(amount, tag, createdBy);
      });
  };

  function updateBalance(amount, tag, createdBy) {
    const balancesRef = firestore().collection('Balances').doc(createdBy);
    if (tag == 'receita') {
      balancesRef
        .update({
          total: firestore.FieldValue.increment(-amount),
          revenues: firestore.FieldValue.increment(-amount),
        })
        .then(() => {
          deletedSuccessufully();
        });
    } else if (tag == 'despesa')
      balancesRef
        .update({
          total: firestore.FieldValue.increment(amount),
          expenses: firestore.FieldValue.increment(-amount),
        })
        .then(() => {
          deletedSuccessufully();
        });
    else if (tag == 'reserva')
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
    googleAds.showAds();
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
