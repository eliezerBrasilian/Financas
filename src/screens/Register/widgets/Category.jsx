import {View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {Category as Ca} from '../../../classes/Category';
import {CustomIcon} from '../../../components/CustomIcon';
import {TextContent} from '../../../components/TextContent';

function Category({handleCategoryChange}) {
  return (
    <View
      onPress={() => setDateVisible(true)}
      style={{
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: '#fff',
        rowGap: 20,
        borderRadius: 20,
      }}>
      <Top />

      <CategorySelect
        categories={Ca.getCategories()}
        handleCategoryChange={handleCategoryChange}
      />

      {/* <TouchableOpacity
            style={{
              backgroundColor: '#132E32',
              paddingVertical: 5,
              paddingHorizontal: 15,
              borderRadius: 17,
            }}>
            <TextContent color="#fff" fontSize={15} fontWeight="500">
              Outro dia...
            </TextContent>
          </TouchableOpacity> */}
    </View>
  );
}

function Top() {
  return (
    <View style={{flexDirection: 'row', columnGap: 20}}>
      <CustomIcon
        path={require('../../../assets/images/categoria.png')}
        height={30}
        width={30}
      />
      <TextContent fontWeight="bold">Categoria</TextContent>
    </View>
  );
}

function CategorySelect({categories, handleCategoryChange}) {
  return (
    <View style={{width: '70%'}}>
      <SelectList
        data={categories}
        label="Categorias"
        placeholder="Escolha uma categoria"
        save="value"
        inputStyles={{color: '#000'}}
        dropdownTextStyles={{color: '#000'}}
        setSelected={handleCategoryChange}
        search={false}
      />
    </View>
  );
}

export {Category};
