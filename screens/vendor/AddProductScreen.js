import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { createProduct } from "../../services/productService";
import { getToken } from "../../utils/storage";

export default function AddProductScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name || !price) {
      Alert.alert("Validation", "Please provide at least a name and price.");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken();
      const payload = {
        name,
        description,
        price: parseFloat(price),
        image: imageUrl,
      };
      await createProduct(payload, token);
      Alert.alert("Success", "Product created.");
      navigation.goBack();
    } catch (err) {
      console.log(err.response || err);
      Alert.alert("Error", "Unable to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Image URL"
        style={styles.input}
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <CustomButton
        title={loading ? "Creating..." : "Create Product"}
        onPress={handleCreate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    marginBottom: 10,
    borderRadius: 6,
  },
});
