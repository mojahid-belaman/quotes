import { Pressable, StyleSheet, Text } from "react-native";

type CategoryProps = {
  color: string;
  name: string;
  onPress: () => void;
};

function CategoryItem(props: CategoryProps) {
  const { name, color, onPress } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: color },
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{name}</Text>
    </Pressable>
  );
}

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    padding: 18,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 4,
  },
  text: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  pressed: {
    opacity: 0.75,
  },
});
