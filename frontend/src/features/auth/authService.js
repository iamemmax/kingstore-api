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

// update user
export const UpdateUser = async (userData, userId) => {
  const response = await axios.put(
    `http://localhost:5000/api/user/${userId}`,
    userData,

    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
      },
    }
  );
  return response.data;
};

// update user
export const UpdatePassword = async (userId, userData) => {
  console.log(userId);
  console.log(userData);
  const response = await axios.put(
    `${API_URL}/change-pass/${userId}`,
    userData,

    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
      },
    }
  );
  return response.data;
};

// logout
export const logout = async () => {
  const response = await axios.post(`${API_URL}/logout`, {
    withCredentials: true,
  });
  return response.data;
};
