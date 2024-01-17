import {ActivityIndicator, Text, TouchableOpacity, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Button({
  title,
  fontSize = 18,
  color = '#fff',
  fontWeight = 'bold',
  backgroundColor = 'transparent',
  onClick,
  width = undefined,
  isLoading = false,
  borderRadius = 10,
  padding = 10,
}) {
  function executeMethod() {
    onClick();
  }
  function Content() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          columnGap: 10,
          borderRadius: borderRadius,
          padding: padding,
        }}>
        <Text
          style={{color: color, fontSize: fontSize, fontWeight: fontWeight}}>
          {title}
        </Text>
      </View>
    );
  }
  return (
    <TouchableOpacity
      onPress={executeMethod}
      style={{
        backgroundColor: backgroundColor,
        paddingHorizontal: 18,
        paddingVertical: 15,
        width: width,
        borderRadius: borderRadius,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {isLoading ? <ActivityIndicator size={17} color="#fff" /> : <Content />}
    </TouchableOpacity>
  );
}
