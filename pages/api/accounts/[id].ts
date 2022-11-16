import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { Account } from "model/db";

const URL = "http://localhost:4000/accounts";

export default async function accountsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      cookies: { accessToken },
      query,
    } = req;

    if (!accessToken) throw new AxiosError("로그인이 만료되었습니다.");
    const { id } = query;

    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
    };

    if (req.method === "GET") {
      const response = await axios.get<Account[]>(`${URL}/${id}`, config);
      res.status(response.status).send(response.data);
    }

    // 업데이트
    if (req.method === "PATCH") {
      const response = await axios.patch<Account[]>(
        `${URL}/${id}`,
        { ...req.body, updated_at: new Date().toString() },
        config
      );
      res.status(response.status).send(response.data);
    }

    // 삭제
    if (req.method === "DELETE") {
      const response = await axios.delete<Account[]>(`${URL}/${id}`, config);
      res.status(response.status).send(response.data);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(401);
    }
  }
}
