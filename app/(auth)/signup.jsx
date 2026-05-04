import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";

import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import { registerUser } from "../../services/authService";

export default function SignupScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      Alert.alert("Missing information", "Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak password",
        "Password must be at least 6 characters long.",
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password mismatch", "Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await registerUser({ name: trimmedName, email: trimmedEmail, password, role });
      Alert.alert("Account created", `Welcome, ${trimmedName}!`);
      router.replace("/login");
    } catch (error) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.title}>Create account</Text>
            <Text style={styles.subtitle}>
              Sign up to start shopping cricket gear.
            </Text>

            <InputField
              placeholder="Full name"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
              returnKeyType="next"
            />
            <InputField
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              returnKeyType="next"
            />
            <InputField
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              textContentType="newPassword"
              autoComplete="password-new"
              returnKeyType="next"
            />
            <InputField
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              textContentType="newPassword"
              autoComplete="password-new"
              returnKeyType="done"
            />

            <View style={styles.roleContainer}>
                <Text style={styles.roleLabel}>I am a:</Text>
                <View style={styles.roleOptions}>
                    <TouchableOpacity 
                        style={[styles.roleOption, role === "customer" && styles.roleSelected]} 
                        onPress={() => setRole("customer")}
                    >
                        <Text style={[styles.roleText, role === "customer" && styles.roleTextSelected]}>Customer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.roleOption, role === "admin" && styles.roleSelected]} 
                        onPress={() => setRole("admin")}
                    >
                        <Text style={[styles.roleText, role === "admin" && styles.roleTextSelected]}>Admin</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <CustomButton title={loading ? "Signing up..." : "Sign up"} onPress={handleSignup} />

            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Link href="/login" style={styles.link}>
                Log in
              </Link>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    marginBottom: 4,
  },
  footerText: {
    marginTop: 8,
    textAlign: "center",
    color: "#475569",
  },
  link: {
    color: "#22c55e",
    fontWeight: "700",
  },
  roleContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  roleLabel: {
    fontSize: 16,
    color: "#475569",
    marginBottom: 8,
  },
  roleOptions: {
    flexDirection: "row",
    gap: 10,
  },
  roleOption: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    alignItems: "center",
  },
  roleSelected: {
    backgroundColor: "#22c55e",
    borderColor: "#22c55e",
  },
  roleText: {
    color: "#475569",
    fontWeight: "600",
  },
  roleTextSelected: {
    color: "#fff",
  },
});
