import axios from "axios";
import { BASE_URL } from "../../utils/baseEndPoint";

//! Register user

export const registerAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/register`,
    {
      username: userData?.username,
      password: userData?.password,
      email: userData?.email,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};

//! Login

export const loginAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/login`,
    {
      username: userData?.username,
      password: userData?.password,
    },
    {
      withCredentials: true,
    }
  );
  return response.data;
};
//!checkAuth Status
export const checkAuthStatus = async () => {
  const response = await axios.get(`${BASE_URL}/checkauthenticated`, {
    withCredentials: true,
  });
  return response.data;
};
//!User profile
export const userProfileAPI = async () => {
  const response = await axios.get(`${BASE_URL}/profile`, {
    withCredentials: true,
  });
  return response.data;
};
//! logout user
export const logoutAPI = async (userData) => {
  const response = await axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};
