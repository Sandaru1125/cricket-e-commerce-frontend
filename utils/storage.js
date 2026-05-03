import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token) => {
  await AsyncStorage.setItem("token", token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const removeToken = async () => {
  await AsyncStorage.removeItem("token");
};

export const saveRole = async (role) => {
  await AsyncStorage.setItem("role", role);
};

export const getRole = async () => {
  return await AsyncStorage.getItem("role");
};

export const removeRole = async () => {
  await AsyncStorage.removeItem("role");
};
