import firestore from '@react-native-firebase/firestore';
import React from 'react';
import {View} from 'react-native';
import {Spacer} from '../../../components/Spacer';
import {TextContent} from '../../../components/TextContent';
import {useFirebase} from '../../../contexts/AuthContext';
import {Utils} from '../../../utils/Utils';
import {ChartView} from './ChartView';

export const Top = ({tag, amount, title}) => {
  const [isPremium, setPremium] = React.useState(false);
  const {user} = useFirebase();
  React.useEffect(() => {
    firestore()
      .collection('users')
      .doc(user?.uid)
      .get()
      .then(u => {
        setPremium(u.data().isPremium);
      });
  }, []);
  return (
    <View style={{alignItems: 'center', marginBottom: 20}}>
      {isPremium && <ChartView tag={tag} />}

      <Spacer />
      <TextContent fontSize={19} color="#fff">
        Total de {title}s
      </TextContent>
      <TextContent fontSize={25} color="#fff" fontWeight="bold">
        {Utils.getBrazilianCurrency(amount)}
      </TextContent>
    </View>
  );
};
