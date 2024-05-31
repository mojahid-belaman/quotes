import { StyleSheet, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function SearchInput() {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="black" style={styles.icon} />
      <TextInput
        autoCorrect={false}
        style={styles.search}
        placeholder="Search..."
      />
    </View>
  );
}

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  search: {
    backgroundColor: "#E8E8E8",
    paddingVertical: 8,
    paddingLeft: 40,
    fontSize: 20,
    borderRadius: 8,
    flex: 1,
  },
  icon: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },
});
