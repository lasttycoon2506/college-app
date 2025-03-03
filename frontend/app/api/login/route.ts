import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type TokenType = {
  refresh: string;
  access: string;
  error?: string;
};

async function getLoginToken(
  username: string,
  password: string
): Promise<TokenType> {
  const res: Response = await fetch(`http://localhost:8000/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return res.json();
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { username, password }: { username: string; password: string } =
    await req.json();

  const token: TokenType = await getLoginToken(username, password);

  if (token.error) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  (await cookies()).set("authToken", token.access, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}
