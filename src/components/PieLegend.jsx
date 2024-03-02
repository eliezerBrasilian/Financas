import {View} from 'react-native';
import {TextContent} from './TextContent';

function PiLegend({amount, dotColor, text}) {
  return (
    <View style={{flexDirection: 'row', columnGap: 10, alignItems: 'center'}}>
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: dotColor,
        }}
      />
      <TextContent fontSize={15}>
        {text}: {amount + '%'}
      </TextContent>
    </View>
  );
}

export {PiLegend};
