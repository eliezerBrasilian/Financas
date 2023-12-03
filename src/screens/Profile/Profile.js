import {useEffect} from 'react';
import {View} from 'react-native';
import {useFabButtonContext} from '../../contexts/FabButtonContext';
import {OverlayView} from './widgets/OverlayView';
import {Top} from './widgets/Top';

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
        backgroundColor: '#5E239D',
      }}>
      <Top />
      <OverlayView />
    </View>
  );
}
