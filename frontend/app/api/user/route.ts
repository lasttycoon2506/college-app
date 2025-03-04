import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type TokenType = {
  refresh: string;
  access: string;
  error?: string;
};

async function getUser(username: string, password: string): Promise<TokenType> {
  const res: Response = await fetch(`http://localhost:8000/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("access");
  console.log(cookie);

  //   if (token.error) {
  //     return NextResponse.json(
  //       { message: "Invalid credentials" },
  //       { status: 401 }
  //     );
  //   }

  //   (await cookies()).set("authToken", token.access, {
  //     httpOnly: true,
  //     secure: process.env.NODE_ENV === "production",
  //     sameSite: "strict",
  //     path: "/",
  //   });
  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
