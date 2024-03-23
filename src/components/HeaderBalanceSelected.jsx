import {TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GoogleAdsService} from '../services/GoogleAdsService';
import {CustomIcon} from './CustomIcon';
import {DropDownSelect} from './DropDownSelect';

function HeaderBalanceSelected({
  title,
  onClick,
  dropdownListOfBalance,
  activateSortMenu,
}) {
  return (
    <Row>
      <Left title={title} dropdownListOfBalance={dropdownListOfBalance} />
      <Right activateSortMenu={activateSortMenu} />
    </Row>
  );
}

function Left({title, dropdownListOfBalance}) {
  const nav = useNavigation();
  const [ads] = useState(new GoogleAdsService());

  function goBack() {
    ads.showAds();
    nav.goBack();
  }

  return (
    <View style={{flexDirection: 'row', columnGap: 30, alignItems: 'center'}}>
      <TouchableOpacity onPress={goBack}>
        <AntDesign name="arrowleft" size={27} color="#fff" />
      </TouchableOpacity>

      <DropDownSelect
        title={title}
        dropdownListOfBalance={dropdownListOfBalance}
      />
    </View>
  );
}

function Row({children}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
      }}>
      {children}
    </View>
  );
}

function Right({activateSortMenu}) {
  return (
    <View style={{flexDirection: 'row', columnGap: 30}}>
      <TouchableOpacity onPress={activateSortMenu}>
        <CustomIcon path={require('../assets/images/filtro.png')} />
      </TouchableOpacity>
      {/* <TouchableOpacity>
        <CustomIcon path={require('../assets/images/download.png')} />
      </TouchableOpacity> */}
    </View>
  );
}
export {HeaderBalanceSelected};
