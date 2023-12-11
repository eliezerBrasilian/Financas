import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../assets/colors/colors';
import Button from '../Button';

export default ModalSelectFinanceOption = ({visible, setModalVisible}) => {
  const nav = useNavigation();
  function navTo(tag) {
    setModalVisible(false);
    nav.navigate('Register', {
      tag: tag,
    });
  }
  return (
    <Modal isVisible={visible} onBackButtonPress={() => setModalVisible(false)}>
      <TouchableOpacity
        onPress={() => setModalVisible(false)}
        style={{flex: 1, justifyContent: 'center'}}
        activeOpacity={1.0}>
        <TouchableOpacity
          activeOpacity={1.0}
          style={{
            backgroundColor: '#fff',
            borderRadius: 15,
            justifyContent: 'center',
            padding: 10,
            rowGap: 10,
          }}>
          <Button
            title={'Registrar Receita'}
            backgroundColor={colors.main_green}
            color="#000"
            onClick={() => navTo('receita')}
          />
          <Button
            title={'Registrar Gasto'}
            backgroundColor={colors.main_pink}
            color="#000"
            onClick={() => navTo('despesa')}
          />
          <Button
            title={'Registrar Reserva'}
            backgroundColor={colors.main_gray}
            color="#000"
            onClick={() => navTo('reserva')}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
