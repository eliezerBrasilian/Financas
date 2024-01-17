import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../assets/colors/colors';
import {style} from './Input';

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
    <View style={style.container}>
      <Text style={s.label}>{label}</Text>
      <View
        style={[
          s.inputView,
          {
            backgroundColor: backgroundColor,
            borderRadius: borderRadius,
            borderColor: borderColor,
            borderWidth: borderWidth,
          },
        ]}>
        <TextInput
          selectionColor={colors.main_blue}
          style={[
            style.textInput,
            style.label,
            {fontWeight: fontWeight, flex: 1},
          ]}
          placeholder={placeholderText}
          placeholderTextColor={placeholderColor}
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
            <Ionicons
              name={showPassword ? 'eye' : 'eye-off'}
              size={20}
              color="#000"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  label: {
    fontSize: 17,
    color: '#000',
  },
  inputView: {
    paddingLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 50,
  },

  icon: {
    height: '100%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
