import {Image, View} from 'react-native';

import {TextContent} from '../TextContent';

function DefaultTabBarIcon({
  imageOnFocused,
  imageOnNotFocused,
  title,
  colorOnFocused,
  focused,
  colorOnNotFocused,
}) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 5,
      }}>
      <Image
        source={focused ? imageOnFocused : imageOnNotFocused}
        style={{height: 30, width: 30}}
        resizeMode="contain"
      />
      <TextContent
        fontSize={13}
        color={focused ? colorOnFocused : colorOnNotFocused}>
        {title}
      </TextContent>
    </View>
  );
}

export {DefaultTabBarIcon};
