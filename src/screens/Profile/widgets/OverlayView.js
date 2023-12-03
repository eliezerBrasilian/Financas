import {View} from 'react-native';
import {Utils} from '../../../utils/Utils';
import Item from './Item';

export function OverlayView() {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
      }}>
      <Item
        image={require('../../../assets/images/crown_list.png')}
        title={'I Finanças Premium'}
        onClick={() => Utils.ShowToast('em breve')}
      />
      <Item
        image={require('../../../assets/images/logout.png')}
        title={'Encerrar Sessão'}
        onClick={() => Utils.ShowToast('em breve')}
      />
    </View>
  );
}
