import { Image, StyleSheet, Text, View } from "react-native";

export default function ProductCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.img} />
      <Text>{item.name}</Text>
      <Text>Rs. {item.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 10, borderWidth: 1, margin: 10 },
  img: { height: 100 },
});
