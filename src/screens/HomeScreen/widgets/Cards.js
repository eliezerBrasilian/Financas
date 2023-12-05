import {FlatList, TouchableOpacity, View} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import ProfileImage from '../../../components/ProfileImage';
import {TextContent} from '../../../components/TextContent';
import {useFirebase} from '../../../contexts/AuthContext';
import {Utils} from '../../../utils/Utils';

export default function Cards() {
  const {user} = useFirebase();

  const [balances, setBalances] = React.useState([
    {tag: 'receita', title: 'Receita', valor: 0, key: '1'},
    {tag: 'despesa', title: 'Despesas', valor: 0, key: '2'},
    {tag: 'reserva', title: 'Reserva', valor: 0, key: '3'},
  ]);
  const [totalInBalance, setTotalInBalance] = React.useState(0);
  React.useEffect(() => {
    loadBalance();
  }, []);

  function loadBalance() {
    firestore()
      .collection('Balances')
      .doc(user.uid)
      .onSnapshot(snap => {
        var data = snap.data();
        updateBalances(data);
      });
  }
  function updateBalances(data) {
    const copyOfBalance = [...balances];
    const updatedBalance = copyOfBalance;

    updatedBalance[0] = {...updatedBalance[0], valor: data.revenues};
    updatedBalance[1] = {...updatedBalance[1], valor: data.expenses};
    updatedBalance[2] = {...updatedBalance[2], valor: data.reservations};
    setBalances(updatedBalance);
    setTotalInBalance(data.total);
  }
  return (
    <View style={{rowGap: 15}}>
      <Saldo total={totalInBalance} />
      <FlatList
        data={balances}
        renderItem={({item}) => <Card data={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{columnGap: 20}}
        //keyExtractor={item => item.title}
      />
    </View>
  );
}

function Saldo({total}) {
  return (
    <View>
      <TextContent fontSize={26}>Saldo</TextContent>
      <TextContent fontSize={28}>
        {Utils.getBrazilianCurrency(total)}
      </TextContent>
    </View>
  );
}

function Card({data}) {
  const nav = useNavigation();
  const amount = data.valor;

  return (
    <TouchableOpacity
      onPress={() => nav.navigate('TypeOfBalanceSelected', {tag: data.tag})}
      activeOpacity={0.6}
      style={{
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        width: 160,
        height: 100,
        padding: 15,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#000',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          columnGap: 15,
        }}>
        <ProfileImage
          size={20}
          profilePhoto={
            Utils.getUsefulInformationsAboutCurrentBalance(data.tag).icon
          }
        />
        <TextContent fontSize={18}>{data?.tag}</TextContent>
      </View>
      <TextContent fontSize={22}>
        {Utils.getBrazilianCurrency(amount)}
      </TextContent>
    </TouchableOpacity>
  );
}
