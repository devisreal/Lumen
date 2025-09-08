import axios from "axios";

import { LoginPayload, RegisterPayload } from "../types/auth";
import api from "./index";

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
