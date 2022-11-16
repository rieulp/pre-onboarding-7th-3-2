import { AccountStatus, Broker } from "model/data";
import { Account } from "model/db";
import { api } from "./api";

export interface AccountsQuery {
  broker_id?: Broker;
  is_active?: boolean;
  user_id?: number;
  status?: AccountStatus;
  name?: string;
  q?: string;
}

export interface PageAccountsQuery extends AccountsQuery {
  _page: number;
  _limit: number;
}

export interface AccountResponseData {
  totalCount: number;
  data: Account[];
}

export interface AccountsPage extends AccountResponseData {
  cur_page: number;
}

export const getPageAccounts = async (
  params: PageAccountsQuery
): Promise<AccountsPage> => {
  try {
    const { data } = await api.get<AccountResponseData>("/accounts", {
      params,
      withCredentials: true,
    });
    return {
      totalCount: data.totalCount,
      data: data.data,
      cur_page: params._page,
    };
  } catch (error) {
    return {
      totalCount: 0,
      data: [],
      cur_page: params._page,
    };
  }
};

export const getAccountDetail = async (id?: string) => {
  if (!id) return null;
  try {
    const response = await api.get<Account>(`/accounts/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const updateAccount = async (id?: string, data?: AccountsQuery) => {
  if (!id || !data) return false;
  try {
    const response = await api.patch<Account>(`/accounts/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const deleteAccount = async (id?: string) => {
  if (!id) return false;
  try {
    const response = await api.delete<Account>(`/accounts/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
