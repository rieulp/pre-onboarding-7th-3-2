import type { NextApiRequest, NextApiResponse } from "next";

export default async function logoutHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.setHeader("Set-Cookie", `path=/;  Max-Age=-1; Secure; HttpOnly;`);
    res.status(200).json({ isLogin: false });
  } catch (error) {
    res.status(400);
  }
}
