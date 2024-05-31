import { Pressable, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

type ButtonProps = {
  children: React.ReactNode;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
  onPress: () => void;
};

function Button(props: ButtonProps) {
  const { children, icon, color, size, onPress } = props;
  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} color={color} size={size} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  pressed: {
    opacity: 0.6,
  },
});
