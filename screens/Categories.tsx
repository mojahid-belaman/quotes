import { StyleSheet, View } from "react-native";

import SearchInput from "../components/SearchInput";
import CategoryList from "../components/Categories/CategoryList";
import { useSQLiteContext } from "expo-sqlite";
import { Category } from "../modals/category";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { getAllCategories } from "../utils/api";
import Banner from "../components/Banner";

function CategorieScreen() {
  const db = useSQLiteContext();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCategories(db)
      .then((res) => setCategories(res))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <SearchInput />
      <CategoryList categories={categories} />
      <Banner />
    </View>
  );
}

export default CategorieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 14,
  },
});
