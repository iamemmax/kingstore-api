import axios from "axios";
const API_URL = "api/user";

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`, {
    withCredentials: true,
  });
  return response.data;
};
