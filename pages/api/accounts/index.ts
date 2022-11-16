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
      query: params,
    } = req;
    if (!accessToken) throw new AxiosError("로그인이 만료되었습니다.");
    const config = {
      headers: { Authorization: `Bearer ${accessToken}` },
      params,
    };
    const response = await axios.get<Account[]>(URL, config);
    res.status(response.status).send({
      totalCount: Number(response.headers["x-total-count"]),
      data: response.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(401);
    }
  }
}
