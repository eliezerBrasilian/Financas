import {ScrollView, TextInput, View} from 'react-native';

import {BackgroundColor} from '../../../classes/BackgroundColor';
import Button from '../../../components/Button';
import {Category} from './Category';
import {DateOfTransaction} from './DateOfTransaction';
import {colors} from '../../../assets/colors/colors';

function Overview({
  tag,
  description,
  pickerVisible,
  currentDate,
  daySelected,
  handleSendOfRegister,
  handleDescriptionChange,
  handleCategoryChange,
  handleSelectDayChange,
}) {
  return (
    <View
      style={{
        overflow: 'hidden',
        backgroundColor: colors.main_background,
        position: 'absolute',
        left: 0,
        right: 0,
        top: 160,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '100%',
        padding: 20,
      }}>
      <ScrollView>
        <View
          style={{
            rowGap: 15,
            marginBottom: 200,
          }}>
          <DateOfTransaction
            handleSelectDayChange={handleSelectDayChange}
            daySelected={daySelected}
          />
          <Category handleCategoryChange={handleCategoryChange} />
          <TextInput
            placeholder={'Descrição da ' + tag + '...'}
            placeholderTextColor={'#000'}
            style={{
              color: '#000',
              fontSize: 18,
              borderBottomWidth: 0.6,
              borderBottomColor: 'green',
              borderRadius: 10,
              marginRight: 20,
            }}
            value={description}
            onChangeText={handleDescriptionChange}
          />

          <View style={{width: '100%', alignItems: 'center', marginTop: 60}}>
            <Button
              onClick={handleSendOfRegister}
              backgroundColor={BackgroundColor.getBackgrouncColor(tag)}
              title={'Salvar'}
              borderRadius={14}
              padding={5}
              width={'70%'}
              fontWeight="400"
            />
          </View>
        </View>
      </ScrollView>

      {/* <DatePicker
        modal={true}
        open={pickerVisible}
        date={currentDate}
        onCancel={() => setDateVisible(false)}
        onConfirm={newDate => {
          setDateVisible(false);
          setDate(newDate);
        }}
        locale="pt"
        title={'Selecione a data'}
        cancelText="Cancelar"
        confirmText="Confirmar"
        theme="light"
        androidVariant="iosClone"
        mode="date"
      /> */}
    </View>
  );
}

export {Overview};
