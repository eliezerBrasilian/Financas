import {View} from 'react-native';
import {TextContent} from '../../../components/TextContent';

function SeparationItem() {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', columnGap: 3}}>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#BCAC9B',
          borderStyle: 'solid',
          flex: 1,
          marginTop: 3,
        }}
      />
      <TextContent>ou</TextContent>

      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#BCAC9B',
          borderStyle: 'solid',
          flex: 1,
          marginTop: 3,
        }}
      />
    </View>
  );
}

export {SeparationItem};
