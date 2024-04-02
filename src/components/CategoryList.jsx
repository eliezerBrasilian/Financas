import {TouchableOpacity, View} from 'react-native';

import {useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../assets/colors/colors';
import {Category} from '../classes/Category';
import {TextContent} from './TextContent';

function CategoryList({handleCategoryChange}) {
  const [categories] = useState(Category.getCategories());
  const [placeholderVisible, setPlaceholderVisisible] = useState(true);
  const [categorySelected, setCategorySelected] = useState(null);

  const activatePlaceholder = value => {
    setPlaceholderVisisible(true);
    setCategorySelected(value);
  };

  if (placeholderVisible) {
    return (
      <TouchableOpacity onPress={() => setPlaceholderVisisible(v => !v)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
          }}>
          <TextContent>
            {categorySelected !== null
              ? categorySelected
              : 'Escolha uma categoria'}
          </TextContent>
          <AntDesign name="caretdown" size={20} color={'#000'} />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View
      style={{
        borderWidth: 2,
        borderRadius: 12,
        borderColor: colors.almost_gray,
        padding: 12,
        rowGap: 7,
      }}>
      <CategoryItem
        category={categories[0]}
        handleCategoryChange={handleCategoryChange}
        activatePlaceholder={activatePlaceholder}
      />
      <CategoryItem
        category={categories[1]}
        handleCategoryChange={handleCategoryChange}
        activatePlaceholder={activatePlaceholder}
      />
      <CategoryItem
        category={categories[2]}
        handleCategoryChange={handleCategoryChange}
        activatePlaceholder={activatePlaceholder}
      />
      <CategoryItem
        category={categories[3]}
        handleCategoryChange={handleCategoryChange}
        activatePlaceholder={activatePlaceholder}
      />
      <CategoryItem
        category={categories[4]}
        handleCategoryChange={handleCategoryChange}
        activatePlaceholder={activatePlaceholder}
      />
      <CategoryItem
        category={categories[5]}
        handleCategoryChange={handleCategoryChange}
        activatePlaceholder={activatePlaceholder}
      />
      <CategoryItem
        category={categories[6]}
        handleCategoryChange={handleCategoryChange}
        activatePlaceholder={activatePlaceholder}
      />
      <CategoryItem
        category={categories[7]}
        handleCategoryChange={handleCategoryChange}
        activatePlaceholder={activatePlaceholder}
      />
      <CategoryItem
        category={categories[8]}
        handleCategoryChange={handleCategoryChange}
        activatePlaceholder={activatePlaceholder}
      />
    </View>
  );
}

function CategoryItem({category, handleCategoryChange, activatePlaceholder}) {
  return (
    <TouchableOpacity
      onPress={() => {
        handleCategoryChange(category.value);
        activatePlaceholder(category.value);
      }}>
      <View>
        <TextContent>{category.value}</TextContent>
      </View>
    </TouchableOpacity>
  );
}

export {CategoryList};
