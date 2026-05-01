import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/productService";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}
