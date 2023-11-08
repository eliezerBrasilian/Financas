import {View, ActivityIndicator} from 'react-native';
import {TextContent} from './TextContent';
import Modal from 'react-native-modal';
import Input from './Input';
import {colors} from '../assets/colors/colors';
import {strings} from '../assets/strings/strings';
import Button from './Button';
import {useFile} from '../contexts/FileContext';
export default function ModalEditFile({
  visible,
  toogleModalEditFile,
  value,
  setValue,
  currentId,
}) {
  const {editFile} = useFile();

  function handleEditFile() {
    editFile(currentId, value);
    toogleModalEditFile();
  }
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.7}
      onBackButtonPress={toogleModalEditFile}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 10,
          padding: 15,
          alignItems: 'center',
        }}>
        <TextContent>{strings.edit_file}</TextContent>
        <View style={{width: '100%'}}>
          <Input
            placeholderText={strings.type_folder_name}
            placeholderColor={colors.placeholder_input}
            value={value}
            setValue={setValue}
            onlyBorder={true}
            borderRadius={10}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <Button
              title={strings.cancel}
              backgroundColor="red"
              fontSize={16}
              onClick={toogleModalEditFile}
            />

            <Button
              title={strings.edit_file}
              backgroundColor={colors.main_blue}
              fontSize={16}
              onClick={handleEditFile}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
