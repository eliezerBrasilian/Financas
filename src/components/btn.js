import {StyleSheet, ActivityIndicator} from 'react-native';
import {useContext} from 'react';
import {colors} from '../assets/colors/colors';
import {TouchableOpacity, Text} from 'react-native';
import {strings} from '../assets/strings';
import {AuthContext} from '../contexts/auth';
function Btn({
  width,
  btn_text,
  associatedMethod,
  btnMarginTop = 0,
  btnMarginBottom = 0,
  backgroundColor = colors.bg_splash,
  fontSize = 19,
}) {
  return (
    <TouchableOpacity
      onPress={associatedMethod}
      style={[
        s.btn,
        {
          width: width,
          marginTop: btnMarginTop,
          marginBottom: btnMarginBottom,
          backgroundColor: backgroundColor,
        },
      ]}>
      <Text style={[s.txt_btn, {fontSize: fontSize}]}>{btn_text}</Text>

      {/* //   <ActivityIndicator size={25} color="#fff" />
      // ) : (
        
      // )} */}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  btn: {
    marginBottom: 20,
    marginHorizontal: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 16,
    alignSelf: 'center',
  },
  txt_btn: {
    fontSize: 19,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 500,
  },
});

export default Btn;
