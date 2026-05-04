import API from "./api";

export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data, token) =>
  API.post("/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
