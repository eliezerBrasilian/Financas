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
  maxCharacters = undefined,
  onClick = () => {},
}) {
  const truncarTexto = (texto, maxCharacters) => {
    if (texto.length <= maxCharacters) {
      return texto;
    }
    return texto.substring(0, maxCharacters) + '...';
  };

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
        {maxCharacters === undefined
          ? children
          : truncarTexto(children, maxCharacters)}
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
      {maxCharacters === undefined
        ? children
        : truncarTexto(children, maxCharacters)}
    </Text>
  );
}
