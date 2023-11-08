import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useFirebase} from '../../contexts/AuthContext';
import React from 'react';

import HomeHeader from './HomeHeader';
import HomeCards from './HomeCards';
import HomeRegistros from './HomeRegistros';
import FabButton from '../../components/FabButton';
import ModalSelectFinanceOption from '../../components/ModalSelectFinanceOption';
export default function HomeScreen() {
  const nav = useNavigation();
  const {user} = useFirebase();
  const [modalVisible, setModalVisible] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        rowGap: 50,
      }}>
      <HomeHeader />
      <HomeCards />
      <HomeRegistros />
      <FabButton onClick={() => setModalVisible(true)} />
      <ModalSelectFinanceOption
        visible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
}
