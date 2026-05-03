import { useEffect, useState } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../services/productService";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 🏏 Hero Banner */}
      <View style={styles.banner}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1593341646782-e0f0b5d9e5d7",
          }}
          style={styles.bannerImage}
        />
        <Text style={styles.bannerText}>Cricket Store</Text>
      </View>

      {/* 🏏 Introduction */}
      <View style={styles.intro}>
        <Text style={styles.title}>Welcome to Cricket World 🏏</Text>
        <Text style={styles.desc}>
          Cricket is more than just a sport — it's a passion that unites
          millions. From powerful bats to professional gear, explore everything
          you need to play like a champion. Discover high-quality cricket items
          and upgrade your game today!
        </Text>
      </View>

      {/* 🛍 Featured Products */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>

        <FlatList
          data={products.slice(0, 6)}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ width: 160 }}>
              <ProductCard item={item} />
            </View>
          )}
        />
      </View>

      {/* 🏏 Categories */}
      <View style={styles.categories}>
        <Text style={styles.sectionTitle}>Categories</Text>

        <View style={styles.categoryRow}>
          <View style={styles.categoryBox}>
            <Text>🏏 Bats</Text>
          </View>
          <View style={styles.categoryBox}>
            <Text>⚾ Balls</Text>
          </View>
          <View style={styles.categoryBox}>
            <Text>🧤 Gloves</Text>
          </View>
        </View>

        <View style={styles.categoryRow}>
          <View style={styles.categoryBox}>
            <Text>🪖 Helmets</Text>
          </View>
          <View style={styles.categoryBox}>
            <Text>👟 Shoes</Text>
          </View>
          <View style={styles.categoryBox}>
            <Text>🦵 Pads</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  banner: {
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: 200,
  },
  bannerText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },

  intro: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  desc: {
    color: "#555",
    lineHeight: 20,
  },

  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  categories: {
    padding: 15,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoryBox: {
    backgroundColor: "#f3f4f6",
    padding: 15,
    borderRadius: 10,
    width: "30%",
    alignItems: "center",
  },
});
