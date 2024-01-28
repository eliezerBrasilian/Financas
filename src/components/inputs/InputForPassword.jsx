import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useState} from 'react';
import {colors} from '../../assets/colors/colors';

export default function InputForPassword({
  label,
  backgroundColor,
  placeholderText,
  fontWeight = '700',
  placeholderColor,
  value,
  setValue,
  isPassword = false,
  borderRadius = 8,
  borderWidth = 1,
  borderColor = colors.placeholder_input,
}) {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={s.inputView}>
      <TextInput
        selectionColor={colors.main_blue}
        style={{
          fontWeight: fontWeight,
          fontSize: 14,
          fontWeight: 'normal',
          color: colors.input_text_color,
          flex: 1,
        }}
        placeholder={placeholderText}
        placeholderTextColor={colors.input_text_color}
        value={value}
        onChangeText={t => setValue(t)}
        secureTextEntry={showPassword}
      />
      {value != '' && (
        <TouchableOpacity
          onPress={function () {
            setShowPassword(!showPassword);
            isPassword = false;
          }}
          style={s.icon}>
          <Image
            style={{height: 20, width: 20}}
            resizeMode="contain"
            source={
              showPassword
                ? require('../../assets/images/olho.png')
                : require('../../assets//images/olho_fechado_roxo.png')
            }
          />
          {/* <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#000"
            /> */}
        </TouchableOpacity>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  label: {
    fontSize: 17,
    color: '#000',
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    justifyContent: 'space-evenly',
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.main_purple,
  },

  icon: {
    height: '100%',
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
