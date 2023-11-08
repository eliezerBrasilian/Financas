import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {strings} from '../assets/strings/strings';
import {colors} from '../assets/colors/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import ProfileImage from './ProfileImage';
export default function SearchBar({searchText, setSearchText}) {
  const nav = useNavigation();
  return (
    <View style={style.view}>
      <AntDesign name="search1" color={colors.search_bar_icon} size={20} />
      <TextInput
        style={style.input}
        placeholderTextColor={colors.search_bar_input_placeholder}
        placeholder={strings.search_on}
        value={searchText}
        onChangeText={text => setSearchText(text)}
        autoCapitalize={'none'}
      />
      <TouchableOpacity onPress={() => nav.navigate('Profile')}>
        <ProfileImage size={26} />
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    flexDirection: 'row',
    columnGap: 20,
    backgroundColor: colors.search_bar_input_background,
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    flex: 1,
  },
});
