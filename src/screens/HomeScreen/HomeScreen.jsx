import React from 'react';
import {View} from 'react-native';
import FabButton from '../../components/FabButton';
import Registers from '../../components/Registers';
import {Spacer} from '../../components/Spacer';
import {TextContent} from '../../components/TextContent';
import ModalSelectFinanceOption from '../../components/modals/ModalSelectFinanceOption';
import Cards from './widgets/Cards';
import Header from './widgets/Header';
import {TotalBalance} from './widgets/TotalBalance';

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateVisible, setDateVisible] = React.useState(false);

  var toogleCalendar = () => {
    setDateVisible(!dateVisible);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
      }}>
      <Header />
      <TotalBalance />

      <TextContent fontWeight="700" textAlign="left">
        Meu Balanço
      </TextContent>
      <Spacer />
      <Cards />
      <Spacer />
      <TextContent fontWeight="700" textAlign="left">
        Hoje
      </TextContent>
      <Spacer />
      <Registers date={date} />
      <FabButton onClick={() => setModalVisible(true)} />
      <ModalSelectFinanceOption
        visible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
