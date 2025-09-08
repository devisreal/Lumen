import axios from "axios";

import api from "./index";

export interface LoginPayload {
  username: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  try {
    const { data } = await api.post("/auth/login", payload);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data.message);
    } else {
      console.error(error);
    }
  }
};

export interface RegisterPayload {
  username: string;
  email: string;
  password?: string;
  confirm_password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  try {
    const { data } = await api.post("/auth/register", payload);
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data.message);
    } else {
      console.error(error);
    }
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data.message);
    } else {
      console.error(error);
    }
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/auth/me", {
      withCredentials: true,
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error(error.response.data.message);
    } else {
      console.error(error);
    }
  }
};
