import { useState, useCallback } from "react";

import API from "../utils/api";
import { URLS } from "../constants";

export const useCategories = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const list = useCallback(async ({ page, limit }) => {
    try {
      setLoading(true);
      const { data } = await API.get(
        `${URLS.CATEGORIES}?page=${page}&limit=${limit}`
      );
      setData(data?.data?.data);
      setMsg("Categories fetched Successfully");
      return data.data;
    } catch (e) {
      const errMsg = e.response
        ? e.response.data.msg
        : "Something went wrong...";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (payload) => {
    try {
      setLoading(true);
      const { data } = await API.post(URLS.CATEGORIES, payload);
      setData(data?.data?.data);
      setMsg("Categories Added Successfully");
    } catch (e) {
      const errMsg = e.response
        ? e.response.data.msg
        : "Something went wrong...";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  const getById = useCallback(async (id) => {
    try {
      setLoading(true);
      const { data } = await API.get(`${URLS.CATEGORIES}/${id}`);
      setCategory(data.data);
      setMsg("Category Fetched Successfully");
      return data.data;
    } catch (e) {
      const errMsg = e.response
        ? e.response.data.msg
        : "Something went wrong...";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateById = async (id, payload) => {
    try {
      setLoading(true);
      const result = await API.put(`${URLS.CATEGORIES}/${id}`, payload);
      return result;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "Something is wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      const result = await API.delete(`${URLS.CATEGORIES}/${id}`);
      return result;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "Something is wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  return {
    category,
    data,
    msg,
    loading,
    error,
    create,
    list,
    getById,
    remove,
    updateById,
  };
};