import axios, { AxiosError } from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

interface UserModel {
  accessToken: string;
  user: {
    email: string;
    id: number;
  };
}

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse<{ isLogin: boolean }>
) {
  try {
    const { body } = req;
    const response = await axios.post<UserModel>(
      "http://localhost:4000/login",
      body
    );
    const { accessToken } = response.data;
    res.setHeader(
      "Set-Cookie",
      `accessToken=${accessToken}; path=/;  Max-Age=3600; Secure; HttpOnly;`
    );

    res.status(200).json({ isLogin: true });
  } catch (error) {
    if (error instanceof AxiosError) {
      res.status(401);
    }
  }
}
