import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    TextInput,
    View
} from "react-native";

import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/productService";

export default function ExploreScreen() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts();
      setProducts(res.data);
      setFiltered(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 Search Filter
  const handleSearch = (text) => {
    setSearch(text);

    const filteredData = products.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );

    setFiltered(filteredData);
  };

  return (
    <View style={styles.container}>
      {/* 🔍 Search Bar */}
      <TextInput
        placeholder="Search cricket items..."
        value={search}
        onChangeText={handleSearch}
        style={styles.search}
      />

      {/* 📦 Products */}
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item._id}
          numColumns={2}
          renderItem={({ item }) => <ProductCard item={item} />}
          columnWrapperStyle={{ justifyContent: "space-between" }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  search: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
});
