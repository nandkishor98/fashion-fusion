import axios from "axios";
import API from "../utils/api";

export const list = async () => {
  return await axios.get("https://fakestoreapi.com/products");
};