import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useFirebase} from '../../contexts/AuthContext';
import React from 'react';
import HomeHeader from './HomeHeader';
import HomeCards from './HomeCards';
import HomeRegistros from './HomeRegistros';
import FabButton from '../../components/FabButton';
import ModalSelectFinanceOption from '../../components/modals/ModalSelectFinanceOption';
import DatePicker from 'react-native-date-picker';
import {TextContent} from '../../components/TextContent';
import {Utils} from '../../utils/Utils';
export default function HomeScreen() {
  const nav = useNavigation();
  const {user} = useFirebase();
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
      <HomeHeader />
      <HomeCards />
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
      <HomeRegistros date={date} />
      <FabButton onClick={() => setModalVisible(true)} />
      <ModalSelectFinanceOption
        visible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}

function Top({onClick}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        flexDirection: 'row',
        columnGap: 10,
        justifyContent: 'center',
      }}>
      <Utils.calendarIcon />
      <TextContent>Selecionar Período</TextContent>
    </TouchableOpacity>
  );
}
