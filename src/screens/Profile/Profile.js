import {View, ScrollView} from 'react-native';
import Header from '../../components/Header';
import Body from './Body';
import {useEffect} from 'react';
import {useFabButtonContext} from '../../contexts/FabButtonContext';
export default function Profile() {
  const {setFabButtonVisible} = useFabButtonContext();
  function handleBlur() {
    console.log('saiu de Profile');
    setFabButtonVisible(true);
  }
  useEffect(() => {
    const unsubscribe = handleBlur;
    return unsubscribe;
  }, []);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
      }}>
      <ScrollView>
        <Header title={'Perfil'} />
        <Body />
      </ScrollView>
    </View>
  );
}
