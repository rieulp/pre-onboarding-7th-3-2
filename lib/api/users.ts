import { User } from "model/db";
import { api } from "./api";

export interface UsersQuery {
  id?: number;
  is_staff?: boolean;
  is_active?: boolean;
}

export const getUsers = async (params?: UsersQuery) => {
  try {
    const response = await api.get<User[]>("/users", {
      withCredentials: true,
      params,
    });
    return response.data;
  } catch (error) {
    return [];
  }
};
