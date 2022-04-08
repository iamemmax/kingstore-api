import axios from "axios";
const API_URL = "api/products";

export const Addproduct = async (userData) => {
  const response = await axios.post(
    `http://localhost:5000/api/products/new`,
    userData,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
      },
    }
  );
  // console.log(userData);
  return response.data;
};
export const getProduct = async () => {
  const response = await axios.get(
    `http://localhost:5000/api/products/`,

    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
      },
    }
  );
  return response.data;
};
export const TopSelling = async () => {
  const response = await axios.get(
    `${API_URL}/topselling`,

    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
      },
    }
  );
  return response.data;
};
export const getProductDetails = async (title) => {
  const response = await axios.get(
    `/api/products/${title}`,

    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
      },
    }
  );
  console.log(response.data);
  return response.data;
};
