import { useState, useCallback } from "react";

import API from "../utils/api";
import { URLS } from "../constants";

export const useUsers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const list = useCallback(async ({ page, limit }) => {
    try {
      setLoading(true);
      const { data } = await API.get(
        `${URLS.USERS}?page=${page}&size=${limit}`
      );
      setData(data?.data?.data);
      setMsg("Users fetched Successfully");
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
      const { data } = await API.post(URLS.USERS, payload);
      setData(data?.data);
      setMsg("Users Added Successfully");
      return data;
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
      const { data } = await API.get(`${URLS.USERS}/${id}`);
      setMsg("User Fetched Successfully");
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
      const { data } = await API.put(`${URLS.USERS}/profile`, payload);
      return data;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "Something is wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id, payload) => {
    try {
      setLoading(true);
      const result = await API.delete(`${URLS.USERS}/${id}`, { data: payload });
      return result;
    } catch (e) {
      const errMsg = e.response ? e.response.data.msg : "Something is wrong";
      setError(errMsg);
      throw errMsg;
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async (id, payload) => {
    try {
      setLoading(true);
      const { data } = await API.patch(`${URLS.USERS}/status/${id}`, payload);
      setMsg("User Blocked Successfully");
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
  };

  return {
    data,
    msg,
    loading,
    error,
    blockUser,
    create,
    list,
    getById,
    remove,
    updateById,
  };
};