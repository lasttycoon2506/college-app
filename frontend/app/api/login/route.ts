import { ApiResponse } from "@/models/api-response";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Token = {
  refresh: string;
  access: string;
};

async function getLoginToken(
  username: string,
  password: string
): Promise<ApiResponse<Token>> {
  try {
    const res: Response = await fetch(`http://localhost:8000/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await res.json();
    if (!res.ok) {
      return { error: { message: result, statusCode: res.status } };
    }
    return { data: result, statusCode: res.status };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return { error: { message: error.message, statusCode: 500 } };
    }
    return { error: { message: "unexpected error occurred", statusCode: 500 } };
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { username, password } = await req.json();
  const res = await getLoginToken(username, password);

  if (res.error) {
    return NextResponse.json({
      error: res.error.message,
      status: res.error.statusCode,
    });
  }

  try {
    (await cookies()).set("authToken", res.data!.access, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    return NextResponse.json({
      message: "Login successful",
      status: res.statusCode,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message, status: 500 });
    }
    return NextResponse.json({
      error: "unknown error occurred setting token",
      status: 500,
    });
  }
}
