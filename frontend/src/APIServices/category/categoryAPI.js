import axios from "axios";
//create that must return a promise

const BASE_URL = "http://localhost:4000/api/v1/categories";
//! Create post api
export const addCategoryAPI = async (postData) => {
  console.log(postData);
  const response = await axios.post(`${BASE_URL}/create`, postData, {
    withCredentials: true,
  });
  return response.data;
};

//! Fetch all categort
export const fetchAllCategory = async () => {
  const posts = await axios.get(BASE_URL);
  return posts.data;
};
