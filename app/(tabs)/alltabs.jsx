import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";
import { getRole } from "../../utils/storage";

// Screens
import HomeScreen from "../../screens/user/HomeScreen";
import ProfileScreen from "../../screens/user/ProfileScreen";
import AddProductScreen from "../../screens/admin/AddProductScreen";

// Dummy Explore screen (you can replace later)
const ExploreScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Explore Products</Text>
  </View>
);

const Tab = createBottomTabNavigator();

export default function AllTabs() {
  const [role, setRole] = useState("customer");

  useEffect(() => {
    const fetchRole = async () => {
      const userRole = await getRole();
      if (userRole) {
        setRole(userRole);
      }
    };
    fetchRole();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Add Product") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#22c55e",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      {role === "admin" && (
        <Tab.Screen name="Add Product" component={AddProductScreen} />
      )}
      <Tab.Screen name="Account" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
