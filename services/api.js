import axios from "axios";
import { BASE_URL } from "../constants/config";

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;
