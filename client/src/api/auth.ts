import api from "./index";

export interface LoginPayload {
  username: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export interface RegisterPayload {
  username: string;
  email: string;
  password?: string | undefined;
  confirm_password: string;
}

export const registerUser = async (payload: RegisterPayload) => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};
