import {View} from 'react-native';
import {OverlayView} from './widgets/OverlayView';
import {Top} from './widgets/Top';

export default function Profile() {
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
