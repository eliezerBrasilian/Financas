import {Text, TextInput, View, StyleSheet} from 'react-native';
import {colors} from '../assets/colors/colors';
import MaskInput from 'react-native-mask-input';
export default function Input({
  label,
  backgroundColor,
  placeholderText,
  fontWeight = '700',
  placeholderColor,
  value,
  setValue,
  keyboardType = 'default',
  allCaps = 'sentences',
  isPassword = false,
  isMaskInput = false,
  mask,
  onlyBorder = false,
  borderRadius = 8,
  borderWidth = 1,
  borderColor = colors.placeholder_input,
  borderBottomWidth = undefined,
}) {
  return (
    <View style={style.container}>
      {!onlyBorder && <Text style={style.label}>{label}</Text>}
      <View
        style={[
          style.inputView,
          {
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            borderWidth: borderBottomWidth !== undefined ? 0 : borderWidth,
            borderColor: borderColor,
            borderBottomWidth: borderBottomWidth,
          },
        ]}>
        {isMaskInput ? (
          <MaskInput
            value={value}
            style={[style.textInput, style.label]}
            placeholder={placeholderText}
            placeholderTextColor={placeholderColor}
            keyboardType={keyboardType}
            onChangeText={(masked, unmasked) => {
              setValue(unmasked); // you can use the unmasked value as well
            }}
            mask={mask}
          />
        ) : (
          <TextInput
            selectionColor={colors.main_blue}
            style={[style.textInput, style.label, {fontWeight: fontWeight}]}
            placeholder={placeholderText}
            placeholderTextColor={placeholderColor}
            value={value}
            onChangeText={t => setValue(t)}
            keyboardType={keyboardType}
            secureTextEntry={isPassword}
            autoCapitalize={allCaps}
          />
        )}
      </View>
    </View>
  );
}

export const style = StyleSheet.create({
  container: {
    marginTop: 12,
    rowGap: 7,
  },
  label: {
    fontSize: 16,
    color: '#000',
    marginLeft: 5,
  },
  inputView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
  },

  textInput: {
    fontSize: 17,
    width: '100%',
    color: '#000',
  },
});
