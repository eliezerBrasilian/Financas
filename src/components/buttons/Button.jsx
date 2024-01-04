import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

function Button({
  title,
  fontSize = 19,
  marginTop = 0,
  color = '#fff',
  fontWeight = 'bold',
  backgroundColor = 'transparent',
  onClick = () => {},
  width = undefined,
  isLoading = false,
  iconName,
  iconColor = '#fff',
  iconSize = 25,
  paddingVertical = 13,
}) {
  function Content() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
        }}>
        <Text
          style={{color: color, fontSize: fontSize, fontWeight: fontWeight}}>
          {title}
        </Text>
        <AntDesign name={iconName} color={iconColor} size={iconSize} />
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        backgroundColor: backgroundColor,
        paddingHorizontal: 15,
        paddingVertical: paddingVertical,
        width: width,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: marginTop,
      }}>
      {isLoading ? <ActivityIndicator size={17} color="#fff" /> : <Content />}
    </TouchableOpacity>
  );
}

export {Button};
