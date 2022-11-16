import { LoginResponse } from "model/auth";
import { api } from "./api";

export const login = async (email: string, password: string) => {
  try {
    await api.post<LoginResponse>("/login", {
      email,
      password,
    });

    return true;
  } catch (error) {
    return { error: "로그인에 실패했습니다." };
  }
};

export const logout = async () => {
  try {
    await api.post("/logout");
    return true;
  } catch (error) {
    return false;
  }
};
