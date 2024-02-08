import {FlatList, View} from 'react-native';

import ProfileImage from '../../../components/ProfileImage';
import React from 'react';
import {TextContent} from '../../../components/TextContent';
import {Utils} from '../../../utils/Utils';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useUserContext} from '../../../contexts/UserContext';

export default function Cards() {
  const {user} = useUserContext();

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
      .doc(user?.uid)
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
      <FlatList
        data={balances}
        renderItem={({item}) => <Card data={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        //contentContainerStyle={{columnGap: 20}}
        //keyExtractor={item => item.title}
      />
    </View>
  );
}

function Card({data}) {
  const amount = data.valor;

  return <CardView tag={data.tag} amount={amount} />;
}

const CardView = ({tag, amount}) => {
  const nav = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'space-around',
        backgroundColor: Utils.getUsefulInformationsAboutCurrentBalance(
          tag,
          true,
        ).backgroundColor,
        width: 155,
        height: 165,
        padding: 15,
        borderRadius: 10,
        marginLeft: 5,
        marginRight: 5,
        //borderWidth: 0.5,
        //borderColor: '#000',
      }}>
      <ProfileImage
        size={20}
        profilePhoto={
          Utils.getUsefulInformationsAboutCurrentBalance(tag, true).icon
        }
      />
      <View style={{rowGap: 1}}>
        <TextContent color="#fff">{tag}</TextContent>
        <TextContent
          fontSize={amount > 1000 ? 20 : 24}
          color="#fff"
          fontWeight="bold">
          {Utils.getBrazilianCurrency(amount)}
        </TextContent>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 5,
        }}>
        <ProfileImage
          size={20}
          profilePhoto={require('../../../assets/images/ver_relatorio_preto.png')}
        />
        <TextContent
          color="#fff"
          fontSize={15}
          borderBottomWidth={1}
          clickable={true}
          onClick={() => nav.navigate('TypeOfBalanceSelected', {tag: tag})}>
          Ver relatório
        </TextContent>
      </View>
    </View>
  );
};
