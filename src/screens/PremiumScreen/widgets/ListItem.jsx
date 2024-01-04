import {Image, View} from 'react-native';

import {colors} from '../../../assets/colors/colors';
import {TextContent} from '../../../components/TextContent';

function ListItem({image, title, label}) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.card_green,
        borderRadius: 16,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Image source={image} style={{height: 40, width: 40}} />
      <View style={{rowGap: 10, width: '70%'}}>
        <TextContent fontSize={17} fontWeight="800">
          {title}
        </TextContent>
        <TextContent color="#999999" fontWeight="400">
          {label}
        </TextContent>
      </View>
    </View>
  );
}

export {ListItem};
