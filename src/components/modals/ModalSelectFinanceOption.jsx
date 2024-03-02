import {TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import {Navigation} from '../../classes/Navigation';
import {usePlusButtonContext} from '../../contexts/PlusButtonContext';
import {CustomIcon} from '../CustomIcon';
import {TextContent} from '../TextContent';

export default ModalSelectFinanceOption = ({visible, setModalVisible}) => {
  const nav = useNavigation();
  const navigation = new Navigation();
  const {handleClosePopUpOfPlusButton} = usePlusButtonContext();
  function navTo(destinationScreen) {
    //setModalVisible(false);
    handleClosePopUpOfPlusButton();
    nav.navigate('Register', {tag: String(destinationScreen).toLowerCase()});
  }

  return (
    <Modal
      backdropColor="transparent"
      isVisible={visible}
      onBackButtonPress={handleClosePopUpOfPlusButton}>
      <TouchableOpacity
        onPress={handleClosePopUpOfPlusButton}
        style={{
          flex: 1,
          justifyContent: 'center',
        }}
        activeOpacity={1.0}>
        <TouchableOpacity
          activeOpacity={1.0}
          style={{
            backgroundColor: '#fff',
            borderRadius: 25,
            justifyContent: 'center',
            padding: 20,
            rowGap: 10,
            //
            zIndex: 3,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            elevation: 15, // Para dispositivos Android
          }}>
          <FinanceItem
            title={'Histórico'}
            image={require('../../assets/images/historico_menu.png')}
            onClick={() => navTo('receita')}
          />
          <FinanceItem
            title={'Registrar Receita'}
            image={require('../../assets/images/receita_menu.png')}
            onClick={() => navTo('receita')}
          />
          <FinanceItem
            title={'Registrar Despesa'}
            image={require('../../assets/images/despesa_menu.png')}
            onClick={() => navTo('despesa')}
          />
          <FinanceItem
            title={'Reserva'}
            image={require('../../assets/images/pig_menu.png')}
            onClick={() => navTo('reserva')}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

function FinanceItem({title, image, onClick}) {
  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={{
          columnGap: 15,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CustomIcon path={image} height={43} width={43} />
        <TextContent fontSize={17} fontWeight="bold">
          {title}
        </TextContent>
      </View>
    </TouchableOpacity>
  );
}
