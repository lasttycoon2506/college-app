import { User } from "@/models/user";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getUser(token: string): Promise<User> {
  const res: Response = await fetch(`http://localhost:8000/api/currentUser/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function GET(): Promise<NextResponse> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const cookie: RequestCookie | undefined = cookieStore.get("authToken");
  if (!cookie) {
    return NextResponse.json(
      { message: "No auth token found" },
      { status: 401 }
    );
  }

  const user = await getUser(cookie.value);

  return NextResponse.json({ body: { user } }, { status: 200 });
}
