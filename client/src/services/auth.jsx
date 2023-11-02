import API from "../utils/api";
import { URLS } from "../constants";

export const login = async (payload) => {
  return API.post(URLS.AUTH + "/login", payload);
};