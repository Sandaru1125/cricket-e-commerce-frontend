import { useState } from "react";
import { Alert, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import { loginUser } from "../../services/authService";
import { saveRole, saveToken } from "../../utils/storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      const data = res.data || {};
      const token = data.token || data.accessToken || data?.data?.token;
      const role = data.user?.role || data.role || data?.data?.role;

      if (!token) {
        Alert.alert("Login Failed", "No token returned from server.");
        return;
      }

      await saveToken(token);
      if (role) await saveRole(role);

      Alert.alert("Success", "Login successful!");
      if (role === "admin") {
        navigation.navigate("AddProduct");
      } else {
        navigation.navigate("Home");
      }
    } catch (err) {
      console.log(err.response?.data || err);
      Alert.alert(
        "Login Failed",
        err.response?.data?.message || "Unable to login",
      );
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <InputField placeholder="Email" onChangeText={setEmail} />
      <InputField
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />
      <CustomButton title="Login" onPress={handleLogin} />
    </View>
  );
}
