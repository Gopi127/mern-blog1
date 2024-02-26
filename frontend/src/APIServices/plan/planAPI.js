import axios from "axios";
//create that must return a promise

const BASE_URL = "http://localhost:4000/api/v1/plans";
//! Create plan api
export const createPlanAPI = async (planData) => {
  // console.log(postData);
  const response = await axios.post(`${BASE_URL}/create`, planData, {
    withCredentials: true,
  });
  return response.data;
};

//! Fetch all plans
export const fetchAllPlans = async () => {
  const posts = await axios.get(BASE_URL);
  return posts.data;
};

//! Fetch a plan
export const fetchPlan = async (id) => {
  const plan = await axios.get(`${BASE_URL}/${id}`);
  return plan.data;
};
