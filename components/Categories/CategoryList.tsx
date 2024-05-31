import { FlatList } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import CategoryItem from "./CategoryItem";
import { Category } from "../../modals/category";
import { RootStackScreen } from "../../types";

type CategoryListProps = {
  categories: Category[];
};

function CategoryList(props: CategoryListProps) {
  const { categories } = props;
  const navigation = useNavigation<NavigationProp<RootStackScreen>>();

  function categorySelected(id: string) {
    navigation.navigate("quotes", { id });
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <CategoryItem
          name={item.title}
          color={item.color}
          onPress={categorySelected.bind(null, item.id)}
        />
      )}
    />
  );
}

export default CategoryList;
