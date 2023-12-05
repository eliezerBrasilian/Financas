import {Text} from 'react-native';

export function TextContent({
  fontSize = 16,
  color = '#000',
  children,
  marginVertical = 0,
  fontWeight = 'normal',
  textAlign = 'center',
  marginTop = 0,
  numberOfLines = undefined,
  flex = undefined,
}) {
  return (
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
      }}>
      {children}
    </Text>
  );
}
