import {TouchableOpacity} from 'react-native';
import Button from '../Button';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
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
            backgroundColor="#C6F9A9"
            color="#000"
            onClick={() => navTo('receita')}
          />
          <Button
            title={'Registrar Gasto'}
            backgroundColor="#FFE3E0"
            color="#000"
            onClick={() => navTo('gasto')}
          />
          <Button
            title={'Registrar Reserva'}
            backgroundColor="#DEE5E5"
            color="#000"
            onClick={() => navTo('reserva')}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
