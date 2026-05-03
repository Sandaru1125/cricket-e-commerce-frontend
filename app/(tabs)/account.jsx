import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import API from "../../services/api";
import { getToken, removeToken } from "../../utils/storage";

export default function Account({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await getToken();

      const res = await API.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔓 Logout
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          await removeToken();
          navigation.replace("Login"); // go to login screen
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 👤 Profile Section */}
      <View style={styles.profileCard}>
        <Text style={styles.title}>My Account</Text>

        {user ? (
          <>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user.name}</Text>

            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user.email}</Text>

            <Text style={styles.label}>Role</Text>
            <Text style={styles.value}>{user.role}</Text>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>

      {/* 🔓 Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },

  profileCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  label: {
    color: "#6b7280",
    marginTop: 10,
  },

  value: {
    fontSize: 16,
    fontWeight: "500",
  },

  logoutBtn: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
