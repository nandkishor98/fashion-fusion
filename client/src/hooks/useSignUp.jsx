import { useState } from "react";
import { SERVER_URL, URLS } from "../constants";
import axios from "axios";

export default function useSignUp() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [successfulRegistration, setsuccessfulRegistration] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = async ({ payload }) => {
    try {
      setLoading(true);
      setEmail(payload.email);
      const { data } = await axios.post(
        SERVER_URL + URLS.AUTH + "/register",
        payload
      );
      if (data.msg === "success") setsuccessfulRegistration(true);
    } catch (e) {
      const msg = e ? e.message : "Create API Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const verify = async ({ payload }) => {
    try {
      setLoading(true);
      const verify = await axios.post(
        SERVER_URL + URLS.AUTH + "/verify",
        payload
      );
      return verify;
    } catch (e) {
      const msg = e ? e.message : "Create API Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const regenerate = async ({ payload }) => {
    try {
      setLoading(true);
      const regen = await axios.post(
        SERVER_URL + URLS.AUTH + "/regenerate",
        payload
      );
      return regen;
    } catch (e) {
      const msg = e ? e.message : "Create API Failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };
  return {
    email,
    error,
    loading,
    successfulRegistration,
    regenerate,
    register,
    verify,
  };
}