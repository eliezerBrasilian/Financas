import {StyleSheet, TextInput, View} from 'react-native';

import MaskInput from 'react-native-mask-input';
import {colors} from '../../assets/colors/colors';

export default function Input({
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
}) {
  return (
    <View style={style.inputView}>
      {isMaskInput ? (
        <MaskInput
          value={value}
          style={{
            fontWeight: fontWeight,
            width: '100%',
            fontSize: 14,
            fontWeight: 'normal',
            color: colors.input_text_color,
          }}
          placeholder={placeholderText}
          placeholderTextColor={colors.input_text_color}
          keyboardType={keyboardType}
          onChangeText={(masked, unmasked) => {
            setValue(unmasked); // you can use the unmasked value as well
          }}
          mask={mask}
        />
      ) : (
        <TextInput
          selectionColor={colors.main_blue}
          style={{
            fontWeight: fontWeight,
            width: '100%',
            fontSize: 14,
            fontWeight: 'normal',
            color: colors.input_text_color,
          }}
          placeholder={placeholderText}
          placeholderTextColor={colors.input_text_color}
          value={value}
          onChangeText={t => setValue(t)}
          keyboardType={keyboardType}
          secureTextEntry={isPassword}
          autoCapitalize={allCaps}
        />
      )}
    </View>
  );
}

export const style = StyleSheet.create({
  inputView: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.main_purple,
  },
});
