import React from 'react';
import {View} from 'react-native';
import {GoogleAds} from '../../classes/GoogleAds';
import FabButton from '../../components/FabButton';
import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';
import ModalSelectFinanceOption from '../../components/modals/ModalSelectFinanceOption';
import Cards from './widgets/Cards';
import Header from './widgets/Header';
import Registers from './widgets/Registers';
import {TotalBalance} from './widgets/TotalBalance';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateVisible, setDateVisible] = React.useState(false);
  var googleAds = new GoogleAds();
  var toogleCalendar = () => {
    setDateVisible(!dateVisible);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 10,
      }}>
      <Header />
      <TotalBalance />
      <View style={{marginLeft: 10}}>
        <TextContent fontWeight="700" textAlign="left">
          Meu Balanço
        </TextContent>
      </View>

      <Spacer />
      <Cards />
      <Spacer />
      <View style={{marginLeft: 10}}>
        <TextContent fontWeight="700" textAlign="left">
          Hoje
        </TextContent>
      </View>

      <Spacer />
      <View style={{marginHorizontal: 10, flex: 1}}>
        <Registers date={date} />
      </View>

      <Spacer />

      <FabButton onClick={() => setModalVisible(true)} />
      <ModalSelectFinanceOption
        visible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
