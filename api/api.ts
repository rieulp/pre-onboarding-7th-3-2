import axios, { AxiosResponse } from 'axios';
import { getToken, removeToken, setToken } from 'lib/tokenStorage';
import { ErrorResponse, LoginResponse } from 'model/auth';
import { AccountStatus, Broker } from 'model/data';
import { Account, User } from 'model/db';
import Router from 'next/router';

export const api = axios.create({
  baseURL: '/api',
  timeout: 3000,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token)
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error.response.data)
);

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<LoginResponse>('/login', {
      email,
      password,
    });
    const data = response.data;
    setToken(data.accessToken);
    return true;
  } catch (error) {
    return { error: '로그인에 실패했습니다.' };
  }
};

export const logout = async () => {
  try {
    removeToken();
    return true;
  } catch (error) {
    return false;
  }
};

export const getAccounts = (params?: AccountsQuery) => async () => {
  try {
    const response = await api.get<Account[]>('/accounts', {
      params: { _limit: 20, ...params },
    });

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error === 'jwt expired') {
      await logout(); // 리다이렉트를 어떻게 해야할지
    }
    return [];
  }
};

export const getUsers = async (params?: UsersQuery) => {
  try {
    const response = await api.get<User[]>('/users', {
      withCredentials: true,
      params,
    });
    if (response.status === 200) {
      return response.data;
    }
    return [];
  } catch (error) {
    return error;
  }
};

export interface AccountsQuery {
  _page?: number;
  // _limit?: number;
  broker_id_like?: Broker;
  is_active_like?: boolean;
  user_id_like?: number;
  status_like?: AccountStatus;
}

export interface UsersQuery {
  id_like?: number;
  is_staff_like?: boolean;
  is_active_like?: boolean;
}
