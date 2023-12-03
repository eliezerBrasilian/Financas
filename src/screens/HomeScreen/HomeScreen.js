import React from 'react';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import FabButton from '../../components/FabButton';
import Registers from '../../components/Registers';
import ModalSelectFinanceOption from '../../components/modals/ModalSelectFinanceOption';
import Cards from './widgets/Cards';
import Header from './widgets/Header';
import {Top} from './widgets/Top';

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
        rowGap: 40,
      }}>
      <Header />
      <Cards />
      <Top onClick={toogleCalendar} />
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
      <Registers date={date} />
      <FabButton onClick={() => setModalVisible(true)} />
      <ModalSelectFinanceOption
        visible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
