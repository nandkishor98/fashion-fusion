export const setToken = (token) => {
    const saveToken = localStorage.setItem("access_token", token);
    if (!saveToken) return null;
    return true;
  };
  
  export const getToken = () => {
    return localStorage.getItem("access_token");
  };
  
  export const removeToken = () => {
    return localStorage.removeItem("access_token");
  };