import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getLoginToken(username: string, password: string) {
  const res = await fetch(`http://localhost:8000/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return res.json();
}

export async function POST(req: Request) {
  const reqParsed = await req.json();
  const { username, password } = reqParsed;
  const token = await getLoginToken(username, password);

  if (token.error) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  if (token) {
    (await cookies()).set("authToken", token, {
      httpOnly: true, // Recommended for security
      secure: process.env.NODE_ENV === "production", // Recommended for production
      sameSite: "strict", // Recommended for security
      path: "/", // Adjust as needed
    });
    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  }
}
