import { useState } from "react";
import { Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import { loginUser } from "../../services/authService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await loginUser({ email, password });
      console.log(res.data);
    } catch (err) {
      console.log(err.response?.data);
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
