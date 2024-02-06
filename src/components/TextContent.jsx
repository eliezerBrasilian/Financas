import {Text, TouchableOpacity} from 'react-native';

export function TextContent({
  fontSize = 16,
  color = '#000',
  children,
  marginVertical = 0,
  fontWeight = 'normal',
  textAlign = 'left',
  marginTop = 0,
  numberOfLines = undefined,
  flex = undefined,
  borderBottomWidth = 0,
  borderBottomColor = '#fff',
  clickable = false,
  editable = false,
  onClick = () => {},
}) {
  return clickable ? (
    <TouchableOpacity onPress={onClick}>
      <Text
        numberOfLines={numberOfLines}
        style={{
          fontSize: fontSize,
          color: color,
          textAlign: textAlign,
          marginVertical: marginVertical,
          fontWeight: fontWeight,
          marginTop: marginTop,
          flex: flex,
          borderBottomWidth: borderBottomWidth,
          borderBottomColor: borderBottomColor,
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  ) : (
    <Text
      numberOfLines={numberOfLines}
      style={{
        fontSize: fontSize,
        color: color,
        textAlign: textAlign,
        marginVertical: marginVertical,
        fontWeight: fontWeight,
        marginTop: marginTop,
        flex: flex,
        borderBottomWidth: borderBottomWidth,
        borderBottomColor: borderBottomColor,
      }}>
      {children}
    </Text>
  );
}
