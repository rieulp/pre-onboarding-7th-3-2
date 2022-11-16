import axios from 'axios';
import { getToken, removeToken, setToken } from 'lib/tokenStorage';
import { LoginResponse } from 'model/auth';
import { AccountStatus, Broker } from 'model/data';
import { Account, User } from 'model/db';

import Router from 'next/router';
import { toast } from 'react-toastify';

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
    // TODO: 타임아웃 값 쿼리에 저장, 로그아웃시, 클리어 타임아웃 & 데이터 날리기
    // 1시간 시간 제한
    const timer = setTimeout(() => {
      toast.info('로그인 시간이 만료돼 로그인 페이지로 이동합니다.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      new Promise(() =>
        setTimeout(() => {
          console.log('logout!');
          logout().then(() => Router.replace('/'));
        }, 3500)
      );
    }, 60000 * 59);
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

export interface AccountsPage {
  data: Account[] | null;
  cur_page: number;
}

export const getPageAccounts = async (
  params: PageAccountsQuery
): Promise<AccountsPage> => {
  try {
    const response = await api.get<Account[]>('/accounts', { params });
    return {
      data: response.data,
      cur_page: params._page,
    };
  } catch (error) {
    if (error === 'jwt expired') {
      await logout(); // 리다이렉트를 어떻게 해야할지
    }
    return {
      data: null,
      cur_page: params._page,
    };
  }
};

export const getAccountDetail = async (id?: string) => {
  if (!id) return [];
  try {
    const response = await api.get<Account[]>(`/accounts?id=${id}`);
    return response.data;
  } catch (error) {
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
  broker_id?: Broker;
  is_active?: boolean;
  user_id?: number;
  status?: AccountStatus;
}

export interface PageAccountsQuery extends AccountsQuery {
  _page: number;
  _limit: number;
}

export interface UsersQuery {
  id?: number;
  is_staff?: boolean;
  is_active?: boolean;
}
