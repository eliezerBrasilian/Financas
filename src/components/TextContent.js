import {Text} from 'react-native';

export function TextContent({
  fontSize = 16,
  color = '#000',
  children,
  marginVertical = 0,
  fontWeight = 'normal',
  textAlign = 'center',
  marginTop = 0,
}) {
  return (
    <Text
      style={{
        fontSize: fontSize,
        color: color,
        textAlign: textAlign,
        marginVertical: marginVertical,
        fontWeight: fontWeight,
        marginTop: marginTop,
      }}>
      {children}
    </Text>
  );
}
