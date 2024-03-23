import {View} from 'react-native';
import {CategoryList} from '../../../components/CategoryList';
import {CustomIcon} from '../../../components/CustomIcon';
import {Spacer} from '../../../components/Spacer';
import {TextContent} from '../../../components/TextContent';

function Category({handleCategoryChange, categoryWasNotProvided}) {
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
        handleCategoryChange={handleCategoryChange}
        categoryWasNotProvided={categoryWasNotProvided}
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

function CategorySelect({handleCategoryChange, categoryWasNotProvided}) {
  return (
    <View style={{width: '70%'}}>
      <CategoryList
        label="Categorias"
        placeholder="Escolha uma categoria"
        handleCategoryChange={handleCategoryChange}
      />
      {categoryWasNotProvided && (
        <View>
          <Spacer />
          <TextContent color="red">
            Por favor, escolha uma categoria*
          </TextContent>
        </View>
      )}
    </View>
  );
}

export {Category};
