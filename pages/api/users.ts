import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import type { User } from "model/db";

export default async function usersHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      cookies: { accessToken },
    } = req;
    if (!accessToken) throw new AxiosError("로그인이 만료되었습니다.");
    const response = await axios.get<User[]>("http://localhost:4000/users", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.status(response.status).send(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(401);
    }
  }
}
