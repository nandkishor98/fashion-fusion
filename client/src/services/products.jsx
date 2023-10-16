import { URLS } from "../constants";
import API from "../utils/api";

export const list = async () => {
  return API.get(URLS.PRODUCTS);
};