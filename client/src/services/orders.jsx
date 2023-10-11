import API from "../utils/api";
import { URLS } from "../constants";

export const create = async (payload) => {
  return await API.post(URLS.ORDERS, payload);
};