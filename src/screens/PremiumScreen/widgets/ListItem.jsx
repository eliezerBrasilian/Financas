import {Image, View} from 'react-native';

import {TextContent} from '../../../components/TextContent';

function ListItem({image, title, label}) {
  return (
    <View
      style={{
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },

        elevation: 2, // Para dispositivos Android
        columnGap: 15,
      }}>
      <Image
        source={image}
        style={{height: 30, width: 30}}
        resizeMode="contain"
      />
      <View style={{rowGap: 5, flex: 1}}>
        <TextContent fontSize={17} fontWeight="800">
          {title}
        </TextContent>
        <TextContent fontSize={14} color="#999999" fontWeight="400">
          {label}
        </TextContent>
      </View>
    </View>
  );
}

export {ListItem};
