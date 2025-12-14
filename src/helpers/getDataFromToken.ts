import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const { id } = decodedToken as { id: string };
    return id;
  } catch (error: any) {
    throw new Error("Invalid token", error.message);
  }
};
