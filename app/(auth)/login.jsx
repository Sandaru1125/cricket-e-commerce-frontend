import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";

import { loginUser } from "../../services/authService";
import { saveToken, saveRole } from "../../utils/storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please enter all fields");
    }

    try {
      setLoading(true);

      const res = await loginUser({ email, password });

      // 💾 Save token
      await saveToken(res.data.token);
      await saveRole(res.data.role);

      Alert.alert("Success", "Login successful!");

      // 🔁 Navigate to main app (tabs)
      // use router.replace so expo-router handles navigation
      router.replace("/alltabs");
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔐 Title */}
      <Text style={styles.title}>Welcome Back 🏏</Text>
      <Text style={styles.subtitle}>
        Login to continue your cricket journey
      </Text>

      {/* 📧 Email */}
      <InputField placeholder="Email" value={email} onChangeText={setEmail} />

      {/* 🔑 Password */}
      <InputField
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* 🔘 Login Button */}
      <CustomButton
        title={loading ? "Logging in..." : "Login"}
        onPress={handleLogin}
      />

      {/* 🔗 Register Link */}
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 20,
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#22c55e",
    fontWeight: "500",
  },
});
